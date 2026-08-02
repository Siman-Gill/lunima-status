// netlify/functions/install.mjs
//
// Two jobs, both keyed to a per-client install token:
//   ?action=download  -> generates a pre-keyed installer for that client
//   ?action=status    -> reports which machines have connected so far
//
// Your Huntress ACCOUNT KEY lives only here, on the server.
// It is written into the generated installer at download time.

const HUNTRESS_PS1 =
  'https://raw.githubusercontent.com/huntresslabs/deployment-scripts/main/Powershell/InstallHuntress.powershellv2.ps1';

export default async (req) => {
  const url = new URL(req.url);
  const token = url.searchParams.get('t');
  const action = url.searchParams.get('action') || 'status';
  const platform = (url.searchParams.get('os') || 'windows').toLowerCase();

  const json = (body, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { 'content-type': 'application/json' }
    });

  // ── Look up the client by install token ──────────────────
  let clients = {};
  try {
    clients = JSON.parse(process.env.CLIENTS || '{}');
  } catch {
    return json({ error: 'CLIENTS env var is not valid JSON' }, 500);
  }

  const entry = Object.values(clients).find((c) => c.installToken === token);
  if (!token || !entry) return json({ error: 'not_found' }, 404);

  const acctKey = process.env.HUNTRESS_ACCOUNT_KEY;
  if (!acctKey) return json({ error: 'HUNTRESS_ACCOUNT_KEY not set' }, 500);

  const orgKey = entry.orgkey;
  if (!orgKey) return json({ error: 'orgkey missing for this client' }, 500);

  // ═══════════════ DOWNLOAD ═══════════════
  if (action === 'download') {
    if (platform === 'windows') {
      const safeName = (entry.name || 'your organisation').replace(/[<>|&^%"]/g, '');

      const bat = [
        '@echo off',
        'setlocal',
        'title Lunima Guard Setup',
        '',
        'REM  Lunima Guard installer',
        `REM  Prepared for: ${safeName}`,
        'REM  Questions? 647-552-3894 or shield@lunima.ca',
        '',
        'net session >nul 2>&1',
        'if %errorlevel% neq 0 (',
        '  echo   Requesting administrator permission...',
        '  powershell -NoProfile -Command "Start-Process -FilePath \'%~f0\' -Verb RunAs"',
        '  exit /b',
        ')',
        '',
        `set "ACCT=${acctKey}"`,
        `set "ORG=${orgKey}"`,
        'set "PS1=%TEMP%\\LunimaGuardSetup.ps1"',
        'set "SRC=https://raw.githubusercontent.com/huntresslabs/deployment-scripts/main/Powershell/InstallHuntress.powershellv2.ps1"',
        '',
        'echo.',
        'echo   ===============================================',
        'echo     LUNIMA GUARD',
        `echo     Installing protection for ${safeName}`,
        'echo   ===============================================',
        'echo.',
        'echo   This takes about a minute. Please leave this window open.',
        'echo.',
        '',
        'echo   [1/2] Preparing setup files...',
        'powershell -NoProfile -ExecutionPolicy Bypass -Command ^',
        '  "[Net.ServicePointManager]::SecurityProtocol=[Net.SecurityProtocolType]::Tls12; ^',
        '   (New-Object Net.WebClient).DownloadFile($env:SRC, $env:PS1)" 2>nul',
        '',
        'if not exist "%PS1%" (',
        '  echo.',
        '  echo   Could not reach the setup server.',
        '  echo   Check this machine has internet access, then run this file again.',
        '  echo   Still stuck? Call 647-552-3894 and we will do it with you.',
        '  echo.',
        '  pause',
        '  exit /b 1',
        ')',
        '',
        'echo   [2/2] Installing and registering this machine...',
        'powershell -NoProfile -ExecutionPolicy Bypass -File "%PS1%" -acctkey "%ACCT%" -orgkey "%ORG%"',
        '',
        'if %errorlevel% neq 0 (',
        '  echo.',
        '  echo   Setup did not finish cleanly.',
        '  echo   A log was saved to C:\\Windows\\temp\\HuntressPoShInstaller.log',
        '  echo   Call 647-552-3894 and we will sort it out.',
        '  echo.',
        '  pause',
        '  exit /b 1',
        ')',
        '',
        'del "%PS1%" >nul 2>&1',
        'echo.',
        'echo   ===============================================',
        'echo     Done. This machine is now protected.',
        'echo     It appears on your Lunima dashboard within a minute.',
        'echo   ===============================================',
        'echo.',
        'timeout /t 10 >nul'
      ].join('\r\n');

      return new Response(bat, {
        status: 200,
        headers: {
          'content-type': 'application/octet-stream',
          'content-disposition': 'attachment; filename="LunimaGuard-Install.bat"',
          'cache-control': 'no-store'
        }
      });
    }

    if (platform === 'mac') {
      const sh = [
        '#!/bin/bash',
        '#  Lunima Guard installer',
        `#  Prepared for: ${entry.name || 'your organisation'}`,
        '#  Questions? 647-552-3894 or shield@lunima.ca',
        '',
        'set -e',
        '',
        'if [ "$EUID" -ne 0 ]; then',
        '  echo "  Lunima Guard needs administrator permission."',
        '  echo "  Run again with:  sudo bash LunimaGuard-Install.sh"',
        '  exit 1',
        'fi',
        '',
        'echo ""',
        'echo "  Lunima Guard"',
        `echo "  Installing protection for ${(entry.name || 'your organisation').replace(/"/g, '')}"`,
        'echo ""',
        '',
        `ACCT_KEY="${acctKey}"`,
        `ORG_KEY="${orgKey}"`,
        '',
        'TMP=$(mktemp -d)',
        'curl -fsSL "https://update.huntress.io/darwin_installer" -o "$TMP/HuntressAgent.pkg"',
        'installer -pkg "$TMP/HuntressAgent.pkg" -target /',
        '/Applications/Huntress.app/Contents/MacOS/HuntressAgent --account_key="$ACCT_KEY" --organization_key="$ORG_KEY" || true',
        'rm -rf "$TMP"',
        '',
        'echo ""',
        'echo "  Done. This Mac is now protected."',
        'echo "  It will appear on your Lunima dashboard within a minute."',
        'echo ""'
      ].join('\n');

      return new Response(sh, {
        status: 200,
        headers: {
          'content-type': 'application/octet-stream',
          'content-disposition': 'attachment; filename="LunimaGuard-Install.sh"',
          'cache-control': 'no-store'
        }
      });
    }

    return json({ error: 'unsupported_platform' }, 400);
  }

  // ═══════════════ STATUS ═══════════════
  const key = process.env.HUNTRESS_API_KEY;
  const secret = process.env.HUNTRESS_API_SECRET;
  if (!key || !secret) return json({ error: 'api_credentials_missing' }, 500);

  const auth = Buffer.from(`${key}:${secret}`).toString('base64');

  try {
    const r = await fetch(
      `https://api.huntress.io/v1/agents?organization_id=${entry.org}&limit=500`,
      { headers: { Authorization: 'Basic ' + auth } }
    );
    if (!r.ok) throw new Error('Huntress ' + r.status);
    const data = await r.json();
    const agents = data.agents || [];

    const THIRTY_MIN = 30 * 60 * 1000;
    const now = Date.now();

    return json({
      company: entry.name || 'Your organisation',
      plan: entry.plan || 'Lunima Guard',
      orgKey,
      connected: agents.length,
      machines: agents.map((a) => {
        const last = a.last_callback_at ? new Date(a.last_callback_at).getTime() : 0;
        return {
          hostname: a.hostname || 'Unknown machine',
          platform: a.platform || a.os || '—',
          online: last > 0 && now - last < THIRTY_MIN
        };
      })
    });
  } catch (e) {
    console.error(e);
    return json({ error: 'huntress_unreachable' }, 502);
  }
};
