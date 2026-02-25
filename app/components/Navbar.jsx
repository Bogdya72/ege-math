import React, { useState, useEffect } from 'react';

export const Navbar = ({ page, setPage, sub, onBack }) => {
  const [sc, setSc] = useState(false);
  useEffect(() => { const h = () => setSc(window.scrollY > 10); window.addEventListener('scroll', h, {passive:true}); return () => window.removeEventListener('scroll', h); }, []);
  
  return (
    <nav style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      zIndex: 500, 
      background: sc ? 'rgba(3,3,4,0.85)' : 'transparent', 
      backdropFilter: sc ? 'blur(16px)' : 'none', 
      WebkitBackdropFilter: sc ? 'blur(16px)' : 'none',
      borderBottom: sc ? '1px solid var(--b)' : '1px solid transparent', 
      transition: 'all 0.4s cubic-bezier(0.2,0.8,0.2,1)' 
    }}>
      <div className="nav-inner">
        <button onClick={() => { setPage('home'); onBack(); }} style={{ background:'none', display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ 
            width:36, height:36, borderRadius:10, 
            background: 'linear-gradient(135deg, var(--blue), var(--vio))', 
            display:'flex', alignItems:'center', justifyContent:'center', 
            fontSize:18, color:'#fff', fontFamily:'Syne,sans-serif', fontWeight:800, 
            flexShrink:0, boxShadow: '0 4px 12px rgba(59,130,246,0.3)'
          }}>∑</div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'1rem', lineHeight:1.1, color:'#fff' }}>ЕГЭ Математика</div>
            <div style={{ fontSize:'.7rem', color:'var(--t2)', fontFamily:'Inter,sans-serif', fontWeight:500 }}>Профиль · 2026</div>
          </div>
        </button>
        <div style={{ display:'flex', gap:8 }}>
          {page==='task1' && sub && <button className="btn-sec" onClick={onBack} style={{ fontSize:'.8rem', padding:'6px 14px', borderRadius:8 }}>← Темы</button>}
          {page!=='home' && <button className="btn-sec" onClick={() => { setPage('home'); onBack(); }} style={{ fontSize:'.8rem', padding:'6px 14px', borderRadius:8 }}>Все задания</button>}
        </div>
      </div>
    </nav>
  );
};
