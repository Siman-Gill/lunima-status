// functions/lib/clients.mjs
// Same job as before, but reads CLIENTS from Cloudflare's env object
// instead of process.env, since Workers don't have process.env.

function allClients(env) {
  try {
    return JSON.parse(env.CLIENTS || '{}');
  } catch (e) {
    console.error('CLIENTS env var is not valid JSON');
    return {};
  }
}

export function getClientByCode(env, code) {
  if (!code) return null;
  return allClients(env)[code] || null;
}

export function getClientByInstallToken(env, installToken) {
  if (!installToken) return null;
  const found = Object.values(allClients(env)).find(
    (c) => c && c.installToken === installToken
  );
  return found || null;
}
