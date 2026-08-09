// functions/api/admin.mjs
// Private. Guarded by ADMIN_KEY.
//   GET  ?action=clients&key=...        list clients and pool
//   POST ?action=pool&key=...           seed/top up the org pool

import { listClients, getPool, setPool } from '../lib/clients.mjs';

function guard(env, url, request) {
  const key = request.headers.get('x-admin-key') || url.searchParams.get('key');
  return env.ADMIN_KEY && key === env.ADMIN_KEY;
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const json = (b, s = 200) =>
    new Response(JSON.stringify(b, null, 2), { status: s, headers: { 'content-type': 'application/json' } });

  if (!guard(env, url, request)) return json({ error: 'unauthorized' }, 401);

  return json({ clients: await listClients(env), pool: await getPool(env) });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const json = (b, s = 200) =>
    new Response(JSON.stringify(b, null, 2), { status: s, headers: { 'content-type': 'application/json' } });

  if (!guard(env, url, request)) return json({ error: 'unauthorized' }, 401);

  const body = await request.json().catch(() => ({}));
  const incoming = Array.isArray(body.orgs) ? body.orgs : [];
  if (!incoming.length) return json({ error: 'no_orgs_supplied' }, 400);

  const current = body.replace ? [] : await getPool(env);
  const merged = [...current, ...incoming];
  await setPool(env, merged);
  return json({ ok: true, poolSize: merged.length, pool: merged });
}
