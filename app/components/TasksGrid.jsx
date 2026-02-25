import React from 'react';
import { ALL_TASKS } from '../data/tasks';

export const TasksGrid = ({ onSelect }) => (
  <section id="tasks" style={{ padding: '60px 20px 80px', maxWidth: 1200, margin: '0 auto' }}>
    <div className="fu" style={{ marginBottom: 40, textAlign: 'center' }}>
      <div style={{ 
        color: 'var(--blue)', 
        fontSize: '0.75rem', 
        fontFamily: 'Inter, sans-serif', 
        fontWeight: 600, 
        letterSpacing: '0.05em', 
        textTransform: 'uppercase', 
        marginBottom: 8,
        display: 'inline-block',
        background: 'rgba(59,130,246,0.1)',
        padding: '4px 12px',
        borderRadius: 20
      }}>
        ФИПИ 2026
      </div>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginBottom: 12, marginTop: 12 }}>
        Все 19 заданий
      </h2>
      <p style={{ color: 'var(--t2)', maxWidth: 500, margin: '0 auto', fontSize: '1rem' }}>
        Выберите задание для тренировки. Задачи генерируются автоматически, поэтому они никогда не заканчиваются.
      </p>
    </div>

    {[
      { label: 'Часть 1 · Тестовая часть', from: 1, to: 12 },
      { label: 'Часть 2 · Развёрнутый ответ', from: 13, to: 19 }
    ].map((section, idx) => (
      <div key={idx} style={{ marginBottom: 48 }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 12, 
          marginBottom: 20, 
          paddingBottom: 12, 
          borderBottom: '1px solid var(--b)' 
        }}>
          <h3 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--t)' }}>{section.label}</h3>
        </div>
        
        <div className="tg" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
          {ALL_TASKS.filter(t => t.n >= section.from && t.n <= section.to).map((t, i) => (
            <button 
              key={t.n} 
              onClick={() => t.ready && onSelect(t.n)} 
              disabled={!t.ready} 
              className="card" 
              style={{ 
                padding: '20px', 
                textAlign: 'left', 
                cursor: t.ready ? 'pointer' : 'default', 
                opacity: t.ready ? 1 : 0.5, 
                position: 'relative', 
                overflow: 'hidden', 
                transition: 'all 0.3s cubic-bezier(0.2,0.8,0.2,1)', 
                minHeight: 160,
                display: 'flex',
                flexDirection: 'column',
                border: t.ready ? '1px solid var(--b2)' : '1px solid var(--b)',
                background: t.ready ? 'var(--s)' : 'var(--bg2)'
              }}
            >
              {t.ready && (
                <div style={{ 
                  position: 'absolute', top: 0, left: 0, width: '100%', height: 3, 
                  background: 'linear-gradient(90deg, var(--blue), var(--vio))' 
                }}/>
              )}
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ 
                  width: 32, height: 32, borderRadius: 8, 
                  background: t.ready ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.03)', 
                  color: t.ready ? 'var(--blue)' : 'var(--t3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.1rem'
                }}>
                  {t.icon}
                </div>
                <span style={{ 
                  fontSize: '0.7rem', 
                  fontFamily: 'Inter, sans-serif', 
                  fontWeight: 600,
                  color: t.ready ? 'var(--t2)' : 'var(--t3)', 
                  background: t.ready ? 'rgba(255,255,255,0.05)' : 'transparent', 
                  border: t.ready ? '1px solid var(--b)' : 'none', 
                  borderRadius: 6, 
                  padding: '2px 6px' 
                }}>
                  {t.pts} балл
                </span>
              </div>
              
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.2rem', marginBottom: 4, color: t.ready ? '#fff' : 'var(--t3)' }}>
                № {t.n}
              </div>
              
              <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.9rem', marginBottom: 4, color: t.ready ? 'var(--t)' : 'var(--t3)' }}>
                {t.topic}
              </div>
              
              <div style={{ color: 'var(--t3)', fontSize: '0.8rem', lineHeight: 1.4, marginBottom: 'auto' }}>
                {t.sub}
              </div>
              
              <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
                 <div className={`tag ${t.ready ? 'tag-ok' : 'tag-pend'}`} style={{ padding: '4px 10px' }}>
                   {t.ready ? 'Доступно' : 'Скоро'}
                 </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    ))}
  </section>
);
