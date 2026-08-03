<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Install Lunima Guard</title>
<style>
  :root{
    --bg:#0a0a0b; --panel:#141416; --card:#1b1b1e; --card-2:#0f2320;
    --line:#2a2a2e; --line-teal:#2a4a44; --teal:#7dd3c0; --teal-ink:#0a0a0b;
    --orange:#e8542f; --text:#ffffff; --muted:#a6a6ac; --muted-2:#7d7d84; --amber:#e8a33d;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:var(--bg);color:var(--text);line-height:1.6;min-height:100vh;
    -webkit-font-smoothing:antialiased;
    font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif}
  @media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}

  .wrap{max-width:760px;margin:0 auto;padding:0 24px}
  nav{display:flex;justify-content:space-between;align-items:center;padding:18px 0;
    border-bottom:1px solid var(--line)}
  .logo{font-size:17px;font-weight:600;letter-spacing:1.5px;display:flex;align-items:center;gap:8px}
  .logo .mark{display:inline-flex;gap:3px}
  .logo .mark span{width:12px;height:12px;border-radius:50%;background:#fff}
  .logo .mark span:last-child{border-radius:3px}
  .navr{font-size:13px;color:var(--muted)}
  .navr a{color:var(--teal);text-decoration:none}

  .eyebrow{display:inline-block;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;
    color:var(--teal);background:#12231f;padding:6px 14px;border-radius:20px}
  h1{font-size:clamp(26px,4vw,34px);font-weight:600;line-height:1.2;letter-spacing:-0.4px;margin:16px 0 10px}
  h3{font-size:18px;font-weight:600}
  p{color:var(--muted)}
  .lead{font-size:16px;color:#c4c4ca;line-height:1.7}
  .small{font-size:13px;color:var(--muted-2);line-height:1.65}
  .head{text-align:center;padding:44px 0 30px}

  .card{background:var(--card);border-radius:14px;padding:26px;border:1px solid var(--line);margin-bottom:16px}
  .card-teal{background:var(--card-2);border:1px solid var(--line-teal)}

  .ih{display:flex;align-items:center;gap:14px;margin-bottom:12px}
  .inum{width:30px;height:30px;border-radius:8px;background:var(--orange);color:#fff;font-size:14px;
    font-weight:600;display:flex;align-items:center;justify-content:center;flex-shrink:0}
  .inum.done{background:var(--teal);color:var(--teal-ink)}

  .btn{display:inline-block;font-size:14px;font-weight:500;padding:12px 26px;border-radius:8px;
    text-decoration:none;cursor:pointer;border:1px solid transparent;font-family:inherit;
    transition:background .2s,border-color .2s}
  .btn-primary{background:var(--orange);color:#fff}
  .btn-primary:hover{background:#f26a48}
  .btn-primary:disabled{opacity:.5;cursor:default}
  .btn-teal{border:1px solid var(--teal);color:var(--teal);background:transparent}
  .btn-teal:hover{background:#12231f}
  .btn-row{display:flex;gap:12px;flex-wrap:wrap;align-items:center}

  .os{display:flex;gap:10px;flex-wrap:wrap;margin:14px 0}
  .osb{background:transparent;border:1px solid var(--line);color:var(--muted);border-radius:8px;
    padding:9px 18px;font-size:13px;cursor:pointer;font-family:inherit;transition:all .2s}
  .osb:hover{border-color:#555;color:#fff}
  .osb.on{border-color:var(--teal);color:var(--teal);background:#12231f}

  .steps-list{counter-reset:s;list-style:none;margin-top:14px}
  .steps-list li{counter-increment:s;position:relative;padding-left:34px;margin-bottom:12px;
    font-size:14px;color:#c4c4ca;line-height:1.65}
  .steps-list li::before{content:counter(s);position:absolute;left:0;top:1px;width:22px;height:22px;
    border-radius:6px;background:var(--bg);border:1px solid var(--line-teal);color:var(--teal);
    font-size:11px;font-weight:600;display:flex;align-items:center;justify-content:center}

  .callout{background:var(--card-2);border:1px solid var(--line-teal);border-radius:10px;
    padding:16px 18px;font-size:14px;color:#c4c4ca;line-height:1.65;margin-top:14px}
  .callout strong{color:var(--teal);font-weight:500}
  .codeb{background:var(--bg);border:1px solid var(--line);border-radius:10px;padding:14px 16px;
    font-family:ui-monospace,'SF Mono',Menlo,monospace;font-size:12px;color:var(--teal);
    line-height:1.9;overflow-x:auto;margin-top:10px;white-space:pre-wrap;word-break:break-all}
  .copy{background:transparent;border:1px solid var(--teal);color:var(--teal);border-radius:6px;
    padding:6px 12px;font-size:12px;cursor:pointer;font-family:inherit;margin-top:10px}
  .copy:hover{background:#12231f}

  .live{display:flex;align-items:center;gap:12px;background:var(--bg);border:1px solid var(--line);
    border-radius:10px;padding:14px 16px;margin-top:12px;font-size:14px;color:var(--muted)}
  .live.hit{border-color:var(--line-teal);background:var(--card-2)}
  .live strong{color:#fff;font-weight:500}
  .spin{width:14px;height:14px;border:2px solid #2a2a2e;border-top-color:var(--teal);
    border-radius:50%;animation:sp .9s linear infinite;flex-shrink:0}
  @keyframes sp{to{transform:rotate(360deg)}}
  .dot{width:8px;height:8px;border-radius:50%;background:var(--teal);display:inline-block;flex-shrink:0}
  .pulse{animation:pl 2s infinite}
  @keyframes pl{0%,100%{opacity:1}50%{opacity:.35}}

  .mlist{display:flex;flex-direction:column;gap:8px;margin-top:12px}
  .mrow{display:flex;align-items:center;gap:12px;background:var(--bg);border:1px solid var(--line);
    border-radius:8px;padding:12px 14px;font-size:13px}
  .mrow .nm{color:#fff;flex:1}
  .mrow .pf{color:var(--muted-2);font-size:12px}
  .mrow .st{font-size:11px;background:#12231f;color:var(--teal);padding:3px 10px;border-radius:12px}

  .err{background:#2a1512;border:1px solid #4a2019;border-radius:10px;padding:16px 18px;
    font-size:14px;color:#ff9d8a;line-height:1.65}
  footer{border-top:1px solid var(--line);padding:28px 0;text-align:center;margin-top:40px}
  footer p{font-size:12px;color:var(--muted-2)}
  footer a{color:var(--teal);text-decoration:none}
</style>
</head>
<body>

<nav class="wrap">
  <div class="logo"><span class="mark"><span></span><span></span></span> LUNIMA</div>
  <div class="navr">Need a hand? <a href="tel:6475523894">647-552-3894</a></div>
</nav>

<div class="wrap">
  <div class="head">
    <span class="eyebrow">Setup</span>
    <h1 id="title">Install Guard on your machines</h1>
    <p class="lead" id="subtitle">Preparing your installer…</p>
  </div>

  <div id="error" style="display:none"></div>

  <div id="main" style="display:none">

    <div class="card">
      <div class="ih"><div class="inum">1</div><h3>Download your installer</h3></div>
      <p style="font-size:14px">Already set up for your organisation — no keys to type, nothing to configure. Run it on every computer and server you want protected.</p>
      <div class="os">
        <button class="osb on" data-os="windows" onclick="pickOS(this)">Windows</button>
        <button class="osb" data-os="mac" onclick="pickOS(this)">macOS</button>
      </div>
      <div class="btn-row">
        <a class="btn btn-primary" id="dlbtn" href="#" download>Download installer</a>
        <span class="small" id="dlnote">Small file · takes about 30 seconds to run</span>
      </div>
    </div>

    <div class="card">
      <div class="ih"><div class="inum">2</div><h3>Run it on each machine</h3></div>
      <ol class="steps-list" id="runsteps"></ol>
      <div class="callout" id="rmnote">
        <strong>Have an IT provider, or more than about ten machines?</strong><br>
        Send them this one-line command instead — it works through Group Policy, Intune, or any RMM tool, and installs silently.
        <div class="codeb" id="rmcmd">Loading…</div>
        <button class="copy" onclick="copyCmd(this)">Copy command</button>
      </div>
    </div>

    <div class="card">
      <div class="ih"><div class="inum">3</div><h3>Watch them come online</h3></div>
      <p style="font-size:14px">Each machine appears here within about a minute of installing. This page checks every fifteen seconds — leave it open.</p>
      <div class="live" id="live"><span class="spin"></span>Waiting for the first machine to connect…</div>
      <div class="mlist" id="machines"></div>
    </div>

    <div class="card card-teal">
      <div class="ih"><div class="inum" style="background:var(--teal);color:var(--teal-ink)">?</div><h3>Rather we did it with you?</h3></div>
      <p style="font-size:14px">Book a thirty-minute screen share and we'll deploy across your machines together. Included in your plan — most clients take it, and it's the fastest way to be finished.</p>
      <div class="btn-row" style="margin-top:16px">
        <a href="https://scheduler.zoom.us/lunima/scoping-call" class="btn btn-teal">Book a deployment session</a>
        <span class="small">or call 647-552-3894</span>
      </div>
    </div>

    <div id="finish" hidden></div>
  </div>
</div>
</div>

<footer class="wrap">
  <p>Lunima Cybersecurity Inc. · Toronto, Ontario · Powered by Huntress</p>
  <p style="margin-top:6px"><a href="tel:6475523894">647-552-3894</a> · <a href="mailto:shield@lunima.ca">shield@lunima.ca</a></p>
</footer>

<script>
var TOKEN = (function(){
  // token can arrive as ?t=CODE or as the last part of /setup/CODE
  var q = new URLSearchParams(location.search).get('t');
  if (q) return q;
  var parts = location.pathname.split('/').filter(Boolean);
  var last = parts[parts.length - 1] || '';
  return (last === 'setup' || last === 'install.html') ? '' : last;
})();
var OS = 'windows';
var data = null;

var RUN_STEPS = {
  windows: [
    'Find <strong>LunimaGuard-Install.bat</strong> in your Downloads folder.',
    'Double-click it. Windows asks for administrator permission — click <strong>Yes</strong>.',
    'If Windows shows a blue "protected your PC" box, click <strong>More info</strong> then <strong>Run anyway</strong>. That appears because the file is new, not because anything is wrong.',
    'A black window opens for about thirty seconds, then closes on its own. That machine is done.',
    'Repeat on every computer and server you want protected.'
  ],
  mac: [
    'Open <strong>Terminal</strong> — press Command+Space, type Terminal, press Enter.',
    'Type <strong>sudo bash </strong> then drag <strong>LunimaGuard-Install.sh</strong> from Downloads into the Terminal window.',
    'Press Enter and give your Mac password when asked. Nothing appears as you type it — that is normal.',
    'Wait about thirty seconds for it to finish.',
    'Repeat on every Mac you want protected.'
  ]
};

function showError(title, body){
  document.getElementById('main').style.display = 'none';
  var e = document.getElementById('error');
  e.style.display = 'block';
  e.innerHTML = '<div class="err"><strong style="color:#fff">' + title + '</strong><br>' + body + '</div>';
  document.getElementById('title').textContent = 'Install Lunima Guard';
  document.getElementById('subtitle').textContent = '';
}

function pickOS(btn){
  document.querySelectorAll('.osb').forEach(function(b){ b.classList.remove('on'); });
  btn.classList.add('on');
  OS = btn.dataset.os;
  renderOS();
}

function renderOS(){
  document.getElementById('dlbtn').href = '/api/install?action=download&os=' + OS + '&t=' + encodeURIComponent(TOKEN);
  document.getElementById('dlbtn').textContent =
    OS === 'windows' ? 'Download LunimaGuard-Install.bat' : 'Download LunimaGuard-Install.sh';
  document.getElementById('runsteps').innerHTML =
    RUN_STEPS[OS].map(function(s){ return '<li>' + s + '</li>'; }).join('');
  document.getElementById('rmnote').style.display = OS === 'windows' ? 'block' : 'none';
}

function cpText(t, btn){
  navigator.clipboard.writeText(t).then(function(){
    var o = btn.textContent; btn.textContent = 'Copied';
    setTimeout(function(){ btn.textContent = o; }, 1400);
  });
}

function copyCmd(btn){
  var t = document.getElementById('rmcmd').textContent;
  navigator.clipboard.writeText(t).then(function(){
    var o = btn.textContent; btn.textContent = 'Copied';
    setTimeout(function(){ btn.textContent = o; }, 1400);
  });
}

function poll(){
  fetch('/api/install?action=status&t=' + encodeURIComponent(TOKEN))
    .then(function(r){ return r.json().then(function(d){ return { ok: r.ok, d: d }; }); })
    .then(function(res){
      if (!res.ok || res.d.error){
        if (res.d.error === 'payment_incomplete'){
          showError('Payment not completed',
            'Finish checkout and this page will be ready. Call 647-552-3894 if you need a hand.');
        } else if (res.d.error === 'not_found'){
          showError('This setup link is not active',
            'It may have expired, or the address is incomplete. Call 647-552-3894 and we will send a fresh one.');
        } else if (res.d.error === 'huntress_unreachable'){
          document.getElementById('live').innerHTML =
            '<span class="spin"></span>Checking again shortly…';
        }
        return;
      }

      data = res.d;
      document.getElementById('main').style.display = 'block';
      document.getElementById('title').textContent = 'Install Guard for ' + data.company;
      document.getElementById('subtitle').textContent =
        data.plan + ' · your monitoring account is ready — this is the last step.';

      document.getElementById('rmcmd').textContent =
        'LunimaGuard-Install.bat  (run as administrator on each machine, ' +
        'or push it through your RMM — your keys are already inside the file)';

      var live = document.getElementById('live');
      var list = document.getElementById('machines');

      // Access code appears the moment the first machine is protected
      var fin = document.getElementById('finish');
      if (data.dashboardCode) {
        fin.hidden = false;
        fin.innerHTML =
          '<div class="card card-teal" style="text-align:left">' +
            '<div class="ih"><div class="inum done">&#10003;</div>' +
            '<h3>You are protected — here is your dashboard</h3></div>' +
            '<p style="font-size:14px;margin-bottom:14px">Monitoring started the moment your first ' +
            'machine connected. Real analysts are watching now.</p>' +
            '<div class="keyrow"><div><div class="k">Your access code</div>' +
            '<div class="v" style="font-size:16px;letter-spacing:1px">' + data.dashboardCode + '</div></div>' +
            '<button class="copy" onclick="cpText(\'' + data.dashboardCode + '\',this)">Copy</button></div>' +
            '<div class="btn-row" style="margin-top:16px">' +
            '<a class="btn btn-primary" href="/">Open my dashboard</a>' +
            '<span class="small">Also emailed to you</span></div>' +
          '</div>';
      } else {
        fin.hidden = true;
      }

      if (!data.connected){
        live.className = 'live';
        live.innerHTML = '<span class="spin"></span>Waiting for the first machine to connect…';
        list.innerHTML = '';
      } else {
        live.className = 'live hit';
        live.innerHTML = '<span class="dot pulse"></span><span><strong>' + data.connected +
          (data.connected === 1 ? ' machine' : ' machines') + '</strong> connected and protected</span>';
        list.innerHTML = data.machines.map(function(m){
          return '<div class="mrow"><span class="dot"></span>' +
                 '<span class="nm">' + m.hostname + '</span>' +
                 '<span class="pf">' + m.platform + '</span>' +
                 '<span class="st">' + (m.online ? 'Protected' : 'Connected') + '</span></div>';
        }).join('');
      }
    })
    .catch(function(){
      document.getElementById('live').innerHTML = '<span class="spin"></span>Reconnecting…';
    });
}

if (!TOKEN){
  showError('No setup link provided',
    'Open the link from your welcome email, or call 647-552-3894 and we will resend it.');
} else {
  renderOS();
  poll();
  setInterval(poll, 15000);
}
</script>
</body>
</html>
