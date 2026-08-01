// netlify/functions/status.mjs
// Same job as the Vercel version — holds the Huntress key,
// returns only the data belonging to one token.

export default async (req) => {
  const json = (body, status = 200, extraHeaders = {}) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { 'content-type': 'application/json', ...extraHeaders }
    });

  const url = new URL(req.url);
  const token = url.searchParams.get('token');

  // ── 1. Who is this token? ──────────────────────────────
  let clients = {};
  try {
    clients = JSON.parse(process.env.CLIENTS || '{}');
  } catch {
    return json({ error: 'CLIENTS env var is not valid JSON' }, 500);
  }

  const client = clients[token];
  if (!client) return json({ error: 'not_found' }, 404);

  // ── 2. Build the Huntress auth header ──────────────────
  const key = process.env.HUNTRESS_API_KEY;
  const secret = process.env.HUNTRESS_API_SECRET;
  if (!key || !secret) {
    return json({ error: 'Huntress credentials not set' }, 500);
  }

  const auth = Buffer.from(`${key}:${secret}`).toString('base64');

  const call = async (path) => {
    const r = await fetch('https://api.huntress.io/v1' + path, {
      headers: { Authorization: 'Basic ' + auth }
    });
    if (!r.ok) throw new Error('Huntress ' + r.status + ' on ' + path);
    return r.json();
  };

  // ── 3. Fetch this org's data ───────────────────────────
  try {
    const org = client.org;

    const [agentsRes, incidentsRes] = await Promise.all([
      call('/agents?organization_id=' + org + '&limit=500'),
      call('/incident_reports?organization_id=' + org + '&limit=50')
    ]);

    const agents = agentsRes.agents || [];
    const incidents = incidentsRes.incident_reports || [];

    // An agent is "online" if it checked in within the last 30 minutes.
    const THIRTY_MIN = 30 * 60 * 1000;
    const now = Date.now();

    const shaped = agents.map((a) => {
      const last = a.last_callback_at ? new Date(a.last_callback_at).getTime() : 0;
      return {
        hostname: a.hostname || 'Unknown machine',
        platform: a.platform || a.os || '—',
        online: last > 0 && now - last < THIRTY_MIN,
        lastSeen: a.last_callback_at || null,
        version: a.version || null
      };
    });

    return json(
      {
        company: client.name || 'Your organisation',
        plan: client.plan || 'Lunima Guard',
        contact: client.contact || 'Siman Gill',
        phone: client.phone || '647-552-3894',
        agents: shaped,
        incidents: incidents.map((i) => ({
          subject: i.subject || i.summary || 'Security event',
          summary: i.summary || '',
          severity: (i.severity || 'low').toLowerCase(),
          status: (i.status || 'sent').toLowerCase(),
          sentAt: i.sent_at || i.updated_at || null
        })),
        fetchedAt: new Date().toISOString()
      },
      200,
      { 'Cache-Control': 'public, max-age=0, s-maxage=300' }
    );
  } catch (e) {
    console.error(e);
    return json({ error: 'huntress_unreachable' }, 502);
  }
};
