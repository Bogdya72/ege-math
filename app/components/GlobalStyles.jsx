import React from 'react';

export const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Caveat:wght@500;600&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      /* Premium Dark Theme */
      --bg: #030304;
      --bg2: #0a0a0c;
      --s: #141419;
      --s2: #1c1c24;
      
      --b: rgba(255,255,255,0.06);
      --b2: rgba(255,255,255,0.1);
      
      --t: #ededf0;
      --t2: #9494a0;
      --t3: #585866;
      
      /* Accents - more refined */
      --blue: #3b82f6;
      --vio: #8b5cf6;
      --grn: #10b981;
      --red: #ef4444;
      --gold: #f59e0b;
      --teal: #14b8a6;
      
      --r: 16px;
      --rs: 10px;
    }
    html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
    body{
      font-family:'Inter',sans-serif;
      background:var(--bg);
      color:var(--t);
      line-height:1.6;
      overflow-x:hidden;
      background-image: radial-gradient(circle at 50% 0%, #1a1a2e 0%, transparent 40%);
    }
    ::-webkit-scrollbar{width:6px}
    ::-webkit-scrollbar-track{background:transparent}
    ::-webkit-scrollbar-thumb{background:var(--s2);border-radius:3px}
    ::-webkit-scrollbar-thumb:hover{background:var(--t3)}

    h1,h2,h3,h4{font-family:'Syne',sans-serif;letter-spacing:-.02em;color:#fff}
    
    button{cursor:pointer;border:none;outline:none;font-family:inherit;-webkit-tap-highlight-color:transparent}
    a{-webkit-tap-highlight-color:transparent;text-decoration:none}

    /* Animations */
    @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes scaleIn{from{opacity:0;transform:scale(0.96)}to{opacity:1;transform:scale(1)}}
    
    .fu{animation:fadeUp .5s cubic-bezier(0.2,0.8,0.2,1) both}
    .fi{animation:fadeIn .3s ease both}
    .pop{animation:scaleIn .4s cubic-bezier(0.2,0.8,0.2,1) both}

    /* Cards with Glassmorphism feel */
    .card{
      background: rgba(20, 20, 25, 0.6);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid var(--b);
      border-radius: var(--r);
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    }
    
    .grad{
      background: linear-gradient(135deg, #60a5fa, #a78bfa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Premium Buttons */
    .btn{
      background: #fff;
      color: #000;
      border-radius: var(--rs);
      padding: 12px 24px;
      font-size: 0.95rem;
      font-weight: 600;
      font-family: 'Inter', sans-serif;
      transition: all 0.2s cubic-bezier(0.2,0.8,0.2,1);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 48px;
      touch-action: manipulation;
      box-shadow: 0 2px 10px rgba(255,255,255,0.1);
    }
    .btn:hover{
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(255,255,255,0.2);
    }
    .btn:active{transform:scale(0.96)}
    
    .btn-sec{
      background: rgba(255,255,255,0.05);
      color: #fff;
      border: 1px solid rgba(255,255,255,0.1);
    }
    .btn-sec:hover{
      background: rgba(255,255,255,0.1);
      border-color: rgba(255,255,255,0.2);
    }

    .bg{
      background: var(--s);
      border: 1px solid var(--b2);
      color: var(--t2);
      border-radius: var(--rs);
      padding: 8px 16px;
      font-size: 0.85rem;
      transition: all 0.2s;
      min-height: 40px;
    }
    .bg:hover{border-color:var(--t3);color:var(--t)}

    /* Modern Input */
    input[type=number]{
      -moz-appearance: textfield;
      background: rgba(0,0,0,0.2);
      border: 1px solid var(--b2);
      border-radius: var(--rs);
      color: #fff;
      font-family: 'JetBrains Mono', monospace;
      font-size: 1.1rem;
      padding: 12px 16px;
      outline: none;
      width: 100%;
      transition: all 0.2s;
      min-height: 48px;
    }
    input[type=number]:focus{
      border-color: var(--blue);
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
      background: rgba(0,0,0,0.4);
    }

    /* Progress Bar */
    .pt{height:6px;border-radius:3px;background:rgba(255,255,255,0.08);overflow:hidden}
    .pf{height:100%;border-radius:3px;background:linear-gradient(90deg,var(--blue),var(--vio));transition:width 0.6s cubic-bezier(0.2,0.8,0.2,1)}

    /* Confetti */
    .conf{position:fixed;border-radius:2px;pointer-events:none;z-index:9997;animation:fall 2.5s ease-in forwards}

    /* Callouts */
    .co{border-radius:var(--rs);padding:14px 18px;margin:12px 0;border:1px solid rgba(255,255,255,0.05);font-size:0.9rem;line-height:1.6;background:rgba(255,255,255,0.02)}
    
    /* Formula Block */
    .f{
      background: rgba(0,0,0,0.3);
      border: 1px solid var(--b2);
      border-left: 3px solid var(--blue);
      border-radius: 4px;
      padding: 12px 16px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.9rem;
      color: #bfdbfe;
      margin: 8px 0;
    }

    /* ── NOTEBOOK (Updated) ── */
    .nb{
      background-color: #fdfcf4;
      background-image:
        linear-gradient(rgba(176,200,240,.4) 1px,transparent 1px),
        linear-gradient(90deg,rgba(176,200,240,.4) 1px,transparent 1px);
      background-size: 24px 24px;
      border-radius: 16px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.5);
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.1);
    }

    /* ── SCRATCHPAD (Clean) ── */
    .sp-outer{
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 50px rgba(0,0,0,0.4);
      border: 1px solid rgba(255,255,255,0.1);
      background: #1a1a20;
    }
    .sp-bar{
      background: #252530;
      border-bottom: 1px solid rgba(255,255,255,0.05);
      padding: 10px 14px;
      display: flex;
      align-items: center;
      gap: 8px;
      overflow-x: auto;
    }
    .sp-btn{
      padding: 8px 12px;
      border-radius: 8px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.05);
      color: #a0a0b0;
      font-size: 0.85rem;
      font-weight: 500;
      transition: all 0.2s;
    }
    .sp-btn:hover{background:rgba(255,255,255,0.08);color:#fff}
    .sp-btn.act{background:var(--blue);border-color:var(--blue);color:#fff;box-shadow:0 4px 12px rgba(59,130,246,0.3)}
    
    .sp-viewport {
      width: 100%;
      height: 60vh; /* Taller by default */
      overflow: hidden;
      position: relative;
      background: #fdfcf4;
      cursor: grab;
      touch-action: none; /* We handle touches manually */
    }
    .sp-viewport:active { cursor: grabbing; }

    /* Grids */
    .sg{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px}
    .tg{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px}

    /* Tags */
    .tag{display:inline-flex;align-items:center;gap:4px;font-size:.7rem;font-weight:500;padding:4px 10px;border-radius:20px;letter-spacing:0.02em}
    .tag-src{background:rgba(20,184,166,0.15);color:#2dd4bf}
    .tag-ok{background:rgba(16,185,129,0.15);color:#34d399}
    .tag-pend{background:rgba(255,255,255,0.08);color:var(--t2)}

    /* Desktop */
    @media(min-width:768px){
      .btn{padding:14px 32px;font-size:1rem}
      .nb-body{padding:24px 24px 24px 64px}
    }
  `}</style>
);
