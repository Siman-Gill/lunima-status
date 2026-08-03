// netlify/functions/install.mjs
// Two jobs:
//   ?token=X&os=windows&download=1  -> streams a pre-keyed launcher script
//   ?token=X                        -> returns JSON agent list for polling
//
// The launcher downloads the real Huntress agent from Huntress and
// registers it to this client's organisation. Huntress will not let you
// host their binary (the account key is part of their download URL),
// so a launcher script is the correct approach.

import { getClientByInstallToken } from '../lib/clients.mjs';

export default async (req) => {
  const url = new URL(req.url);
  const token = url.searchParams.get('token') || url.searchParams.get('t');
  const os = (url.searchParams.get('os') || 'windows').toLowerCase();
  const wantsDownload = url.searchParams.get('download') === '1';

  const json = (b, s = 200) =>
    new Response(JSON.stringify(b), {
      status: s,
      headers: { 'content-type': 'application/json' }
    });

  if (!token) return json({ error: 'no_token' }, 400);

  const client = await getClientByInstallToken(token);
  if (!client) return json({ error: 'not_found' }, 404);

  const acctKey = process.env.HUNTRESS_ACCOUNT_KEY;
  if (!acctKey) return json({ error: 'account_key_not_set' }, 500);

  const orgKey = client.orgkey;
  if (!orgKey) return json({ error: 'org_key_missing' }, 500);

  // ---------------------------------------------------------
  // MODE 1 - serve the pre-keyed launcher script
  // ---------------------------------------------------------
  if (wantsDownload) {
    let body, filename;

    if (os === 'windows') {
      filename = 'LunimaGuard-Setup.bat';
      const psCmd =
        "(New-Object Net.WebClient).DownloadFile(" +
        "'https://update.huntress.io/download/%AccountKey%/HuntressInstaller.exe'," +
        "$env:temp+'\\HuntressInstaller.exe'); " +
        "Start-Process -Wait -FilePath ($env:temp+'\\HuntressInstaller.exe') " +
        "-ArgumentList '/ACCT_KEY=%AccountKey%','/ORG_KEY=%OrgKey%','/S'";

      body = [
        '@echo off',
        'REM =============================================',
        'REM  Lunima Guard - endpoint protection installer',
        'REM  Organisation: ' + client.name,
        'REM  Support: 647-552-3894 / shield@lunima.ca',
        'REM =============================================',
        '',
        'net session >nul 2>&1',
        'if %errorLevel% NEQ 0 (',
        '  echo.',
        '  echo   This installer must be run as Administrator.',
        '  echo   Right-click LunimaGuard-Setup.bat and choose',
        '  echo   "Run as administrator", then try again.',
        '  echo.',
        '  pause',
        '  exit /b 1',
        ')',
        '',
        'echo.',
        'echo   Installing Lunima Guard protection...',
        'echo   This takes about a minute. Please wait.',
        'echo.',
        '',
        'SET "AccountKey=' + acctKey + '"',
        'SET "OrgKey=' + orgKey + '"',
        '',
        'powershell -executionpolicy bypass -command "' + psCmd + '"',
        '',
        'if %errorLevel% NEQ 0 (',
        '  echo   Installation failed. Call Lunima on 647-552-3894.',
        '  pause',
        '  exit /b 1',
        ')',
        '',
        'echo.',
        'echo   Done. This machine is now protected.',
        'echo   It appears on your Lunima dashboard within 60 seconds.',
        'echo.',
        'timeout /t 8',
        ''
      ].join('\r\n');

    } else if (os === 'mac') {
      filename = 'LunimaGuard-Setup.sh';
      body = [
        '#!/bin/bash',
        '# =============================================',
        '#  Lunima Guard - endpoint protection installer',
        '#  Organisation: ' + client.name,
        '#  Support: 647-552-3894 / shield@lunima.ca',
        '# =============================================',
        '',
        'set -e',
        '',
        'if [ "$EUID" -ne 0 ]; then',
        '  echo ""',
        '  echo "  This installer needs administrator rights."',
        '  echo "  Run it like this instead:"',
        '  echo ""',
        '  echo "    sudo bash LunimaGuard-Setup.sh"',
        '  echo ""',
        '  exit 1',
        'fi',
        '',
        'ACCOUNT_KEY="' + acctKey + '"',
        'ORG_KEY="' + orgKey + '"',
        'INSTALLER="/tmp/HuntressMacInstall.sh"',
        '',
        'echo ""',
        'echo "  Installing Lunima Guard protection..."',
        'echo ""',
        '',
        'rm -f "$INSTALLER"',
        'curl -fsSL "https://huntress.io/script/darwin/$ACCOUNT_KEY" -o "$INSTALLER"',
        '',
        'bash "$INSTALLER" --account_key "$ACCOUNT_KEY" --organization_key "$ORG_KEY"',
        '',
        'echo ""',
        'echo "  Done. This Mac is now protected."',
        'echo ""',
        'echo "  ONE MORE STEP - macOS requires your approval:"',
        'echo "  1. Open System Settings then Privacy and Security"',
        'echo "  2. Click Allow next to the Huntress system extension"',
        'echo "  3. Grant Full Disk Access when prompted"',
        'echo ""',
        'echo "  Without this the agent cannot see threats."',
        'echo ""',
        ''
      ].join('\n');

    } else {
      filename = 'LunimaGuard-Setup.sh';
      body = [
        '#!/bin/bash',
        '# =============================================',
        '#  Lunima Guard - endpoint protection installer',
        '#  Organisation: ' + client.name,
        '#  Support: 647-552-3894 / shield@lunima.ca',
        '# =============================================',
        '',
        'set -e',
        '',
        'if [ "$EUID" -ne 0 ]; then',
        '  echo "Run with sudo: sudo bash LunimaGuard-Setup.sh"',
        '  exit 1',
        'fi',
        '',
        'ACCOUNT_KEY="' + acctKey + '"',
        'ORG_KEY="' + orgKey + '"',
        'INSTALLER="/tmp/HuntressLinuxInstall.sh"',
        '',
        'echo ""',
        'echo "  Installing Lunima Guard protection..."',
        'echo ""',
        '',
        'rm -f "$INSTALLER"',
        'curl -fsSL "https://huntress.io/script/linux/$ACCOUNT_KEY" -o "$INSTALLER"',
        '',
        'bash "$INSTALLER" --account_key "$ACCOUNT_KEY" --organization_key "$ORG_KEY"',
        '',
        'echo ""',
        'echo "  Done. This server is now protected."',
        'echo ""',
        ''
      ].join('\n');
    }

    return new Response(body, {
      status: 200,
      headers: {
        'content-type': 'application/octet-stream',
        'content-disposition': 'attachment; filename="' + filename + '"',
        'cache-control': 'no-store'
      }
    });
  }

  // ---------------------------------------------------------
  // MODE 2 - agent polling for the deploy page
  // ---------------------------------------------------------
  const key = process.env.HUNTRESS_API_KEY;
  const secret = process.env.HUNTRESS_API_SECRET;
  if (!key || !secret) return json({ error: 'huntress_creds_missing' }, 500);

  const auth = Buffer.from(key + ':' + secret).toString('base64');

  try {
    const r = await fetch(
      'https://api.huntress.io/v1/agents?organization_id=' + client.org + '&limit=500',
      { headers: { Authorization: 'Basic ' + auth } }
    );
    if (!r.ok) throw new Error('huntress ' + r.status);
    const data = await r.json();
    const agents = data.agents || [];

    const THIRTY_MIN = 30 * 60 * 1000;
    const now = Date.now();

    return json({
      company: client.name,
      plan: client.plan,
      orgKey: orgKey,
      count: agents.length,
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
    console.error(e);
    return json({ error: 'huntress_unreachable' }, 502);
  }
};
