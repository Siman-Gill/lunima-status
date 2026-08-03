// netlify/lib/clients.mjs
// Shared client lookup. Reads the CLIENTS environment variable.
// Imported by status.mjs and install.mjs.

function allClients() {
  try {
    return JSON.parse(process.env.CLIENTS || '{}');
  } catch (e) {
    console.error('CLIENTS env var is not valid JSON');
    return {};
  }
}

// Look up a client by their dashboard access code.
export async function getClientByCode(code) {
  if (!code) return null;
  return allClients()[code] || null;
}

// Look up a client by the secret token in their /setup/ URL.
export async function getClientByInstallToken(installToken) {
  if (!installToken) return null;
  const found = Object.values(allClients()).find(
    (c) => c && c.installToken === installToken
  );
  return found || null;
}

// List every client (code included).
export async function listClients() {
  const all = allClients();
  return Object.keys(all).map((code) => ({ code, ...all[code] }));
}
