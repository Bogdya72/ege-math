import React from 'react';

export const NbExample = ({ condition, figure, steps, answer, color = '#5b8eff' }) => (
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
