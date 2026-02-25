import React from 'react';
import { COUNTS } from '../data/bank';
import { FormulaCard } from './FormulaCard';
import { NbExample } from './NbExample';

export const TheoryView = ({ sub, onPractice }) => {
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
          <FormulaCard key={i} formula={item.f} note={item.n} fig={item.fig}/>
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
