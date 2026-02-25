import React from 'react';

export const Hero = ({ onScroll }) => (
  <section style={{ 
    minHeight: '100svh', 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: '80px 20px 60px', 
    position: 'relative', 
    overflow: 'hidden', 
    textAlign: 'center' 
  }}>
    {/* Ambient Background */}
    <div style={{ position:'absolute', width:'120%', height:'120%', background:'radial-gradient(circle at 50% 0%, rgba(59,130,246,0.08), transparent 60%)', pointerEvents:'none', top:'-20%' }}/>
    <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(var(--b) 1px, transparent 1px), linear-gradient(90deg, var(--b) 1px, transparent 1px)', backgroundSize:'60px 60px', maskImage:'radial-gradient(circle at 50% 50%, black, transparent 80%)', pointerEvents:'none' }}/>

    <div className="fu" style={{ animationDelay: '0.1s', marginBottom: 24 }}>
      <span style={{ 
        background: 'rgba(59,130,246,0.1)', 
        border: '1px solid rgba(59,130,246,0.2)', 
        color: '#60a5fa', 
        borderRadius: 100, 
        padding: '8px 16px', 
        fontSize: '0.75rem', 
        fontFamily: 'Inter, sans-serif', 
        fontWeight: 600, 
        letterSpacing: '0.04em',
        boxShadow: '0 4px 12px rgba(59,130,246,0.1)'
      }}>
        ✨ ФИПИ 2026 · ПРОФИЛЬ
      </span>
    </div>
    
    <h1 className="fu" style={{ animationDelay: '0.2s', fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 800, maxWidth: 800, marginBottom: 20, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
      Сдай ЕГЭ по <span className="grad" style={{ display:'inline-block' }}>математике</span> <br/>на максимум
    </h1>
    
    <p className="fu" style={{ animationDelay: '0.3s', color: 'var(--t2)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', maxWidth: 500, marginBottom: 40, lineHeight: 1.6, fontWeight: 400 }}>
      Бесконечные варианты задач, подробная теория с рисунками и удобный черновик. Бесплатно и без регистрации.
    </p>
    
    <div className="fu" style={{ animationDelay: '0.4s', display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
      <button className="btn" onClick={onScroll}>
        Начать решать
      </button>
      <button className="btn-sec" style={{ padding:'12px 24px', borderRadius:10, fontSize:'0.95rem', fontWeight:600 }} onClick={() => document.getElementById('tasks')?.scrollIntoView({behavior:'smooth'})}>
        Все задания
      </button>
    </div>
  </section>
);
