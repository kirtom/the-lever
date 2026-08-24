import { useEffect, useRef, useState } from 'react';
import { Hoverable } from '../components/Hoverable';

function ClearAllData({ onConfirm, hi }) {
  const [confirming, setConfirming] = useState(false);
  const revertTimer = useRef(null);

  useEffect(() => () => clearTimeout(revertTimer.current), []);

  const handleClick = () => {
    if (!confirming) {
      setConfirming(true);
      revertTimer.current = setTimeout(() => setConfirming(false), 4000);
      return;
    }
    clearTimeout(revertTimer.current);
    onConfirm();
  };

  return (
    <Hoverable
      onClick={handleClick}
      style={{
        border: confirming ? '2px solid #ec3013' : '2px solid rgba(32,30,29,.3)',
        color: confirming ? '#ec3013' : '#605d5d',
        padding: '14px 16px',
        fontWeight: 800,
        fontSize: 13,
        textAlign: 'center',
        cursor: 'pointer',
      }}
      hoverStyle={{ background: confirming ? '#fff2ef' : '#eae7e7' }}
    >
      {confirming ? hi.confirmClear : hi.clear}
    </Hoverable>
  );
}

export function History({ derived, actions }) {
  const hi = derived.ui.history;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f3f2f2', padding: '74px 22px 30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 800 }}>
        <span>{hi.title}</span>
        <span onClick={actions.goHome} style={{ cursor: 'pointer', color: '#9b9797' }}>
          {hi.close}
        </span>
      </div>
      <div style={{ height: 2, background: '#201e1d', margin: '10px 0 6px' }} />
      <p style={{ fontSize: 12.5, color: '#605d5d', margin: '0 0 14px' }}>{hi.note}</p>
      {derived.history.length === 0 && <p style={{ fontSize: 13, color: '#9b9797', margin: 0 }}>{hi.empty}</p>}
      {derived.history.map((ep, i) => (
        <div key={i} style={{ display: 'flex', gap: 14, padding: '13px 0', borderBottom: '1px solid rgba(32,30,29,.22)' }}>
          <div style={{ width: 52, fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 11, color: '#605d5d', paddingTop: 3 }}>{ep.when}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.2 }}>{ep.name}</div>
            <div style={{ fontSize: 12, color: '#605d5d', marginTop: 2 }}>{ep.detail}</div>
          </div>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', paddingTop: 3 }}>
            <span style={{ color: ep.color, background: ep.bg, padding: ep.chip ? '3px 7px 4px' : 0, display: 'inline-block' }}>{ep.outcome}</span>
          </div>
        </div>
      ))}
      <div style={{ flex: 1 }} />
      <ClearAllData onConfirm={actions.clearAllData} hi={hi} />
    </div>
  );
}
