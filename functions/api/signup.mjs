// functions/api/signup.mjs
// Creates a client: claims a pool org, mints codes, saves to KV,
// returns the keys so the deploy screen loads immediately.
// No payment — invoicing is arranged separately.

import { saveClient, claimPoolOrg } from '../lib/clients.mjs';

const PLANS = {
  basic: 'Guard Essentials',
  pro: 'Guard Pro',
  enterprise: 'Guard Enterprise'
};

const ALPHA = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
function rand(n) {
  const b = new Uint8Array(n);
  crypto.getRandomValues(b);
  return [...b].map(x => ALPHA[x % ALPHA.length]).join('');
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const json = (b, s = 200) =>
    new Response(JSON.stringify(b), {
      status: s,
      headers: { 'content-type': 'application/json' }
    });

  let body;
  try { body = await request.json(); }
  catch { return json({ error: 'bad_json', message: 'Something went wrong.' }, 400); }

  const company = String(body.company || '').trim();
  const contact = String(body.contact || '').trim();
  const email   = String(body.email || '').trim().toLowerCase();
  const phone   = String(body.phone || '').trim();
  const plan    = String(body.plan || 'pro').toLowerCase();

  if (!company) return json({ error: 'missing_company', message: 'Company name is required.' }, 400);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    return json({ error: 'bad_email', message: 'Enter a valid work email address.' }, 400);
  if (!PLANS[plan]) return json({ error: 'unknown_plan', message: 'Unknown plan.' }, 400);

  const slot = await claimPoolOrg(env);
  if (!slot) {
    return json({
      error: 'pool_empty',
      message: 'Your account is being set up by hand. We will email your access code within the hour. Questions? Call 647-552-3894.'
    }, 503);
  }

  const code = 'LMA-' + rand(4) + '-' + rand(4);
  const installToken = rand(32);

  const record = {
    org: slot.org,
    orgkey: slot.orgkey,
    name: company,
    plan: PLANS[plan],
    contact: 'Siman Gill',
    phone: '647-552-3894',
    clientContact: contact,
    clientEmail: email,
    clientPhone: phone,
    installToken,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  await saveClient(env, code, record);

  return json({
    ok: true,
    company,
    plan: PLANS[plan],
    code,
    installToken,
    acctKey: env.HUNTRESS_ACCOUNT_KEY || '',
    orgKey: slot.orgkey
  });
}
