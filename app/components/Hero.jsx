import React from 'react';

export const Hero = ({ onScroll }) => (
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
