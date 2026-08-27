// Drawn browser/dashboard mockups — fallback for future projects without a screenshot.
// Extracted verbatim from the original index.html.

export function browserMock(kind){
  const map={
    apex:{url:"apex · one call. every home service.",title:"Every home<br>service.",accent:"var(--lime)",chips:["Cleaning","Lawn","Pool","Smart Home","+7"]},
    jfam:{url:"jfam.co.in · design &amp; build",title:"Interior<br>&amp; build.",accent:"var(--cream)",chips:["Interiors","Architecture","Automation"]},
    aronix:{url:"aronixwebtech.com · build smarter",title:"Build smarter.<br>Grow faster.",accent:"var(--violet)",chips:["Web","AI / ML","IoT","Cloud"]}
  };
  const d=map[kind]||map.apex;
  const chips=d.chips.map(c=>`<span class="mk-chip">${c}</span>`).join('');
  return `<div class="browser">
    <div class="bar"><i></i><i></i><i></i><span class="url">${d.url}</span></div>
    <div class="body">
      <div class="mk mk-h" style="font-size:clamp(20px,3.4vw,40px);color:${d.accent}">${d.title}</div>
      <div class="mk" style="left:8%;bottom:16%;display:flex;gap:8px;flex-wrap:wrap;max-width:70%">${chips}</div>
      <div class="mk mk-card" style="right:7%;top:22%;width:34%;height:44%"></div>
      <div class="mk mk-card" style="right:7%;bottom:14%;width:34%;height:22%"></div>
    </div></div>`;
}
export function dashboardMock(){
  let rows='';for(let i=0;i<5;i++){rows+=`<div style="height:9px;border-radius:3px;background:rgba(255,255,255,.05);margin:9px 0;width:${70-i*8}%"></div>`;}
  let bars='';for(let i=0;i<7;i++){const h=25+Math.round(Math.random()*60);bars+=`<div style="width:9%;height:${h}%;background:${i===4?'var(--lime)':'rgba(255,255,255,.14)'};border-radius:2px 2px 0 0"></div>`;}
  return `<div class="browser">
    <div class="bar"><i></i><i></i><i></i><span class="url">fresh breath therapy · dashboard</span></div>
    <div class="body" style="display:flex">
      <div style="width:26%;border-right:1px solid var(--line);padding:16px 12px">
        <div style="width:60%;height:8px;background:var(--lime);border-radius:3px;margin-bottom:16px"></div>${rows}
      </div>
      <div style="flex:1;padding:16px">
        <div style="display:flex;gap:8px;margin-bottom:14px">
          <div class="mk-card" style="flex:1;height:46px"></div><div class="mk-card" style="flex:1;height:46px"></div><div class="mk-card" style="flex:1;height:46px"></div>
        </div>
        <div class="mk-card" style="height:52%;display:flex;align-items:flex-end;gap:6px;padding:12px">${bars}</div>
      </div>
    </div></div>`;
}

// Projects that have a real screenshot in /public/images
export const SHOTS = ['apex', 'jfam', 'aronix', 'fresh'];

export function mockInnerHTML(kind) {
  if (SHOTS.includes(kind)) return '<img class="shot" src="/images/' + kind + '.jpg" alt="' + kind + ' project screenshot" loading="lazy">';
  if (kind === 'fresh') return dashboardMock();
  return browserMock(kind);
}
