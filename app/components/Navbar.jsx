import React, { useState, useEffect } from 'react';

export const Navbar = ({ page, setPage, sub, onBack }) => {
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
