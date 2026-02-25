import React from 'react';

export const FormulaCard = ({ formula, note, fig }) => (
  <div className="fc">
    <div className="fc-txt">
      <div className="f">{formula}</div>
      <div style={{ color:'var(--t2)', fontSize:'.78rem', marginTop:5, lineHeight:1.5 }}>{note}</div>
    </div>
    {fig && <div className="fc-fig">{fig}</div>}
  </div>
);
