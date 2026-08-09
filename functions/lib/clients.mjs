// functions/lib/clients.mjs
// KV-backed client store. Falls back to the CLIENTS env var so
// manually-added clients (like LMA-TEST-1234) keep working.

function legacy(env) {
  try { return JSON.parse(env.CLIENTS || '{}'); }
  catch { return {}; }
}

export async function getClientByCode(env, code) {
  if (!code) return null;
  if (env.CLIENTS_KV) {
    const rec = await env.CLIENTS_KV.get('client:' + code, { type: 'json' });
    if (rec) return rec;
  }
  return legacy(env)[code] || null;
}

export async function getClientByInstallToken(env, token) {
  if (!token) return null;
  if (env.CLIENTS_KV) {
    const code = await env.CLIENTS_KV.get('install:' + token);
    if (code) {
      const rec = await env.CLIENTS_KV.get('client:' + code, { type: 'json' });
      if (rec) return rec;
    }
  }
  const found = Object.values(legacy(env)).find(c => c && c.installToken === token);
  return found || null;
}

export async function saveClient(env, code, record) {
  if (!env.CLIENTS_KV) throw new Error('KV not bound');
  await env.CLIENTS_KV.put('client:' + code, JSON.stringify(record));
  if (record.installToken) {
    await env.CLIENTS_KV.put('install:' + record.installToken, code);
  }
  return record;
}

export async function listClients(env) {
  if (!env.CLIENTS_KV) return [];
  const { keys } = await env.CLIENTS_KV.list({ prefix: 'client:' });
  const out = [];
  for (const k of keys) {
    const rec = await env.CLIENTS_KV.get(k.name, { type: 'json' });
    if (rec) out.push({ code: k.name.replace('client:', ''), ...rec });
  }
  return out;
}

export async function claimPoolOrg(env) {
  if (!env.CLIENTS_KV) return null;
  const pool = (await env.CLIENTS_KV.get('pool:available', { type: 'json' })) || [];
  if (!pool.length) return null;
  const slot = pool.shift();
  await env.CLIENTS_KV.put('pool:available', JSON.stringify(pool));
  return slot;
}

export async function getPool(env) {
  if (!env.CLIENTS_KV) return [];
  return (await env.CLIENTS_KV.get('pool:available', { type: 'json' })) || [];
}

export async function setPool(env, list) {
  if (!env.CLIENTS_KV) throw new Error('KV not bound');
  await env.CLIENTS_KV.put('pool:available', JSON.stringify(list));
  return list;
}
