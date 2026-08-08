// functions/api/install.mjs
// Reachable at /api/install
import { getClientByInstallToken } from '../lib/clients.mjs';

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const token = url.searchParams.get('token') || url.searchParams.get('t');
  const os = (url.searchParams.get('os') || 'windows').toLowerCase();
  const wantsDownload = url.searchParams.get('download') === '1';

  const json = (b, s = 200) =>
    new Response(JSON.stringify(b), { status: s, headers: { 'content-type': 'application/json' } });

  if (!token) return json({ error: 'no_token' }, 400);

  const client = getClientByInstallToken(env, token);
  if (!client) return json({ error: 'not_found' }, 404);

  const acctKey = env.HUNTRESS_ACCOUNT_KEY;
  if (!acctKey) return json({ error: 'account_key_not_set' }, 500);

  const orgKey = client.orgkey;
  if (!orgKey) return json({ error: 'org_key_missing' }, 500);

  if (wantsDownload) {
    let body, filename;

    if (os === 'windows') {
      filename = 'LunimaGuard-Setup.bat';
      const psCmd =
        "[Net.ServicePointManager]::SecurityProtocol=[Net.SecurityProtocolType]::Tls12; " +
        "(New-Object Net.WebClient).DownloadFile(" +
        "'https://update.huntress.io/download/%AccountKey%/HuntressInstaller.exe'," +
        "$env:temp+'\\HuntressInstaller.exe'); " +
        "$p=Start-Process -Wait -PassThru -FilePath ($env:temp+'\\HuntressInstaller.exe') " +
        "-ArgumentList '/ACCT_KEY=%AccountKey%','/ORG_KEY=%OrgKey%','/S'; exit $p.ExitCode";
      body = [
        '@echo off',
        'REM Lunima Guard - endpoint protection installer',
        'REM Organisation: ' + client.name,
        'net session >nul 2>&1',
        'if %errorLevel% NEQ 0 (',
        '  echo This installer must be run as Administrator.',
        '  pause', '  exit /b 1', ')',
        'echo Installing Lunima Guard protection...',
        'SET "AccountKey=' + acctKey + '"',
        'SET "OrgKey=' + orgKey + '"',
        'powershell -executionpolicy bypass -command "' + psCmd + '"',
        'if %errorLevel% NEQ 0 (',
        '  echo Installation failed. Call 647-552-3894.',
        '  pause', '  exit /b 1', ')',
        'echo Done. This machine is now protected.',
        'timeout /t 8'
      ].join('\r\n');
    } else if (os === 'mac') {
      filename = 'LunimaGuard-Setup.sh';
      body = [
        '#!/bin/bash', 'set -e',
        'if [ "$EUID" -ne 0 ]; then echo "Run: sudo bash LunimaGuard-Setup.sh"; exit 1; fi',
        'ACCOUNT_KEY="' + acctKey + '"',
        'ORG_KEY="' + orgKey + '"',
        'curl -fsSL "https://huntress.io/script/darwin/$ACCOUNT_KEY" -o /tmp/HuntressMacInstall.sh',
        'bash /tmp/HuntressMacInstall.sh --account_key "$ACCOUNT_KEY" --organization_key "$ORG_KEY"',
        'echo "Done. Approve the extension in System Settings > Privacy & Security."'
      ].join('\n');
    } else {
      filename = 'LunimaGuard-Setup.sh';
      body = [
        '#!/bin/bash', 'set -e',
        'if [ "$EUID" -ne 0 ]; then echo "Run with sudo"; exit 1; fi',
        'ACCOUNT_KEY="' + acctKey + '"',
        'ORG_KEY="' + orgKey + '"',
        'curl -fsSL "https://huntress.io/script/linux/$ACCOUNT_KEY" -o /tmp/HuntressLinuxInstall.sh',
        'bash /tmp/HuntressLinuxInstall.sh --account_key "$ACCOUNT_KEY" --organization_key "$ORG_KEY"'
      ].join('\n');
    }

    return new Response(body, {
      headers: {
        'content-type': 'application/octet-stream',
        'content-disposition': `attachment; filename="${filename}"`,
        'cache-control': 'no-store'
      }
    });
  }

  const key = env.HUNTRESS_API_KEY;
  const secret = env.HUNTRESS_API_SECRET;
  if (!key || !secret) return json({ error: 'huntress_creds_missing' }, 500);
  const auth = btoa(`${key}:${secret}`);

  try {
    const r = await fetch(`https://api.huntress.io/v1/agents?organization_id=${client.org}&limit=500`,
      { headers: { Authorization: 'Basic ' + auth } });
    if (!r.ok) throw new Error('huntress ' + r.status);
    const data = await r.json();
    const agents = data.agents || [];
    const THIRTY_MIN = 30 * 60 * 1000;
    const now = Date.now();
    return json({
      company: client.name, plan: client.plan, orgKey, acctKey, count: agents.length,
      agents: agents.map((a) => {
        const last = a.last_callback_at ? new Date(a.last_callback_at).getTime() : 0;
        return {
          hostname: a.hostname || 'Unknown machine',
          platform: a.platform || a.os || '-',
          version: a.version || null,
          online: last > 0 && now - last < THIRTY_MIN,
          lastSeen: a.last_callback_at || null
        };
      })
    });
  } catch (e) {
    return json({ error: 'huntress_unreachable' }, 502);
  }
}
