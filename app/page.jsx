"use client";
import { useState, useEffect, useCallback, useRef } from "react";

// ═══════════════════════ STYLES ═══════════════════════════
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Caveat:wght@400;500;600&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      --bg:#09090f;--bg2:#111118;--s:#1e1e2e;--s2:#252535;
      --b:rgba(255,255,255,.07);--b2:rgba(255,255,255,.13);
      --t:#e2e4f0;--t2:#8890b0;--t3:#4a5070;
      --blue:#5b8eff;--vio:#9b6dff;--grn:#3ddc97;
      --red:#ff5a5a;--gold:#ffb547;--teal:#2dd4bf;
      --r:14px;--rs:9px;
      --nb:#fdfcf4;--nl:rgba(176,200,240,.5);--nr:rgba(240,100,100,.4);
    }
    html{scroll-behavior:smooth}
    body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--t);line-height:1.6;overflow-x:hidden}
    ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:var(--s2);border-radius:2px}
    h1,h2,h3,h4{font-family:'Syne',sans-serif;letter-spacing:-.02em}
    button{cursor:pointer;border:none;outline:none;font-family:inherit}
    @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes pop{0%{transform:scale(.93);opacity:0}100%{transform:scale(1);opacity:1}}
    @keyframes fall{to{transform:translateY(108vh) rotate(540deg);opacity:0}}
    .fu{animation:fadeUp .45s ease both}.fi{animation:fadeIn .3s ease both}
    .pop{animation:pop .35s cubic-bezier(.34,1.56,.64,1) both}
    .card{background:var(--s);border:1px solid var(--b);border-radius:var(--r)}
    .grad{background:linear-gradient(135deg,var(--blue),var(--vio));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .btn{background:linear-gradient(135deg,var(--blue),var(--vio));color:#fff;border-radius:var(--rs);padding:11px 24px;font-size:.88rem;font-weight:600;font-family:'Inter',sans-serif;transition:transform .18s,box-shadow .18s,filter .18s;display:inline-block}
    .btn:hover{transform:translateY(-2px);box-shadow:0 6px 22px rgba(91,142,255,.38);filter:brightness(1.07)}
    .btn:active{transform:none}.btn:disabled{opacity:.38;pointer-events:none}
    .bg{background:var(--s);border:1px solid var(--b2);color:var(--t2);border-radius:var(--rs);padding:9px 18px;font-size:.82rem;transition:all .18s}
    .bg:hover{border-color:var(--blue);color:var(--t)}
    input[type=number]{-moz-appearance:textfield;background:var(--bg2);border:1.5px solid var(--b2);border-radius:var(--rs);color:var(--t);font-family:'JetBrains Mono',monospace;font-size:1rem;padding:11px 16px;outline:none;width:100%;transition:border-color .2s,box-shadow .2s}
    input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none}
    input[type=number]:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(91,142,255,.14)}
    .pt{height:5px;border-radius:3px;background:var(--s2);overflow:hidden}
    .pf{height:100%;border-radius:3px;background:linear-gradient(90deg,var(--blue),var(--vio));transition:width .5s cubic-bezier(.34,1.56,.64,1)}
    .conf{position:fixed;border-radius:2px;pointer-events:none;z-index:9997;animation:fall 2.5s ease-in forwards}
    .co{border-radius:var(--rs);padding:10px 14px;margin:8px 0;border:1px solid;font-size:.83rem;line-height:1.6}
    .cb{background:rgba(91,142,255,.07);border-color:rgba(91,142,255,.28);color:#aac4ff}
    .cg{background:rgba(61,220,151,.07);border-color:rgba(61,220,151,.28);color:#7dffc9}
    .cr{background:rgba(255,90,90,.07);border-color:rgba(255,90,90,.28);color:#ffaaaa}
    .cy{background:rgba(255,181,71,.07);border-color:rgba(255,181,71,.28);color:#ffd080}
    .f{background:var(--bg2);border:1px solid var(--b2);border-left:3px solid var(--blue);border-radius:0 var(--rs) var(--rs) 0;padding:9px 15px;font-family:'JetBrains Mono',monospace;font-size:.84rem;color:#90b8ff;margin:7px 0}
    /* ── GRID NOTEBOOK ── */
    .nb{background-color:var(--nb);background-image:linear-gradient(var(--nl) 1px,transparent 1px),linear-gradient(90deg,var(--nl) 1px,transparent 1px);background-size:20px 20px;border-radius:12px;box-shadow:0 4px 32px rgba(0,0,0,.5);position:relative;overflow:hidden;border:1px solid rgba(200,214,245,.25)}
    .nb-holes{position:absolute;top:0;bottom:0;left:0;width:44px;display:flex;flex-direction:column;justify-content:space-around;align-items:center;padding:24px 0;z-index:3;background:rgba(253,252,244,.6);border-right:1px solid var(--nl)}
    .nb-hole{width:14px;height:14px;border-radius:50%;background:var(--bg);border:1px solid rgba(0,0,0,.12);box-shadow:inset 0 1px 2px rgba(0,0,0,.2)}
    .nb-margin{position:absolute;top:0;bottom:0;left:44px;width:1px;background:var(--nr);z-index:2}
    .nb-body{position:relative;z-index:1;padding:18px 18px 18px 60px}
    /* ── SCRATCHPAD ── */
    .sp-wrap{background:var(--nb);border-radius:12px;box-shadow:0 4px 32px rgba(0,0,0,.5);border:1px solid rgba(200,214,245,.25);overflow:hidden}
    .sp-bar{background:rgba(253,252,244,.97);border-bottom:2px solid var(--nl);padding:8px 12px;display:flex;align-items:center;gap:6px;flex-wrap:wrap;overflow-x:auto;-webkit-overflow-scrolling:touch}
    .sp-bar::-webkit-scrollbar{height:3px}.sp-bar::-webkit-scrollbar-thumb{background:var(--nl)}
    .sp-btn{padding:5px 10px;border-radius:6px;background:transparent;border:1px solid var(--nl);color:#384060;font-size:.78rem;font-family:'Inter',sans-serif;font-weight:500;white-space:nowrap;transition:all .15s;min-height:30px;touch-action:manipulation}
    .sp-btn.act{background:var(--blue);border-color:var(--blue);color:#fff}
    /* subtopic / task grids */
    .sg{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:10px}
    .tg{display:grid;grid-template-columns:repeat(auto-fill,minmax(192px,1fr));gap:11px}
    /* ── MOBILE ── */
    @media(max-width:640px){
      .sg{grid-template-columns:1fr 1fr}
      .tg{grid-template-columns:1fr 1fr}
      .nb-body{padding:14px 12px 14px 54px}
      .nb-ex-row{flex-direction:column!important}
      .nb-ex-fig{display:none}
      .sp-bar{gap:4px;padding:6px 8px}
    }
    @media(max-width:400px){
      .sg{grid-template-columns:1fr}
    }
  `}</style>
);

// ═══════════════════════ CONFETTI ════════════════════════
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

// ═══════════════════════ NAVBAR ══════════════════════════
const Nav = ({ page, setPage, hasSub, onBack }) => {
  const [sc, setSc] = useState(false);
  useEffect(() => { const h = () => setSc(window.scrollY > 16); window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h); }, []);
  return (
    <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:500, padding:sc?'10px 20px':'17px 20px', background:sc?'rgba(9,9,15,.93)':'transparent', backdropFilter:sc?'blur(18px)':'none', borderBottom:sc?'1px solid var(--b)':'none', display:'flex', alignItems:'center', justifyContent:'space-between', transition:'all .3s' }}>
      <button onClick={() => { setPage('home'); onBack(); }} style={{ background:'none', display:'flex', alignItems:'center', gap:8 }}>
        <div style={{ width:28, height:28, borderRadius:7, background:'linear-gradient(135deg,var(--blue),var(--vio))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, color:'#fff', fontFamily:'Syne,sans-serif', fontWeight:700 }}>∑</div>
        <span style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.88rem' }}>ЕГЭ Математика <span style={{ color:'var(--t3)' }}>2026</span></span>
      </button>
      <div style={{ display:'flex', gap:6 }}>
        {page==='task1' && hasSub && <button className="bg" onClick={onBack} style={{ padding:'7px 14px', fontSize:'.8rem' }}>← Темы</button>}
        {page!=='home' && <button className="bg" onClick={() => { setPage('home'); onBack(); }} style={{ padding:'7px 14px', fontSize:'.8rem' }}>Все задания</button>}
        {page==='task1' && <span style={{ background:'rgba(91,142,255,.13)', border:'1px solid rgba(91,142,255,.28)', color:'var(--blue)', borderRadius:7, padding:'6px 11px', fontSize:'.7rem', fontFamily:'JetBrains Mono,monospace', display:'flex', alignItems:'center' }}>№1</span>}
      </div>
    </nav>
  );
};

// ═══════════════════════ HERO ════════════════════════════
const Hero = ({ onScroll }) => (
  <section style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'110px 20px 70px', position:'relative', overflow:'hidden' }}>
    <div style={{ position:'absolute', width:600, height:600, borderRadius:'50%', top:-100, left:'5%', pointerEvents:'none', background:'radial-gradient(circle,rgba(91,142,255,.1) 0%,transparent 70%)' }}/>
    <div style={{ position:'absolute', width:400, height:400, borderRadius:'50%', bottom:0, right:'10%', pointerEvents:'none', background:'radial-gradient(circle,rgba(155,109,255,.08) 0%,transparent 70%)' }}/>
    <div style={{ position:'absolute', inset:0, opacity:.03, pointerEvents:'none', backgroundImage:'linear-gradient(var(--t) 1px,transparent 1px),linear-gradient(90deg,var(--t) 1px,transparent 1px)', backgroundSize:'60px 60px' }}/>
    <div className="fu" style={{ animationDelay:'.1s', marginBottom:20 }}>
      <span style={{ background:'rgba(91,142,255,.1)', border:'1px solid rgba(91,142,255,.25)', color:'var(--blue)', borderRadius:100, padding:'5px 15px', fontSize:'.7rem', fontFamily:'JetBrains Mono,monospace', letterSpacing:'.1em', textTransform:'uppercase' }}>🎯 Профильный уровень · ФИПИ 2026</span>
    </div>
    <h1 className="fu" style={{ animationDelay:'.17s', fontSize:'clamp(1.9rem,5.5vw,4.5rem)', fontWeight:800, textAlign:'center', maxWidth:780, marginBottom:16, lineHeight:1.1 }}>Подготовка к ЕГЭ по <span className="grad">математике</span></h1>
    <p className="fu" style={{ animationDelay:'.26s', color:'var(--t2)', fontSize:'clamp(.88rem,1.8vw,1.1rem)', textAlign:'center', maxWidth:500, marginBottom:40, lineHeight:1.75 }}>19 заданий · Теория с примерами · Задачи с ФИПИ · Черновик в клетку</p>
    <div className="fu" style={{ animationDelay:'.35s', display:'flex', gap:10, flexWrap:'wrap', justifyContent:'center' }}>
      <button className="btn" onClick={onScroll} style={{ padding:'13px 28px' }}>Начать подготовку →</button>
      <a href="#tasks" style={{ background:'var(--s)', border:'1px solid var(--b2)', color:'var(--t2)', borderRadius:'var(--rs)', padding:'13px 20px', fontSize:'.88rem', textDecoration:'none', transition:'all .18s' }} onMouseOver={e=>{e.currentTarget.style.borderColor='var(--blue)';e.currentTarget.style.color='var(--t)'}} onMouseOut={e=>{e.currentTarget.style.borderColor='var(--b2)';e.currentTarget.style.color='var(--t2)'}}>Все задания</a>
    </div>
  </section>
);

// ═══════════════════════ 19 TASKS GRID ═══════════════════
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
  <section id="tasks" style={{ padding:'60px 20px 80px', maxWidth:1180, margin:'0 auto' }}>
    <div className="fu" style={{ marginBottom:32 }}>
      <div style={{ color:'var(--blue)', fontSize:'.68rem', fontFamily:'JetBrains Mono,monospace', letterSpacing:'.14em', textTransform:'uppercase', marginBottom:7 }}>Структура ЕГЭ · ФИПИ 2026</div>
      <h2 style={{ fontSize:'clamp(1.4rem,3.5vw,2rem)', marginBottom:7 }}>Все 19 заданий</h2>
      <p style={{ color:'var(--t2)', maxWidth:460, fontSize:'.86rem' }}>Задание №1 полностью доступно — 9 подтем, 130+ задач из открытого банка ФИПИ.</p>
    </div>
    {[{label:'Часть 1 · Задания 1–12 · Краткий ответ',from:1,to:12},{label:'Часть 2 · Задания 13–19 · Развёрнутый ответ',from:13,to:19}].map(({label,from,to})=>(
      <div key={label} style={{ marginBottom:32 }}>
        <div style={{ color:'var(--t3)', fontSize:'.68rem', fontFamily:'JetBrains Mono,monospace', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:12, paddingBottom:9, borderBottom:'1px solid var(--b)' }}>{label}</div>
        <div className="tg">
          {ALL_TASKS.filter(t=>t.n>=from&&t.n<=to).map((t,i)=>(
            <button key={t.n} onClick={()=>t.ready&&onSelect(t.n)} disabled={!t.ready} className="card" style={{ padding:'15px 13px', textAlign:'left', cursor:t.ready?'pointer':'default', opacity:t.ready?1:.48, animation:`fadeUp .4s ease both ${.04*i+.05}s`, position:'relative', overflow:'hidden', borderColor:t.ready?'rgba(91,142,255,.22)':'var(--b)', transition:'all .2s' }} onMouseOver={e=>{if(t.ready){e.currentTarget.style.borderColor='rgba(91,142,255,.55)';e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 10px 30px rgba(0,0,0,.45)'}}} onMouseOut={e=>{e.currentTarget.style.borderColor=t.ready?'rgba(91,142,255,.22)':'var(--b)';e.currentTarget.style.transform='';e.currentTarget.style.boxShadow=''}}>
              {t.ready&&<div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg,var(--blue),var(--vio))' }}/>}
              <div style={{ fontSize:'1.15rem', marginBottom:6 }}>{t.icon}</div>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:3 }}>
                <span style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.8rem' }}>№{t.n}</span>
                <span style={{ fontSize:'.58rem', fontFamily:'JetBrains Mono,monospace', color:'var(--t3)', background:'var(--bg2)', border:'1px solid var(--b)', borderRadius:4, padding:'1px 5px' }}>{t.pts}б</span>
              </div>
              <div style={{ fontFamily:'Syne,sans-serif', fontWeight:600, fontSize:'.77rem', marginBottom:3 }}>{t.topic}</div>
              <div style={{ color:'var(--t3)', fontSize:'.67rem', lineHeight:1.4, marginBottom:9 }}>{t.sub}</div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:3, fontSize:'.62rem', fontFamily:'JetBrains Mono,monospace', padding:'2px 7px', borderRadius:100, background:t.ready?'rgba(61,220,151,.1)':'rgba(255,255,255,.04)', color:t.ready?'var(--grn)':'var(--t3)', border:`1px solid ${t.ready?'rgba(61,220,151,.22)':'var(--b)'}` }}>{t.ready?'● Доступно':'◌ Скоро'}</div>
            </button>
          ))}
        </div>
      </div>
    ))}
  </section>
);

// ═══════════════════════ NOTEBOOK EXAMPLE ════════════════
const NbExample = ({ condition, figure, steps, answer, color='#5b8eff' }) => (
  <div className="nb" style={{ margin:'14px 0' }}>
    <div className="nb-holes">{[...Array(5)].map((_,i)=><div key={i} className="nb-hole"/>)}</div>
    <div className="nb-margin"/>
    <div className="nb-body" style={{ fontFamily:'Caveat,cursive' }}>
      <div className="nb-ex-row" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12, marginBottom:14, flexWrap:'wrap' }}>
        <div style={{ flex:'1 1 180px', minWidth:140 }}>
          <div style={{ fontSize:'.6rem', fontFamily:'Inter,sans-serif', fontWeight:600, color:color, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:5 }}>Условие</div>
          <div style={{ fontSize:'1rem', color:'#1a2040', lineHeight:1.65 }}>{condition}</div>
        </div>
        <div className="nb-ex-fig" style={{ flex:'0 0 auto' }}>{figure}</div>
      </div>
      <div style={{ height:1, background:color, opacity:.2, marginBottom:12, marginLeft:-14 }}/>
      <div style={{ fontSize:'.6rem', fontFamily:'Inter,sans-serif', fontWeight:600, color:color, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:8 }}>Решение</div>
      {steps.map((step, i) => (
        <div key={i} style={{ display:'flex', gap:10, marginBottom:step.hl?10:5, alignItems:'flex-start' }}>
          <div style={{ flex:'0 0 22px', height:22, borderRadius:'50%', background:step.hl?color:`${color}33`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.7rem', color:step.hl?'#fff':color, fontFamily:'Inter,sans-serif', fontWeight:600, marginTop:2 }}>{i+1}</div>
          <div style={{ flex:1, background:step.hl?`${color}14`:'transparent', borderRadius:7, padding:step.hl?'7px 11px':'2px 0', border:step.hl?`1px solid ${color}44`:'none' }}>
            <div style={{ fontSize:'1rem', color:'#1a2040', lineHeight:1.5 }}>{step.t}</div>
            {step.f && <div style={{ fontSize:'1.1rem', color:color, fontWeight:600, marginTop:2 }}>{step.f}</div>}
          </div>
        </div>
      ))}
      <div style={{ marginTop:12, display:'inline-flex', alignItems:'center', gap:10, background:`${color}1a`, border:`2px solid ${color}`, borderRadius:9, padding:'7px 16px' }}>
        <span style={{ fontSize:'1rem', color:color, fontWeight:600 }}>Ответ:</span>
        <span style={{ fontSize:'1.1rem', color:'#1a2040', fontWeight:600 }}>{answer}</span>
      </div>
    </div>
  </div>
);

// ═══════════════════════ SVG FIGURES ═════════════════════
const FigRight = () => (
  <svg width="150" height="120" viewBox="0 0 150 120">
    <polygon points="20,105 20,25 115,105" fill="#e8f0ff" stroke="#5b8eff" strokeWidth="1.5"/>
    <rect x="20" y="93" width="11" height="11" fill="none" stroke="#5b8eff" strokeWidth="1.2"/>
    <text x="3" y="68" fill="#ff5a5a" fontSize="13" fontFamily="Caveat,cursive" fontWeight="600">a=3</text>
    <text x="55" y="118" fill="#ff5a5a" fontSize="13" fontFamily="Caveat,cursive" fontWeight="600">b=4</text>
    <text x="55" y="62" fill="#9b6dff" fontSize="13" fontFamily="Caveat,cursive" fontWeight="600">c=?</text>
    <line x1="20" y1="25" x2="115" y2="105" stroke="#9b6dff" strokeWidth="2" strokeDasharray="4,2"/>
  </svg>
);
const FigIso = () => (
  <svg width="140" height="130" viewBox="0 0 140 130">
    <polygon points="70,12 15,118 125,118" fill="#f0e8ff" stroke="#9b6dff" strokeWidth="1.5"/>
    <line x1="40" y1="63" x2="46" y2="69" stroke="#9b6dff" strokeWidth="1.5"/>
    <line x1="100" y1="63" x2="94" y2="69" stroke="#9b6dff" strokeWidth="1.5"/>
    <line x1="70" y1="12" x2="70" y2="118" stroke="#ff5a5a" strokeWidth="1.2" strokeDasharray="3,2"/>
    <rect x="70" y="107" width="9" height="9" fill="none" stroke="#ff5a5a" strokeWidth="1"/>
    <path d="M 58,30 A 16,16 0 0,1 82,30" fill="none" stroke="#ffb547" strokeWidth="1.5"/>
    <text x="60" y="47" fill="#ffb547" fontSize="11" fontFamily="Caveat,cursive">α</text>
    <text x="72" y="74" fill="#ff5a5a" fontSize="12" fontFamily="Caveat,cursive">h</text>
  </svg>
);
const FigTrap = () => (
  <svg width="160" height="120" viewBox="0 0 160 120">
    <polygon points="30,105 22,28 118,28 145,105" fill="#fff8e8" stroke="#ffb547" strokeWidth="1.5"/>
    <line x1="52" y1="28" x2="52" y2="105" stroke="#ff5a5a" strokeWidth="1.2" strokeDasharray="3,2"/>
    <rect x="52" y="94" width="9" height="9" fill="none" stroke="#ff5a5a" strokeWidth="1"/>
    <line x1="26" y1="66" x2="132" y2="66" stroke="#9b6dff" strokeWidth="1.5" strokeDasharray="5,3"/>
    <text x="58" y="24" fill="#ffb547" fontSize="11" fontFamily="Caveat,cursive">a=5</text>
    <text x="70" y="118" fill="#ffb547" fontSize="11" fontFamily="Caveat,cursive">b=13</text>
    <text x="54" y="56" fill="#ff5a5a" fontSize="12" fontFamily="Caveat,cursive">h=6</text>
    <text x="60" y="63" fill="#9b6dff" fontSize="10" fontFamily="Caveat,cursive">m=(a+b)/2</text>
  </svg>
);
const FigIns = () => (
  <svg width="145" height="145" viewBox="0 0 145 145">
    <circle cx="72" cy="72" r="52" fill="#e8f8ff" stroke="#2dd4bf" strokeWidth="1.5"/>
    <line x1="28" y1="48" x2="116" y2="48" stroke="#5b8eff" strokeWidth="1.5"/>
    <line x1="28" y1="48" x2="72" y2="122" stroke="#9b6dff" strokeWidth="1.5"/>
    <line x1="116" y1="48" x2="72" y2="122" stroke="#9b6dff" strokeWidth="1.5"/>
    <line x1="72" y1="72" x2="28" y2="48" stroke="#ff5a5a" strokeWidth="1" strokeDasharray="3,2"/>
    <line x1="72" y1="72" x2="116" y2="48" stroke="#ff5a5a" strokeWidth="1" strokeDasharray="3,2"/>
    <path d="M 62,115 A 12,12 0 0,1 82,115" fill="none" stroke="#9b6dff" strokeWidth="1.5"/>
    <path d="M 64,79 A 14,14 0 0,1 80,79" fill="none" stroke="#ff5a5a" strokeWidth="1.5"/>
    <text x="20" y="45" fill="#5b8eff" fontSize="12" fontFamily="Caveat,cursive">A</text>
    <text x="118" y="45" fill="#5b8eff" fontSize="12" fontFamily="Caveat,cursive">B</text>
    <text x="67" y="136" fill="#9b6dff" fontSize="12" fontFamily="Caveat,cursive">C</text>
    <text x="62" y="110" fill="#9b6dff" fontSize="10" fontFamily="Caveat,cursive">β</text>
    <text x="62" y="94" fill="#ff5a5a" fontSize="10" fontFamily="Caveat,cursive">2β</text>
  </svg>
);
const FigTang = () => (
  <svg width="155" height="148" viewBox="0 0 155 148">
    <circle cx="72" cy="78" r="46" fill="#fffbe8" stroke="#ffb547" strokeWidth="1.5"/>
    <circle cx="72" cy="78" r="2.5" fill="#ffb547"/>
    <circle cx="145" cy="78" r="3" fill="#ff5a5a"/>
    <line x1="145" y1="78" x2="90" y2="34" stroke="#9b6dff" strokeWidth="1.5"/>
    <line x1="145" y1="78" x2="90" y2="122" stroke="#9b6dff" strokeWidth="1.5"/>
    <line x1="72" y1="78" x2="90" y2="34" stroke="#ff5a5a" strokeWidth="1" strokeDasharray="3,2"/>
    <line x1="72" y1="78" x2="90" y2="122" stroke="#ff5a5a" strokeWidth="1" strokeDasharray="3,2"/>
    <text x="147" y="76" fill="#ff5a5a" fontSize="12" fontFamily="Caveat,cursive">M</text>
    <text x="66" y="95" fill="#ffb547" fontSize="11" fontFamily="Caveat,cursive">O</text>
    <text x="93" y="30" fill="#9b6dff" fontSize="12" fontFamily="Caveat,cursive">A</text>
    <text x="93" y="134" fill="#9b6dff" fontSize="12" fontFamily="Caveat,cursive">B</text>
    <text x="112" y="60" fill="#9b6dff" fontSize="10" fontFamily="Caveat,cursive">t</text>
  </svg>
);
const FigInscCirc = () => (
  <svg width="150" height="145" viewBox="0 0 150 145">
    <polygon points="75,10 15,130 135,130" fill="#fff0f8" stroke="#ff8adb" strokeWidth="1.5"/>
    <circle cx="75" cy="92" r="36" fill="none" stroke="#9b6dff" strokeWidth="1.5" strokeDasharray="4,2"/>
    <line x1="75" y1="92" x2="75" y2="130" stroke="#ff5a5a" strokeWidth="1.2" strokeDasharray="2,2"/>
    <rect x="75" y="122" width="7" height="7" fill="none" stroke="#ff5a5a" strokeWidth="1"/>
    <text x="71" y="8" fill="#1a2040" fontSize="12" fontFamily="Caveat,cursive">A</text>
    <text x="5" y="140" fill="#1a2040" fontSize="12" fontFamily="Caveat,cursive">B</text>
    <text x="137" y="140" fill="#1a2040" fontSize="12" fontFamily="Caveat,cursive">C</text>
    <text x="78" y="112" fill="#ff5a5a" fontSize="12" fontFamily="Caveat,cursive">r</text>
  </svg>
);
const FigCirc = () => (
  <svg width="150" height="148" viewBox="0 0 150 148">
    <circle cx="75" cy="72" r="56" fill="#f0fff4" stroke="#3ddc97" strokeWidth="1.5"/>
    <polygon points="75,16 22,126 128,126" fill="rgba(61,220,151,.12)" stroke="#3ddc97" strokeWidth="1.5"/>
    <circle cx="75" cy="72" r="3" fill="#3ddc97"/>
    <line x1="75" y1="72" x2="75" y2="16" stroke="#ff5a5a" strokeWidth="1.2" strokeDasharray="3,2"/>
    <text x="71" y="13" fill="#1a2040" fontSize="12" fontFamily="Caveat,cursive">A</text>
    <text x="10" y="138" fill="#1a2040" fontSize="12" fontFamily="Caveat,cursive">B</text>
    <text x="132" y="138" fill="#1a2040" fontSize="12" fontFamily="Caveat,cursive">C</text>
    <text x="78" y="70" fill="#3ddc97" fontSize="11" fontFamily="Caveat,cursive">O</text>
    <text x="78" y="44" fill="#ff5a5a" fontSize="12" fontFamily="Caveat,cursive">R</text>
  </svg>
);
const FigParal = () => (
  <svg width="160" height="118" viewBox="0 0 160 118">
    <polygon points="28,105 55,22 138,22 111,105" fill="#e8fff4" stroke="#3ddc97" strokeWidth="1.5"/>
    <line x1="55" y1="22" x2="55" y2="105" stroke="#ff5a5a" strokeWidth="1.2" strokeDasharray="3,2"/>
    <rect x="55" y="94" width="9" height="9" fill="none" stroke="#ff5a5a" strokeWidth="1"/>
    <text x="55" y="116" fill="#1a2040" fontSize="13" fontFamily="Caveat,cursive" fontWeight="600">a</text>
    <text x="92" y="18" fill="#1a2040" fontSize="13" fontFamily="Caveat,cursive" fontWeight="600">a</text>
    <text x="58" y="66" fill="#ff5a5a" fontSize="12" fontFamily="Caveat,cursive">h</text>
    <text x="78" y="72" fill="#3ddc97" fontSize="15" fontFamily="Caveat,cursive" fontWeight="600">S</text>
  </svg>
);
const FigGeneral = () => (
  <svg width="150" height="130" viewBox="0 0 150 130">
    <polygon points="28,115 82,12 140,115" fill="#e8f4ff" stroke="#5b8eff" strokeWidth="1.5"/>
    <path d="M 42,115 A 14,14 0 0,1 28,101" fill="none" stroke="#ffb547" strokeWidth="1.5"/>
    <path d="M 78,28 A 14,14 0 0,1 90,22" fill="none" stroke="#9b6dff" strokeWidth="1.5"/>
    <path d="M 127,115 A 14,14 0 0,0 140,101" fill="none" stroke="#3ddc97" strokeWidth="1.5"/>
    <text x="27" y="65" fill="#5b8eff" fontSize="12" fontFamily="Caveat,cursive">c</text>
    <text x="97" y="65" fill="#5b8eff" fontSize="12" fontFamily="Caveat,cursive">b</text>
    <text x="79" y="125" fill="#5b8eff" fontSize="12" fontFamily="Caveat,cursive">a</text>
    <text x="40" y="112" fill="#ffb547" fontSize="11" fontFamily="Caveat,cursive">A</text>
    <text x="78" y="46" fill="#9b6dff" fontSize="11" fontFamily="Caveat,cursive">B</text>
    <text x="124" y="112" fill="#3ddc97" fontSize="11" fontFamily="Caveat,cursive">C</text>
  </svg>
);

// ═══════════════════════ SCRATCHPAD ═════════════════════
const GRID = 20;
const ScratchPad = () => {
  const cvRef = useRef(null);
  const [tool, setTool] = useState('pen');
  const [size, setSize] = useState(2);
  const [color, setColor] = useState('#1a2040');
  const [drawing, setDrawing] = useState(false);
  const [hist, setHist] = useState([]);
  const last = useRef(null);

  const drawBg = useCallback((ctx, w, h) => {
    ctx.fillStyle = '#fdfcf4';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(176,200,240,.55)';
    ctx.lineWidth = 0.6;
    for (let x = 0; x <= w; x += GRID) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 0; y <= h; y += GRID) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
    ctx.strokeStyle = 'rgba(240,100,100,.38)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(40, 0); ctx.lineTo(40, h); ctx.stroke();
  }, []);

  const redrawGridArea = useCallback((ctx, x, y, r, w, h) => {
    ctx.strokeStyle = 'rgba(176,200,240,.55)';
    ctx.lineWidth = 0.6;
    const x0 = Math.floor((x - r) / GRID) * GRID, x1 = Math.ceil((x + r) / GRID) * GRID;
    const y0 = Math.floor((y - r) / GRID) * GRID, y1 = Math.ceil((y + r) / GRID) * GRID;
    for (let gx = x0; gx <= x1; gx += GRID) {
      if (gx < 0 || gx > w) continue;
      ctx.beginPath(); ctx.moveTo(gx, Math.max(0, y - r)); ctx.lineTo(gx, Math.min(h, y + r)); ctx.stroke();
    }
    for (let gy = y0; gy <= y1; gy += GRID) {
      if (gy < 0 || gy > h) continue;
      ctx.beginPath(); ctx.moveTo(Math.max(0, x - r), gy); ctx.lineTo(Math.min(w, x + r), gy); ctx.stroke();
    }
    if (40 >= x - r && 40 <= x + r) {
      ctx.strokeStyle = 'rgba(240,100,100,.38)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(40, Math.max(0, y - r)); ctx.lineTo(40, Math.min(h, y + r)); ctx.stroke();
    }
  }, []);

  const init = useCallback(() => {
    const cv = cvRef.current; if (!cv) return;
    const par = cv.parentElement;
    const w = Math.max(par.getBoundingClientRect().width || 600, 280);
    const h = window.innerWidth < 640 ? 240 : 300;
    cv.width = w; cv.height = h;
    drawBg(cv.getContext('2d'), w, h);
    setHist([]);
  }, [drawBg]);

  useEffect(() => {
    init();
    const ro = new ResizeObserver(init);
    if (cvRef.current?.parentElement) ro.observe(cvRef.current.parentElement);
    return () => ro.disconnect();
  }, [init]);

  const getXY = (e, cv) => {
    const r = cv.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    return { x: src.clientX - r.left, y: src.clientY - r.top };
  };
  const snap = () => { const cv = cvRef.current; if (cv) setHist(h => [...h.slice(-19), cv.toDataURL()]); };
  const start = (e) => {
    e.preventDefault(); snap();
    const cv = cvRef.current; if (!cv) return;
    const pos = getXY(e, cv); last.current = pos; setDrawing(true);
    const ctx = cv.getContext('2d');
    if (tool === 'eraser') {
      const r = size * 5;
      ctx.clearRect(pos.x - r, pos.y - r, r * 2, r * 2);
      redrawGridArea(ctx, pos.x, pos.y, r, cv.width, cv.height);
    } else {
      ctx.beginPath(); ctx.arc(pos.x, pos.y, size / 2, 0, Math.PI * 2);
      ctx.fillStyle = color; ctx.fill();
    }
  };
  const move = (e) => {
    e.preventDefault(); if (!drawing) return;
    const cv = cvRef.current; if (!cv) return;
    const pos = getXY(e, cv);
    const ctx = cv.getContext('2d');
    if (tool === 'eraser') {
      const r = size * 5;
      ctx.clearRect(pos.x - r, pos.y - r, r * 2, r * 2);
      redrawGridArea(ctx, pos.x, pos.y, r, cv.width, cv.height);
    } else {
      ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = size; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.moveTo(last.current.x, last.current.y); ctx.lineTo(pos.x, pos.y); ctx.stroke();
    }
    last.current = pos;
  };
  const stop = () => setDrawing(false);
  const undo = () => {
    if (!hist.length) return;
    const prev = hist[hist.length - 1]; setHist(h => h.slice(0, -1));
    const cv = cvRef.current; if (!cv) return;
    const img = new Image();
    img.onload = () => { const ctx = cv.getContext('2d'); ctx.clearRect(0, 0, cv.width, cv.height); ctx.drawImage(img, 0, 0); };
    img.src = prev;
  };

  const COLORS = ['#1a2040','#ff5a5a','#5b8eff','#3ddc97','#9b6dff','#ffb547','#2dd4bf'];
  const SIZES = [1, 2, 4, 7];

  return (
    <div style={{ marginTop:20 }}>
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
        <span style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.88rem' }}>📝 Черновик</span>
        <span style={{ color:'var(--t3)', fontSize:'.72rem' }}>рисуй, считай, делай схемы</span>
      </div>
      <div className="sp-wrap">
        <div className="sp-bar">
          {[{id:'pen',l:'✏️ Ручка'},{id:'eraser',l:'⬜ Ластик'}].map(t => (
            <button key={t.id} onClick={() => setTool(t.id)} className={`sp-btn${tool===t.id?' act':''}`}>{t.l}</button>
          ))}
          <div style={{ width:1, height:22, background:'var(--nl)', margin:'0 2px', flexShrink:0 }}/>
          {COLORS.map(c => (
            <button key={c} onClick={() => { setColor(c); setTool('pen'); }} style={{ width:20, height:20, borderRadius:'50%', background:c, border:color===c&&tool==='pen'?'2.5px solid #1a2040':'2px solid transparent', transition:'transform .15s', transform:color===c&&tool==='pen'?'scale(1.3)':'scale(1)', flexShrink:0, touchAction:'manipulation' }}/>
          ))}
          <div style={{ width:1, height:22, background:'var(--nl)', margin:'0 2px', flexShrink:0 }}/>
          <span style={{ color:'#384060', fontSize:'.72rem', fontFamily:'Inter,sans-serif', whiteSpace:'nowrap' }}>Размер:</span>
          {SIZES.map(s => (
            <button key={s} onClick={() => setSize(s)} style={{ width:s+13, height:s+13, borderRadius:'50%', background:size===s?color:'rgba(176,200,240,.6)', border:'none', flexShrink:0, touchAction:'manipulation', transition:'all .15s' }}/>
          ))}
          <div style={{ width:1, height:22, background:'var(--nl)', margin:'0 2px', flexShrink:0 }}/>
          <button onClick={undo} disabled={!hist.length} className="sp-btn" style={{ opacity:hist.length?1:.4 }}>↩ Отмена</button>
          <button onClick={init} className="sp-btn" style={{ borderColor:'rgba(240,100,100,.4)', color:'#c05050' }}>✕ Очистить</button>
        </div>
        <canvas ref={cvRef} style={{ display:'block', cursor:tool==='eraser'?'cell':'crosshair', touchAction:'none', width:'100%' }}
          onMouseDown={start} onMouseMove={move} onMouseUp={stop} onMouseLeave={stop}
          onTouchStart={start} onTouchMove={move} onTouchEnd={stop}/>
        <div style={{ padding:'5px 14px', background:'rgba(253,252,244,.95)', borderTop:'1px solid var(--nl)', fontSize:'.68rem', color:'#6a7090', fontFamily:'Inter,sans-serif' }}>
          Используй черновик для расчётов и схем перед вводом ответа
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════ PROBLEM BANKS ═══════════════════
// Задачи в стиле ЕГЭ по каждой подтеме
// q=вопрос, h=подсказка, s=решение (HTML), a=ответ

const BANK = {
  right: [
    {q:'В прямоугольном треугольнике катеты равны 3 и 4. Найдите гипотенузу.',h:'c = √(3²+4²)',s:'c = √(9+16) = √25 = <b>5</b>',a:5},
    {q:'В прямоугольном треугольнике катеты равны 6 и 8. Найдите гипотенузу.',h:'c = √(6²+8²)',s:'c = √(36+64) = √100 = <b>10</b>',a:10},
    {q:'В прямоугольном треугольнике катеты равны 5 и 12. Найдите гипотенузу.',h:'c = √(5²+12²)',s:'c = √(25+144) = √169 = <b>13</b>',a:13},
    {q:'В прямоугольном треугольнике катеты равны 9 и 12. Найдите гипотенузу.',h:'c = √(9²+12²)',s:'c = √(81+144) = √225 = <b>15</b>',a:15},
    {q:'В прямоугольном треугольнике катеты равны 8 и 15. Найдите гипотенузу.',h:'c = √(8²+15²)',s:'c = √(64+225) = √289 = <b>17</b>',a:17},
    {q:'В прямоугольном треугольнике катеты равны 20 и 21. Найдите гипотенузу.',h:'c = √(20²+21²)',s:'c = √(400+441) = √841 = <b>29</b>',a:29},
    {q:'Гипотенуза прямоугольного треугольника равна 10, один катет равен 6. Найдите другой катет.',h:'b = √(10²−6²)',s:'b = √(100−36) = √64 = <b>8</b>',a:8},
    {q:'Гипотенуза прямоугольного треугольника равна 13, один катет равен 5. Найдите другой катет.',h:'b = √(13²−5²)',s:'b = √(169−25) = √144 = <b>12</b>',a:12},
    {q:'Гипотенуза прямоугольного треугольника равна 17, один катет равен 8. Найдите другой катет.',h:'b = √(17²−8²)',s:'b = √(289−64) = √225 = <b>15</b>',a:15},
    {q:'Гипотенуза прямоугольного треугольника равна 25, один катет равен 7. Найдите другой катет.',h:'b = √(25²−7²)',s:'b = √(625−49) = √576 = <b>24</b>',a:24},
    {q:'Катеты прямоугольного треугольника равны 6 и 8. Найдите площадь треугольника.',h:'S = ½·a·b',s:'S = ½·6·8 = <b>24</b>',a:24},
    {q:'Катеты прямоугольного треугольника равны 5 и 12. Найдите площадь треугольника.',h:'S = ½·a·b',s:'S = ½·5·12 = <b>30</b>',a:30},
    {q:'Катеты прямоугольного треугольника равны 9 и 40. Найдите площадь треугольника.',h:'S = ½·a·b',s:'S = ½·9·40 = <b>180</b>',a:180},
    {q:'Один острый угол прямоугольного треугольника равен 35°. Найдите другой острый угол (в градусах).',h:'Сумма острых углов = 90°',s:'90° − 35° = <b>55°</b>',a:55},
    {q:'Один острый угол прямоугольного треугольника равен 48°. Найдите другой острый угол (в градусах).',h:'Сумма острых углов = 90°',s:'90° − 48° = <b>42°</b>',a:42},
    {q:'Медиана прямоугольного треугольника, проведённая к гипотенузе, равна 6,5. Найдите гипотенузу.',h:'Медиана к гипотенузе = гипотенуза/2',s:'c = 2·6,5 = <b>13</b>',a:13},
    {q:'В прямоугольном треугольнике гипотенуза = 26, периметр = 60. Найдите сумму катетов.',h:'P = a + b + c, сумма катетов = P − c',s:'a+b = 60−26 = <b>34</b>',a:34},
    {q:'Площадь прямоугольного треугольника равна 30, один катет равен 12. Найдите другой катет.',h:'S = ½·a·b, b = 2S/a',s:'b = 2·30/12 = 60/12 = <b>5</b>',a:5},
    {q:'Катеты прямоугольного треугольника равны 3 и 4. Найдите периметр.',h:'P = a + b + c, c = 5',s:'P = 3 + 4 + 5 = <b>12</b>',a:12},
    {q:'В прямоугольном треугольнике катеты равны 7 и 24. Найдите гипотенузу.',h:'c = √(7²+24²) = √(49+576)',s:'c = √625 = <b>25</b>',a:25},
  ],
  isosceles: [
    {q:'Угол при вершине равнобедренного треугольника равен 40°. Найдите угол при основании (в градусах).',h:'(180°−40°)/2',s:'(180°−40°)/2 = 140°/2 = <b>70°</b>',a:70},
    {q:'Угол при вершине равнобедренного треугольника равен 120°. Найдите угол при основании (в градусах).',h:'(180°−120°)/2',s:'(180°−120°)/2 = 60°/2 = <b>30°</b>',a:30},
    {q:'Угол при вершине равнобедренного треугольника равен 100°. Найдите угол при основании (в градусах).',h:'(180°−100°)/2',s:'(180°−100°)/2 = 80°/2 = <b>40°</b>',a:40},
    {q:'Угол при вершине равнобедренного треугольника равен 60°. Найдите угол при основании (в градусах).',h:'(180°−60°)/2',s:'(180°−60°)/2 = 120°/2 = <b>60°</b> (треугольник равносторонний)',a:60},
    {q:'Углы при основании равнобедренного треугольника равны 55°. Найдите угол при вершине (в градусах).',h:'180°−2·55°',s:'180°−110° = <b>70°</b>',a:70},
    {q:'Углы при основании равнобедренного треугольника равны 72°. Найдите угол при вершине (в градусах).',h:'180°−2·72°',s:'180°−144° = <b>36°</b>',a:36},
    {q:'Углы при основании равнобедренного треугольника равны 45°. Найдите угол при вершине (в градусах).',h:'180°−2·45°',s:'180°−90° = <b>90°</b>',a:90},
    {q:'В равнобедренном треугольнике боковая сторона = 5, основание = 6. Найдите высоту, проведённую к основанию.',h:'h = √(a²−(b/2)²) = √(25−9)',s:'h = √(25−9) = √16 = <b>4</b>',a:4},
    {q:'В равнобедренном треугольнике боковая сторона = 10, основание = 12. Найдите высоту к основанию.',h:'h = √(10²−6²) = √(100−36)',s:'h = √64 = <b>8</b>',a:8},
    {q:'В равнобедренном треугольнике боковая сторона = 13, основание = 10. Найдите высоту к основанию.',h:'h = √(13²−5²) = √(169−25)',s:'h = √144 = <b>12</b>',a:12},
    {q:'В равнобедренном треугольнике боковая сторона = 17, основание = 16. Найдите высоту к основанию.',h:'h = √(17²−8²)',s:'h = √(289−64) = √225 = <b>15</b>',a:15},
    {q:'В равнобедренном треугольнике основание = 8, высота к нему = 3. Найдите боковую сторону.',h:'a = √(h²+(b/2)²) = √(9+16)',s:'a = √25 = <b>5</b>',a:5},
    {q:'Стороны равнобедренного треугольника равны 5, 5, 6. Найдите периметр.',h:'P = 2a + b',s:'P = 2·5+6 = <b>16</b>',a:16},
    {q:'Стороны равнобедренного треугольника равны 8, 8, 6. Найдите периметр.',h:'P = 2·8+6',s:'P = 16+6 = <b>22</b>',a:22},
    {q:'Угол при вершине равнобедренного треугольника равен 80°. Найдите угол при основании (в градусах).',h:'(180°−80°)/2',s:'(180°−80°)/2 = 100°/2 = <b>50°</b>',a:50},
  ],
  general: [
    {q:'В треугольнике ∠A = 47°, ∠B = 68°. Найдите ∠C (в градусах).',h:'∠A+∠B+∠C=180°',s:'∠C = 180°−47°−68° = <b>65°</b>',a:65},
    {q:'В треугольнике ∠A = 30°, ∠B = 90°. Найдите ∠C (в градусах).',h:'∠A+∠B+∠C=180°',s:'∠C = 180°−30°−90° = <b>60°</b>',a:60},
    {q:'В треугольнике ∠A = ∠B = 65°. Найдите ∠C (в градусах).',h:'∠A+∠B+∠C=180°',s:'∠C = 180°−65°−65° = <b>50°</b>',a:50},
    {q:'В треугольнике ∠A = 110°, ∠B = 35°. Найдите ∠C (в градусах).',h:'∠A+∠B+∠C=180°',s:'∠C = 180°−110°−35° = <b>35°</b>',a:35},
    {q:'В треугольнике ∠A = 55°, ∠C = 75°. Найдите ∠B (в градусах).',h:'∠A+∠B+∠C=180°',s:'∠B = 180°−55°−75° = <b>50°</b>',a:50},
    {q:'В треугольнике ∠A = 80°, ∠B = 60°. Найдите внешний угол при вершине C (в градусах).',h:'Внешний угол = ∠A+∠B',s:'∠A+∠B = 80°+60° = <b>140°</b>',a:140},
    {q:'В треугольнике ∠A = 50°, ∠B = 65°. Найдите внешний угол при вершине C (в градусах).',h:'Внешний угол = ∠A+∠B',s:'∠A+∠B = 50°+65° = <b>115°</b>',a:115},
    {q:'Внешний угол треугольника при вершине C равен 130°, ∠A = 70°. Найдите ∠B (в градусах).',h:'Внешний = ∠A+∠B, ∠B = 130°−∠A',s:'∠B = 130°−70° = <b>60°</b>',a:60},
    {q:'Основание треугольника = 12, высота, опущенная на него, = 7. Найдите площадь.',h:'S = ½·b·h',s:'S = ½·12·7 = <b>42</b>',a:42},
    {q:'Основание треугольника = 15, высота = 8. Найдите площадь.',h:'S = ½·b·h',s:'S = ½·15·8 = <b>60</b>',a:60},
    {q:'Основание треугольника = 20, высота = 9. Найдите площадь.',h:'S = ½·b·h',s:'S = ½·20·9 = <b>90</b>',a:90},
    {q:'Две стороны треугольника равны 6 и 8, угол между ними = 90°. Найдите площадь.',h:'S = ½·a·b·sin90° = ½·a·b',s:'S = ½·6·8 = <b>24</b>',a:24},
    {q:'Две стороны треугольника равны 8 и 6, угол между ними = 30°. Найдите площадь.',h:'S = ½·8·6·sin30° = ½·8·6·0,5',s:'S = ½·8·6·0,5 = <b>12</b>',a:12},
    {q:'Две стороны треугольника равны 10 и 4, угол между ними = 30°. Найдите площадь.',h:'S = ½·10·4·sin30°',s:'S = ½·10·4·0,5 = <b>10</b>',a:10},
    {q:'Две стороны треугольника равны 7 и 10, угол между ними = 90°. Найдите площадь.',h:'S = ½·7·10',s:'S = ½·7·10 = <b>35</b>',a:35},
    {q:'В треугольнике ∠A = 40°, ∠B = 75°. Найдите ∠C (в градусах).',h:'∠C = 180°−∠A−∠B',s:'∠C = 180°−40°−75° = <b>65°</b>',a:65},
    {q:'Биссектриса делит угол B = 80° треугольника пополам. Найдите каждую из двух частей (в градусах).',h:'80°/2',s:'80°/2 = <b>40°</b>',a:40},
    {q:'Основание треугольника = 18, высота = 6. Найдите площадь.',h:'S = ½·18·6',s:'S = ½·18·6 = <b>54</b>',a:54},
  ],
  parallel: [
    {q:'Стороны прямоугольника равны 7 и 9. Найдите площадь.',h:'S = a·b',s:'S = 7·9 = <b>63</b>',a:63},
    {q:'Стороны прямоугольника равны 5 и 12. Найдите площадь.',h:'S = a·b',s:'S = 5·12 = <b>60</b>',a:60},
    {q:'Стороны прямоугольника равны 3 и 4. Найдите диагональ.',h:'d = √(3²+4²)',s:'d = √(9+16) = √25 = <b>5</b>',a:5},
    {q:'Стороны прямоугольника равны 5 и 12. Найдите диагональ.',h:'d = √(5²+12²)',s:'d = √(25+144) = √169 = <b>13</b>',a:13},
    {q:'Стороны прямоугольника равны 9 и 12. Найдите диагональ.',h:'d = √(9²+12²)',s:'d = √(81+144) = √225 = <b>15</b>',a:15},
    {q:'Периметр прямоугольника = 26, одна сторона = 7. Найдите другую сторону.',h:'P = 2(a+b), a+b = P/2, b = P/2 − a',s:'b = 13−7 = <b>6</b>',a:6},
    {q:'Сторона квадрата = 7. Найдите площадь.',h:'S = a²',s:'S = 7² = <b>49</b>',a:49},
    {q:'Площадь квадрата = 81. Найдите сторону.',h:'a = √S',s:'a = √81 = <b>9</b>',a:9},
    {q:'Диагонали ромба равны 6 и 8. Найдите площадь ромба.',h:'S = ½·d₁·d₂',s:'S = ½·6·8 = <b>24</b>',a:24},
    {q:'Диагонали ромба равны 10 и 24. Найдите площадь ромба.',h:'S = ½·d₁·d₂',s:'S = ½·10·24 = <b>120</b>',a:120},
    {q:'Диагонали ромба равны 12 и 16. Найдите площадь ромба.',h:'S = ½·d₁·d₂',s:'S = ½·12·16 = <b>96</b>',a:96},
    {q:'Диагонали ромба равны 6 и 8. Найдите сторону ромба.',h:'Диагонали ⊥ и делятся пополам: a = √(3²+4²)',s:'a = √(9+16) = √25 = <b>5</b>',a:5},
    {q:'Диагонали ромба равны 10 и 24. Найдите сторону ромба.',h:'a = √((d₁/2)²+(d₂/2)²) = √(5²+12²)',s:'a = √(25+144) = √169 = <b>13</b>',a:13},
    {q:'Основание параллелограмма = 10, высота = 6. Найдите площадь.',h:'S = a·h',s:'S = 10·6 = <b>60</b>',a:60},
    {q:'Основание параллелограмма = 15, высота = 4. Найдите площадь.',h:'S = a·h',s:'S = 15·4 = <b>60</b>',a:60},
  ],
  trapezoid: [
    {q:'Основания трапеции равны 5 и 11, высота = 6. Найдите площадь.',h:'S = ½·(a+b)·h',s:'S = ½·(5+11)·6 = ½·16·6 = <b>48</b>',a:48},
    {q:'Основания трапеции равны 4 и 14, высота = 5. Найдите площадь.',h:'S = ½·(a+b)·h',s:'S = ½·(4+14)·5 = ½·18·5 = <b>45</b>',a:45},
    {q:'Основания трапеции равны 7 и 15, высота = 4. Найдите площадь.',h:'S = ½·(a+b)·h',s:'S = ½·(7+15)·4 = ½·22·4 = <b>44</b>',a:44},
    {q:'Основания трапеции равны 8 и 12, высота = 5. Найдите площадь.',h:'S = ½·(a+b)·h',s:'S = ½·(8+12)·5 = ½·20·5 = <b>50</b>',a:50},
    {q:'Основания трапеции равны 5 и 13, высота = 7. Найдите площадь.',h:'S = ½·(a+b)·h',s:'S = ½·(5+13)·7 = ½·18·7 = <b>63</b>',a:63},
    {q:'Основания трапеции равны 9 и 15, высота = 6. Найдите площадь.',h:'S = ½·(a+b)·h',s:'S = ½·(9+15)·6 = ½·24·6 = <b>72</b>',a:72},
    {q:'Основания трапеции равны 6 и 10. Найдите среднюю линию.',h:'m = (a+b)/2',s:'m = (6+10)/2 = <b>8</b>',a:8},
    {q:'Основания трапеции равны 4 и 16. Найдите среднюю линию.',h:'m = (a+b)/2',s:'m = (4+16)/2 = <b>10</b>',a:10},
    {q:'Основания трапеции равны 3 и 17. Найдите среднюю линию.',h:'m = (a+b)/2',s:'m = (3+17)/2 = <b>10</b>',a:10},
    {q:'Средняя линия трапеции = 9, одно основание = 5. Найдите другое основание.',h:'b = 2m − a',s:'b = 2·9−5 = 18−5 = <b>13</b>',a:13},
    {q:'Средняя линия трапеции = 7, одно основание = 4. Найдите другое основание.',h:'b = 2m − a',s:'b = 2·7−4 = 14−4 = <b>10</b>',a:10},
    {q:'Средняя линия трапеции = 11, одно основание = 7. Найдите другое основание.',h:'b = 2m − a',s:'b = 2·11−7 = 22−7 = <b>15</b>',a:15},
    {q:'Площадь трапеции = 40, высота = 4. Найдите сумму оснований.',h:'S = ½·(a+b)·h, a+b = 2S/h',s:'a+b = 2·40/4 = <b>20</b>',a:20},
    {q:'Основания трапеции равны 2 и 8, высота = 4. Найдите площадь.',h:'S = ½·(2+8)·4',s:'S = ½·10·4 = <b>20</b>',a:20},
    {q:'Прямоугольная трапеция: основания 6 и 10, высота = 5. Найдите площадь.',h:'S = ½·(6+10)·5',s:'S = ½·16·5 = <b>40</b>',a:40},
  ],
  angles: [
    {q:'Хорда AB стягивает дугу 80°. Найдите вписанный угол ACB (в градусах).',h:'Вписанный = дуга/2',s:'80°/2 = <b>40°</b>',a:40},
    {q:'Хорда AB стягивает дугу 150°. Найдите вписанный угол ACB (в градусах).',h:'Вписанный = дуга/2',s:'150°/2 = <b>75°</b>',a:75},
    {q:'Хорда AB стягивает дугу 120°. Найдите вписанный угол ACB (в градусах).',h:'Вписанный = дуга/2',s:'120°/2 = <b>60°</b>',a:60},
    {q:'Хорда AB стягивает дугу 200°. Найдите вписанный угол ACB (в градусах).',h:'Вписанный = дуга/2 (берём дугу, на которую опирается)',s:'200°/2 = <b>100°</b>',a:100},
    {q:'Вписанный угол равен 35°. Найдите центральный угол на ту же дугу (в градусах).',h:'Центральный = 2·вписанный',s:'2·35° = <b>70°</b>',a:70},
    {q:'Вписанный угол равен 60°. Найдите центральный угол на ту же дугу (в градусах).',h:'Центральный = 2·вписанный',s:'2·60° = <b>120°</b>',a:120},
    {q:'Центральный угол = 100°. Найдите вписанный угол на ту же дугу (в градусах).',h:'Вписанный = центральный/2',s:'100°/2 = <b>50°</b>',a:50},
    {q:'Центральный угол = 80°. Найдите вписанный угол на ту же дугу (в градусах).',h:'Вписанный = центральный/2',s:'80°/2 = <b>40°</b>',a:40},
    {q:'Вписанный угол равен 45°. Найдите дугу, которую он видит (в градусах).',h:'Дуга = 2·вписанный',s:'2·45° = <b>90°</b>',a:90},
    {q:'Вписанный угол равен 70°. Найдите дугу, которую он стягивает (в градусах).',h:'Дуга = 2·вписанный',s:'2·70° = <b>140°</b>',a:140},
    {q:'Угол ABC вписан в окружность и опирается на диаметр AC. Найдите угол ABC (в градусах).',h:'Теорема Фалеса: вписанный на диаметр = 90°',s:'<b>90°</b> — теорема Фалеса',a:90},
    {q:'Хорда AB стягивает дугу 50°. Найдите вписанный угол ACB (в градусах).',h:'Вписанный = дуга/2',s:'50°/2 = <b>25°</b>',a:25},
    {q:'Центральный угол AOB = 160°. Найдите вписанный угол ACB (в градусах).',h:'Вписанный = центральный/2',s:'160°/2 = <b>80°</b>',a:80},
    {q:'Вписанный угол = 90°. На какую дугу он опирается (в градусах)?',h:'Дуга = 2·90°',s:'Дуга = 2·90° = <b>180°</b> — это диаметр',a:180},
    {q:'Хорда AB стягивает дугу 140°. Найдите вписанный угол ACB (в градусах).',h:'Вписанный = дуга/2',s:'140°/2 = <b>70°</b>',a:70},
  ],
  tangent: [
    {q:'Из точки M проведены две касательные к окружности. Одна касательная = 7. Найдите другую.',h:'Два отрезка касательных из одной точки равны',s:'Равна первой = <b>7</b>',a:7},
    {q:'Расстояние от точки M до центра окружности = 5, радиус = 3. Найдите длину касательной из M.',h:'t = √(d²−R²) = √(25−9)',s:'t = √16 = <b>4</b>',a:4},
    {q:'Расстояние от точки M до центра = 13, радиус = 5. Найдите длину касательной.',h:'t = √(13²−5²) = √(169−25)',s:'t = √144 = <b>12</b>',a:12},
    {q:'Расстояние от точки M до центра = 10, радиус = 6. Найдите длину касательной.',h:'t = √(10²−6²) = √(100−36)',s:'t = √64 = <b>8</b>',a:8},
    {q:'Расстояние от точки M до центра = 17, радиус = 8. Найдите длину касательной.',h:'t = √(17²−8²) = √(289−64)',s:'t = √225 = <b>15</b>',a:15},
    {q:'Расстояние от точки M до центра = 25, радиус = 7. Найдите длину касательной.',h:'t = √(25²−7²) = √(625−49)',s:'t = √576 = <b>24</b>',a:24},
    {q:'Из точки M касательные MA = MB. MA = 9, AB = 10. Найдите периметр треугольника MAB.',h:'P = MA + MB + AB',s:'P = 9+9+10 = <b>28</b>',a:28},
    {q:'Две хорды пересекаются внутри окружности. Отрезки одной хорды: 3 и 8. Один отрезок другой = 4. Найдите второй отрезок.',h:'Произведения равны: 3·8 = 4·x',s:'x = 24/4 = <b>6</b>',a:6},
    {q:'Две хорды пересекаются. Отрезки одной: 2 и 10, один отрезок другой = 4. Найдите второй отрезок.',h:'2·10 = 4·x',s:'x = 20/4 = <b>5</b>',a:5},
    {q:'Касательная из точки M = 6, внешний отрезок секущей = 3. Найдите всю секущую.',h:'t² = внешний · вся, вся = t²/внешний',s:'Вся = 36/3 = <b>12</b>',a:12},
    {q:'Угол между касательной и хордой = дуга/2. Дуга = 90°. Найдите этот угол (в градусах).',h:'Угол = дуга/2',s:'90°/2 = <b>45°</b>',a:45},
    {q:'Расстояние от точки M до центра = 26, радиус = 10. Найдите длину касательной.',h:'t = √(26²−10²) = √(676−100)',s:'t = √576 = <b>24</b>',a:24},
  ],
  inscribed: [
    {q:'В прямоугольный треугольник с катетами 3 и 4 вписана окружность. Найдите её радиус.',h:'r = (a+b−c)/2, c = 5',s:'r = (3+4−5)/2 = 2/2 = <b>1</b>',a:1},
    {q:'В прямоугольный треугольник с катетами 6 и 8 вписана окружность. Найдите её радиус.',h:'r = (a+b−c)/2, c = 10',s:'r = (6+8−10)/2 = 4/2 = <b>2</b>',a:2},
    {q:'В прямоугольный треугольник с катетами 5 и 12 вписана окружность. Найдите её радиус.',h:'r = (a+b−c)/2, c = 13',s:'r = (5+12−13)/2 = 4/2 = <b>2</b>',a:2},
    {q:'В прямоугольный треугольник с катетами 8 и 15 вписана окружность. Найдите её радиус.',h:'r = (a+b−c)/2, c = 17',s:'r = (8+15−17)/2 = 6/2 = <b>3</b>',a:3},
    {q:'В прямоугольный треугольник с катетами 9 и 40 вписана окружность. Найдите её радиус.',h:'r = (a+b−c)/2, c = 41',s:'r = (9+40−41)/2 = 8/2 = <b>4</b>',a:4},
    {q:'В прямоугольный треугольник с катетами 20 и 21 вписана окружность. Найдите её радиус.',h:'r = (a+b−c)/2, c = 29',s:'r = (20+21−29)/2 = 12/2 = <b>6</b>',a:6},
    {q:'В квадрат со стороной 6 вписана окружность. Найдите её радиус.',h:'r = сторона/2',s:'r = 6/2 = <b>3</b>',a:3},
    {q:'В квадрат со стороной 10 вписана окружность. Найдите её радиус.',h:'r = сторона/2',s:'r = 10/2 = <b>5</b>',a:5},
    {q:'Площадь треугольника = 24, полупериметр = 8. Найдите радиус вписанной окружности.',h:'r = S/p',s:'r = 24/8 = <b>3</b>',a:3},
    {q:'Площадь треугольника = 30, полупериметр = 10. Найдите радиус вписанной окружности.',h:'r = S/p',s:'r = 30/10 = <b>3</b>',a:3},
    {q:'В четырёхугольник ABCD вписана окружность. AB = 5, BC = 4, CD = 6. Найдите DA.',h:'AB + CD = BC + DA, DA = AB+CD−BC',s:'DA = 5+6−4 = <b>7</b>',a:7},
    {q:'В четырёхугольник ABCD вписана окружность. AB = 8, BC = 5, CD = 7. Найдите DA.',h:'AB + CD = BC + DA',s:'DA = 8+7−5 = <b>10</b>',a:10},
  ],
  circumscribed: [
    {q:'Около прямоугольного треугольника с катетами 3 и 4 описана окружность. Найдите её радиус.',h:'R = гипотенуза/2, c = 5',s:'R = 5/2 = <b>2.5</b>',a:2.5},
    {q:'Около прямоугольного треугольника с катетами 6 и 8 описана окружность. Найдите её радиус.',h:'R = гипотенуза/2, c = 10',s:'R = 10/2 = <b>5</b>',a:5},
    {q:'Около прямоугольного треугольника с катетами 5 и 12 описана окружность. Найдите её радиус.',h:'R = гипотенуза/2, c = 13',s:'R = 13/2 = <b>6.5</b>',a:6.5},
    {q:'Около прямоугольного треугольника с катетами 8 и 15 описана окружность. Найдите её радиус.',h:'R = гипотенуза/2, c = 17',s:'R = 17/2 = <b>8.5</b>',a:8.5},
    {q:'Около прямоугольного треугольника с гипотенузой 26 описана окружность. Найдите её радиус.',h:'R = c/2',s:'R = 26/2 = <b>13</b>',a:13},
    {q:'Около прямоугольного треугольника с гипотенузой 20 описана окружность. Найдите её радиус.',h:'R = c/2',s:'R = 20/2 = <b>10</b>',a:10},
    {q:'Сторона треугольника = 10, противолежащий угол = 30°. Найдите радиус описанной окружности.',h:'R = a/(2·sin A). sin 30° = 0,5',s:'R = 10/(2·0,5) = <b>10</b>',a:10},
    {q:'Сторона треугольника = 8, противолежащий угол = 30°. Найдите радиус описанной окружности.',h:'R = a/(2·sin A). sin 30° = 0,5',s:'R = 8/(2·0,5) = <b>8</b>',a:8},
    {q:'Около прямоугольного треугольника с катетами 12 и 16 описана окружность. Найдите её радиус.',h:'Гипотенуза = √(144+256) = √400 = 20. R = 20/2',s:'R = 20/2 = <b>10</b>',a:10},
    {q:'Около прямоугольного треугольника с катетами 9 и 12 описана окружность. Найдите её радиус.',h:'Гипотенуза = √(81+144) = √225 = 15. R = 15/2',s:'R = 15/2 = <b>7.5</b>',a:7.5},
    {q:'Около прямоугольного треугольника с катетами 7 и 24 описана окружность. Найдите её радиус.',h:'Гипотенуза = √(49+576) = √625 = 25. R = 25/2',s:'R = 25/2 = <b>12.5</b>',a:12.5},
    {q:'Около прямоугольного треугольника с катетами 20 и 21 описана окружность. Найдите её радиус.',h:'Гипотенуза = √(400+441) = √841 = 29. R = 29/2',s:'R = 29/2 = <b>14.5</b>',a:14.5},
  ],
};

// Shuffle array
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Counts per subtopic
const COUNTS = { right:20, isosceles:15, general:18, parallel:15, trapezoid:15, angles:15, tangent:12, inscribed:12, circumscribed:12, mixed: Object.values(BANK).reduce((s,a)=>s+a.length,0) };

// ═══════════════════════ SUBTOPICS ════════════════════════
const SUBTOPICS = [
  {id:'mixed',label:'Все темы',icon:'🔀',color:'var(--vio)',desc:'Задачи из всех подтем вперемешку'},
  {id:'right',label:'Прямоугольный треугольник',icon:'⊾',color:'#5b8eff',desc:'Теорема Пифагора, тригонометрия, площадь',
    theory:{formulas:[{f:'c² = a² + b²',n:'Теорема Пифагора (c — гипотенуза)'},{f:'sin A = a/c,  cos A = b/c,  tg A = a/b',n:'Тригонометрия острого угла'},{f:'S = ½·a·b',n:'Площадь (катеты ⊥)'},{f:'Медиана к гипотенузе = c/2',n:'Из прямого угла'}],tip:'Пифагоровы тройки: 3–4–5, 5–12–13, 8–15–17, 7–24–25. Видишь числа из тройки — ответ целый!',warn:'Пифагор работает ТОЛЬКО в прямоугольном треугольнике.',
      ex:{cond:'Катеты = 3 и 4. Найдите гипотенузу.',fig:<FigRight/>,steps:[{t:'Теорема Пифагора:',f:'c² = a² + b²'},{t:'Подставляем:',f:'c² = 3² + 4² = 9 + 16 = 25',hl:true},{t:'Берём корень:',f:'c = √25 = 5'}],ans:'5'}}},
  {id:'isosceles',label:'Равнобедренный треугольник',icon:'▲',color:'#9b6dff',desc:'Свойства, высота, углы',
    theory:{formulas:[{f:'∠B = ∠C (углы при основании равны)',n:'Главное свойство'},{f:'∠A = 180° − 2·∠B',n:'Угол при вершине'},{f:'h = √(a² − (b/2)²)',n:'Высота к основанию'},{f:'S = ½·b·h',n:'Площадь'}],tip:'Высота, медиана и биссектриса из вершинного угла совпадают! Одно построение — три свойства.',warn:'Вершинный угол — между РАВНЫМИ сторонами. Не путай с углом при основании.',
      ex:{cond:'Вершинный угол = 40°. Найдите угол при основании.',fig:<FigIso/>,steps:[{t:'Сумма углов треугольника:',f:'40° + ∠B + ∠C = 180°'},{t:'Углы при основании равны:',f:'2·∠B = 180° − 40° = 140°',hl:true},{t:'Делим:',f:'∠B = 70°'}],ans:'70°'}}},
  {id:'general',label:'Треугольники общего вида',icon:'△',color:'#2dd4bf',desc:'Теоремы синусов и косинусов, углы, площадь',
    theory:{formulas:[{f:'∠A + ∠B + ∠C = 180°',n:'Сумма углов'},{f:'a/sin A = b/sin B = c/sin C = 2R',n:'Теорема синусов'},{f:'c² = a² + b² − 2ab·cos C',n:'Теорема косинусов'},{f:'S = ½·a·b·sin C',n:'Площадь'}],tip:'S = ½·a·b·sin C — самая частая формула! Угол C строго между сторонами a и b.',warn:'Внешний угол = сумме двух несмежных внутренних — это тоже проверяют.',
      ex:{cond:'Стороны a=8, b=6, угол C=30°. Найдите площадь.',fig:<FigGeneral/>,steps:[{t:'Формула площади:',f:'S = ½·a·b·sin C'},{t:'sin 30° = 0,5:',f:'S = ½·8·6·0,5',hl:true},{t:'Вычисляем:',f:'S = ½·48·0,5 = 12'}],ans:'12'}}},
  {id:'parallel',label:'Параллелограммы',icon:'▱',color:'#3ddc97',desc:'Ромб, прямоугольник, квадрат, площадь',
    theory:{formulas:[{f:'S = a·h = a·b·sin α',n:'Параллелограмм (h — высота)'},{f:'S = ½·d₁·d₂',n:'Ромб через диагонали'},{f:'S = a·b',n:'Прямоугольник'},{f:'d = √(a² + b²)',n:'Диагональ прямоугольника'}],tip:'В ромбе диагонали ⊥ и делятся пополам. Сторона: a = √((d₁/2)²+(d₂/2)²).',warn:'Высота параллелограмма ≠ боковой стороне. Высота ⊥ основанию!',
      ex:{cond:'Диагонали ромба d₁=6, d₂=8. Найдите площадь и сторону.',fig:<FigParal/>,steps:[{t:'Площадь через диагонали:',f:'S = ½·6·8 = 24',hl:true},{t:'Диагонали делятся пополам, катеты 3 и 4:',f:'a = √(3²+4²) = √25 = 5'}],ans:'S=24, a=5'}}},
  {id:'trapezoid',label:'Трапеция',icon:'⏢',color:'#ffb547',desc:'Площадь, средняя линия, высота',
    theory:{formulas:[{f:'S = ½·(a+b)·h',n:'Площадь (a,b — основания, h — высота)'},{f:'m = (a+b)/2',n:'Средняя линия'},{f:'S = m·h',n:'Площадь через среднюю линию'}],tip:'Прямоугольная трапеция: высота = боковой стороне при прямом угле.',warn:'Средняя линия соединяет середины боковых сторон, не делит трапецию на равные части.',
      ex:{cond:'Основания 5 и 13, высота h=6. Найдите площадь.',fig:<FigTrap/>,steps:[{t:'Формула площади трапеции:',f:'S = ½·(a+b)·h'},{t:'Подставляем:',f:'S = ½·(5+13)·6',hl:true},{t:'Вычисляем:',f:'S = ½·18·6 = 54'}],ans:'54'}}},
  {id:'angles',label:'Центральные и вписанные углы',icon:'◠',color:'#2dd4bf',desc:'Дуги, вписанный угол, теорема Фалеса',
    theory:{formulas:[{f:'∠вписанный = ½·дуга',n:'Вписанный = полудуга'},{f:'∠центральный = дуга',n:'Центральный = дуга'},{f:'∠(на диаметр) = 90°',n:'Теорема Фалеса'}],tip:'Все вписанные углы, опирающиеся на одну дугу — равны между собой!',warn:'Вписанный = ½ дуги, которую он ВИДИТ, а не той, на которой стоит.',
      ex:{cond:'Хорда AB стягивает дугу 110°. Найдите вписанный угол ACB.',fig:<FigIns/>,steps:[{t:'Вписанный = половина дуги:',f:'∠ACB = дуга/2'},{t:'Подставляем:',f:'∠ACB = 110°/2 = 55°',hl:true}],ans:'55°'}}},
  {id:'tangent',label:'Касательная, хорда, секущая',icon:'⌒',color:'#ffb547',desc:'Угол, степень точки, равенство касательных',
    theory:{formulas:[{f:'Касательная ⊥ радиусу в точке касания',n:'Главное свойство'},{f:'|MA| = |MB|',n:'Два отрезка касательных из одной точки равны'},{f:'t = √(d² − R²)',n:'Длина касательной'},{f:'MA·MB = MC·MD',n:'Хорды пересекаются внутри окружности'}],tip:'Угол между касательной и хордой = вписанному углу на ту же хорду.',warn:'Касательная не пересекает окружность, а касается ровно в одной точке.',
      ex:{cond:'Точка M: расстояние до центра = 13, R = 5. Найдите касательную.',fig:<FigTang/>,steps:[{t:'Касательная ⊥ радиусу:',f:'t² = d² − R²'},{t:'Подставляем:',f:'t² = 13² − 5² = 169 − 25 = 144',hl:true},{t:'Корень:',f:'t = √144 = 12'}],ans:'12'}}},
  {id:'inscribed',label:'Вписанные окружности',icon:'⊙',color:'#ff8adb',desc:'Радиус вписанной окружности',
    theory:{formulas:[{f:'r = S/p',n:'r — радиус, S — площадь, p — полупериметр'},{f:'r = (a+b−c)/2',n:'Для прямоугольного треугольника (c — гипотенуза)'},{f:'a+c = b+d',n:'Условие вписанности в четырёхугольник'}],tip:'Для прямоугольного △: r = (a+b−c)/2 — быстрее, чем через S/p!',warn:'Для четырёхугольника с вписанной окружностью: сумма противолежащих сторон одинакова.',
      ex:{cond:'Прямоугольный △: катеты 6 и 8. Найдите радиус вписанной окружности.',fig:<FigInscCirc/>,steps:[{t:'Гипотенуза:',f:'c = √(6²+8²) = 10'},{t:'Формула для прямоугольного △:',f:'r = (a+b−c)/2',hl:true},{t:'Подставляем:',f:'r = (6+8−10)/2 = 4/2 = 2'}],ans:'2'}}},
  {id:'circumscribed',label:'Описанные окружности',icon:'○',color:'#3ddc97',desc:'Радиус описанной окружности',
    theory:{formulas:[{f:'R = c/2',n:'Для прямоугольного △ (c — гипотенуза!)'},{f:'R = a/(2·sin A)',n:'Из теоремы синусов'},{f:'R = abc/(4S)',n:'Через стороны и площадь'}],tip:'Для прямоугольного △: центр описанной окружности — середина гипотенузы!',warn:'R ≥ 2r всегда (неравенство Эйлера). R = 2r только для правильного треугольника.',
      ex:{cond:'Прямоугольный △: катеты 6 и 8. Найдите R.',fig:<FigCirc/>,steps:[{t:'Гипотенуза:',f:'c = √(6²+8²) = 10'},{t:'Для прямоугольного △:',f:'R = c/2',hl:true},{t:'Подставляем:',f:'R = 10/2 = 5'}],ans:'5'}}}
];

// ═══════════════════════ THEORY VIEW ═════════════════════
const TheoryView = ({ sub, onPractice }) => {
  const { theory, color } = sub;
  return (
    <div style={{ maxWidth:720, margin:'0 auto', padding:'0 20px' }}>
      <div className="fu" style={{ marginBottom:22 }}>
        <div style={{ color:'var(--blue)', fontSize:'.68rem', fontFamily:'JetBrains Mono,monospace', letterSpacing:'.14em', textTransform:'uppercase', marginBottom:6 }}>Задание №1 · {sub.label}</div>
        <h2 style={{ fontSize:'clamp(1.3rem,3vw,1.85rem)', marginBottom:10 }}>{sub.label}</h2>
      </div>
      <div className="card fu" style={{ padding:'18px', marginBottom:12, animation:'fadeUp .4s ease both .06s' }}>
        <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.86rem', marginBottom:12 }}>📐 Формулы и факты</div>
        {theory.formulas.map((item, i) => (
          <div key={i} style={{ marginBottom:9 }}>
            <div className="f" style={{ borderLeftColor:color }}>{item.f}</div>
            <div style={{ color:'var(--t2)', fontSize:'.77rem', paddingLeft:6 }}>{item.n}</div>
          </div>
        ))}
        {theory.tip && <div className="co cb" style={{ marginTop:8 }}>💡 {theory.tip}</div>}
        {theory.warn && <div className="co cr">⚠️ {theory.warn}</div>}
      </div>
      <div className="fu" style={{ animation:'fadeUp .4s ease both .11s' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:9 }}>
          <div style={{ width:3, height:17, background:color, borderRadius:2 }}/>
          <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.86rem' }}>Разобранный пример</div>
        </div>
        <NbExample condition={theory.ex.cond} figure={theory.ex.fig} steps={theory.ex.steps} answer={theory.ex.ans} color={color}/>
      </div>
      <div className="card fu" style={{ marginTop:22, padding:'20px', textAlign:'center', background:'linear-gradient(135deg,rgba(91,142,255,.07),rgba(155,109,255,.07))', borderColor:'rgba(91,142,255,.18)', animation:'fadeUp .4s ease both .16s' }}>
        <div style={{ fontSize:'1.4rem', marginBottom:7 }}>🎯</div>
        <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.98rem', marginBottom:6 }}>Всё понятно?</h3>
        <p style={{ color:'var(--t2)', marginBottom:14, fontSize:'.83rem' }}>Закрепи на {COUNTS[sub.id]} задачах с черновиком</p>
        <button className="btn" onClick={onPractice}>Перейти к практике →</button>
      </div>
    </div>
  );
};

// ═══════════════════════ PRACTICE ════════════════════════
const Practice = ({ subId, progress, setProgress }) => {
  // build shuffled pool once per subId
  const [pool, setPool] = useState(() => {
    if (subId === 'mixed') {
      const all = Object.values(BANK).flat();
      return shuffle(all).map((p,i) => ({...p, id:i}));
    }
    return shuffle(BANK[subId] || []).map((p,i) => ({...p, id:i}));
  });
  const [idx, setIdx] = useState(0);
  const [ans, setAns]   = useState('');
  const [status, setStatus] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const [confetti, setConfetti] = useState(0);
  const inputRef = useRef();

  const task = pool[idx % pool.length];

  const next = useCallback(() => {
    setIdx(i => i + 1);
    setAns(''); setStatus(null); setMistakes(0);
    setTimeout(() => inputRef.current?.focus(), 80);
  }, []);

  const check = () => {
    const val = parseFloat(ans.replace(',', '.'));
    if (isNaN(val)) return;
    const ok = Math.abs(val - task.a) < 0.55;
    if (ok) {
      setStatus('correct'); setConfetti(c => c + 1);
      setProgress(p => ({ ...p, total:p.total+1, correct:p.correct+1, streak:p.streak+1, best:Math.max(p.best, p.streak+1) }));
    } else {
      const nm = mistakes + 1; setMistakes(nm);
      setProgress(p => ({ ...p, total:p.total+1, streak:0 }));
      if (nm >= 3) setStatus('show');
      else { setStatus('wrong'); setTimeout(() => setStatus(null), 1700); }
    }
  };

  const acc = progress.total ? Math.round(progress.correct / progress.total * 100) : 0;
  const poolLen = pool.length;
  const solvedInPool = idx % poolLen;
  const subLabel = SUBTOPICS.find(s => s.id === subId)?.label || 'Все темы';

  return (
    <div style={{ maxWidth:700, margin:'0 auto', padding:'0 20px' }}>
      <Confetti t={confetti}/>
      {/* STATS */}
      <div className="card" style={{ padding:'14px 18px', marginBottom:14 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:9, flexWrap:'wrap', gap:8 }}>
          <div>
            <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.86rem' }}>Прогресс</div>
            <div style={{ color:'var(--t3)', fontSize:'.66rem' }}>{subLabel} · {poolLen} задач доступно</div>
          </div>
          <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
            {[{l:'Решено',v:progress.total},{l:'Верно',v:progress.correct,c:'var(--grn)'},{l:'%',v:acc+'%',c:acc>=70?'var(--grn)':acc>=40?'var(--gold)':'var(--red)'},{l:'🔥',v:progress.streak}].map(s => (
              <div key={s.l} style={{ textAlign:'center' }}>
                <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'.92rem', fontWeight:500, color:s.c||'var(--t)' }}>{s.v}</div>
                <div style={{ color:'var(--t3)', fontSize:'.59rem', marginTop:1 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="pt"><div className="pf" style={{ width:`${acc}%` }}/></div>
        <div style={{ display:'flex', justifyContent:'space-between', marginTop:4 }}>
          <span style={{ color:'var(--t3)', fontSize:'.63rem' }}>Задача {solvedInPool+1} из {poolLen}</span>
          <button onClick={() => setProgress({total:0,correct:0,streak:0,best:0})} style={{ background:'none', color:'var(--t3)', fontSize:'.63rem', textDecoration:'underline' }}>Сбросить</button>
        </div>
      </div>

      {/* TASK */}
      <div key={`${subId}-${idx}`} className="card pop" style={{ padding:'20px', marginBottom:12, borderColor:status==='correct'?'rgba(61,220,151,.38)':status==='show'?'rgba(255,181,71,.3)':'var(--b)', transition:'border-color .3s' }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
          <span style={{ background:'rgba(91,142,255,.1)', border:'1px solid rgba(91,142,255,.2)', color:'var(--blue)', borderRadius:100, padding:'3px 10px', fontSize:'.62rem', fontFamily:'JetBrains Mono,monospace' }}>
            #{progress.total+1}
          </span>
          {mistakes > 0 && status !== 'correct' && (
            <span style={{ background:'rgba(255,90,90,.1)', border:'1px solid rgba(255,90,90,.2)', color:'var(--red)', borderRadius:100, padding:'3px 10px', fontSize:'.62rem', fontFamily:'JetBrains Mono,monospace' }}>
              {mistakes}/3 попытки
            </span>
          )}
        </div>
        <p style={{ fontSize:'1rem', lineHeight:1.8, marginBottom:17 }}>{task.q}</p>

        {status !== 'show' && status !== 'correct' && (
          <div style={{ display:'flex', gap:9, flexWrap:'wrap', alignItems:'center' }}>
            <input ref={inputRef} type="number" step="0.5" value={ans} onChange={e => setAns(e.target.value)} onKeyDown={e => e.key==='Enter' && ans && check()} placeholder="Ответ…" style={{ flex:1, minWidth:120, borderColor:status==='wrong'?'var(--red)':undefined }} autoFocus/>
            <button className="btn" onClick={check} disabled={!ans} style={{ padding:'11px 20px', fontSize:'.86rem' }}>Проверить</button>
          </div>
        )}
        {status === 'wrong' && <div className="co cr fi" style={{ marginTop:10 }}>✗ Неверно. Подсказка: {task.h}</div>}
        {status === 'correct' && (
          <div className="fi">
            <div className="co cg" style={{ marginTop:0 }}>✓ Верно!{progress.streak > 1 ? ` 🔥 Серия: ${progress.streak}` : ''}</div>
            <button className="btn" onClick={next} style={{ marginTop:10, padding:'10px 20px', fontSize:'.86rem' }}>Следующая →</button>
          </div>
        )}
        {status === 'show' && (
          <div className="fi">
            <div className="co cy" style={{ marginTop:0 }}>3 ошибки — показываем разбор:</div>
            <div style={{ background:'var(--bg2)', border:'1px solid var(--b2)', borderRadius:8, padding:'11px 14px', marginTop:8, fontSize:'.84rem', lineHeight:1.8, color:'var(--t2)' }} dangerouslySetInnerHTML={{ __html:'📖 '+task.s }}/>
            <button className="btn" onClick={next} style={{ marginTop:10, padding:'10px 20px', fontSize:'.86rem' }}>Следующая →</button>
          </div>
        )}
        {!status && (
          <details style={{ marginTop:9 }}>
            <summary style={{ cursor:'pointer', color:'var(--t3)', fontSize:'.78rem', padding:'3px 0', listStyle:'none' }}>💡 Подсказка</summary>
            <div className="co cb" style={{ marginTop:5 }}>{task.h}</div>
          </details>
        )}
      </div>

      {/* SCRATCHPAD */}
      <ScratchPad/>

      {!status && <button onClick={next} style={{ background:'none', color:'var(--t3)', fontSize:'.75rem', textDecoration:'underline', display:'block', margin:'10px auto 0', padding:5 }}>Пропустить задачу</button>}
    </div>
  );
};

// ═══════════════════════ TASK 1 PAGE ════════════════════
const Task1Page = ({ progress, setProgress }) => {
  const [sub, setSub] = useState(null);
  const [view, setView] = useState('theory');

  const select = id => { setSub(id); setView(id === 'mixed' ? 'practice' : 'theory'); window.scrollTo(0, 0); };
  const goBack = () => { setSub(null); window.scrollTo(0, 0); };

  if (!sub) return (
    <div style={{ paddingTop:84, padding:'84px 20px 80px', maxWidth:900, margin:'0 auto' }}>
      <div className="fu" style={{ marginBottom:26 }}>
        <div style={{ color:'var(--blue)', fontSize:'.68rem', fontFamily:'JetBrains Mono,monospace', letterSpacing:'.14em', textTransform:'uppercase', marginBottom:6 }}>Задание №1 · Планиметрия · 1 балл</div>
        <h2 style={{ fontSize:'clamp(1.4rem,3vw,2rem)', marginBottom:7 }}>Выбери тему</h2>
        <p style={{ color:'var(--t2)', fontSize:'.84rem', maxWidth:480, lineHeight:1.7 }}>Открой любую тему — теория с примером на клетчатом листе, затем задачи с черновиком.</p>
      </div>

      {/* MIXED */}
      <button onClick={() => select('mixed')} className="card" style={{ width:'100%', padding:'18px 20px', textAlign:'left', marginBottom:16, borderColor:'rgba(155,109,255,.3)', cursor:'pointer', background:'linear-gradient(135deg,rgba(91,142,255,.07),rgba(155,109,255,.07))', transition:'all .2s', animation:'fadeUp .4s ease both .05s' }} onMouseOver={e => { e.currentTarget.style.borderColor='rgba(155,109,255,.6)'; e.currentTarget.style.transform='translateY(-2px)'; }} onMouseOut={e => { e.currentTarget.style.borderColor='rgba(155,109,255,.3)'; e.currentTarget.style.transform=''; }}>
        <div style={{ display:'flex', alignItems:'center', gap:13 }}>
          <div style={{ fontSize:'1.7rem' }}>🔀</div>
          <div>
            <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'1.02rem', marginBottom:2 }}>Общая практика</div>
            <div style={{ color:'var(--t2)', fontSize:'.82rem' }}>Все 9 тем вперемешку — лучшая подготовка к экзамену</div>
          </div>
          <div style={{ marginLeft:'auto', display:'flex', flexDirection:'column', alignItems:'flex-end', gap:3 }}>
            <span style={{ color:'var(--vio)', fontSize:'.9rem' }}>→</span>
            <span style={{ color:'var(--t3)', fontSize:'.63rem', fontFamily:'JetBrains Mono,monospace' }}>{COUNTS.mixed} задач</span>
          </div>
        </div>
      </button>

      <div style={{ color:'var(--t3)', fontSize:'.68rem', fontFamily:'JetBrains Mono,monospace', letterSpacing:'.12em', textTransform:'uppercase', marginBottom:11 }}>По темам</div>
      <div className="sg">
        {SUBTOPICS.filter(s => s.id !== 'mixed').map((s, i) => (
          <button key={s.id} onClick={() => select(s.id)} className="card" style={{ padding:'14px 13px', textAlign:'left', cursor:'pointer', animation:`fadeUp .4s ease both ${.05*i+.1}s`, transition:'all .2s', position:'relative', overflow:'hidden' }} onMouseOver={e => { e.currentTarget.style.borderColor=s.color; e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 10px 28px rgba(0,0,0,.4)'; }} onMouseOut={e => { e.currentTarget.style.borderColor='var(--b)'; e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:s.color, opacity:.7 }}/>
            <div style={{ fontSize:'1.25rem', marginBottom:6 }}>{s.icon}</div>
            <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.78rem', marginBottom:3 }}>{s.label}</div>
            <div style={{ color:'var(--t3)', fontSize:'.68rem', lineHeight:1.4, marginBottom:9 }}>{s.desc}</div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div style={{ display:'flex', gap:5 }}>
                <span style={{ fontSize:'.6rem', fontFamily:'JetBrains Mono,monospace', color:s.color, background:`${s.color}18`, border:`1px solid ${s.color}33`, borderRadius:100, padding:'2px 7px' }}>📖</span>
                <span style={{ fontSize:'.6rem', fontFamily:'JetBrains Mono,monospace', color:'var(--t3)', background:'rgba(255,255,255,.04)', border:'1px solid var(--b)', borderRadius:100, padding:'2px 7px' }}>🧮</span>
              </div>
              <span style={{ fontSize:'.6rem', fontFamily:'JetBrains Mono,monospace', color:'var(--t3)' }}>{COUNTS[s.id]} задач</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const cur = SUBTOPICS.find(s => s.id === sub);

  return (
    <div style={{ paddingTop:80 }}>
      {sub !== 'mixed' && (
        <div style={{ position:'sticky', top:60, zIndex:400, background:'rgba(9,9,15,.9)', backdropFilter:'blur(18px)', borderBottom:'1px solid var(--b)', padding:'0 20px' }}>
          <div style={{ maxWidth:720, margin:'0 auto', display:'flex', alignItems:'center', gap:2, overflowX:'auto' }}>
            <button onClick={goBack} style={{ background:'none', color:'var(--t3)', fontSize:'.76rem', padding:'11px 0', marginRight:8, fontFamily:'Inter,sans-serif', whiteSpace:'nowrap' }}>← Темы</button>
            {[{id:'theory',l:'📖 Теория'},{id:'practice',l:'🧮 Практика'}].map(t => (
              <button key={t.id} onClick={() => setView(t.id)} style={{ background:'none', padding:'11px 14px', fontFamily:'Inter,sans-serif', fontSize:'.84rem', borderBottom:`2px solid ${view===t.id?'var(--blue)':'transparent'}`, color:view===t.id?'var(--t)':'var(--t3)', fontWeight:view===t.id?600:400, transition:'all .2s', whiteSpace:'nowrap' }}>{t.l}</button>
            ))}
            <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:6, flexShrink:0 }}>
              <span style={{ color:'var(--t3)', fontSize:'.68rem', fontFamily:'JetBrains Mono,monospace' }}>{progress.correct}/{progress.total}</span>
              <div style={{ width:55 }} className="pt"><div className="pf" style={{ width:`${progress.total?progress.correct/progress.total*100:0}%` }}/></div>
            </div>
          </div>
        </div>
      )}
      {sub === 'mixed' && (
        <div style={{ borderBottom:'1px solid var(--b)', padding:'80px 20px 13px', maxWidth:700, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:10 }}>
          <div>
            <button onClick={goBack} style={{ background:'none', color:'var(--t3)', fontSize:'.76rem', marginBottom:4, fontFamily:'Inter,sans-serif', display:'block' }}>← Темы</button>
            <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.98rem' }}>🔀 Общая практика</div>
            <div style={{ color:'var(--t3)', fontSize:'.7rem' }}>{COUNTS.mixed} задач из всех тем</div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <span style={{ color:'var(--t3)', fontSize:'.68rem', fontFamily:'JetBrains Mono,monospace' }}>{progress.correct}/{progress.total}</span>
            <div style={{ width:55 }} className="pt"><div className="pf" style={{ width:`${progress.total?progress.correct/progress.total*100:0}%` }}/></div>
          </div>
        </div>
      )}
      <div style={{ padding:'30px 20px 100px', minHeight:'80vh' }}>
        {sub === 'mixed'
          ? <Practice subId="mixed" progress={progress} setProgress={setProgress}/>
          : view === 'theory'
            ? <TheoryView sub={cur} onPractice={() => setView('practice')}/>
            : <Practice subId={sub} progress={progress} setProgress={setProgress}/>
        }
      </div>
    </div>
  );
};

// ═══════════════════════ FOOTER + APP ════════════════════
const Footer = () => (
  <footer style={{ borderTop:'1px solid var(--b)', padding:'22px', textAlign:'center', color:'var(--t3)', fontSize:'.7rem' }}>
    <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, marginBottom:3, color:'var(--t2)' }}>ЕГЭ Математика 2026 · Профильный уровень</div>
    Задачи соответствуют заданиям из открытого банка ФИПИ · 4ege.ru · egeturbo.ru
  </footer>
);

export default function App() {
  const [page, setPage] = useState('home');
  const [hasSub, setHasSub] = useState(false);
  const [progress, setProgress] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ege26_v4')||'null') || {total:0,correct:0,streak:0,best:0}; }
    catch { return {total:0,correct:0,streak:0,best:0}; }
  });
  useEffect(() => { try { localStorage.setItem('ege26_v4', JSON.stringify(progress)); } catch {} }, [progress]);
  const go1 = () => { setPage('task1'); setHasSub(false); window.scrollTo(0, 0); };

  return (
    <>
      <GlobalStyles/>
      <Nav page={page} setPage={setPage} hasSub={hasSub} onBack={() => setHasSub(false)}/>
      {page === 'home' && (<><Hero onScroll={() => document.getElementById('tasks')?.scrollIntoView({behavior:'smooth'})}/><TasksGrid onSelect={n => n===1 && go1()}/><Footer/></>)}
      {page === 'task1' && (<><Task1Page progress={progress} setProgress={setProgress}/><Footer/></>)}
    </>
  );
}
