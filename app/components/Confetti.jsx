import React, { useState, useEffect } from 'react';

export const Confetti = ({ t }) => {
  const [p, setP] = useState([]);
  useEffect(() => {
    if (!t) return;
    const c = ["#5b8eff","#9b6dff","#2dd4bf","#ffb547","#3ddc97"];
    
    // Wrap in setTimeout to avoid synchronous state update warning during render
    const startTimer = setTimeout(() => {
      setP(Array.from({ length: 36 }, (_, i) => ({ id: i, x: Math.random()*100, col: c[i%c.length], d: Math.random()*.9, sz: 6+Math.random()*7 })));
    }, 0);

    const endTimer = setTimeout(() => setP([]), 3000);
    
    return () => {
      clearTimeout(startTimer);
      clearTimeout(endTimer);
    };
  }, [t]);
  return <>{p.map(x => <div key={x.id} className="conf" style={{ left:`${x.x}%`, top:-16, width:x.sz, height:x.sz, background:x.col, animationDelay:`${x.d}s` }}/>)}</>;
};
