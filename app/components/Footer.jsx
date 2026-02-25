import React from 'react';

export const Footer = () => (
  <footer style={{ borderTop:'1px solid var(--b)', padding:'20px 16px', textAlign:'center', color:'var(--t3)', fontSize:'.7rem' }}>
    <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, marginBottom:4, color:'var(--t2)', fontSize:'.8rem' }}>ЕГЭ Математика 2026 · Профильный уровень</div>
    <div style={{ marginBottom:6 }}>Задачи в стиле открытого банка ФИПИ</div>
    <a href="https://math-ege.sdamgia.ru" target="_blank" rel="noopener noreferrer" style={{ color:'var(--teal)', textDecoration:'none', fontFamily:'JetBrains Mono,monospace', fontSize:'.68rem' }}>
      math-ege.sdamgia.ru ↗
    </a>
  </footer>
);
