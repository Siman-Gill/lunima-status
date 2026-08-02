<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Lunima Guard — Status</title>
<style>
  :root{
    --bg:#0a0a0b; --panel:#141416; --card:#1b1b1e; --card-2:#0f2320;
    --line:#2a2a2e; --line-teal:#2a4a44; --teal:#7dd3c0; --teal-ink:#0a0a0b;
    --blue:#8fd0ff; --orange:#e8542f; --text:#ffffff; --muted:#a6a6ac;
    --muted-2:#7d7d84; --amber:#e8a33d; --red:#e8542f;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:var(--bg);color:var(--text);line-height:1.6;-webkit-font-smoothing:antialiased;
    font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif}
  @media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}

  .wrap{max-width:1080px;margin:0 auto;padding:0 24px}
  h1{font-size:28px;font-weight:600;letter-spacing:-0.3px}
  h3{font-size:16px;font-weight:600}
  p{color:var(--muted)}
  .small{font-size:13px;color:var(--muted-2);line-height:1.65}

  nav{display:flex;justify-content:space-between;align-items:center;padding:18px 0;
    border-bottom:1px solid var(--line);position:sticky;top:0;
    background:rgba(10,10,11,.92);backdrop-filter:blur(8px);z-index:50}
  .logo{font-size:17px;font-weight:600;letter-spacing:1.5px;display:flex;align-items:center;gap:8px}
  .logo .mark{display:inline-flex;gap:3px}
  .logo .mark span{width:12px;height:12px;border-radius:50%;background:#fff}
  .logo .mark span:last-child{border-radius:3px}
  .navright{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--teal)}
  .dot{width:6px;height:6px;border-radius:50%;background:var(--teal);display:inline-block}
  .pulse{animation:pl 2s infinite}
  @keyframes pl{0%,100%{opacity:1}50%{opacity:.35}}

  .head{padding:36px 0 26px;display:flex;justify-content:space-between;
    align-items:flex-start;gap:16px;flex-wrap:wrap}
  .btn{display:inline-block;font-size:13px;font-weight:500;padding:9px 18px;border-radius:8px;
    cursor:pointer;border:1px solid transparent;font-family:inherit;text-decoration:none;
    transition:background .2s,border-color .2s}
  .btn-ghost{border:1px solid #555;color:#fff;background:transparent}
  .btn-ghost:hover{border-color:#888;background:#1a1a1c}

  .statgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:20px}
  .stat{background:var(--card);border-radius:14px;padding:22px;border:1px solid var(--line)}
  .stat .n{font-size:30px;font-weight:600;color:var(--teal);line-height:1}
  .stat .n.warn{color:var(--amber)}
  .stat .n .sub{font-size:16px;color:var(--muted-2);font-weight:400}
  .stat .l{font-size:13px;font-weight:500;color:#fff;margin:10px 0 3px}
  .stat .d{font-size:12px;color:var(--muted-2)}

  .two{display:grid;grid-template-columns:1fr 320px;gap:16px;padding-bottom:48px}
  .pnl{background:var(--card);border-radius:14px;border:1px solid var(--line);overflow:hidden}
  .pnl-h{padding:18px 22px;border-bottom:1px solid var(--line);
    display:flex;justify-content:space-between;align-items:center;gap:12px}
  .pnl-b{padding:20px 22px}

  .inc{display:flex;gap:14px;align-items:flex-start;padding:14px 0;border-bottom:1px solid var(--line)}
  .inc:last-child{border-bottom:none}
  .sev{width:8px;height:8px;border-radius:50%;margin-top:6px;flex-shrink:0}
  .sev.critical,.sev.high{background:var(--red)}
  .sev.medium{background:var(--amber)}
  .sev.low{background:var(--teal)}
  .inc-t{font-size:14px;color:#fff;font-weight:500;margin-bottom:4px}
  .inc-m{font-size:12px;color:var(--muted-2);line-height:1.6}

  .pill{display:inline-block;font-size:11px;font-weight:500;padding:3px 10px;
    border-radius:12px;letter-spacing:.3px;white-space:nowrap}
  .pill-ok{background:#12231f;color:var(--teal)}
  .pill-warn{background:#241d10;color:var(--amber)}
  .pill-hot{background:#2a1512;color:var(--red)}

  .kv{display:flex;justify-content:space-between;font-size:13px;padding:8px 0;border-bottom:1px solid var(--line)}
  .kv:last-child{border-bottom:none}
  .kv .k{color:var(--muted)}
  .kv .v{color:#fff}
  .kv .v.teal{color:var(--teal);font-weight:500}

  table{width:100%;border-collapse:collapse;font-size:13px}
  th{text-align:left;color:var(--muted-2);font-weight:500;font-size:12px;letter-spacing:.5px;
    padding:0 12px 14px 0;border-bottom:1px solid var(--line)}
  td{padding:14px 12px 14px 0;border-bottom:1px solid var(--line);color:#d0d0d5}
  tr:last-child td{border-bottom:none}
  td.host{color:#fff}
  .sdot{display:inline-block;width:6px;height:6px;border-radius:50%;margin-right:8px}
  .sdot.up{background:var(--teal)}
  .sdot.down{background:var(--muted-2)}

  .empty{text-align:center;padding:34px 20px;color:var(--muted-2);font-size:14px}
  .skel{background:linear-gradient(90deg,#1b1b1e 25%,#232327 50%,#1b1b1e 75%);
    background-size:200% 100%;animation:sk 1.4s infinite;border-radius:6px;height:14px;margin-bottom:9px}
  @keyframes sk{0%{background-position:200% 0}100%{background-position:-200% 0}}

  footer{border-top:1px solid var(--line);padding:28px 0;text-align:center}
  footer p{font-size:12px;color:var(--muted-2)}
  footer a{color:var(--teal);text-decoration:none}

  @media(max-width:820px){
    .statgrid{grid-template-columns:repeat(2,1fr)}
    .two{grid-template-columns:1fr}
    .head{padding:26px 0 20px}
  }
</style>
</head>
<body>

<nav class="wrap">
  <div class="logo"><span class="mark"><span></span><span></span></span> LUNIMA</div>
  <div class="navright">
    <span class="dot pulse"></span> <span id="soc-label">Connecting…</span>
    <a href="#" onclick="signOut();return false;"
       style="color:var(--muted-2);text-decoration:none;margin-left:14px;font-size:13px;">Sign out</a>
  </div>
</nav>

<div class="wrap">
  <div class="head">
    <div>
      <h1 id="company-name">Loading…</h1>
      <p class="small" id="sub-line" style="margin-top:4px;">Fetching your live status from the Huntress SOC</p>
    </div>
    <button class="btn btn-ghost" onclick="load()">Refresh</button>
  </div>

  <div id="error-box" style="display:none;"></div>

  <div id="content" style="display:none;">
    <div class="statgrid">
      <div class="stat">
        <div class="n"><span id="stat-online">–</span><span class="sub" id="stat-total"></span></div>
        <div class="l">Endpoints protected</div>
        <div class="d" id="stat-online-d">—</div>
      </div>
      <div class="stat">
        <div class="n" id="stat-open-n">–</div>
        <div class="l">Open incidents</div>
        <div class="d" id="stat-open-d">—</div>
      </div>
      <div class="stat">
        <div class="n" id="stat-reviewed">–</div>
        <div class="l">Events reviewed by the SOC</div>
        <div class="d">Across the reporting period</div>
      </div>
      <div class="stat">
        <div class="n">24/7</div>
        <div class="l">Monitoring coverage</div>
        <div class="d">Real analysts, every night</div>
      </div>
    </div>

    <div class="two">
      <div>
        <div class="pnl" style="margin-bottom:16px;">
          <div class="pnl-h"><h3>Recent activity</h3><span class="small">From the Huntress SOC</span></div>
          <div class="pnl-b" id="incident-list"></div>
        </div>

        <div class="pnl">
          <div class="pnl-h"><h3>Protected machines</h3><span class="small" id="agent-count"></span></div>
          <div class="pnl-b">
            <table>
              <thead><tr><th>Machine</th><th>Platform</th><th>Status</th><th>Last check-in</th></tr></thead>
              <tbody id="agent-rows"></tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <div class="pnl">
          <div class="pnl-h"><h3>Your service</h3></div>
          <div class="pnl-b">
            <div class="kv"><span class="k">Plan</span><span class="v" id="kv-plan">—</span></div>
            <div class="kv"><span class="k">Monitoring</span><span class="v teal">Active 24/7</span></div>
            <div class="kv"><span class="k">Your contact</span><span class="v" id="kv-contact">—</span></div>
            <div class="kv"><span class="k">Direct line</span><span class="v teal" id="kv-phone">—</span></div>
            <div class="kv"><span class="k">Last updated</span><span class="v" id="kv-updated">—</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="loading">
    <div class="statgrid">
      <div class="stat"><div class="skel" style="width:50%;height:28px;"></div><div class="skel" style="width:80%;"></div></div>
      <div class="stat"><div class="skel" style="width:50%;height:28px;"></div><div class="skel" style="width:80%;"></div></div>
      <div class="stat"><div class="skel" style="width:50%;height:28px;"></div><div class="skel" style="width:80%;"></div></div>
      <div class="stat"><div class="skel" style="width:50%;height:28px;"></div><div class="skel" style="width:80%;"></div></div>
    </div>
  </div>
</div>

<footer class="wrap">
  <p>Lunima Cybersecurity Inc. · Toronto, Ontario · Powered by Huntress</p>
  <p style="margin-top:6px;">Questions? <a href="tel:6475523894">647-552-3894</a> · <a href="mailto:shield@lunima.ca">shield@lunima.ca</a></p>
</footer>

<script>
function token(){
  var q = new URLSearchParams(location.search).get('t');
  if (q) return q;
  var parts = location.pathname.split('/').filter(Boolean);
  return parts[parts.length - 1] || '';
}

function timeAgo(iso){
  if(!iso) return '—';
  var mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1)    return 'Just now';
  if (mins < 60)   return mins + (mins === 1 ? ' minute ago' : ' minutes ago');
  var hrs = Math.round(mins/60);
  if (hrs < 24)    return hrs + (hrs === 1 ? ' hour ago' : ' hours ago');
  var days = Math.round(hrs/24);
  return days + (days === 1 ? ' day ago' : ' days ago');
}

function esc(s){
  return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
  });
}

function showError(title, body){
  document.getElementById('loading').style.display = 'none';
  document.getElementById('content').style.display = 'none';
  var box = document.getElementById('error-box');
  box.style.display = 'block';
  box.innerHTML =
    '<div class="pnl"><div class="pnl-b empty">' +
      '<div style="font-size:16px;color:#fff;margin-bottom:8px;">' + esc(title) + '</div>' +
      '<div>' + esc(body) + '</div>' +
    '</div></div>';
  document.getElementById('company-name').textContent = 'Lunima Guard';
  document.getElementById('sub-line').textContent = '';
  document.getElementById('soc-label').textContent = 'Not connected';
}

function load(){
  var t = token();
  if(!t){
    showError('No status link provided',
      'Open the private link we sent you, or call 647-552-3894 and we will resend it.');
    return;
  }

  fetch('/api/status?token=' + encodeURIComponent(t))
    .then(function(r){ return r.json().then(function(d){ return {ok:r.ok, d:d}; }); })
    .then(function(res){
      if(!res.ok || res.d.error){
        if(res.d.error === 'not_found'){
          showError('This status link is no longer active',
            'Call 647-552-3894 and we will sort it out right away.');
        } else if (res.d.error === 'huntress_unreachable'){
          showError('Cannot reach the monitoring platform right now',
            'Your protection is unaffected — this page will recover shortly. Try Refresh in a minute.');
        } else {
          showError('Something went wrong', res.d.error || 'Please try Refresh.');
        }
        return;
      }
      render(res.d);
    })
    .catch(function(){
      showError('Could not load your status',
        'Check your connection and press Refresh. Your monitoring is unaffected.');
    });
}

function render(d){
  document.getElementById('loading').style.display = 'none';
  document.getElementById('error-box').style.display = 'none';
  document.getElementById('content').style.display = 'block';

  var online = d.agents.filter(function(a){ return a.online; });
  var openInc = d.incidents.filter(function(i){
    return i.status !== 'closed' && i.status !== 'dismissed';
  });

  document.getElementById('company-name').textContent = d.company;
  document.getElementById('sub-line').textContent =
    d.plan + ' · ' + d.agents.length + (d.agents.length === 1 ? ' machine' : ' machines') + ' monitored';
  document.getElementById('soc-label').textContent = 'SOC active';

  document.getElementById('stat-online').textContent = online.length;
  document.getElementById('stat-total').textContent  = ' / ' + d.agents.length;
  document.getElementById('stat-online-d').textContent =
    online.length === d.agents.length ? 'All machines reporting' :
    (d.agents.length - online.length) + ' not checked in recently';

  document.getElementById('stat-open-n').textContent = openInc.length;
  document.getElementById('stat-open-n').className = 'n' + (openInc.length ? ' warn' : '');
  document.getElementById('stat-open-d').textContent =
    openInc.length === 0 ? 'Nothing needs your attention' : 'We are on it — no action needed from you';

  document.getElementById('stat-reviewed').textContent = d.incidents.length;

  document.getElementById('kv-plan').textContent    = d.plan;
  document.getElementById('kv-contact').textContent = d.contact;
  document.getElementById('kv-phone').textContent   = d.phone;
  document.getElementById('kv-updated').textContent = timeAgo(d.fetchedAt);

  // incidents
  var il = document.getElementById('incident-list');
  if(!d.incidents.length){
    il.innerHTML = '<div class="empty">No security events to report.<br>' +
      'Your systems have been quiet — which is exactly what we want.</div>';
  } else {
    il.innerHTML = d.incidents.slice(0,6).map(function(i){
      var closed = (i.status === 'closed' || i.status === 'dismissed');
      var pill = closed ? '<span class="pill pill-ok">Resolved</span>'
        : (i.severity === 'critical' || i.severity === 'high')
          ? '<span class="pill pill-hot">Active</span>'
          : '<span class="pill pill-warn">Reviewing</span>';
      return '<div class="inc">' +
        '<span class="sev ' + esc(i.severity) + '"></span>' +
        '<div style="flex:1;">' +
          '<div class="inc-t">' + esc(i.subject) + '</div>' +
          '<div class="inc-m">' + timeAgo(i.sentAt) +
            (i.summary ? ' · ' + esc(i.summary).slice(0,140) : '') + '</div>' +
        '</div>' + pill + '</div>';
    }).join('');
  }

  // agents
  document.getElementById('agent-count').textContent =
    online.length + ' of ' + d.agents.length + ' online';

  var rows = document.getElementById('agent-rows');
  if(!d.agents.length){
    rows.innerHTML = '<tr><td colspan="4" class="empty">' +
      'No machines connected yet. Once the agent is installed they appear here within a minute.' +
      '</td></tr>';
  } else {
    rows.innerHTML = d.agents.map(function(a){
      return '<tr>' +
        '<td class="host"><span class="sdot ' + (a.online ? 'up' : 'down') + '"></span>' + esc(a.hostname) + '</td>' +
        '<td>' + esc(a.platform) + '</td>' +
        '<td>' + (a.online ? '<span class="pill pill-ok">Protected</span>'
                           : '<span class="pill pill-warn">Not checked in</span>') + '</td>' +
        '<td>' + timeAgo(a.lastSeen) + '</td>' +
      '</tr>';
    }).join('');
  }
}

function signOut(){
  try { localStorage.removeItem('lunima_code'); } catch(e){}
  location.href = '/';
}

load();
setInterval(load, 300000); // refresh every 5 minutes
</script>
</body>
</html>
