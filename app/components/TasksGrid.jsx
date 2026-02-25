import React from 'react';
import { ALL_TASKS } from '../data/tasks';

export const TasksGrid = ({ onSelect }) => (
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
