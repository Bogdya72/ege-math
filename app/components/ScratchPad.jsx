import React, { useState, useEffect, useRef, useCallback } from 'react';

const CANVAS_W = 1400;
const CANVAS_H = 3000; // Increased height
const CELL = 20;

export const ScratchPad = () => {
  const containerRef = useRef(null);
  const cvRef = useRef(null);
  
  // Tools
  const [tool, setTool] = useState('pen'); // pen, eraser
  const [color, setColor] = useState('#e2e4f0'); // Light color for dark theme
  const [size, setSize] = useState(2);
  
  // Transform State (View)
  const [transform, setTransform] = useState({ x: 0, y: 0, k: 1 });
  
  // History
  const [hist, setHist] = useState([]);

  // Internal refs for gesture handling
  const state = useRef({
    pointers: new Map(),
    drawing: false,
    lastDrawPos: null,
    dist: 0,
    lastMid: null,
    transform: { x: 0, y: 0, k: 1 } // Mirror of state for fast access
  });

  // Init Canvas
  useEffect(() => {
    const cv = cvRef.current;
    if (!cv) return;
    cv.width = CANVAS_W;
    cv.height = CANVAS_H;
    
    const ctx = cv.getContext('2d');
    
    // Draw background
    ctx.fillStyle = '#1a1a20'; // Dark background matches theme
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    
    // Grid
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    for (let x = 0; x <= CANVAS_W; x += CELL) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, CANVAS_H); ctx.stroke(); }
    for (let y = 0; y <= CANVAS_H; y += CELL) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(CANVAS_W, y); ctx.stroke(); }
    
    // Margin line
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.2)'; // Red margin
    ctx.beginPath(); ctx.moveTo(40, 0); ctx.lineTo(40, CANVAS_H); ctx.stroke();

    state.current.transform = { x: -20, y: -20, k: 0.8 }; // Initial zoom out slightly
    setTransform({...state.current.transform});
  }, []);

  // Helper: Screen -> Canvas Coords
  const toCanvas = (sx, sy) => {
    const { x, y, k } = state.current.transform;
    return {
      x: (sx - x) / k,
      y: (sy - y) / k
    };
  };

  // Helper: Draw Line
  const drawLine = (p1, p2) => {
    const cv = cvRef.current;
    const ctx = cv.getContext('2d');
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = size * 8;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
      ctx.globalCompositeOperation = 'source-over';
    } else {
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }
  };

  // Event Handlers
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onPointerDown = (e) => {
      e.preventDefault();
      el.setPointerCapture(e.pointerId);
      state.current.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      
      const pointers = Array.from(state.current.pointers.values());
      
      if (pointers.length === 1) {
        // Start Drawing
        state.current.drawing = true;
        const rect = el.getBoundingClientRect();
        const pos = toCanvas(e.clientX - rect.left, e.clientY - rect.top);
        state.current.lastDrawPos = pos;
        
        // Dot
        drawLine(pos, pos);
        
        // Save state for undo (simplified: just push image data occasionally or on up)
      } else if (pointers.length === 2) {
        state.current.drawing = false;
        // Start Gesture
        const p1 = pointers[0];
        const p2 = pointers[1];
        state.current.dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        state.current.lastMid = { x: (p1.x + p2.x)/2, y: (p1.y + p2.y)/2 };
      }
    };

    const onPointerMove = (e) => {
      if (!state.current.pointers.has(e.pointerId)) return;
      e.preventDefault();
      
      // Update pointer pos
      state.current.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      const pointers = Array.from(state.current.pointers.values());
      const rect = el.getBoundingClientRect();

      if (state.current.drawing && pointers.length === 1) {
        const pos = toCanvas(e.clientX - rect.left, e.clientY - rect.top);
        if (state.current.lastDrawPos) {
          drawLine(state.current.lastDrawPos, pos);
        }
        state.current.lastDrawPos = pos;
      } else if (pointers.length === 2) {
        // Pan / Zoom
        const p1 = pointers[0];
        const p2 = pointers[1];
        const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        const mid = { x: (p1.x + p2.x)/2, y: (p1.y + p2.y)/2 };
        
        const lastDist = state.current.dist;
        const lastMid = state.current.lastMid;
        
        if (lastDist > 0 && lastMid) {
          const s = dist / lastDist;
          const dx = mid.x - lastMid.x;
          const dy = mid.y - lastMid.y;
          
          let { x, y, k } = state.current.transform;
          
          // Apply Pan
          x += dx;
          y += dy;
          
          // Apply Zoom relative to midpoint
          // newX = midX - (midX - oldX) * s
          // But we are tracking viewport offset.
          // Viewport offset equation: x_new = mid_x - (mid_x - x_old) * s
          // Relative to container (0,0)
          
          const relMidX = mid.x - rect.left;
          const relMidY = mid.y - rect.top;
          
          x = relMidX - (relMidX - x) * s;
          y = relMidY - (relMidY - y) * s;
          k *= s;
          
          // Limits
          k = Math.max(0.1, Math.min(5, k));
          
          state.current.transform = { x, y, k };
          setTransform({ x, y, k });
        }
        
        state.current.dist = dist;
        state.current.lastMid = mid;
      }
    };

    const onPointerUp = (e) => {
      state.current.pointers.delete(e.pointerId);
      if (state.current.pointers.size < 2) {
        state.current.dist = 0;
      }
      if (state.current.pointers.size === 0) {
        state.current.drawing = false;
        saveHistory();
      }
    };

    el.addEventListener('pointerdown', onPointerDown, { passive: false });
    el.addEventListener('pointermove', onPointerMove, { passive: false });
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointercancel', onPointerUp);
    el.addEventListener('pointerleave', onPointerUp);

    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('pointercancel', onPointerUp);
      el.removeEventListener('pointerleave', onPointerUp);
    };
  }, [tool, color, size]); // Re-bind if tool changes to ensure closure captures latest tool

  // Wheel Zoom
  const onWheel = (e) => {
    e.preventDefault(); // Stop page scroll
    // ... logic for wheel zoom/pan ...
    // Simplified:
    const s = Math.exp(-e.deltaY * 0.001);
    let { x, y, k } = state.current.transform;
    
    // Zoom center should be mouse pos
    const rect = containerRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    
    x = mx - (mx - x) * s;
    y = my - (my - y) * s;
    k *= s;
    k = Math.max(0.1, Math.min(5, k));
    
    state.current.transform = { x, y, k };
    setTransform({ x, y, k });
  };

  const saveHistory = () => {
    const cv = cvRef.current;
    if (cv) {
      // Limit history
      setHist(prev => [...prev.slice(-10), cv.toDataURL()]);
    }
  };

  const undo = () => {
    if (hist.length === 0) return;
    const prev = hist[hist.length - 2]; // Get previous
    const newHist = hist.slice(0, -1);
    setHist(newHist);
    
    const cv = cvRef.current;
    const ctx = cv.getContext('2d');
    if (!prev) {
        // Clear
        ctx.fillStyle = '#1a1a20';
        ctx.fillRect(0,0,CANVAS_W,CANVAS_H);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        for (let x = 0; x <= CANVAS_W; x += CELL) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, CANVAS_H); ctx.stroke(); }
        for (let y = 0; y <= CANVAS_H; y += CELL) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(CANVAS_W, y); ctx.stroke(); }
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.2)';
        ctx.beginPath(); ctx.moveTo(40, 0); ctx.lineTo(40, CANVAS_H); ctx.stroke();
        return;
    }
    const img = new Image();
    img.src = prev;
    img.onload = () => {
        ctx.clearRect(0,0,CANVAS_W,CANVAS_H);
        ctx.drawImage(img,0,0);
    };
  };
  
  const clear = () => {
      setHist([]);
      const cv = cvRef.current;
      const ctx = cv.getContext('2d');
      ctx.fillStyle = '#1a1a20';
      ctx.fillRect(0,0,CANVAS_W,CANVAS_H);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      for (let x = 0; x <= CANVAS_W; x += CELL) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, CANVAS_H); ctx.stroke(); }
      for (let y = 0; y <= CANVAS_H; y += CELL) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(CANVAS_W, y); ctx.stroke(); }
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.2)';
      ctx.beginPath(); ctx.moveTo(40, 0); ctx.lineTo(40, CANVAS_H); ctx.stroke();
  };

  const COLORS = ['#e2e4f0', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div style={{ marginTop: 24 }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
        <h3 style={{ margin:0, fontSize:'1.1rem' }}>Черновик</h3>
        <span style={{ fontSize:'0.75rem', color:'var(--t3)' }}>1 палец - рисовать, 2 пальца - зум/прокрутка</span>
      </div>
      
      <div className="sp-outer">
        {/* Toolbar */}
        <div className="sp-bar">
           {[{id:'pen',l:'✏️'},{id:'eraser',l:'🧹'}].map(t => (
            <button key={t.id} onClick={() => setTool(t.id)} className={`sp-btn${tool===t.id?' act':''}`}>{t.l}</button>
          ))}
          <div style={{width:1,height:20,background:'rgba(255,255,255,0.1)',margin:'0 4px'}}/>
          {COLORS.map(c => (
            <button key={c} onClick={() => { setColor(c); setTool('pen'); }} 
              style={{ 
                width:24, height:24, borderRadius:'50%', background:c, 
                border: color===c && tool==='pen' ? '2px solid #fff' : '2px solid transparent',
                transform: color===c && tool==='pen' ? 'scale(1.1)' : 'scale(1)',
                transition: 'all 0.2s'
              }}
            />
          ))}
           <div style={{width:1,height:20,background:'rgba(255,255,255,0.1)',margin:'0 4px'}}/>
           {[2, 4, 8].map(s => (
             <button key={s} onClick={() => setSize(s)} 
               style={{
                 width: 8 + s*2, height: 8 + s*2, borderRadius:'50%',
                 background: size===s ? '#fff' : 'rgba(255,255,255,0.2)',
                 border:'none'
               }}
             />
           ))}
           <div style={{flex:1}}/>
           <button onClick={undo} className="sp-btn">↩</button>
           <button onClick={clear} className="sp-btn" style={{color:'#ef4444'}}>✕</button>
        </div>

        {/* Viewport */}
        <div 
          ref={containerRef}
          className="sp-viewport"
          onWheel={onWheel}
        >
          <canvas
            ref={cvRef}
            style={{
              transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.k})`,
              transformOrigin: '0 0',
              willChange: 'transform'
            }}
          />
        </div>
      </div>
    </div>
  );
};
