// functions/api/status.mjs
// Reachable at /api/status
import { getClientByCode } from '../lib/clients.mjs';

export async function onRequestGet(context) {
  const { request, env } = context;
  const json = (body, status = 200, extraHeaders = {}) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { 'content-type': 'application/json', ...extraHeaders }
    });

  const url = new URL(request.url);
  const token = url.searchParams.get('token');

  const client = getClientByCode(env, token);
  if (!client) return json({ error: 'not_found' }, 404);

  const key = env.HUNTRESS_API_KEY;
  const secret = env.HUNTRESS_API_SECRET;
  if (!key || !secret) return json({ error: 'Huntress credentials not set' }, 500);

  const auth = btoa(`${key}:${secret}`);

  const call = async (path) => {
    const r = await fetch('https://api.huntress.io/v1' + path, {
      headers: { Authorization: 'Basic ' + auth }
    });
    if (!r.ok) throw new Error('Huntress ' + r.status + ' on ' + path);
    return r.json();
  };

  try {
    const org = client.org;
    const [agentsRes, incidentsRes] = await Promise.all([
      call('/agents?organization_id=' + org + '&limit=500'),
      call('/incident_reports?organization_id=' + org + '&limit=50')
    ]);
    const agents = agentsRes.agents || [];
    const incidents = incidentsRes.incident_reports || [];
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
    return json({
      company: client.name || 'Your organisation',
      plan: client.plan || 'Lunima Guard',
      contact: client.contact || 'Siman Gill',
      phone: client.phone || '647-552-3894',
      acctKey: env.HUNTRESS_ACCOUNT_KEY || '',
      orgKey: client.orgkey || '',
      installToken: client.installToken || '',
      agents: shaped,
      incidents: incidents.map((i) => ({
        subject: i.subject || i.summary || 'Security event',
        summary: i.summary || '',
        severity: (i.severity || 'low').toLowerCase(),
        status: (i.status || 'sent').toLowerCase(),
        sentAt: i.sent_at || i.updated_at || null
      })),
      fetchedAt: new Date().toISOString()
    });
  } catch (e) {
    console.error(e);
    return json({ error: 'huntress_unreachable' }, 502);
  }
}
