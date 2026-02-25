import React, { useState, useEffect, useCallback, useRef } from 'react';

const CELL = 20;
const CANVAS_W = 1400;
const CANVAS_H = 700;

export const ScratchPad = () => {
  const cvRef = useRef(null);
  const [tool, setTool] = useState('pen');
  const [size, setSize] = useState(2);
  const [color, setColor] = useState('#1a2040');
  const [drawing, setDrawing] = useState(false);
  const [hist, setHist] = useState([]);
  const last = useRef(null);
  const initialized = useRef(false);

  const drawBg = useCallback((ctx) => {
    ctx.fillStyle = '#fdfcf4';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.strokeStyle = 'rgba(176,200,240,.55)';
    ctx.lineWidth = 0.6;
    for (let x = 0; x <= CANVAS_W; x += CELL) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, CANVAS_H); ctx.stroke(); }
    for (let y = 0; y <= CANVAS_H; y += CELL) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(CANVAS_W, y); ctx.stroke(); }
    ctx.strokeStyle = 'rgba(240,100,100,.35)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(40, 0); ctx.lineTo(40, CANVAS_H); ctx.stroke();
  }, []);

  useEffect(() => {
    if (initialized.current) return;
    const cv = cvRef.current;
    if (!cv) return;
    cv.width = CANVAS_W;
    cv.height = CANVAS_H;
    drawBg(cv.getContext('2d'));
    initialized.current = true;
  }, [drawBg]);

  const getXY = (e, cv) => {
    const rect = cv.getBoundingClientRect();
    // scale for css vs physical pixels
    const scaleX = cv.width / rect.width;
    const scaleY = cv.height / rect.height;
    const src = e.touches ? e.touches[0] : e;
    return { x: (src.clientX - rect.left) * scaleX, y: (src.clientY - rect.top) * scaleY };
  };

  const snap = () => {
    const cv = cvRef.current;
    if (cv) setHist(h => [...h.slice(-14), cv.toDataURL()]);
  };

  const redrawGridAt = (ctx, x, y, r) => {
    const x0 = Math.max(0, x - r), x1 = Math.min(CANVAS_W, x + r);
    const y0 = Math.max(0, y - r), y1 = Math.min(CANVAS_H, y + r);
    ctx.strokeStyle = 'rgba(176,200,240,.55)'; ctx.lineWidth = 0.6;
    for (let gx = Math.floor(x0/CELL)*CELL; gx <= x1; gx += CELL) { ctx.beginPath(); ctx.moveTo(gx, y0); ctx.lineTo(gx, y1); ctx.stroke(); }
    for (let gy = Math.floor(y0/CELL)*CELL; gy <= y1; gy += CELL) { ctx.beginPath(); ctx.moveTo(x0, gy); ctx.lineTo(x1, gy); ctx.stroke(); }
    if (40 >= x0 && 40 <= x1) { ctx.strokeStyle = 'rgba(240,100,100,.35)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(40, y0); ctx.lineTo(40, y1); ctx.stroke(); }
  };

  const start = useCallback((e) => {
    e.preventDefault();
    const cv = cvRef.current; if (!cv) return;
    snap();
    const pos = getXY(e, cv);
    last.current = pos; setDrawing(true);
    const ctx = cv.getContext('2d');
    if (tool === 'eraser') {
      const r = size * 6;
      ctx.clearRect(pos.x - r, pos.y - r, r * 2, r * 2);
      redrawGridAt(ctx, pos.x, pos.y, r);
    } else {
      ctx.beginPath(); ctx.arc(pos.x, pos.y, size / 2, 0, Math.PI * 2);
      ctx.fillStyle = color; ctx.fill();
    }
  }, [tool, size, color]);

  const move = useCallback((e) => {
    e.preventDefault();
    if (!drawing) return;
    const cv = cvRef.current; if (!cv) return;
    const pos = getXY(e, cv);
    const ctx = cv.getContext('2d');
    if (tool === 'eraser') {
      const r = size * 6;
      ctx.clearRect(pos.x - r, pos.y - r, r * 2, r * 2);
      redrawGridAt(ctx, pos.x, pos.y, r);
    } else {
      ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = size; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.moveTo(last.current.x, last.current.y); ctx.lineTo(pos.x, pos.y); ctx.stroke();
    }
    last.current = pos;
  }, [drawing, tool, size, color]);

  const stop = useCallback(() => setDrawing(false), []);

  const undo = () => {
    if (!hist.length) return;
    const prev = hist[hist.length - 1]; setHist(h => h.slice(0, -1));
    const cv = cvRef.current; if (!cv) return;
    const img = new Image();
    img.onload = () => { const ctx = cv.getContext('2d'); ctx.clearRect(0, 0, cv.width, cv.height); ctx.drawImage(img, 0, 0); };
    img.src = prev;
  };

  const clear = () => {
    const cv = cvRef.current; if (!cv) return;
    setHist([]);
    drawBg(cv.getContext('2d'));
  };

  const COLORS = ['#1a2040','#ff5a5a','#5b8eff','#3ddc97','#9b6dff','#ffb547'];
  const SIZES  = [1, 2, 4, 7];

  return (
    <div style={{ marginTop:20, userSelect:'none', WebkitUserSelect:'none' }}>
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
        <span style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.88rem' }}>📝 Черновик</span>
        <span style={{ color:'var(--t3)', fontSize:'.7rem' }}>прокрути чтобы увидеть больше · рисуй и считай</span>
      </div>
      <div className="sp-outer">
        {/* toolbar */}
        <div className="sp-bar">
          {[{id:'pen',l:'✏️ Ручка'},{id:'eraser',l:'⬜ Ластик'}].map(t => (
            <button key={t.id} onClick={() => setTool(t.id)} className={`sp-btn${tool===t.id?' act':''}`}>{t.l}</button>
          ))}
          <div style={{ width:1, height:22, background:'rgba(176,200,240,.5)', margin:'0 2px', flexShrink:0 }}/>
          {COLORS.map(c => (
            <button key={c} onClick={() => { setColor(c); setTool('pen'); }} style={{ width:24, height:24, borderRadius:'50%', background:c, border:color===c&&tool==='pen'?'2.5px solid #1a2040':'2px solid transparent', transition:'transform .12s', transform:color===c&&tool==='pen'?'scale(1.28)':'scale(1)', flexShrink:0, touchAction:'manipulation' }}/>
          ))}
          <div style={{ width:1, height:22, background:'rgba(176,200,240,.5)', margin:'0 2px', flexShrink:0 }}/>
          <span style={{ color:'#384060', fontSize:'.72rem', fontFamily:'Inter,sans-serif', whiteSpace:'nowrap', flexShrink:0 }}>Толщина:</span>
          {SIZES.map(s => (
            <button key={s} onClick={() => setSize(s)} style={{ width:s+14, height:s+14, borderRadius:'50%', background:size===s?color:'rgba(176,200,240,.6)', border:'none', flexShrink:0, touchAction:'manipulation', transition:'all .12s', minWidth:18, minHeight:18 }}/>
          ))}
          <div style={{ width:1, height:22, background:'rgba(176,200,240,.5)', margin:'0 2px', flexShrink:0 }}/>
          <button onClick={undo} disabled={!hist.length} className="sp-btn" style={{ opacity:hist.length?1:.35 }}>↩ Отмена</button>
          <button onClick={clear} className="sp-btn" style={{ borderColor:'rgba(240,100,100,.4)', color:'#c04040' }}>✕ Очистить</button>
        </div>
        {/* scrollable large canvas */}
        <div className="sp-scroll" style={{ height:260, overflowX:'auto', overflowY:'auto' }}>
          <canvas
            ref={cvRef}
            className="sp-canvas"
            style={{ display:'block', width:CANVAS_W+'px', height:CANVAS_H+'px' }}
            onMouseDown={start} onMouseMove={move} onMouseUp={stop} onMouseLeave={stop}
            onTouchStart={start} onTouchMove={move} onTouchEnd={stop}
            onContextMenu={e => e.preventDefault()}
          />
        </div>
        <div style={{ padding:'5px 12px', background:'rgba(253,252,244,.95)', borderTop:'1px solid rgba(176,200,240,.4)', fontSize:'.67rem', color:'#7a80a0', fontFamily:'Inter,sans-serif', display:'flex', justifyContent:'space-between' }}>
          <span>Размер холста: 1400 × 700</span>
          <span>прокрути внутри черновика</span>
        </div>
      </div>
    </div>
  );
};
