import React, { useState, useRef, useCallback } from 'react';
import { BANK, shuffle } from '../data/bank';
import { SUBTOPICS } from '../data/subtopics';
import { Confetti } from './Confetti';
import { ScratchPad } from './ScratchPad';

export const Practice = ({ subId, progress, setProgress }) => {
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
      {boom > 0 && <Confetti key={boom}/>}

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
