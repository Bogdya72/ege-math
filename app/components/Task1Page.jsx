import React, { useState } from 'react';
import { SUBTOPICS } from '../data/subtopics';
import { COUNTS } from '../data/bank';
import { TheoryView } from './TheoryView';
import { Practice } from './Practice';

export const Task1Page = ({ progress, setProgress }) => {
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
