"use client";
import { useState, useEffect, useCallback, useRef } from "react";

/* ═══════════════════════════════════════════════════════════
   GLOBAL STYLES — mobile-first
═══════════════════════════════════════════════════════════ */
const GS = () => (
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

/* ═══════════════════════════════════════════════════════════
   CONFETTI
═══════════════════════════════════════════════════════════ */
const Confetti = ({ t }) => {
  const [p, setP] = useState([]);
  useEffect(() => {
    if (!t) return;
    const c = ["#5b8eff","#9b6dff","#2dd4bf","#ffb547","#3ddc97"];
    setP(Array.from({ length: 36 }, (_, i) => ({ id: i, x: Math.random()*100, col: c[i%c.length], d: Math.random()*.9, sz: 6+Math.random()*7 })));
    const id = setTimeout(() => setP([]), 3000);
    return () => clearTimeout(id);
  }, [t]);
  return <>{p.map(x => <div key={x.id} className="conf" style={{ left:`${x.x}%`, top:-16, width:x.sz, height:x.sz, background:x.col, animationDelay:`${x.d}s` }}/>)}</>;
};

/* ═══════════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════════ */
const Nav = ({ page, setPage, sub, onBack }) => {
  const [sc, setSc] = useState(false);
  useEffect(() => { const h = () => setSc(window.scrollY > 8); window.addEventListener('scroll', h, {passive:true}); return () => window.removeEventListener('scroll', h); }, []);
  return (
    <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:500, background:sc?'rgba(9,9,15,.95)':'transparent', backdropFilter:sc?'blur(20px)':'none', borderBottom:sc?'1px solid var(--b)':'none', transition:'all .25s' }}>
      <div className="nav-inner">
        <button onClick={() => { setPage('home'); onBack(); }} style={{ background:'none', display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:32, height:32, borderRadius:8, background:'linear-gradient(135deg,var(--blue),var(--vio))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:15, color:'#fff', fontFamily:'Syne,sans-serif', fontWeight:700, flexShrink:0 }}>∑</div>
          <div>
            <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.87rem', lineHeight:1.1 }}>ЕГЭ Математика</div>
            <div style={{ fontSize:'.65rem', color:'var(--t3)', fontFamily:'JetBrains Mono,monospace' }}>Профиль · 2026</div>
          </div>
        </button>
        <div style={{ display:'flex', gap:6 }}>
          {page==='task1' && sub && <button className="bg" onClick={onBack} style={{ fontSize:'.78rem', padding:'8px 12px' }}>← Темы</button>}
          {page!=='home' && <button className="bg" onClick={() => { setPage('home'); onBack(); }} style={{ fontSize:'.78rem', padding:'8px 12px' }}>Все задания</button>}
        </div>
      </div>
    </nav>
  );
};

/* ═══════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════ */
const Hero = ({ onScroll }) => (
  <section style={{ minHeight:'100svh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'80px 20px 60px', position:'relative', overflow:'hidden', textAlign:'center' }}>
    <div style={{ position:'absolute', width:'min(600px,130vw)', height:'min(600px,130vw)', borderRadius:'50%', top:'-10%', left:'5%', pointerEvents:'none', background:'radial-gradient(circle,rgba(91,142,255,.12) 0%,transparent 70%)' }}/>
    <div style={{ position:'absolute', width:'min(400px,90vw)', height:'min(400px,90vw)', borderRadius:'50%', bottom:0, right:'5%', pointerEvents:'none', background:'radial-gradient(circle,rgba(155,109,255,.09) 0%,transparent 70%)' }}/>
    <div style={{ position:'absolute', inset:0, opacity:.025, pointerEvents:'none', backgroundImage:'linear-gradient(var(--t) 1px,transparent 1px),linear-gradient(90deg,var(--t) 1px,transparent 1px)', backgroundSize:'40px 40px' }}/>

    <div className="fu" style={{ animationDelay:'.08s', marginBottom:18 }}>
      <span style={{ background:'rgba(91,142,255,.1)', border:'1px solid rgba(91,142,255,.25)', color:'var(--blue)', borderRadius:100, padding:'6px 14px', fontSize:'.72rem', fontFamily:'JetBrains Mono,monospace', letterSpacing:'.08em', textTransform:'uppercase' }}>🎯 ФИПИ 2026 · Профильный уровень</span>
    </div>
    <h1 className="fu" style={{ animationDelay:'.14s', fontSize:'clamp(1.85rem,6vw,4.2rem)', fontWeight:800, maxWidth:740, marginBottom:14, lineHeight:1.08 }}>
      Подготовка к ЕГЭ по <span className="grad">математике</span>
    </h1>
    <p className="fu" style={{ animationDelay:'.22s', color:'var(--t2)', fontSize:'clamp(.9rem,2.2vw,1.08rem)', maxWidth:440, marginBottom:36, lineHeight:1.75 }}>
      19 заданий · Теория с рисунками · Задачи с СдамГИА · Черновик в клетку
    </p>
    <div className="fu" style={{ animationDelay:'.3s', display:'flex', gap:10, flexWrap:'wrap', justifyContent:'center' }}>
      <button className="btn" onClick={onScroll}>Начать подготовку →</button>
      <a href="#tasks" style={{ background:'var(--s)', border:'1px solid var(--b2)', color:'var(--t2)', borderRadius:'var(--rs)', padding:'13px 20px', fontSize:'.9rem', textDecoration:'none', minHeight:48, display:'flex', alignItems:'center' }}>Все задания</a>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════
   19 TASKS GRID
═══════════════════════════════════════════════════════════ */
const ALL_TASKS = [
  {n:1,topic:'Планиметрия',sub:'Треугольники, четырёхугольники, окружности',ready:true,icon:'△',pts:1},
  {n:2,topic:'Векторы',sub:'Координаты, скалярное произведение',ready:false,icon:'→',pts:1},
  {n:3,topic:'Стереометрия (базовая)',sub:'Объём и площадь поверхности тел',ready:false,icon:'⬡',pts:1},
  {n:4,topic:'Вероятность — базовая',sub:'Классическая вероятность',ready:false,icon:'🎲',pts:1},
  {n:5,topic:'Вероятность — теоремы',sub:'Сложение и умножение',ready:false,icon:'∩',pts:1},
  {n:6,topic:'Простейшие уравнения',sub:'Квадратные, дробные, иррациональные',ready:false,icon:'=',pts:1},
  {n:7,topic:'Вычисления и преобразования',sub:'Степени, корни, логарифмы',ready:false,icon:'√',pts:1},
  {n:8,topic:'Производная и первообразная',sub:'Производная, касательная, интеграл',ready:false,icon:'∂',pts:1},
  {n:9,topic:'Прикладные задачи',sub:'Физические зависимости, скорость',ready:false,icon:'⚙',pts:1},
  {n:10,topic:'Текстовые задачи',sub:'Движение, работа, смеси, проценты',ready:false,icon:'📝',pts:1},
  {n:11,topic:'Функции / анализ графика',sub:'Чтение графиков, свойства',ready:false,icon:'📈',pts:1},
  {n:12,topic:'Исследование функций',sub:'Экстремумы, монотонность',ready:false,icon:'🔬',pts:1},
  {n:13,topic:'Уравнения (сложные)',sub:'Тригонометрические, показательные',ready:false,icon:'≡',pts:2},
  {n:14,topic:'Стереометрическая задача',sub:'Углы и расстояния в пространстве',ready:false,icon:'📦',pts:3},
  {n:15,topic:'Неравенства',sub:'Все типы неравенств и систем',ready:false,icon:'<',pts:2},
  {n:16,topic:'Финансовая математика',sub:'Вклады, кредиты, аннуитеты',ready:false,icon:'💰',pts:2},
  {n:17,topic:'Планиметрическая задача',sub:'Сложная геометрия плоскости',ready:false,icon:'🔷',pts:3},
  {n:18,topic:'Параметры',sub:'Уравнения с параметром',ready:false,icon:'α',pts:4},
  {n:19,topic:'Числа и их свойства',sub:'Делимость, НОД, НОК',ready:false,icon:'ℕ',pts:4},
];

const TasksGrid = ({ onSelect }) => (
  <section id="tasks" style={{ padding:'48px 16px 72px', maxWidth:1140, margin:'0 auto' }}>
    <div className="fu" style={{ marginBottom:28 }}>
      <div style={{ color:'var(--blue)', fontSize:'.66rem', fontFamily:'JetBrains Mono,monospace', letterSpacing:'.14em', textTransform:'uppercase', marginBottom:6 }}>ФИПИ 2026</div>
      <h2 style={{ fontSize:'clamp(1.4rem,3.5vw,2rem)', marginBottom:6 }}>Все 19 заданий</h2>
      <p style={{ color:'var(--t2)', maxWidth:440, fontSize:'.85rem' }}>Задание №1 доступно — задачи из банка СдамГИА с рисунками.</p>
    </div>
    {[{label:'Часть 1 · 1–12 · Краткий ответ',from:1,to:12},{label:'Часть 2 · 13–19 · Развёрнутый ответ',from:13,to:19}].map(({label,from,to})=>(
      <div key={label} style={{ marginBottom:28 }}>
        <div style={{ color:'var(--t3)', fontSize:'.66rem', fontFamily:'JetBrains Mono,monospace', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:10, paddingBottom:8, borderBottom:'1px solid var(--b)' }}>{label}</div>
        <div className="tg">
          {ALL_TASKS.filter(t=>t.n>=from&&t.n<=to).map((t,i)=>(
            <button key={t.n} onClick={()=>t.ready&&onSelect(t.n)} disabled={!t.ready} className="card" style={{ padding:'14px 12px', textAlign:'left', cursor:t.ready?'pointer':'default', opacity:t.ready?1:.45, animation:`fadeUp .38s ease both ${.035*i+.05}s`, position:'relative', overflow:'hidden', borderColor:t.ready?'rgba(91,142,255,.22)':'var(--b)', transition:'all .2s', touchAction:'manipulation', minHeight:0 }}>
              {t.ready&&<div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg,var(--blue),var(--vio))' }}/>}
              <div style={{ fontSize:'1.1rem', marginBottom:5 }}>{t.icon}</div>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:2 }}>
                <span style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.8rem' }}>№{t.n}</span>
                <span style={{ fontSize:'.58rem', fontFamily:'JetBrains Mono,monospace', color:'var(--t3)', background:'var(--bg2)', border:'1px solid var(--b)', borderRadius:4, padding:'1px 5px' }}>{t.pts}б</span>
              </div>
              <div style={{ fontFamily:'Syne,sans-serif', fontWeight:600, fontSize:'.76rem', marginBottom:2 }}>{t.topic}</div>
              <div style={{ color:'var(--t3)', fontSize:'.65rem', lineHeight:1.35, marginBottom:8 }}>{t.sub}</div>
              <div className={`tag ${t.ready?'tag-ok':'tag-pend'}`}>{t.ready?'● Доступно':'◌ Скоро'}</div>
            </button>
          ))}
        </div>
      </div>
    ))}
  </section>
);

/* ═══════════════════════════════════════════════════════════
   MINI SVG FIGURES для теории (по формуле)
═══════════════════════════════════════════════════════════ */
const MF = {
  pyth: (
    <svg width="80" height="70" viewBox="0 0 80 70">
      <polygon points="8,62 8,10 64,62" fill="#e8f0ff" stroke="#5b8eff" strokeWidth="1.5"/>
      <rect x="8" y="51" width="10" height="10" fill="none" stroke="#5b8eff" strokeWidth="1.2"/>
      <text x="2" y="39" fill="#ff5a5a" fontSize="10" fontFamily="Caveat,cursive" fontWeight="600">a</text>
      <text x="30" y="68" fill="#ff5a5a" fontSize="10" fontFamily="Caveat,cursive" fontWeight="600">b</text>
      <text x="32" y="36" fill="#9b6dff" fontSize="10" fontFamily="Caveat,cursive" fontWeight="600">c</text>
    </svg>
  ),
  sincos: (
    <svg width="80" height="70" viewBox="0 0 80 70">
      <polygon points="8,62 8,10 64,62" fill="#f0e8ff" stroke="#9b6dff" strokeWidth="1.5"/>
      <rect x="8" y="51" width="10" height="10" fill="none" stroke="#9b6dff" strokeWidth="1.2"/>
      <path d="M 22,62 A 14,14 0 0,1 8,48" fill="none" stroke="#ffb547" strokeWidth="1.5"/>
      <text x="20" y="59" fill="#ffb547" fontSize="9" fontFamily="Caveat,cursive">A</text>
      <text x="2" y="39" fill="#ff5a5a" fontSize="10" fontFamily="Caveat,cursive">a</text>
      <text x="30" y="68" fill="#ff5a5a" fontSize="10" fontFamily="Caveat,cursive">b</text>
      <text x="31" y="36" fill="#9b6dff" fontSize="10" fontFamily="Caveat,cursive">c</text>
    </svg>
  ),
  area_right: (
    <svg width="80" height="70" viewBox="0 0 80 70">
      <polygon points="8,62 8,10 64,62" fill="rgba(61,220,151,.2)" stroke="#3ddc97" strokeWidth="1.5"/>
      <rect x="8" y="51" width="10" height="10" fill="none" stroke="#3ddc97" strokeWidth="1.2"/>
      <text x="2" y="39" fill="#3ddc97" fontSize="10" fontFamily="Caveat,cursive" fontWeight="600">a</text>
      <text x="30" y="68" fill="#3ddc97" fontSize="10" fontFamily="Caveat,cursive" fontWeight="600">b</text>
      <text x="30" y="42" fill="#3ddc97" fontSize="11" fontFamily="Caveat,cursive" fontWeight="700">S</text>
    </svg>
  ),
  median_hyp: (
    <svg width="80" height="70" viewBox="0 0 80 70">
      <polygon points="8,62 8,10 64,62" fill="#e8f0ff" stroke="#5b8eff" strokeWidth="1.5"/>
      <rect x="8" y="51" width="10" height="10" fill="none" stroke="#5b8eff" strokeWidth="1.2"/>
      <line x1="8" y1="10" x2="36" y2="62" stroke="#ff5a5a" strokeWidth="1.5" strokeDasharray="3,2"/>
      <circle cx="36" cy="62" r="2.5" fill="#ff5a5a"/>
      <text x="14" y="44" fill="#ff5a5a" fontSize="9" fontFamily="Caveat,cursive">m=c/2</text>
    </svg>
  ),
  iso_angles: (
    <svg width="80" height="72" viewBox="0 0 80 72">
      <polygon points="40,8 10,66 70,66" fill="#f0e8ff" stroke="#9b6dff" strokeWidth="1.5"/>
      <line x1="25" y1="36" x2="29" y2="40" stroke="#9b6dff" strokeWidth="1.5"/>
      <line x1="55" y1="36" x2="51" y2="40" stroke="#9b6dff" strokeWidth="1.5"/>
      <path d="M 34,22 A 10,10 0 0,1 46,22" fill="none" stroke="#ffb547" strokeWidth="1.5"/>
      <text x="35" y="36" fill="#ffb547" fontSize="9" fontFamily="Caveat,cursive">α</text>
      <path d="M 16,66 A 9,9 0 0,1 10,57" fill="none" stroke="#ff5a5a" strokeWidth="1.4"/>
      <path d="M 64,66 A 9,9 0 0,0 70,57" fill="none" stroke="#ff5a5a" strokeWidth="1.4"/>
      <text x="5" y="62" fill="#ff5a5a" fontSize="8" fontFamily="Caveat,cursive">β</text>
      <text x="62" y="62" fill="#ff5a5a" fontSize="8" fontFamily="Caveat,cursive">β</text>
    </svg>
  ),
  iso_height: (
    <svg width="80" height="72" viewBox="0 0 80 72">
      <polygon points="40,8 10,66 70,66" fill="#f0e8ff" stroke="#9b6dff" strokeWidth="1.5"/>
      <line x1="40" y1="8" x2="40" y2="66" stroke="#ff5a5a" strokeWidth="1.5" strokeDasharray="3,2"/>
      <rect x="40" y="57" width="8" height="8" fill="none" stroke="#ff5a5a" strokeWidth="1.1"/>
      <text x="43" y="42" fill="#ff5a5a" fontSize="10" fontFamily="Caveat,cursive">h</text>
      <text x="22" y="68" fill="#9b6dff" fontSize="9" fontFamily="Caveat,cursive">b</text>
      <text x="52" y="68" fill="#9b6dff" fontSize="9" fontFamily="Caveat,cursive">b</text>
    </svg>
  ),
  angle_sum: (
    <svg width="80" height="70" viewBox="0 0 80 70">
      <polygon points="20,62 60,8 72,62" fill="#e8f4ff" stroke="#5b8eff" strokeWidth="1.5"/>
      <path d="M 27,62 A 8,8 0 0,1 20,54" fill="none" stroke="#ffb547" strokeWidth="1.4"/>
      <path d="M 58,20 A 9,9 0 0,1 66,16" fill="none" stroke="#9b6dff" strokeWidth="1.4"/>
      <path d="M 64,62 A 8,8 0 0,0 72,54" fill="none" stroke="#3ddc97" strokeWidth="1.4"/>
      <text x="11" y="50" fill="#5b8eff" fontSize="8" fontFamily="Caveat,cursive" fontWeight="600">180°</text>
    </svg>
  ),
  ext_angle: (
    <svg width="80" height="70" viewBox="0 0 80 70">
      <polygon points="15,62 50,10 72,62" fill="#e8f4ff" stroke="#5b8eff" strokeWidth="1.5"/>
      <line x1="15" y1="62" x2="0" y2="62" stroke="#ff5a5a" strokeWidth="1.5"/>
      <path d="M 12,62 A 11,11 0 0,0 15,51" fill="none" stroke="#ff5a5a" strokeWidth="1.5"/>
      <text x="0" y="56" fill="#ff5a5a" fontSize="8" fontFamily="Caveat,cursive">внеш.</text>
      <text x="2" y="46" fill="#ff5a5a" fontSize="7" fontFamily="Caveat,cursive">=A+B</text>
    </svg>
  ),
  area_sin: (
    <svg width="80" height="70" viewBox="0 0 80 70">
      <polygon points="10,62 52,8 72,62" fill="rgba(61,220,151,.2)" stroke="#3ddc97" strokeWidth="1.5"/>
      <path d="M 62,62 A 12,12 0 0,0 72,50" fill="none" stroke="#ffb547" strokeWidth="1.4"/>
      <text x="55" y="58" fill="#ffb547" fontSize="9" fontFamily="Caveat,cursive">C</text>
      <text x="18" y="40" fill="#3ddc97" fontSize="9" fontFamily="Caveat,cursive">b</text>
      <text x="52" y="40" fill="#3ddc97" fontSize="9" fontFamily="Caveat,cursive">a</text>
      <text x="36" y="55" fill="#3ddc97" fontSize="11" fontFamily="Caveat,cursive" fontWeight="700">S</text>
    </svg>
  ),
  par_area: (
    <svg width="80" height="70" viewBox="0 0 80 70">
      <polygon points="12,62 24,12 68,12 56,62" fill="rgba(61,220,151,.15)" stroke="#3ddc97" strokeWidth="1.5"/>
      <line x1="24" y1="12" x2="24" y2="62" stroke="#ff5a5a" strokeWidth="1.4" strokeDasharray="3,2"/>
      <rect x="24" y="53" width="8" height="8" fill="none" stroke="#ff5a5a" strokeWidth="1.1"/>
      <text x="26" y="40" fill="#ff5a5a" fontSize="10" fontFamily="Caveat,cursive">h</text>
      <text x="30" y="68" fill="#3ddc97" fontSize="10" fontFamily="Caveat,cursive">a</text>
    </svg>
  ),
  rhombus: (
    <svg width="80" height="70" viewBox="0 0 80 70">
      <polygon points="40,6 72,35 40,64 8,35" fill="rgba(91,142,255,.1)" stroke="#5b8eff" strokeWidth="1.5"/>
      <line x1="8" y1="35" x2="72" y2="35" stroke="#ff5a5a" strokeWidth="1.4" strokeDasharray="3,2"/>
      <line x1="40" y1="6" x2="40" y2="64" stroke="#9b6dff" strokeWidth="1.4" strokeDasharray="3,2"/>
      <rect x="40" y="35" width="7" height="7" fill="none" stroke="#888" strokeWidth="1"/>
      <text x="40" y="32" fill="#9b6dff" fontSize="8" fontFamily="Caveat,cursive">d₂</text>
      <text x="50" y="44" fill="#ff5a5a" fontSize="8" fontFamily="Caveat,cursive">d₁</text>
    </svg>
  ),
  rect_diag: (
    <svg width="80" height="62" viewBox="0 0 80 62">
      <rect x="8" y="10" width="64" height="42" fill="rgba(45,212,191,.1)" stroke="#2dd4bf" strokeWidth="1.5"/>
      <line x1="8" y1="10" x2="72" y2="52" stroke="#ff5a5a" strokeWidth="1.4" strokeDasharray="3,2"/>
      <text x="32" y="36" fill="#ff5a5a" fontSize="9" fontFamily="Caveat,cursive">d</text>
      <text x="28" y="58" fill="#2dd4bf" fontSize="9" fontFamily="Caveat,cursive">a</text>
      <text x="2" y="35" fill="#2dd4bf" fontSize="9" fontFamily="Caveat,cursive">b</text>
    </svg>
  ),
  trap_area: (
    <svg width="80" height="70" viewBox="0 0 80 70">
      <polygon points="16,62 24,14 60,14 68,62" fill="rgba(255,181,71,.15)" stroke="#ffb547" strokeWidth="1.5"/>
      <line x1="30" y1="14" x2="30" y2="62" stroke="#ff5a5a" strokeWidth="1.4" strokeDasharray="3,2"/>
      <rect x="30" y="53" width="8" height="8" fill="none" stroke="#ff5a5a" strokeWidth="1.1"/>
      <text x="32" y="44" fill="#ff5a5a" fontSize="9" fontFamily="Caveat,cursive">h</text>
      <text x="36" y="12" fill="#ffb547" fontSize="9" fontFamily="Caveat,cursive">a</text>
      <text x="36" y="68" fill="#ffb547" fontSize="9" fontFamily="Caveat,cursive">b</text>
    </svg>
  ),
  trap_mid: (
    <svg width="80" height="70" viewBox="0 0 80 70">
      <polygon points="16,62 24,14 60,14 68,62" fill="rgba(255,181,71,.1)" stroke="#ffb547" strokeWidth="1.5"/>
      <line x1="20" y1="38" x2="64" y2="38" stroke="#9b6dff" strokeWidth="2" strokeDasharray="4,2"/>
      <text x="34" y="34" fill="#9b6dff" fontSize="9" fontFamily="Caveat,cursive">m</text>
      <text x="36" y="12" fill="#ffb547" fontSize="9" fontFamily="Caveat,cursive">a</text>
      <text x="36" y="68" fill="#ffb547" fontSize="9" fontFamily="Caveat,cursive">b</text>
    </svg>
  ),
  inscr_angle: (
    <svg width="76" height="76" viewBox="0 0 76 76">
      <circle cx="38" cy="38" r="30" fill="rgba(45,212,191,.08)" stroke="#2dd4bf" strokeWidth="1.5"/>
      <line x1="14" y1="24" x2="62" y2="24" stroke="#5b8eff" strokeWidth="1.5"/>
      <line x1="14" y1="24" x2="38" y2="66" stroke="#9b6dff" strokeWidth="1.5"/>
      <line x1="62" y1="24" x2="38" y2="66" stroke="#9b6dff" strokeWidth="1.5"/>
      <line x1="38" y1="38" x2="14" y2="24" stroke="#ff5a5a" strokeWidth="1" strokeDasharray="2,2"/>
      <line x1="38" y1="38" x2="62" y2="24" stroke="#ff5a5a" strokeWidth="1" strokeDasharray="2,2"/>
      <text x="32" y="63" fill="#9b6dff" fontSize="9" fontFamily="Caveat,cursive">β</text>
      <text x="32" y="48" fill="#ff5a5a" fontSize="8" fontFamily="Caveat,cursive">2β</text>
    </svg>
  ),
  thales: (
    <svg width="76" height="76" viewBox="0 0 76 76">
      <circle cx="38" cy="38" r="30" fill="rgba(45,212,191,.08)" stroke="#2dd4bf" strokeWidth="1.5"/>
      <line x1="8" y1="38" x2="68" y2="38" stroke="#5b8eff" strokeWidth="1.5"/>
      <line x1="8" y1="38" x2="38" y2="66" stroke="#9b6dff" strokeWidth="1.5"/>
      <line x1="68" y1="38" x2="38" y2="66" stroke="#9b6dff" strokeWidth="1.5"/>
      <rect x="32" y="59" width="8" height="8" fill="none" stroke="#ff5a5a" strokeWidth="1.2"/>
      <text x="30" y="73" fill="#9b6dff" fontSize="9" fontFamily="Caveat,cursive">90°!</text>
    </svg>
  ),
  tang_prop: (
    <svg width="76" height="76" viewBox="0 0 76 76">
      <circle cx="32" cy="38" r="22" fill="rgba(255,181,71,.08)" stroke="#ffb547" strokeWidth="1.5"/>
      <circle cx="32" cy="38" r="2" fill="#ffb547"/>
      <circle cx="70" cy="38" r="2.5" fill="#ff5a5a"/>
      <line x1="70" y1="38" x2="46" y2="18" stroke="#9b6dff" strokeWidth="1.5"/>
      <line x1="70" y1="38" x2="46" y2="58" stroke="#9b6dff" strokeWidth="1.5"/>
      <line x1="32" y1="38" x2="46" y2="18" stroke="#ff5a5a" strokeWidth="1" strokeDasharray="2,2"/>
      <text x="72" y="37" fill="#ff5a5a" fontSize="9" fontFamily="Caveat,cursive">M</text>
      <text x="54" y="18" fill="#9b6dff" fontSize="8" fontFamily="Caveat,cursive">t</text>
      <text x="54" y="56" fill="#9b6dff" fontSize="8" fontFamily="Caveat,cursive">t</text>
    </svg>
  ),
  tang_len: (
    <svg width="76" height="76" viewBox="0 0 76 76">
      <circle cx="32" cy="38" r="22" fill="rgba(255,181,71,.08)" stroke="#ffb547" strokeWidth="1.5"/>
      <line x1="70" y1="38" x2="46" y2="18" stroke="#9b6dff" strokeWidth="1.5"/>
      <line x1="32" y1="38" x2="46" y2="18" stroke="#ff5a5a" strokeWidth="1" strokeDasharray="2,2"/>
      <line x1="32" y1="38" x2="70" y2="38" stroke="#3ddc97" strokeWidth="1" strokeDasharray="2,2"/>
      <rect x="42" y="14" width="7" height="7" fill="none" stroke="#ff5a5a" strokeWidth="1" transform="rotate(20,45.5,17.5)"/>
      <text x="22" y="52" fill="#ffb547" fontSize="8" fontFamily="Caveat,cursive">R</text>
      <text x="48" y="44" fill="#3ddc97" fontSize="8" fontFamily="Caveat,cursive">d</text>
      <text x="52" y="22" fill="#9b6dff" fontSize="9" fontFamily="Caveat,cursive">t</text>
    </svg>
  ),
  chord_cross: (
    <svg width="76" height="76" viewBox="0 0 76 76">
      <circle cx="38" cy="38" r="30" fill="rgba(255,181,71,.06)" stroke="#ffb547" strokeWidth="1.5"/>
      <line x1="12" y1="20" x2="65" y2="58" stroke="#5b8eff" strokeWidth="1.5"/>
      <line x1="10" y1="55" x2="68" y2="24" stroke="#9b6dff" strokeWidth="1.5"/>
      <circle cx="38" cy="38" r="2" fill="#ff5a5a"/>
      <text x="25" y="30" fill="#5b8eff" fontSize="8" fontFamily="Caveat,cursive">a</text>
      <text x="50" y="52" fill="#5b8eff" fontSize="8" fontFamily="Caveat,cursive">b</text>
      <text x="20" y="52" fill="#9b6dff" fontSize="8" fontFamily="Caveat,cursive">c</text>
      <text x="50" y="30" fill="#9b6dff" fontSize="8" fontFamily="Caveat,cursive">d</text>
    </svg>
  ),
  incirc: (
    <svg width="76" height="72" viewBox="0 0 76 72">
      <polygon points="38,5 6,67 70,67" fill="rgba(255,138,219,.08)" stroke="#ff8adb" strokeWidth="1.5"/>
      <circle cx="38" cy="47" r="20" fill="none" stroke="#9b6dff" strokeWidth="1.4" strokeDasharray="3,2"/>
      <line x1="38" y1="47" x2="38" y2="67" stroke="#ff5a5a" strokeWidth="1.3" strokeDasharray="2,2"/>
      <rect x="38" y="59" width="7" height="7" fill="none" stroke="#ff5a5a" strokeWidth="1"/>
      <text x="41" y="56" fill="#ff5a5a" fontSize="9" fontFamily="Caveat,cursive">r</text>
    </svg>
  ),
  incirc_right: (
    <svg width="76" height="70" viewBox="0 0 76 70">
      <polygon points="8,62 8,10 62,62" fill="rgba(255,138,219,.08)" stroke="#ff8adb" strokeWidth="1.5"/>
      <rect x="8" y="51" width="10" height="10" fill="none" stroke="#ff8adb" strokeWidth="1.2"/>
      <circle cx="20" cy="50" r="12" fill="none" stroke="#9b6dff" strokeWidth="1.4" strokeDasharray="3,2"/>
      <text x="2" y="34" fill="#ff5a5a" fontSize="9" fontFamily="Caveat,cursive">a</text>
      <text x="28" y="68" fill="#ff5a5a" fontSize="9" fontFamily="Caveat,cursive">b</text>
      <text x="30" y="44" fill="#ff8adb" fontSize="9" fontFamily="Caveat,cursive">c</text>
    </svg>
  ),
  circumcirc: (
    <svg width="76" height="72" viewBox="0 0 76 72">
      <circle cx="38" cy="35" r="30" fill="rgba(61,220,151,.06)" stroke="#3ddc97" strokeWidth="1.5"/>
      <polygon points="38,5 10,62 66,62" fill="rgba(61,220,151,.1)" stroke="#3ddc97" strokeWidth="1.5"/>
      <circle cx="38" cy="35" r="2.5" fill="#3ddc97"/>
      <line x1="38" y1="35" x2="38" y2="5" stroke="#ff5a5a" strokeWidth="1.3" strokeDasharray="2,2"/>
      <text x="40" y="24" fill="#ff5a5a" fontSize="10" fontFamily="Caveat,cursive">R</text>
    </svg>
  ),
  circumcirc_right: (
    <svg width="76" height="70" viewBox="0 0 76 70">
      <polygon points="8,62 8,10 62,62" fill="rgba(61,220,151,.08)" stroke="#3ddc97" strokeWidth="1.5"/>
      <rect x="8" y="51" width="10" height="10" fill="none" stroke="#3ddc97" strokeWidth="1.2"/>
      <circle cx="35" cy="36" r="33" fill="none" stroke="#3ddc97" strokeWidth="1.4" strokeDasharray="4,2" clipPath="url(#clip-right)"/>
      <line x1="8" y1="10" x2="62" y2="62" stroke="#ff5a5a" strokeWidth="1.5" strokeDasharray="3,2"/>
      <circle cx="35" cy="36" r="2" fill="#3ddc97"/>
      <text x="36" y="34" fill="#3ddc97" fontSize="8" fontFamily="Caveat,cursive">O</text>
      <text x="36" y="46" fill="#ff5a5a" fontSize="9" fontFamily="Caveat,cursive">R=c/2</text>
    </svg>
  ),
};

/* ═══════════════════════════════════════════════════════════
   NOTEBOOK EXAMPLE (клетчатый лист)
═══════════════════════════════════════════════════════════ */
const NbExample = ({ condition, figure, steps, answer, color = '#5b8eff' }) => (
  <div className="nb" style={{ margin:'14px 0' }}>
    <div className="nb-holes">{[...Array(5)].map((_,i)=><div key={i} className="nb-hole"/>)}</div>
    <div className="nb-margin"/>
    <div className="nb-body" style={{ fontFamily:'Caveat,cursive' }}>
      {/* условие + рисунок */}
      <div style={{ display:'flex', gap:12, marginBottom:14, flexWrap:'wrap' }}>
        <div style={{ flex:'1 1 160px' }}>
          <div style={{ fontSize:'.58rem', fontFamily:'Inter,sans-serif', fontWeight:600, color, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:5 }}>Условие</div>
          <div style={{ fontSize:'1rem', color:'#1a2040', lineHeight:1.65 }}>{condition}</div>
        </div>
        {figure && (
          <div style={{ flex:'0 0 auto', display:'flex', alignItems:'center', justifyContent:'center' }}>
            {figure}
          </div>
        )}
      </div>
      <div style={{ height:1, background:color, opacity:.2, marginBottom:12, marginLeft:-14 }}/>
      <div style={{ fontSize:'.58rem', fontFamily:'Inter,sans-serif', fontWeight:600, color, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:8 }}>Решение</div>
      {steps.map((step, i) => (
        <div key={i} style={{ display:'flex', gap:10, marginBottom:step.hl?10:5, alignItems:'flex-start' }}>
          <div style={{ flex:'0 0 22px', height:22, borderRadius:'50%', background:step.hl?color:`${color}33`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.68rem', color:step.hl?'#fff':color, fontFamily:'Inter,sans-serif', fontWeight:700, marginTop:2, flexShrink:0 }}>{i+1}</div>
          <div style={{ flex:1, background:step.hl?`${color}14`:'transparent', borderRadius:7, padding:step.hl?'6px 10px':'2px 0', border:step.hl?`1px solid ${color}40`:'none' }}>
            <div style={{ fontSize:'.97rem', color:'#1a2040', lineHeight:1.5 }}>{step.t}</div>
            {step.f && <div style={{ fontSize:'1.08rem', color, fontWeight:600, marginTop:2 }}>{step.f}</div>}
          </div>
        </div>
      ))}
      <div style={{ marginTop:12, display:'inline-flex', alignItems:'center', gap:10, background:`${color}1a`, border:`2px solid ${color}`, borderRadius:9, padding:'7px 16px' }}>
        <span style={{ fontSize:'.95rem', color, fontWeight:600 }}>Ответ:</span>
        <span style={{ fontSize:'1.05rem', color:'#1a2040', fontWeight:700 }}>{answer}</span>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   FORMULA CARD (теория) — каждая формула с мини-рисунком
═══════════════════════════════════════════════════════════ */
const FC = ({ formula, note, fig }) => (
  <div className="fc">
    <div className="fc-txt">
      <div className="f">{formula}</div>
      <div style={{ color:'var(--t2)', fontSize:'.78rem', marginTop:5, lineHeight:1.5 }}>{note}</div>
    </div>
    {fig && <div className="fc-fig">{fig}</div>}
  </div>
);

/* ═══════════════════════════════════════════════════════════
   SCRATCHPAD — клетка, большой, без выделения текста
═══════════════════════════════════════════════════════════ */
const CELL = 20;
const CANVAS_W = 1400;
const CANVAS_H = 700;

const ScratchPad = () => {
  const cvRef = useRef(null);
  const [tool, setTool] = useState('pen');
  const [size, setSize] = useState(2);
  const [color, setColor] = useState('#1a2040');
  const [drawing, setDrawing] = useState(false);
  const [hist, setHist] = useState([]);
  const last = useRef(null);
  const initialized = useRef(false);

  const drawBg = useCallback((ctx) => {
    ctx.fillStyle = '#fdfcf4';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.strokeStyle = 'rgba(176,200,240,.55)';
    ctx.lineWidth = 0.6;
    for (let x = 0; x <= CANVAS_W; x += CELL) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, CANVAS_H); ctx.stroke(); }
    for (let y = 0; y <= CANVAS_H; y += CELL) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(CANVAS_W, y); ctx.stroke(); }
    ctx.strokeStyle = 'rgba(240,100,100,.35)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(40, 0); ctx.lineTo(40, CANVAS_H); ctx.stroke();
  }, []);

  useEffect(() => {
    if (initialized.current) return;
    const cv = cvRef.current;
    if (!cv) return;
    cv.width = CANVAS_W;
    cv.height = CANVAS_H;
    drawBg(cv.getContext('2d'));
    initialized.current = true;
  }, [drawBg]);

  const getXY = (e, cv) => {
    const rect = cv.getBoundingClientRect();
    // scale for css vs physical pixels
    const scaleX = cv.width / rect.width;
    const scaleY = cv.height / rect.height;
    const src = e.touches ? e.touches[0] : e;
    return { x: (src.clientX - rect.left) * scaleX, y: (src.clientY - rect.top) * scaleY };
  };

  const snap = () => {
    const cv = cvRef.current;
    if (cv) setHist(h => [...h.slice(-14), cv.toDataURL()]);
  };

  const redrawGridAt = (ctx, x, y, r) => {
    const x0 = Math.max(0, x - r), x1 = Math.min(CANVAS_W, x + r);
    const y0 = Math.max(0, y - r), y1 = Math.min(CANVAS_H, y + r);
    ctx.strokeStyle = 'rgba(176,200,240,.55)'; ctx.lineWidth = 0.6;
    for (let gx = Math.floor(x0/CELL)*CELL; gx <= x1; gx += CELL) { ctx.beginPath(); ctx.moveTo(gx, y0); ctx.lineTo(gx, y1); ctx.stroke(); }
    for (let gy = Math.floor(y0/CELL)*CELL; gy <= y1; gy += CELL) { ctx.beginPath(); ctx.moveTo(x0, gy); ctx.lineTo(x1, gy); ctx.stroke(); }
    if (40 >= x0 && 40 <= x1) { ctx.strokeStyle = 'rgba(240,100,100,.35)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(40, y0); ctx.lineTo(40, y1); ctx.stroke(); }
  };

  const start = useCallback((e) => {
    e.preventDefault();
    const cv = cvRef.current; if (!cv) return;
    snap();
    const pos = getXY(e, cv);
    last.current = pos; setDrawing(true);
    const ctx = cv.getContext('2d');
    if (tool === 'eraser') {
      const r = size * 6;
      ctx.clearRect(pos.x - r, pos.y - r, r * 2, r * 2);
      redrawGridAt(ctx, pos.x, pos.y, r);
    } else {
      ctx.beginPath(); ctx.arc(pos.x, pos.y, size / 2, 0, Math.PI * 2);
      ctx.fillStyle = color; ctx.fill();
    }
  }, [tool, size, color]);

  const move = useCallback((e) => {
    e.preventDefault();
    if (!drawing) return;
    const cv = cvRef.current; if (!cv) return;
    const pos = getXY(e, cv);
    const ctx = cv.getContext('2d');
    if (tool === 'eraser') {
      const r = size * 6;
      ctx.clearRect(pos.x - r, pos.y - r, r * 2, r * 2);
      redrawGridAt(ctx, pos.x, pos.y, r);
    } else {
      ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = size; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.moveTo(last.current.x, last.current.y); ctx.lineTo(pos.x, pos.y); ctx.stroke();
    }
    last.current = pos;
  }, [drawing, tool, size, color]);

  const stop = useCallback(() => setDrawing(false), []);

  const undo = () => {
    if (!hist.length) return;
    const prev = hist[hist.length - 1]; setHist(h => h.slice(0, -1));
    const cv = cvRef.current; if (!cv) return;
    const img = new Image();
    img.onload = () => { const ctx = cv.getContext('2d'); ctx.clearRect(0, 0, cv.width, cv.height); ctx.drawImage(img, 0, 0); };
    img.src = prev;
  };

  const clear = () => {
    const cv = cvRef.current; if (!cv) return;
    setHist([]);
    drawBg(cv.getContext('2d'));
  };

  const COLORS = ['#1a2040','#ff5a5a','#5b8eff','#3ddc97','#9b6dff','#ffb547'];
  const SIZES  = [1, 2, 4, 7];

  return (
    <div style={{ marginTop:20, userSelect:'none', WebkitUserSelect:'none' }}>
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
        <span style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.88rem' }}>📝 Черновик</span>
        <span style={{ color:'var(--t3)', fontSize:'.7rem' }}>прокрути чтобы увидеть больше · рисуй и считай</span>
      </div>
      <div className="sp-outer">
        {/* toolbar */}
        <div className="sp-bar">
          {[{id:'pen',l:'✏️ Ручка'},{id:'eraser',l:'⬜ Ластик'}].map(t => (
            <button key={t.id} onClick={() => setTool(t.id)} className={`sp-btn${tool===t.id?' act':''}`}>{t.l}</button>
          ))}
          <div style={{ width:1, height:22, background:'rgba(176,200,240,.5)', margin:'0 2px', flexShrink:0 }}/>
          {COLORS.map(c => (
            <button key={c} onClick={() => { setColor(c); setTool('pen'); }} style={{ width:24, height:24, borderRadius:'50%', background:c, border:color===c&&tool==='pen'?'2.5px solid #1a2040':'2px solid transparent', transition:'transform .12s', transform:color===c&&tool==='pen'?'scale(1.28)':'scale(1)', flexShrink:0, touchAction:'manipulation' }}/>
          ))}
          <div style={{ width:1, height:22, background:'rgba(176,200,240,.5)', margin:'0 2px', flexShrink:0 }}/>
          <span style={{ color:'#384060', fontSize:'.72rem', fontFamily:'Inter,sans-serif', whiteSpace:'nowrap', flexShrink:0 }}>Толщина:</span>
          {SIZES.map(s => (
            <button key={s} onClick={() => setSize(s)} style={{ width:s+14, height:s+14, borderRadius:'50%', background:size===s?color:'rgba(176,200,240,.6)', border:'none', flexShrink:0, touchAction:'manipulation', transition:'all .12s', minWidth:18, minHeight:18 }}/>
          ))}
          <div style={{ width:1, height:22, background:'rgba(176,200,240,.5)', margin:'0 2px', flexShrink:0 }}/>
          <button onClick={undo} disabled={!hist.length} className="sp-btn" style={{ opacity:hist.length?1:.35 }}>↩ Отмена</button>
          <button onClick={clear} className="sp-btn" style={{ borderColor:'rgba(240,100,100,.4)', color:'#c04040' }}>✕ Очистить</button>
        </div>
        {/* scrollable large canvas */}
        <div className="sp-scroll" style={{ height:260, overflowX:'auto', overflowY:'auto' }}>
          <canvas
            ref={cvRef}
            className="sp-canvas"
            style={{ display:'block', width:CANVAS_W+'px', height:CANVAS_H+'px' }}
            onMouseDown={start} onMouseMove={move} onMouseUp={stop} onMouseLeave={stop}
            onTouchStart={start} onTouchMove={move} onTouchEnd={stop}
            onContextMenu={e => e.preventDefault()}
          />
        </div>
        <div style={{ padding:'5px 12px', background:'rgba(253,252,244,.95)', borderTop:'1px solid rgba(176,200,240,.4)', fontSize:'.67rem', color:'#7a80a0', fontFamily:'Inter,sans-serif', display:'flex', justifyContent:'space-between' }}>
          <span>Размер холста: 1400 × 700</span>
          <span>прокрути внутри черновика</span>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   SUBTOPICS + THEORY DATA
═══════════════════════════════════════════════════════════ */
const SUBTOPICS = [
  { id:'mixed', label:'Все темы', icon:'🔀', color:'var(--vio)', desc:'Все задачи вперемешку — лучшая подготовка' },
  {
    id:'right', label:'Прямоугольный треугольник', icon:'⊾', color:'#5b8eff', desc:'Теорема Пифагора, тригонометрия, площадь',
    theory: {
      formulas: [
        { f:'c² = a² + b²', n:'Теорема Пифагора: квадрат гипотенузы = сумма квадратов катетов', fig: MF.pyth },
        { f:'sin A = a/c · cos A = b/c · tg A = a/b', n:'Тригонометрия: a — противолежащий катет, c — гипотенуза', fig: MF.sincos },
        { f:'S = ½ · a · b', n:'Площадь: катеты перпендикулярны, поэтому высота = второй катет', fig: MF.area_right },
        { f:'m = c/2 (медиана к гипотенузе)', n:'Из прямого угла медиана = половине гипотенузы, центр описанной окружности — середина гипотенузы', fig: MF.median_hyp },
      ],
      tip: 'Пифагоровы тройки: 3–4–5, 6–8–10, 5–12–13, 8–15–17, 7–24–25, 9–40–41. Сразу узнавай — ответ будет целым!',
      warn: 'Пифагор работает ТОЛЬКО в прямоугольном треугольнике. Для прочих — теорема косинусов.',
      ex: { cond:'Катеты △ABC = 6 и 8. Найдите гипотенузу AC.', fig: MF.pyth, steps:[{t:'Пишем теорему Пифагора:',f:'AC² = AB² + BC²'},{t:'Подставляем:',f:'AC² = 6² + 8² = 36 + 64 = 100',hl:true},{t:'Берём корень:',f:'AC = √100 = 10'}], ans:'10' },
    },
  },
  {
    id:'isosceles', label:'Равнобедренный треугольник', icon:'▲', color:'#9b6dff', desc:'Свойства, высота, углы',
    theory: {
      formulas: [
        { f:'∠B = ∠C (углы при основании равны)', n:'Главное свойство: при равных боковых сторонах углы при основании равны', fig: MF.iso_angles },
        { f:'∠A = 180° − 2∠B', n:'Угол при вершине через угол при основании', fig: MF.iso_angles },
        { f:'h = √(a² − (b/2)²)', n:'Высота к основанию b через боковую сторону a (по Пифагору)', fig: MF.iso_height },
        { f:'S = ½ · b · h', n:'Площадь через основание b и высоту h', fig: MF.iso_height },
      ],
      tip: 'Высота, медиана и биссектриса из вершинного угла — одна и та же линия! Сразу три свойства в одной линии.',
      warn: 'Вершинный угол — между РАВНЫМИ сторонами. Угол при основании — между основанием и боковой стороной.',
      ex: { cond:'Вершинный угол △ = 40°. Найдите угол при основании.', fig: MF.iso_angles, steps:[{t:'Сумма углов треугольника:',f:'∠A + ∠B + ∠C = 180°'},{t:'∠B = ∠C, поэтому:',f:'40° + 2∠B = 180°  →  2∠B = 140°',hl:true},{t:'Делим на 2:',f:'∠B = 70°'}], ans:'70°' },
    },
  },
  {
    id:'general', label:'Треугольники общего вида', icon:'△', color:'#2dd4bf', desc:'Теоремы синусов и косинусов, площадь, углы',
    theory: {
      formulas: [
        { f:'∠A + ∠B + ∠C = 180°', n:'Сумма внутренних углов треугольника всегда 180°', fig: MF.angle_sum },
        { f:'Внешний угол = ∠A + ∠B (сумма несмежных)', n:'Внешний угол при вершине C равен сумме двух других углов', fig: MF.ext_angle },
        { f:'S = ½ · a · b · sin C', n:'Площадь через две стороны и угол МЕЖДУ ними — самая частая на ЕГЭ', fig: MF.area_sin },
        { f:'a/sin A = b/sin B = c/sin C = 2R', n:'Теорема синусов: отношение стороны к синусу противолежащего угла постоянно', fig: MF.angle_sum },
        { f:'c² = a² + b² − 2ab·cos C', n:'Теорема косинусов: обобщение Пифагора для любого треугольника', fig: MF.angle_sum },
      ],
      tip: 'S = ½·a·b·sin C — запомни раз и навсегда. Угол C строго между сторонами a и b!',
      warn: 'Внешний угол ≠ смежному углу. Внешний угол = 180° − внутренний. Но = сумме двух других внутренних.',
      ex: { cond:'a = 8, b = 6, угол между ними C = 30°. Найдите площадь.', fig: MF.area_sin, steps:[{t:'Формула площади:',f:'S = ½·a·b·sin C'},{t:'sin 30° = 0,5, подставляем:',f:'S = ½ · 8 · 6 · 0,5',hl:true},{t:'Вычисляем:',f:'S = ½ · 48 · 0.5 = 12'}], ans:'12' },
    },
  },
  {
    id:'parallel', label:'Параллелограммы', icon:'▱', color:'#3ddc97', desc:'Ромб, прямоугольник, квадрат, площадь',
    theory: {
      formulas: [
        { f:'S = a · h (h — высота ⊥ основанию)', n:'Площадь параллелограмма: высота ≠ боковой стороне!', fig: MF.par_area },
        { f:'S(ромб) = ½ · d₁ · d₂', n:'Площадь ромба через диагонали: они ⊥ и делятся пополам', fig: MF.rhombus },
        { f:'S(прямоугольник) = a · b', n:'Площадь прямоугольника = произведение сторон', fig: MF.rect_diag },
        { f:'d(прямоугольник) = √(a² + b²)', n:'Диагональ прямоугольника по теореме Пифагора', fig: MF.rect_diag },
        { f:'a(ромб) = √((d₁/2)² + (d₂/2)²)', n:'Сторона ромба через диагонали: половины диагоналей — катеты', fig: MF.rhombus },
      ],
      tip: 'В ромбе диагонали перпендикулярны и делятся пополам. Четыре прямоугольных треугольника!',
      warn: 'Высота параллелограмма — перпендикуляр к основанию. Боковая сторона ≠ высота (кроме прямоугольника).',
      ex: { cond:'Диагонали ромба d₁ = 6, d₂ = 8. Найдите площадь и сторону.', fig: MF.rhombus, steps:[{t:'Площадь:',f:'S = ½ · 6 · 8 = 24',hl:true},{t:'Диагонали ⊥, катеты = d₁/2 = 3 и d₂/2 = 4:',f:'a = √(3² + 4²) = √25 = 5'}], ans:'S = 24, a = 5' },
    },
  },
  {
    id:'trapezoid', label:'Трапеция', icon:'⏢', color:'#ffb547', desc:'Площадь, средняя линия, высота',
    theory: {
      formulas: [
        { f:'S = ½ · (a + b) · h', n:'Площадь трапеции: a и b — основания (параллельные стороны), h — высота', fig: MF.trap_area },
        { f:'m = (a + b) / 2', n:'Средняя линия = полусумма оснований. Параллельна основаниям', fig: MF.trap_mid },
        { f:'S = m · h', n:'Площадь через среднюю линию и высоту', fig: MF.trap_area },
      ],
      tip: 'Прямоугольная трапеция: один из боковых углов = 90°, высота = этой боковой стороне. Диагональ — по Пифагору.',
      warn: 'a и b — только параллельные стороны (основания). Боковые стороны не входят в формулу площади.',
      ex: { cond:'Основания 5 и 13, высота 6. Найдите площадь.', fig: MF.trap_area, steps:[{t:'Формула площади трапеции:',f:'S = ½·(a+b)·h'},{t:'Подставляем:',f:'S = ½·(5+13)·6 = ½·18·6',hl:true},{t:'Вычисляем:',f:'S = 9 · 6 = 54'}], ans:'54' },
    },
  },
  {
    id:'angles', label:'Центральные и вписанные углы', icon:'◠', color:'#2dd4bf', desc:'Дуги, вписанный угол, теорема Фалеса',
    theory: {
      formulas: [
        { f:'∠вписанный = ½ · дуга', n:'Вписанный угол = половина дуги, которую он ВИДИТ (противоположная хорде)', fig: MF.inscr_angle },
        { f:'∠центральный = дуга', n:'Центральный угол равен стягиваемой им дуге', fig: MF.inscr_angle },
        { f:'∠вписанный = ½ · ∠центральный', n:'На одну дугу: вписанный = половине центрального', fig: MF.inscr_angle },
        { f:'∠(на диаметр) = 90°', n:'Теорема Фалеса: вписанный угол, опирающийся на диаметр = 90°', fig: MF.thales },
      ],
      tip: 'Все вписанные углы, опирающиеся на одну дугу с одной стороны — равны между собой!',
      warn: 'Не путай: вписанный = ½ дуги, которую он ВИДИТ. Если угол тупой — дуга > 180°.',
      ex: { cond:'Дуга AB = 110°. Найдите вписанный угол ACB.', fig: MF.inscr_angle, steps:[{t:'Вписанный = половина дуги:',f:'∠ACB = дуга AB / 2'},{t:'Подставляем:',f:'∠ACB = 110° / 2 = 55°',hl:true}], ans:'55°' },
    },
  },
  {
    id:'tangent', label:'Касательная, хорда, секущая', icon:'⌒', color:'#ffb547', desc:'Равенство касательных, степень точки',
    theory: {
      formulas: [
        { f:'|MA| = |MB| (две касательные из одной точки)', n:'Оба отрезка касательных из внешней точки M равны', fig: MF.tang_prop },
        { f:'t = √(d² − R²) (длина касательной)', n:'d — расстояние от точки до центра, R — радиус; касательная ⊥ радиусу', fig: MF.tang_len },
        { f:'MA · MB = MC · MD (хорды пересекаются внутри)', n:'Произведения отрезков двух хорд, пересекающихся внутри окружности, равны', fig: MF.chord_cross },
        { f:'t² = внешняя · вся (касательная и секущая)', n:'Квадрат касательной = произведению внешнего отрезка секущей на всю секущую', fig: MF.tang_len },
      ],
      tip: 'Касательная ⊥ радиусу в точке касания — это ключ ко всем задачам с касательными. Треугольник прямоугольный!',
      warn: 'Касательная не пересекает окружность. Она касается в ровно одной точке.',
      ex: { cond:'Расстояние от M до центра = 13, R = 5. Найдите длину касательной.', fig: MF.tang_len, steps:[{t:'Касательная ⊥ радиусу → прямоугольный △:',f:'t² = d² − R²'},{t:'Подставляем:',f:'t² = 13² − 5² = 169 − 25 = 144',hl:true},{t:'Корень:',f:'t = √144 = 12'}], ans:'12' },
    },
  },
  {
    id:'inscribed', label:'Вписанные окружности', icon:'⊙', color:'#ff8adb', desc:'Радиус вписанной окружности',
    theory: {
      formulas: [
        { f:'r = S / p', n:'Универсальная формула: r — радиус, S — площадь △, p — полупериметр', fig: MF.incirc },
        { f:'r = (a + b − c) / 2', n:'Только для прямоугольного △: a, b — катеты, c — гипотенуза', fig: MF.incirc_right },
        { f:'a + c = b + d (условие для четырёхугольника)', n:'В четырёхугольнике с вписанной окружностью: суммы противоположных сторон равны', fig: MF.incirc },
      ],
      tip: 'Для прямоугольного △: r = (a+b−c)/2 быстрее и надёжнее, чем S/p. Запомни!',
      warn: 'В задачах с четырёхугольником: a+c = b+d — находи неизвестную сторону отсюда.',
      ex: { cond:'Прямоугольный △: катеты 6 и 8. Вписанная окружность. Найдите r.', fig: MF.incirc_right, steps:[{t:'Гипотенуза:',f:'c = √(6²+8²) = √100 = 10'},{t:'Формула для прямоугольного △:',f:'r = (a + b − c) / 2',hl:true},{t:'Подставляем:',f:'r = (6 + 8 − 10) / 2 = 4 / 2 = 2'}], ans:'2' },
    },
  },
  {
    id:'circumscribed', label:'Описанные окружности', icon:'○', color:'#3ddc97', desc:'Радиус описанной окружности',
    theory: {
      formulas: [
        { f:'R = c / 2 (прямоугольный △)', n:'Для прямоугольного △: центр = середина гипотенузы, R = c/2', fig: MF.circumcirc_right },
        { f:'R = a / (2 · sin A)', n:'Из теоремы синусов: a — любая сторона, A — противолежащий угол', fig: MF.circumcirc },
        { f:'R = abc / (4S)', n:'Через все три стороны и площадь', fig: MF.circumcirc },
        { f:'R ≥ 2r (неравенство Эйлера)', n:'Радиус описанной ≥ двух радиусов вписанной. Равенство — для правильного △', fig: MF.circumcirc },
      ],
      tip: 'Для прямоугольного △: R = c/2. Всегда! Центр описанной окружности — середина гипотенузы.',
      warn: 'R = 2r только для правильного (равностороннего) треугольника. Для остальных R > 2r.',
      ex: { cond:'Прямоугольный △: катеты 6 и 8. Описанная окружность. Найдите R.', fig: MF.circumcirc_right, steps:[{t:'Гипотенуза:',f:'c = √(6²+8²) = 10'},{t:'Для прямоугольного △:',f:'R = c / 2',hl:true},{t:'Подставляем:',f:'R = 10 / 2 = 5'}], ans:'5' },
    },
  },
];

/* ═══════════════════════════════════════════════════════════
   ЗАДАЧИ ИЗ БАНКА СДАМГИА (math-ege.sdamgia.ru)
   Источник: Открытый банк заданий ЕГЭ по математике
   Каждая задача: q=условие, h=подсказка, s=решение, a=ответ, fig=рисунок SVG
═══════════════════════════════════════════════════════════ */

// Мини-рисунки для конкретных задач
const PF = {
  // прямоугольный △ с метками
  right_3_4: (
    <svg width="120" height="95" viewBox="0 0 120 95">
      <polygon points="10,85 10,12 95,85" fill="#e8f0ff" stroke="#5b8eff" strokeWidth="1.5"/>
      <rect x="10" y="74" width="10" height="10" fill="none" stroke="#5b8eff" strokeWidth="1.2"/>
      <text x="1" y="52" fill="#1a2040" fontSize="12" fontFamily="Caveat,cursive" fontWeight="600">a=3</text>
      <text x="44" y="92" fill="#1a2040" fontSize="12" fontFamily="Caveat,cursive" fontWeight="600">b=4</text>
      <text x="48" y="48" fill="#9b6dff" fontSize="12" fontFamily="Caveat,cursive" fontWeight="600">c=?</text>
    </svg>
  ),
  right_6_8: (
    <svg width="120" height="95" viewBox="0 0 120 95">
      <polygon points="10,85 10,12 95,85" fill="#e8f0ff" stroke="#5b8eff" strokeWidth="1.5"/>
      <rect x="10" y="74" width="10" height="10" fill="none" stroke="#5b8eff" strokeWidth="1.2"/>
      <text x="1" y="52" fill="#1a2040" fontSize="12" fontFamily="Caveat,cursive" fontWeight="600">6</text>
      <text x="44" y="92" fill="#1a2040" fontSize="12" fontFamily="Caveat,cursive" fontWeight="600">8</text>
      <text x="50" y="48" fill="#9b6dff" fontSize="12" fontFamily="Caveat,cursive" fontWeight="600">?</text>
    </svg>
  ),
  trap_fig: (
    <svg width="130" height="100" viewBox="0 0 130 100">
      <polygon points="24,86 34,18 100,18 118,86" fill="#fff8e8" stroke="#ffb547" strokeWidth="1.5"/>
      <line x1="42" y1="18" x2="42" y2="86" stroke="#ff5a5a" strokeWidth="1.3" strokeDasharray="3,2"/>
      <rect x="42" y="76" width="9" height="9" fill="none" stroke="#ff5a5a" strokeWidth="1.1"/>
      <text x="55" y="14" fill="#ffb547" fontSize="11" fontFamily="Caveat,cursive" fontWeight="600">a</text>
      <text x="60" y="97" fill="#ffb547" fontSize="11" fontFamily="Caveat,cursive" fontWeight="600">b</text>
      <text x="44" y="55" fill="#ff5a5a" fontSize="12" fontFamily="Caveat,cursive">h</text>
    </svg>
  ),
  inscr_circ_right: (
    <svg width="110" height="95" viewBox="0 0 110 95">
      <polygon points="10,85 10,15 90,85" fill="#fff0f8" stroke="#ff8adb" strokeWidth="1.5"/>
      <rect x="10" y="74" width="10" height="10" fill="none" stroke="#ff8adb" strokeWidth="1.2"/>
      <circle cx="22" cy="73" r="13" fill="none" stroke="#9b6dff" strokeWidth="1.4" strokeDasharray="3,2"/>
      <text x="2" y="48" fill="#1a2040" fontSize="11" fontFamily="Caveat,cursive">a</text>
      <text x="40" y="92" fill="#1a2040" fontSize="11" fontFamily="Caveat,cursive">b</text>
      <text x="42" y="47" fill="#ff8adb" fontSize="11" fontFamily="Caveat,cursive">c</text>
      <text x="15" y="70" fill="#9b6dff" fontSize="10" fontFamily="Caveat,cursive">r</text>
    </svg>
  ),
  circle_fig: (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <circle cx="55" cy="55" r="44" fill="rgba(45,212,191,.07)" stroke="#2dd4bf" strokeWidth="1.5"/>
      <line x1="16" y1="36" x2="94" y2="36" stroke="#5b8eff" strokeWidth="1.5"/>
      <line x1="16" y1="36" x2="55" y2="98" stroke="#9b6dff" strokeWidth="1.5"/>
      <line x1="94" y1="36" x2="55" y2="98" stroke="#9b6dff" strokeWidth="1.5"/>
      <circle cx="55" cy="55" r="2" fill="#2dd4bf"/>
      <text x="7" y="33" fill="#5b8eff" fontSize="11" fontFamily="Caveat,cursive">A</text>
      <text x="96" y="33" fill="#5b8eff" fontSize="11" fontFamily="Caveat,cursive">B</text>
      <text x="50" y="108" fill="#9b6dff" fontSize="11" fontFamily="Caveat,cursive">C</text>
    </svg>
  ),
};

const BANK = {
  right: [
    {q:'В прямоугольном треугольнике катеты равны 3 и 4. Найдите гипотенузу.',h:'c = √(3²+4²)',s:'c = √(9+16) = √25 = <b>5</b>',a:5,fig:PF.right_3_4},
    {q:'В прямоугольном треугольнике катеты равны 6 и 8. Найдите гипотенузу.',h:'c = √(6²+8²)',s:'c = √(36+64) = √100 = <b>10</b>',a:10,fig:PF.right_6_8},
    {q:'В прямоугольном треугольнике катеты равны 5 и 12. Найдите гипотенузу.',h:'c = √(5²+12²)',s:'c = √(25+144) = √169 = <b>13</b>',a:13},
    {q:'В прямоугольном треугольнике катеты равны 8 и 15. Найдите гипотенузу.',h:'c = √(8²+15²)',s:'c = √(64+225) = √289 = <b>17</b>',a:17},
    {q:'В прямоугольном треугольнике катеты равны 9 и 12. Найдите гипотенузу.',h:'c = √(9²+12²)',s:'c = √(81+144) = √225 = <b>15</b>',a:15},
    {q:'В прямоугольном треугольнике катеты равны 7 и 24. Найдите гипотенузу.',h:'c = √(7²+24²) = √(49+576)',s:'c = √625 = <b>25</b>',a:25},
    {q:'В прямоугольном треугольнике катеты равны 20 и 21. Найдите гипотенузу.',h:'c = √(20²+21²)',s:'c = √(400+441) = √841 = <b>29</b>',a:29},
    {q:'Гипотенуза прямоугольного треугольника равна 10, один катет равен 6. Найдите другой катет.',h:'b = √(10²−6²)',s:'b = √(100−36) = √64 = <b>8</b>',a:8},
    {q:'Гипотенуза прямоугольного треугольника равна 13, один катет равен 5. Найдите другой катет.',h:'b = √(13²−5²)',s:'b = √(169−25) = √144 = <b>12</b>',a:12},
    {q:'Гипотенуза прямоугольного треугольника равна 17, один катет равен 8. Найдите другой катет.',h:'b = √(17²−8²)',s:'b = √(289−64) = √225 = <b>15</b>',a:15},
    {q:'Гипотенуза прямоугольного треугольника равна 25, один катет равен 7. Найдите другой катет.',h:'b = √(25²−7²)',s:'b = √(625−49) = √576 = <b>24</b>',a:24},
    {q:'Гипотенуза прямоугольного треугольника равна 26, один катет равен 10. Найдите другой катет.',h:'b = √(26²−10²)',s:'b = √(676−100) = √576 = <b>24</b>',a:24},
    {q:'Катеты прямоугольного треугольника равны 6 и 8. Найдите площадь треугольника.',h:'S = ½·a·b',s:'S = ½·6·8 = <b>24</b>',a:24},
    {q:'Катеты прямоугольного треугольника равны 5 и 12. Найдите площадь треугольника.',h:'S = ½·a·b',s:'S = ½·5·12 = <b>30</b>',a:30},
    {q:'Катеты прямоугольного треугольника равны 9 и 40. Найдите площадь треугольника.',h:'S = ½·a·b',s:'S = ½·9·40 = <b>180</b>',a:180},
    {q:'Один острый угол прямоугольного треугольника равен 35°. Найдите другой острый угол (в градусах).',h:'Сумма острых углов = 90°',s:'90°−35° = <b>55°</b>',a:55},
    {q:'Один острый угол прямоугольного треугольника равен 48°. Найдите другой острый угол (в градусах).',h:'Сумма острых углов = 90°',s:'90°−48° = <b>42°</b>',a:42},
    {q:'Медиана прямоугольного треугольника, проведённая к гипотенузе, равна 6,5. Найдите гипотенузу.',h:'Медиана к гипотенузе = половина гипотенузы',s:'c = 2·6,5 = <b>13</b>',a:13},
    {q:'Площадь прямоугольного треугольника равна 30, один катет равен 12. Найдите другой катет.',h:'S = ½·a·b → b = 2S/a',s:'b = 2·30/12 = <b>5</b>',a:5},
    {q:'Катеты прямоугольного треугольника равны 3 и 4. Найдите периметр.',h:'Сначала гипотенуза c = 5, P = a+b+c',s:'P = 3+4+5 = <b>12</b>',a:12},
  ],
  isosceles: [
    {q:'Угол при вершине равнобедренного треугольника равен 40°. Найдите угол при основании (в градусах).',h:'(180°−40°)/2',s:'(180°−40°)/2 = 140°/2 = <b>70°</b>',a:70},
    {q:'Угол при вершине равнобедренного треугольника равен 120°. Найдите угол при основании (в градусах).',h:'(180°−120°)/2',s:'(180°−120°)/2 = 60°/2 = <b>30°</b>',a:30},
    {q:'Угол при вершине равнобедренного треугольника равен 100°. Найдите угол при основании (в градусах).',h:'(180°−100°)/2',s:'(180°−100°)/2 = 80°/2 = <b>40°</b>',a:40},
    {q:'Углы при основании равнобедренного треугольника равны 55° каждый. Найдите угол при вершине (в градусах).',h:'180°−2·55°',s:'180°−110° = <b>70°</b>',a:70},
    {q:'Углы при основании равнобедренного треугольника равны 72°. Найдите угол при вершине (в градусах).',h:'180°−2·72°',s:'180°−144° = <b>36°</b>',a:36},
    {q:'Углы при основании равнобедренного треугольника равны 45°. Найдите угол при вершине (в градусах).',h:'180°−2·45°',s:'180°−90° = <b>90°</b>',a:90},
    {q:'В равнобедренном треугольнике боковая сторона = 5, основание = 6. Найдите высоту, проведённую к основанию.',h:'h = √(5²−3²) = √(25−9)',s:'h = √16 = <b>4</b>',a:4},
    {q:'В равнобедренном треугольнике боковая сторона = 10, основание = 12. Найдите высоту к основанию.',h:'h = √(10²−6²) = √(100−36)',s:'h = √64 = <b>8</b>',a:8},
    {q:'В равнобедренном треугольнике боковая сторона = 13, основание = 10. Найдите высоту к основанию.',h:'h = √(13²−5²) = √(169−25)',s:'h = √144 = <b>12</b>',a:12},
    {q:'В равнобедренном треугольнике боковая сторона = 17, основание = 16. Найдите высоту к основанию.',h:'h = √(17²−8²)',s:'h = √(289−64) = √225 = <b>15</b>',a:15},
    {q:'В равнобедренном треугольнике основание = 8, высота к нему = 3. Найдите боковую сторону.',h:'a = √(h²+(b/2)²) = √(9+16)',s:'a = √25 = <b>5</b>',a:5},
    {q:'Стороны равнобедренного треугольника равны 5, 5, 6. Найдите периметр.',h:'P = 2·5+6',s:'P = 10+6 = <b>16</b>',a:16},
    {q:'Угол при вершине равнобедренного треугольника равен 80°. Найдите угол при основании (в градусах).',h:'(180°−80°)/2',s:'(180°−80°)/2 = 100°/2 = <b>50°</b>',a:50},
    {q:'Угол при вершине равнобедренного треугольника равен 60°. Треугольник — правильный? Найдите угол при основании (в градусах).',h:'(180°−60°)/2',s:'(180°−60°)/2 = 120°/2 = <b>60°</b> — равносторонний',a:60},
    {q:'В равнобедренном треугольнике боковая сторона = 25, основание = 14. Найдите высоту к основанию.',h:'h = √(25²−7²) = √(625−49)',s:'h = √576 = <b>24</b>',a:24},
  ],
  general: [
    {q:'В треугольнике ∠A = 47°, ∠B = 68°. Найдите ∠C (в градусах).',h:'∠A+∠B+∠C=180°',s:'∠C = 180°−47°−68° = <b>65°</b>',a:65},
    {q:'В треугольнике ∠A = 30°, ∠B = 90°. Найдите ∠C (в градусах).',h:'∠A+∠B+∠C=180°',s:'∠C = 180°−30°−90° = <b>60°</b>',a:60},
    {q:'В треугольнике ∠A = ∠B = 65°. Найдите ∠C (в градусах).',h:'∠A+∠B+∠C=180°',s:'∠C = 180°−65°−65° = <b>50°</b>',a:50},
    {q:'В треугольнике ∠A = 110°, ∠B = 35°. Найдите ∠C (в градусах).',h:'∠A+∠B+∠C=180°',s:'∠C = 180°−110°−35° = <b>35°</b>',a:35},
    {q:'В треугольнике ∠A = 80°, ∠B = 60°. Найдите внешний угол при вершине C (в градусах).',h:'Внешний угол = ∠A+∠B',s:'80°+60° = <b>140°</b>',a:140},
    {q:'В треугольнике ∠A = 50°, ∠B = 65°. Найдите внешний угол при вершине C (в градусах).',h:'Внешний угол = ∠A+∠B',s:'50°+65° = <b>115°</b>',a:115},
    {q:'Внешний угол при вершине C = 130°, ∠A = 70°. Найдите ∠B (в градусах).',h:'Внешний = ∠A+∠B → ∠B = 130°−70°',s:'∠B = 130°−70° = <b>60°</b>',a:60},
    {q:'Основание треугольника = 12, высота на него = 7. Найдите площадь.',h:'S = ½·b·h',s:'S = ½·12·7 = <b>42</b>',a:42},
    {q:'Основание треугольника = 15, высота = 8. Найдите площадь.',h:'S = ½·b·h',s:'S = ½·15·8 = <b>60</b>',a:60},
    {q:'Две стороны треугольника равны 6 и 8, угол между ними = 90°. Найдите площадь.',h:'S = ½·6·8·sin90° = ½·6·8',s:'S = ½·6·8 = <b>24</b>',a:24},
    {q:'Две стороны треугольника равны 8 и 6, угол между ними = 30°. Найдите площадь.',h:'S = ½·8·6·sin30°. sin30° = 0,5',s:'S = ½·8·6·0,5 = <b>12</b>',a:12},
    {q:'Две стороны треугольника равны 10 и 4, угол между ними = 30°. Найдите площадь.',h:'S = ½·10·4·sin30°',s:'S = ½·10·4·0,5 = <b>10</b>',a:10},
    {q:'Основание треугольника = 18, высота = 6. Найдите площадь.',h:'S = ½·18·6',s:'S = ½·18·6 = <b>54</b>',a:54},
    {q:'В треугольнике ∠A = 40°, ∠B = 75°. Найдите ∠C (в градусах).',h:'∠C = 180°−∠A−∠B',s:'∠C = 180°−40°−75° = <b>65°</b>',a:65},
    {q:'Биссектриса делит угол B = 80° пополам. Найдите каждую из двух частей (в градусах).',h:'80°/2',s:'80°/2 = <b>40°</b>',a:40},
    {q:'Две стороны треугольника равны 7 и 10, угол между ними = 90°. Найдите площадь.',h:'S = ½·7·10',s:'S = ½·7·10 = <b>35</b>',a:35},
    {q:'В треугольнике ∠A = 55°, ∠C = 75°. Найдите ∠B (в градусах).',h:'∠B = 180°−55°−75°',s:'∠B = 180°−55°−75° = <b>50°</b>',a:50},
    {q:'Основание треугольника = 20, высота = 9. Найдите площадь.',h:'S = ½·20·9',s:'S = ½·20·9 = <b>90</b>',a:90},
  ],
  parallel: [
    {q:'Стороны прямоугольника равны 7 и 9. Найдите площадь.',h:'S = a·b',s:'S = 7·9 = <b>63</b>',a:63},
    {q:'Стороны прямоугольника равны 5 и 12. Найдите площадь.',h:'S = a·b',s:'S = 5·12 = <b>60</b>',a:60},
    {q:'Стороны прямоугольника равны 3 и 4. Найдите диагональ.',h:'d = √(3²+4²)',s:'d = √(9+16) = √25 = <b>5</b>',a:5},
    {q:'Стороны прямоугольника равны 5 и 12. Найдите диагональ.',h:'d = √(5²+12²)',s:'d = √(25+144) = √169 = <b>13</b>',a:13},
    {q:'Стороны прямоугольника равны 9 и 12. Найдите диагональ.',h:'d = √(9²+12²)',s:'d = √(81+144) = √225 = <b>15</b>',a:15},
    {q:'Периметр прямоугольника = 26, одна сторона = 7. Найдите другую сторону.',h:'P = 2(a+b), b = P/2 − a',s:'b = 13−7 = <b>6</b>',a:6},
    {q:'Сторона квадрата = 7. Найдите площадь.',h:'S = a²',s:'7² = <b>49</b>',a:49},
    {q:'Площадь квадрата = 81. Найдите сторону.',h:'a = √S',s:'√81 = <b>9</b>',a:9},
    {q:'Диагонали ромба равны 6 и 8. Найдите площадь ромба.',h:'S = ½·d₁·d₂',s:'½·6·8 = <b>24</b>',a:24},
    {q:'Диагонали ромба равны 10 и 24. Найдите площадь ромба.',h:'S = ½·d₁·d₂',s:'½·10·24 = <b>120</b>',a:120},
    {q:'Диагонали ромба равны 12 и 16. Найдите площадь ромба.',h:'S = ½·d₁·d₂',s:'½·12·16 = <b>96</b>',a:96},
    {q:'Диагонали ромба равны 6 и 8. Найдите сторону ромба.',h:'a = √(3²+4²) — диагонали делятся пополам',s:'a = √25 = <b>5</b>',a:5},
    {q:'Диагонали ромба равны 10 и 24. Найдите сторону ромба.',h:'a = √(5²+12²)',s:'a = √169 = <b>13</b>',a:13},
    {q:'Основание параллелограмма = 10, высота = 6. Найдите площадь.',h:'S = a·h',s:'10·6 = <b>60</b>',a:60},
    {q:'Стороны прямоугольника равны 8 и 15. Найдите диагональ.',h:'d = √(8²+15²)',s:'d = √(64+225) = √289 = <b>17</b>',a:17},
  ],
  trapezoid: [
    {q:'Основания трапеции равны 5 и 11, высота = 6. Найдите площадь.',h:'S = ½·(a+b)·h',s:'½·(5+11)·6 = ½·16·6 = <b>48</b>',a:48,fig:PF.trap_fig},
    {q:'Основания трапеции равны 4 и 14, высота = 5. Найдите площадь.',h:'S = ½·(a+b)·h',s:'½·(4+14)·5 = ½·18·5 = <b>45</b>',a:45,fig:PF.trap_fig},
    {q:'Основания трапеции равны 7 и 15, высота = 4. Найдите площадь.',h:'S = ½·(a+b)·h',s:'½·(7+15)·4 = ½·22·4 = <b>44</b>',a:44},
    {q:'Основания трапеции равны 8 и 12, высота = 5. Найдите площадь.',h:'S = ½·(a+b)·h',s:'½·(8+12)·5 = ½·20·5 = <b>50</b>',a:50},
    {q:'Основания трапеции равны 5 и 13, высота = 7. Найдите площадь.',h:'S = ½·(a+b)·h',s:'½·(5+13)·7 = ½·18·7 = <b>63</b>',a:63},
    {q:'Основания трапеции равны 9 и 15, высота = 6. Найдите площадь.',h:'S = ½·(a+b)·h',s:'½·(9+15)·6 = ½·24·6 = <b>72</b>',a:72},
    {q:'Основания трапеции равны 6 и 10. Найдите среднюю линию.',h:'m = (a+b)/2',s:'(6+10)/2 = <b>8</b>',a:8},
    {q:'Основания трапеции равны 4 и 16. Найдите среднюю линию.',h:'m = (a+b)/2',s:'(4+16)/2 = <b>10</b>',a:10},
    {q:'Средняя линия трапеции = 9, одно основание = 5. Найдите другое основание.',h:'b = 2m−a',s:'2·9−5 = 18−5 = <b>13</b>',a:13},
    {q:'Средняя линия трапеции = 7, одно основание = 4. Найдите другое основание.',h:'b = 2m−a',s:'2·7−4 = 14−4 = <b>10</b>',a:10},
    {q:'Площадь трапеции = 40, высота = 4. Найдите сумму оснований.',h:'a+b = 2S/h',s:'2·40/4 = <b>20</b>',a:20},
    {q:'Основания трапеции равны 2 и 8, высота = 4. Найдите площадь.',h:'S = ½·(2+8)·4',s:'½·10·4 = <b>20</b>',a:20},
    {q:'Средняя линия трапеции = 11, одно основание = 7. Найдите другое.',h:'b = 2m−a',s:'2·11−7 = <b>15</b>',a:15},
    {q:'Основания трапеции равны 3 и 17. Найдите среднюю линию.',h:'m = (3+17)/2',s:'20/2 = <b>10</b>',a:10},
    {q:'Основания трапеции равны 6 и 14, высота = 5. Найдите площадь.',h:'S = ½·(6+14)·5',s:'½·20·5 = <b>50</b>',a:50},
  ],
  angles: [
    {q:'Хорда AB стягивает дугу 80°. Найдите вписанный угол ACB (в градусах).',h:'Вписанный = дуга/2',s:'80°/2 = <b>40°</b>',a:40,fig:PF.circle_fig},
    {q:'Хорда AB стягивает дугу 150°. Найдите вписанный угол ACB (в градусах).',h:'Вписанный = дуга/2',s:'150°/2 = <b>75°</b>',a:75,fig:PF.circle_fig},
    {q:'Хорда AB стягивает дугу 120°. Найдите вписанный угол ACB (в градусах).',h:'Вписанный = дуга/2',s:'120°/2 = <b>60°</b>',a:60},
    {q:'Вписанный угол равен 35°. Найдите центральный угол на ту же дугу (в градусах).',h:'Центральный = 2·вписанный',s:'2·35° = <b>70°</b>',a:70},
    {q:'Вписанный угол равен 60°. Найдите центральный угол на ту же дугу (в градусах).',h:'Центральный = 2·вписанный',s:'2·60° = <b>120°</b>',a:120},
    {q:'Центральный угол = 100°. Найдите вписанный угол на ту же дугу (в градусах).',h:'Вписанный = центральный/2',s:'100°/2 = <b>50°</b>',a:50},
    {q:'Центральный угол = 80°. Найдите вписанный угол на ту же дугу (в градусах).',h:'Вписанный = центральный/2',s:'80°/2 = <b>40°</b>',a:40},
    {q:'Угол ABC вписан в окружность и опирается на диаметр AC. Найдите угол ABC (в градусах).',h:'Теорема Фалеса: вписанный на диаметр = 90°',s:'<b>90°</b> (теорема Фалеса)',a:90},
    {q:'Вписанный угол = 45°. Найдите дугу, которую он видит (в градусах).',h:'Дуга = 2·вписанный',s:'2·45° = <b>90°</b>',a:90},
    {q:'Хорда AB стягивает дугу 50°. Найдите вписанный угол ACB (в градусах).',h:'Вписанный = дуга/2',s:'50°/2 = <b>25°</b>',a:25},
    {q:'Центральный угол AOB = 160°. Найдите вписанный угол ACB (в градусах).',h:'Вписанный = центральный/2',s:'160°/2 = <b>80°</b>',a:80},
    {q:'Хорда AB стягивает дугу 140°. Найдите вписанный угол ACB (в градусах).',h:'Вписанный = дуга/2',s:'140°/2 = <b>70°</b>',a:70},
    {q:'Вписанный угол = 70°. Найдите дугу, которую он стягивает (в градусах).',h:'Дуга = 2·вписанный',s:'2·70° = <b>140°</b>',a:140},
    {q:'Вписанный угол равен 90°. На какую дугу он опирается (в градусах)?',h:'Дуга = 2·90°',s:'2·90° = <b>180°</b> — диаметр',a:180},
    {q:'Хорда AB стягивает дугу 200°. Найдите вписанный угол ACB (в градусах).',h:'Вписанный = дуга/2',s:'200°/2 = <b>100°</b>',a:100},
  ],
  tangent: [
    {q:'Из точки M проведены две касательные к окружности. Одна касательная = 7. Найдите другую.',h:'Два отрезка касательных из одной точки равны',s:'<b>7</b>',a:7},
    {q:'Расстояние от точки M до центра окружности = 5, радиус = 3. Найдите длину касательной.',h:'t = √(d²−R²) = √(25−9)',s:'t = √16 = <b>4</b>',a:4},
    {q:'Расстояние от точки M до центра = 13, радиус = 5. Найдите длину касательной.',h:'t = √(13²−5²) = √(169−25)',s:'t = √144 = <b>12</b>',a:12},
    {q:'Расстояние от точки M до центра = 10, радиус = 6. Найдите длину касательной.',h:'t = √(10²−6²)',s:'t = √64 = <b>8</b>',a:8},
    {q:'Расстояние от точки M до центра = 17, радиус = 8. Найдите длину касательной.',h:'t = √(17²−8²) = √(289−64)',s:'t = √225 = <b>15</b>',a:15},
    {q:'Расстояние от точки M до центра = 25, радиус = 7. Найдите длину касательной.',h:'t = √(25²−7²)',s:'t = √(625−49) = √576 = <b>24</b>',a:24},
    {q:'Из точки M две касательные MA = MB. MA = 9, AB = 10. Найдите периметр △MAB.',h:'P = MA+MB+AB',s:'9+9+10 = <b>28</b>',a:28},
    {q:'Две хорды пересекаются внутри окружности. Отрезки одной: 3 и 8. Один отрезок другой = 4. Найдите второй отрезок.',h:'3·8 = 4·x',s:'x = 24/4 = <b>6</b>',a:6},
    {q:'Две хорды пересекаются. Отрезки одной: 2 и 10, один отрезок другой = 4. Найдите второй.',h:'2·10 = 4·x',s:'x = 20/4 = <b>5</b>',a:5},
    {q:'Угол между касательной и хордой опирается на дугу 90°. Найдите этот угол (в градусах).',h:'Угол = дуга/2',s:'90°/2 = <b>45°</b>',a:45},
    {q:'Расстояние от точки M до центра = 26, радиус = 10. Найдите длину касательной.',h:'t = √(26²−10²) = √(676−100)',s:'t = √576 = <b>24</b>',a:24},
    {q:'Две хорды пересекаются. Отрезки одной: 4 и 9, один отрезок другой = 6. Найдите второй.',h:'4·9 = 6·x',s:'x = 36/6 = <b>6</b>',a:6},
  ],
  inscribed: [
    {q:'В прямоугольный треугольник с катетами 3 и 4 вписана окружность. Найдите её радиус.',h:'r = (a+b−c)/2, c = 5',s:'r = (3+4−5)/2 = 2/2 = <b>1</b>',a:1,fig:PF.inscr_circ_right},
    {q:'В прямоугольный треугольник с катетами 6 и 8 вписана окружность. Найдите её радиус.',h:'r = (a+b−c)/2, c = 10',s:'r = (6+8−10)/2 = 4/2 = <b>2</b>',a:2,fig:PF.inscr_circ_right},
    {q:'В прямоугольный треугольник с катетами 5 и 12 вписана окружность. Найдите её радиус.',h:'r = (a+b−c)/2, c = 13',s:'r = (5+12−13)/2 = 4/2 = <b>2</b>',a:2},
    {q:'В прямоугольный треугольник с катетами 8 и 15 вписана окружность. Найдите её радиус.',h:'r = (a+b−c)/2, c = 17',s:'r = (8+15−17)/2 = 6/2 = <b>3</b>',a:3},
    {q:'В прямоугольный треугольник с катетами 9 и 40 вписана окружность. Найдите её радиус.',h:'r = (a+b−c)/2, c = 41',s:'r = (9+40−41)/2 = 8/2 = <b>4</b>',a:4},
    {q:'В прямоугольный треугольник с катетами 20 и 21 вписана окружность. Найдите её радиус.',h:'r = (a+b−c)/2, c = 29',s:'r = (20+21−29)/2 = 12/2 = <b>6</b>',a:6},
    {q:'В квадрат со стороной 6 вписана окружность. Найдите её радиус.',h:'r = сторона/2',s:'r = 6/2 = <b>3</b>',a:3},
    {q:'В квадрат со стороной 10 вписана окружность. Найдите её радиус.',h:'r = сторона/2',s:'r = 10/2 = <b>5</b>',a:5},
    {q:'Площадь треугольника = 24, полупериметр = 8. Найдите радиус вписанной окружности.',h:'r = S/p',s:'r = 24/8 = <b>3</b>',a:3},
    {q:'Площадь треугольника = 30, полупериметр = 10. Найдите радиус вписанной окружности.',h:'r = S/p',s:'r = 30/10 = <b>3</b>',a:3},
    {q:'В четырёхугольник ABCD вписана окружность. AB = 5, BC = 4, CD = 6. Найдите DA.',h:'AB + CD = BC + DA',s:'DA = 5+6−4 = <b>7</b>',a:7},
    {q:'В четырёхугольник ABCD вписана окружность. AB = 8, BC = 5, CD = 7. Найдите DA.',h:'AB + CD = BC + DA',s:'DA = 8+7−5 = <b>10</b>',a:10},
  ],
  circumscribed: [
    {q:'Около прямоугольного треугольника с катетами 3 и 4 описана окружность. Найдите её радиус.',h:'R = гипотенуза/2, c = 5',s:'R = 5/2 = <b>2.5</b>',a:2.5},
    {q:'Около прямоугольного треугольника с катетами 6 и 8 описана окружность. Найдите её радиус.',h:'R = гипотенуза/2, c = 10',s:'R = 10/2 = <b>5</b>',a:5},
    {q:'Около прямоугольного треугольника с катетами 5 и 12 описана окружность. Найдите её радиус.',h:'R = гипотенуза/2, c = 13',s:'R = 13/2 = <b>6.5</b>',a:6.5},
    {q:'Около прямоугольного треугольника с катетами 8 и 15 описана окружность. Найдите её радиус.',h:'R = гипотенуза/2, c = 17',s:'R = 17/2 = <b>8.5</b>',a:8.5},
    {q:'Около прямоугольного треугольника с гипотенузой 26 описана окружность. Найдите её радиус.',h:'R = c/2',s:'R = 26/2 = <b>13</b>',a:13},
    {q:'Около прямоугольного треугольника с гипотенузой 20 описана окружность. Найдите её радиус.',h:'R = c/2',s:'R = 20/2 = <b>10</b>',a:10},
    {q:'Сторона треугольника = 10, противолежащий угол = 30°. Найдите R описанной окружности.',h:'R = a/(2·sinA). sin30° = 0,5',s:'R = 10/(2·0,5) = <b>10</b>',a:10},
    {q:'Сторона треугольника = 8, противолежащий угол = 30°. Найдите R описанной окружности.',h:'R = a/(2·sinA). sin30° = 0,5',s:'R = 8/(2·0,5) = <b>8</b>',a:8},
    {q:'Около прямоугольного треугольника с катетами 12 и 16 описана окружность. Найдите R.',h:'Гипотенуза = √(144+256) = 20. R = 20/2',s:'R = 20/2 = <b>10</b>',a:10},
    {q:'Около прямоугольного треугольника с катетами 9 и 12 описана окружность. Найдите R.',h:'Гипотенуза = √(81+144) = 15. R = 15/2',s:'R = 15/2 = <b>7.5</b>',a:7.5},
    {q:'Около прямоугольного треугольника с катетами 7 и 24 описана окружность. Найдите R.',h:'Гипотенуза = √(49+576) = 25. R = 25/2',s:'R = 25/2 = <b>12.5</b>',a:12.5},
    {q:'Около прямоугольного треугольника с катетами 20 и 21 описана окружность. Найдите R.',h:'Гипотенуза = √(400+441) = 29. R = 29/2',s:'R = 29/2 = <b>14.5</b>',a:14.5},
  ],
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

const COUNTS = Object.fromEntries(
  Object.entries(BANK).map(([k, v]) => [k, v.length])
);
COUNTS.mixed = Object.values(BANK).reduce((s,a) => s+a.length, 0);

/* ═══════════════════════════════════════════════════════════
   THEORY VIEW — каждая формула с рисунком
═══════════════════════════════════════════════════════════ */
const TheoryView = ({ sub, onPractice }) => {
  const { theory, color } = sub;
  return (
    <div style={{ maxWidth:700, margin:'0 auto', padding:'0 16px' }}>
      <div className="fu" style={{ marginBottom:20 }}>
        <div style={{ color:'var(--blue)', fontSize:'.66rem', fontFamily:'JetBrains Mono,monospace', letterSpacing:'.12em', textTransform:'uppercase', marginBottom:5 }}>Задание №1 · {sub.label}</div>
        <h2 style={{ fontSize:'clamp(1.2rem,3vw,1.8rem)', marginBottom:8 }}>{sub.label}</h2>
      </div>

      {/* формулы с рисунками */}
      <div className="card fu" style={{ padding:'16px', marginBottom:12, animation:'fadeUp .38s ease both .05s' }}>
        <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.86rem', marginBottom:14 }}>📐 Формулы и факты</div>
        {theory.formulas.map((item, i) => (
          <FC key={i} formula={item.f} note={item.n} fig={item.fig}/>
        ))}
        {theory.tip  && <div className="co cb" style={{ marginTop:4 }}>💡 {theory.tip}</div>}
        {theory.warn && <div className="co cr">⚠️ {theory.warn}</div>}
      </div>

      {/* пример на тетрадном листе */}
      <div className="fu" style={{ animation:'fadeUp .38s ease both .1s' }}>
        <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:8 }}>
          <div style={{ width:3, height:16, background:color, borderRadius:2 }}/>
          <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.86rem' }}>Разобранный пример</div>
        </div>
        <NbExample condition={theory.ex.cond} figure={theory.ex.fig} steps={theory.ex.steps} answer={theory.ex.ans} color={color}/>
      </div>

      {/* CTA */}
      <div className="card fu" style={{ marginTop:20, padding:'20px', textAlign:'center', background:'linear-gradient(135deg,rgba(91,142,255,.07),rgba(155,109,255,.07))', borderColor:'rgba(91,142,255,.18)', animation:'fadeUp .38s ease both .15s' }}>
        <div style={{ fontSize:'1.3rem', marginBottom:6 }}>🎯</div>
        <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.96rem', marginBottom:6 }}>Готов к задачам?</h3>
        <p style={{ color:'var(--t2)', marginBottom:14, fontSize:'.83rem' }}>
          {COUNTS[sub.id]} задач в стиле СдамГИА · с черновиком в клетку
        </p>
        <div style={{ display:'flex', gap:8, justifyContent:'center', flexWrap:'wrap' }}>
          <button className="btn" onClick={onPractice} style={{ fontSize:'.88rem' }}>Перейти к задачам →</button>
          <a href="https://math-ege.sdamgia.ru" target="_blank" rel="noopener noreferrer" style={{ background:'var(--bg2)', border:'1px solid var(--b2)', color:'var(--t2)', borderRadius:'var(--rs)', padding:'11px 16px', fontSize:'.78rem', textDecoration:'none', display:'flex', alignItems:'center', gap:5 }}>
            🔗 СдамГИА
          </a>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   PRACTICE — ИСПРАВЛЕН СЧЁТЧИК
   total увеличивается ТОЛЬКО при финализации задачи:
   - правильный ответ → total+1, correct+1
   - 3 ошибки → total+1 (задача провалена)
   Промежуточные ошибки (1-я, 2-я) НЕ меняют total
═══════════════════════════════════════════════════════════ */
const Practice = ({ subId, progress, setProgress }) => {
  const [pool] = useState(() => {
    if (subId === 'mixed') return shuffle(Object.values(BANK).flat()).map((p,i)=>({...p,id:i}));
    return shuffle(BANK[subId]||[]).map((p,i)=>({...p,id:i}));
  });
  const [idx,    setIdx]    = useState(0);
  const [ans,    setAns]    = useState('');
  const [status, setStatus] = useState(null); // null | 'wrong' | 'correct' | 'reveal'
  const [tries,  setTries]  = useState(0);    // ошибок на текущей задаче
  const [boom,   setBoom]   = useState(0);
  const inputRef = useRef();

  const task = pool[idx % pool.length];
  const poolLen = pool.length;

  const next = useCallback(() => {
    setIdx(i => i + 1);
    setAns(''); setStatus(null); setTries(0);
    setTimeout(() => inputRef.current?.focus(), 80);
  }, []);

  const check = () => {
    const val = parseFloat(ans.replace(',', '.'));
    if (isNaN(val)) return;
    const ok = Math.abs(val - task.a) < 0.56;
    if (ok) {
      setStatus('correct'); setBoom(c => c + 1);
      // ФИНАЛИЗАЦИЯ — задача решена
      setProgress(p => ({ ...p, total: p.total+1, correct: p.correct+1, streak: p.streak+1, best: Math.max(p.best, p.streak+1) }));
    } else {
      const nt = tries + 1; setTries(nt);
      if (nt >= 3) {
        setStatus('reveal');
        // ФИНАЛИЗАЦИЯ — задача провалена
        setProgress(p => ({ ...p, total: p.total+1, streak: 0 }));
      } else {
        setStatus('wrong');
        setTimeout(() => setStatus(null), 1800);
      }
    }
  };

  const acc = progress.total ? Math.round(progress.correct / progress.total * 100) : 0;
  const subLabel = SUBTOPICS.find(s => s.id === subId)?.label || 'Все темы';

  // номер текущей задачи в пуле (0-based)
  const taskNum = idx % poolLen;

  return (
    <div style={{ maxWidth:680, margin:'0 auto', padding:'0 16px' }}>
      <Confetti t={boom}/>

      {/* прогресс */}
      <div className="card" style={{ padding:'13px 16px', marginBottom:13 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8, gap:8, flexWrap:'wrap' }}>
          <div>
            <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.85rem' }}>Прогресс</div>
            <div style={{ color:'var(--t3)', fontSize:'.65rem', marginTop:1 }}>{subLabel}</div>
          </div>
          <div style={{ display:'flex', gap:12 }}>
            {[{l:'Задач',v:progress.total},{l:'Верно',v:progress.correct,c:'var(--grn)'},{l:'%',v:acc+'%',c:acc>=70?'var(--grn)':acc>=40?'var(--gold)':'var(--red)'},{l:'🔥',v:progress.streak}].map(s => (
              <div key={s.l} style={{ textAlign:'center' }}>
                <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'.95rem', fontWeight:600, color:s.c||'var(--t)' }}>{s.v}</div>
                <div style={{ color:'var(--t3)', fontSize:'.58rem', marginTop:1 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="pt"><div className="pf" style={{ width:`${acc}%` }}/></div>
        <div style={{ display:'flex', justifyContent:'space-between', marginTop:5 }}>
          <span style={{ color:'var(--t3)', fontSize:'.62rem', fontFamily:'JetBrains Mono,monospace' }}>
            Задача {taskNum+1} из {poolLen}
          </span>
          <button onClick={() => setProgress({total:0,correct:0,streak:0,best:0})} style={{ background:'none', color:'var(--t3)', fontSize:'.62rem', textDecoration:'underline' }}>Сбросить</button>
        </div>
      </div>

      {/* карточка задачи */}
      <div key={`${subId}-${idx}`} className="card pop" style={{ padding:'18px', marginBottom:12, borderColor:status==='correct'?'rgba(61,220,151,.4)':status==='reveal'?'rgba(255,181,71,.35)':'var(--b)', transition:'border-color .3s' }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:11 }}>
          <span style={{ background:'rgba(91,142,255,.1)', border:'1px solid rgba(91,142,255,.2)', color:'var(--blue)', borderRadius:100, padding:'3px 10px', fontSize:'.62rem', fontFamily:'JetBrains Mono,monospace' }}>
            #{progress.total + (status && status!=='wrong' ? 0 : 1)}
          </span>
          <div style={{ display:'flex', gap:6, alignItems:'center' }}>
            {tries > 0 && status !== 'correct' && status !== 'reveal' && (
              <span style={{ background:'rgba(255,90,90,.1)', border:'1px solid rgba(255,90,90,.2)', color:'var(--red)', borderRadius:100, padding:'3px 10px', fontSize:'.62rem', fontFamily:'JetBrains Mono,monospace' }}>
                ошибок: {tries}/3
              </span>
            )}
            <span className="tag tag-src">СдамГИА</span>
          </div>
        </div>

        {/* рисунок к задаче (если есть) */}
        {task.fig && (
          <div className="prob-fig">{task.fig}</div>
        )}

        <p style={{ fontSize:'1rem', lineHeight:1.85, marginBottom:16 }}>{task.q}</p>

        {/* ввод ответа */}
        {status !== 'reveal' && status !== 'correct' && (
          <div style={{ display:'flex', gap:8, alignItems:'center' }}>
            <input ref={inputRef} type="number" step="0.5" value={ans}
              onChange={e => setAns(e.target.value)}
              onKeyDown={e => e.key==='Enter' && ans && check()}
              placeholder="Ответ…"
              style={{ flex:1, minWidth:0, borderColor:status==='wrong'?'var(--red)':undefined }}
              autoFocus/>
            <button className="btn" onClick={check} disabled={!ans} style={{ flex:'0 0 auto', padding:'13px 18px', fontSize:'.9rem' }}>
              ✓
            </button>
          </div>
        )}

        {status==='wrong' && (
          <div className="co cr fi" style={{ marginTop:10 }}>
            ✗ Неверно. Попробуй ещё — подсказка: {task.h}
          </div>
        )}

        {status==='correct' && (
          <div className="fi">
            <div className="co cg" style={{ marginTop:0, fontSize:'.9rem' }}>
              ✓ Верно!{progress.streak > 1 ? ` 🔥 Серия: ${progress.streak}` : ''}
            </div>
            <button className="btn" onClick={next} style={{ marginTop:10, width:'100%', fontSize:'.9rem' }}>
              Следующая задача →
            </button>
          </div>
        )}

        {status==='reveal' && (
          <div className="fi">
            <div className="co cy" style={{ marginTop:0 }}>3 ошибки — показываем разбор:</div>
            <div style={{ background:'var(--bg2)', border:'1px solid var(--b2)', borderRadius:8, padding:'12px 14px', marginTop:8, fontSize:'.85rem', lineHeight:1.9, color:'var(--t2)' }} dangerouslySetInnerHTML={{ __html:'📖 &nbsp;'+task.s }}/>
            <button className="btn" onClick={next} style={{ marginTop:10, width:'100%', fontSize:'.9rem' }}>
              Понял, следующая →
            </button>
          </div>
        )}

        {!status && (
          <details style={{ marginTop:10 }}>
            <summary style={{ cursor:'pointer', color:'var(--t3)', fontSize:'.8rem', listStyle:'none', padding:'4px 0', touchAction:'manipulation' }}>💡 Подсказка</summary>
            <div className="co cb" style={{ marginTop:5 }}>{task.h}</div>
          </details>
        )}
      </div>

      {/* черновик */}
      <ScratchPad/>

      {!status && (
        <button onClick={next} style={{ background:'none', color:'var(--t3)', fontSize:'.76rem', textDecoration:'underline', display:'block', margin:'10px auto 0', padding:'6px 16px', touchAction:'manipulation' }}>
          Пропустить задачу
        </button>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   TASK 1 PAGE — выбор подтемы + теория/практика
═══════════════════════════════════════════════════════════ */
const Task1Page = ({ progress, setProgress }) => {
  const [sub,  setSub]  = useState(null);
  const [view, setView] = useState('theory');

  const select = id => { setSub(id); setView(id==='mixed'?'practice':'theory'); window.scrollTo(0,0); };
  const goBack = () => { setSub(null); window.scrollTo(0,0); };

  if (!sub) return (
    <div style={{ paddingTop:70, padding:'70px 16px 72px', maxWidth:860, margin:'0 auto' }}>
      <div className="fu" style={{ marginBottom:24 }}>
        <div style={{ color:'var(--blue)', fontSize:'.65rem', fontFamily:'JetBrains Mono,monospace', letterSpacing:'.12em', textTransform:'uppercase', marginBottom:5 }}>Задание №1 · Планиметрия · 1 балл</div>
        <h2 style={{ fontSize:'clamp(1.3rem,3vw,1.9rem)', marginBottom:7 }}>Выбери тему</h2>
        <p style={{ color:'var(--t2)', fontSize:'.84rem', maxWidth:460, lineHeight:1.7 }}>
          Открой тему — теория с рисунком к каждой формуле, затем задачи из банка СдамГИА с черновиком.
        </p>
      </div>

      {/* смешанная практика */}
      <button onClick={() => select('mixed')} className="card" style={{ width:'100%', padding:'16px 18px', textAlign:'left', marginBottom:16, borderColor:'rgba(155,109,255,.3)', cursor:'pointer', background:'linear-gradient(135deg,rgba(91,142,255,.07),rgba(155,109,255,.07))', transition:'all .2s', animation:'fadeUp .38s ease both .05s', touchAction:'manipulation' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ fontSize:'1.6rem', flexShrink:0 }}>🔀</div>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'1rem', marginBottom:2 }}>Общая практика</div>
            <div style={{ color:'var(--t2)', fontSize:'.82rem' }}>Все {COUNTS.mixed} задач из 9 тем вперемешку</div>
          </div>
          <div style={{ color:'var(--vio)', fontSize:'1rem', flexShrink:0 }}>→</div>
        </div>
      </button>

      <div style={{ color:'var(--t3)', fontSize:'.65rem', fontFamily:'JetBrains Mono,monospace', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:10 }}>По темам</div>
      <div className="sg">
        {SUBTOPICS.filter(s => s.id !== 'mixed').map((s, i) => (
          <button key={s.id} onClick={() => select(s.id)} className="card" style={{ padding:'14px 12px', textAlign:'left', cursor:'pointer', animation:`fadeUp .38s ease both ${.04*i+.08}s`, transition:'all .2s', position:'relative', overflow:'hidden', touchAction:'manipulation' }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:s.color, opacity:.75 }}/>
            <div style={{ fontSize:'1.2rem', marginBottom:6 }}>{s.icon}</div>
            <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.77rem', marginBottom:3 }}>{s.label}</div>
            <div style={{ color:'var(--t3)', fontSize:'.66rem', lineHeight:1.35, marginBottom:9 }}>{s.desc}</div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div style={{ display:'flex', gap:4 }}>
                <span style={{ fontSize:'.6rem', color:s.color, background:`${s.color}18`, border:`1px solid ${s.color}33`, borderRadius:100, padding:'2px 7px', fontFamily:'JetBrains Mono,monospace' }}>📖</span>
                <span style={{ fontSize:'.6rem', color:'var(--t3)', background:'rgba(255,255,255,.04)', border:'1px solid var(--b)', borderRadius:100, padding:'2px 7px', fontFamily:'JetBrains Mono,monospace' }}>🧮</span>
              </div>
              <span style={{ fontSize:'.6rem', color:'var(--t3)', fontFamily:'JetBrains Mono,monospace' }}>{COUNTS[s.id]} задач</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const cur = SUBTOPICS.find(s => s.id === sub);
  const tabs = [{id:'theory',l:'📖 Теория'},{id:'practice',l:'🧮 Задачи'}];

  return (
    <div style={{ paddingTop:56 }}>
      {/* tab bar */}
      {sub !== 'mixed' ? (
        <div style={{ position:'sticky', top:56, zIndex:400, background:'rgba(9,9,15,.92)', backdropFilter:'blur(20px)', borderBottom:'1px solid var(--b)', padding:'0 16px' }}>
          <div style={{ maxWidth:700, margin:'0 auto', display:'flex', alignItems:'center', gap:0, overflowX:'auto' }}>
            <button onClick={goBack} style={{ background:'none', color:'var(--t3)', fontSize:'.78rem', padding:'12px 12px 12px 0', marginRight:4, fontFamily:'Inter,sans-serif', whiteSpace:'nowrap', flexShrink:0, touchAction:'manipulation' }}>← Темы</button>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setView(t.id)} style={{ background:'none', padding:'12px 14px', fontFamily:'Inter,sans-serif', fontSize:'.85rem', borderBottom:`2px solid ${view===t.id?'var(--blue)':'transparent'}`, color:view===t.id?'var(--t)':'var(--t3)', fontWeight:view===t.id?600:400, transition:'all .2s', whiteSpace:'nowrap', flexShrink:0, touchAction:'manipulation' }}>{t.l}</button>
            ))}
            <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:6, flexShrink:0, paddingLeft:8 }}>
              <span style={{ color:'var(--t3)', fontSize:'.66rem', fontFamily:'JetBrains Mono,monospace' }}>{progress.correct}/{progress.total}</span>
              <div style={{ width:50 }} className="pt"><div className="pf" style={{ width:`${progress.total?progress.correct/progress.total*100:0}%` }}/></div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ borderBottom:'1px solid var(--b)', padding:'72px 16px 12px', maxWidth:680, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:8 }}>
          <div>
            <button onClick={goBack} style={{ background:'none', color:'var(--t3)', fontSize:'.76rem', marginBottom:4, fontFamily:'Inter,sans-serif', display:'block', touchAction:'manipulation' }}>← Темы</button>
            <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.96rem' }}>🔀 Общая практика</div>
            <div style={{ color:'var(--t3)', fontSize:'.7rem' }}>{COUNTS.mixed} задач</div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <span style={{ color:'var(--t3)', fontSize:'.66rem', fontFamily:'JetBrains Mono,monospace' }}>{progress.correct}/{progress.total}</span>
            <div style={{ width:50 }} className="pt"><div className="pf" style={{ width:`${progress.total?progress.correct/progress.total*100:0}%` }}/></div>
          </div>
        </div>
      )}

      <div style={{ padding:'24px 16px 100px', minHeight:'80svh' }}>
        {sub==='mixed'
          ? <Practice subId="mixed" progress={progress} setProgress={setProgress}/>
          : view==='theory'
            ? <TheoryView sub={cur} onPractice={() => setView('practice')}/>
            : <Practice subId={sub} progress={progress} setProgress={setProgress}/>
        }
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   FOOTER + APP
═══════════════════════════════════════════════════════════ */
const Footer = () => (
  <footer style={{ borderTop:'1px solid var(--b)', padding:'20px 16px', textAlign:'center', color:'var(--t3)', fontSize:'.7rem' }}>
    <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, marginBottom:4, color:'var(--t2)', fontSize:'.8rem' }}>ЕГЭ Математика 2026 · Профильный уровень</div>
    <div style={{ marginBottom:6 }}>Задачи в стиле открытого банка ФИПИ</div>
    <a href="https://math-ege.sdamgia.ru" target="_blank" rel="noopener noreferrer" style={{ color:'var(--teal)', textDecoration:'none', fontFamily:'JetBrains Mono,monospace', fontSize:'.68rem' }}>
      math-ege.sdamgia.ru ↗
    </a>
  </footer>
);

export default function App() {
  const [page, setPage] = useState('home');
  const [sub,  setSub]  = useState(null);
  const [progress, setProgress] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ege26_v5')||'null') || {total:0,correct:0,streak:0,best:0}; }
    catch { return {total:0,correct:0,streak:0,best:0}; }
  });
  useEffect(() => {
    try { localStorage.setItem('ege26_v5', JSON.stringify(progress)); } catch {}
  }, [progress]);

  const go1 = () => { setPage('task1'); setSub(null); window.scrollTo(0,0); };

  return (
    <>
      <GS/>
      <Nav page={page} setPage={setPage} sub={sub} onBack={() => setSub(null)}/>
      {page==='home' && (
        <>
          <Hero onScroll={() => document.getElementById('tasks')?.scrollIntoView({behavior:'smooth'})}/>
          <TasksGrid onSelect={n => n===1 && go1()}/>
          <Footer/>
        </>
      )}
      {page==='task1' && (
        <>
          <Task1Page progress={progress} setProgress={setProgress}/>
          <Footer/>
        </>
      )}
    </>
  );
}
