import React from 'react';

export const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Caveat:wght@500;600&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      --bg:#09090f;--bg2:#111118;--s:#1e1e2e;--s2:#252535;
      --b:rgba(255,255,255,.07);--b2:rgba(255,255,255,.13);
      --t:#e2e4f0;--t2:#8890b0;--t3:#4a5070;
      --blue:#5b8eff;--vio:#9b6dff;--grn:#3ddc97;
      --red:#ff5a5a;--gold:#ffb547;--teal:#2dd4bf;
      --r:12px;--rs:8px;
    }
    html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
    body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--t);line-height:1.6;overflow-x:hidden}
    ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:var(--s2);border-radius:2px}
    h1,h2,h3,h4{font-family:'Syne',sans-serif;letter-spacing:-.02em}
    button{cursor:pointer;border:none;outline:none;font-family:inherit;-webkit-tap-highlight-color:transparent}
    a{-webkit-tap-highlight-color:transparent}

    @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes pop{0%{transform:scale(.9);opacity:0}100%{transform:scale(1);opacity:1}}
    @keyframes fall{to{transform:translateY(110vh) rotate(540deg);opacity:0}}
    @keyframes shake{0%,100%{transform:translateX(0)}30%{transform:translateX(-6px)}70%{transform:translateX(6px)}}
    .fu{animation:fadeUp .4s ease both}
    .fi{animation:fadeIn .28s ease both}
    .pop{animation:pop .32s cubic-bezier(.34,1.56,.64,1) both}
    .shake{animation:shake .35s ease}

    .card{background:var(--s);border:1px solid var(--b);border-radius:var(--r)}
    .grad{background:linear-gradient(135deg,var(--blue),var(--vio));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

    /* buttons */
    .btn{background:linear-gradient(135deg,var(--blue),var(--vio));color:#fff;border-radius:var(--rs);
      padding:13px 24px;font-size:.95rem;font-weight:600;font-family:'Inter',sans-serif;
      transition:transform .15s,box-shadow .15s,filter .15s;display:inline-flex;align-items:center;justify-content:center;
      min-height:48px;touch-action:manipulation}
    .btn:hover{transform:translateY(-1px);box-shadow:0 6px 22px rgba(91,142,255,.38);filter:brightness(1.07)}
    .btn:active{transform:scale(.97)}
    .btn:disabled{opacity:.38;pointer-events:none}
    .bg{background:var(--s);border:1px solid var(--b2);color:var(--t2);border-radius:var(--rs);
      padding:10px 16px;font-size:.82rem;transition:all .15s;min-height:40px;touch-action:manipulation}
    .bg:active{opacity:.7}

    /* input */
    input[type=number]{-moz-appearance:textfield;background:var(--bg2);border:1.5px solid var(--b2);
      border-radius:var(--rs);color:var(--t);font-family:'JetBrains Mono',monospace;
      font-size:1.1rem;padding:13px 16px;outline:none;width:100%;
      transition:border-color .2s,box-shadow .2s;min-height:48px}
    input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none}
    input[type=number]:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(91,142,255,.14)}

    /* progress */
    .pt{height:5px;border-radius:3px;background:var(--s2);overflow:hidden}
    .pf{height:100%;border-radius:3px;background:linear-gradient(90deg,var(--blue),var(--vio));transition:width .5s cubic-bezier(.34,1.56,.64,1)}

    /* confetti */
    .conf{position:fixed;border-radius:2px;pointer-events:none;z-index:9997;animation:fall 2.5s ease-in forwards}

    /* callouts */
    .co{border-radius:var(--rs);padding:12px 15px;margin:8px 0;border:1px solid;font-size:.86rem;line-height:1.65}
    .cb{background:rgba(91,142,255,.07);border-color:rgba(91,142,255,.28);color:#aac4ff}
    .cg{background:rgba(61,220,151,.07);border-color:rgba(61,220,151,.28);color:#7dffc9}
    .cr{background:rgba(255,90,90,.07);border-color:rgba(255,90,90,.28);color:#ffaaaa}
    .cy{background:rgba(255,181,71,.07);border-color:rgba(255,181,71,.28);color:#ffd080}

    /* formula block */
    .f{background:var(--bg2);border:1px solid var(--b2);border-left:3px solid var(--blue);
      border-radius:0 var(--rs) var(--rs) 0;padding:9px 14px;
      font-family:'JetBrains Mono',monospace;font-size:.85rem;color:#90b8ff;margin:6px 0}

    /* ── NOTEBOOK (клетка) ── */
    .nb{
      background-color:#fdfcf4;
      background-image:
        linear-gradient(rgba(176,200,240,.55) 1px,transparent 1px),
        linear-gradient(90deg,rgba(176,200,240,.55) 1px,transparent 1px);
      background-size:20px 20px;
      border-radius:12px;
      box-shadow:0 4px 28px rgba(0,0,0,.45);
      position:relative;overflow:hidden;
      border:1px solid rgba(200,214,245,.22);
    }
    .nb-holes{
      position:absolute;top:0;bottom:0;left:0;width:40px;
      display:flex;flex-direction:column;justify-content:space-around;align-items:center;
      padding:20px 0;z-index:3;
      background:rgba(253,252,244,.65);
      border-right:1px solid rgba(176,200,240,.4);
    }
    .nb-hole{width:13px;height:13px;border-radius:50%;background:#1a1a2e;border:1px solid rgba(0,0,0,.15);box-shadow:inset 0 1px 2px rgba(0,0,0,.25)}
    .nb-margin{position:absolute;top:0;bottom:0;left:40px;width:1px;background:rgba(240,100,100,.35);z-index:2}
    .nb-body{position:relative;z-index:1;padding:16px 16px 16px 56px}

    /* formula card in theory */
    .fc{
      display:flex;align-items:flex-start;gap:12px;
      background:var(--bg2);border-radius:10px;padding:12px 14px;
      border:1px solid var(--b2);margin-bottom:12px;
    }
    .fc-txt{flex:1;min-width:0}
    .fc-fig{flex:0 0 auto;display:flex;align-items:center}

    /* ── SCRATCHPAD ── */
    .sp-outer{border-radius:12px;overflow:hidden;box-shadow:0 4px 28px rgba(0,0,0,.45);border:1px solid rgba(200,214,245,.22)}
    .sp-bar{
      background:rgba(253,252,244,.98);border-bottom:2px solid rgba(176,200,240,.5);
      padding:8px 10px;display:flex;align-items:center;gap:5px;
      overflow-x:auto;-webkit-overflow-scrolling:touch;flex-wrap:nowrap;
    }
    .sp-bar::-webkit-scrollbar{height:2px}
    .sp-btn{
      padding:7px 11px;border-radius:7px;background:transparent;
      border:1px solid rgba(176,200,240,.5);color:#384060;
      font-size:.8rem;font-family:'Inter',sans-serif;font-weight:500;
      white-space:nowrap;transition:all .12s;
      min-height:34px;min-width:34px;touch-action:manipulation;
      display:flex;align-items:center;justify-content:center;
      -webkit-tap-highlight-color:transparent;
      flex-shrink:0;
    }
    .sp-btn.act{background:var(--blue);border-color:var(--blue);color:#fff}
    .sp-scroll{overflow:auto;-webkit-overflow-scrolling:touch;cursor:crosshair}
    .sp-canvas{display:block;touch-action:none;
      -webkit-user-select:none;user-select:none;
      -webkit-touch-callout:none;
    }

    /* grids */
    .sg{display:grid;grid-template-columns:repeat(2,1fr);gap:9px}
    .tg{display:grid;grid-template-columns:repeat(2,1fr);gap:9px}

    /* problem figure */
    .prob-fig{background:#fdfcf4;border:1px solid rgba(200,214,245,.3);border-radius:10px;overflow:hidden;padding:8px;display:flex;align-items:center;justify-content:center;margin-bottom:14px}

    /* tags */
    .tag{display:inline-flex;align-items:center;gap:3px;font-size:.62rem;
      font-family:'JetBrains Mono',monospace;padding:2px 8px;border-radius:100px;border:1px solid}
    .tag-src{background:rgba(45,212,191,.08);border-color:rgba(45,212,191,.25);color:var(--teal)}
    .tag-ok{background:rgba(61,220,151,.1);border-color:rgba(61,220,151,.22);color:var(--grn)}
    .tag-pend{background:rgba(255,255,255,.04);border-color:var(--b);color:var(--t3)}

    /* nav */
    .nav-inner{display:flex;align-items:center;justify-content:space-between;padding:0 16px;height:56px}

    /* ─── DESKTOP OVERRIDES ─── */
    @media(min-width:640px){
      .sg{grid-template-columns:repeat(auto-fill,minmax(170px,1fr))}
      .tg{grid-template-columns:repeat(auto-fill,minmax(192px,1fr))}
      .nb-body{padding:18px 18px 18px 62px}
      .btn{padding:12px 26px}
    }
    @media(min-width:768px){
      .fc{align-items:center}
    }
  `}</style>
);
