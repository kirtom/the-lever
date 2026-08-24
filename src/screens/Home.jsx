import { useState } from 'react';
import { Hoverable } from '../components/Hoverable';
import { Logo } from '../components/Logo';

export function Home({ derived, actions }) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const h = derived.ui.home;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f3f2f2', paddingTop: 58 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 22px 12px' }}>
        <Logo width={140} height={59} ink="#201e1d" />
        <Hoverable as="span" onClick={actions.openHistory} style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: '#605d5d', cursor: 'pointer' }} hoverStyle={{ color: '#ec3013' }}>
          {h.log}
        </Hoverable>
      </div>
      <div style={{ height: 2, background: '#201e1d', margin: '0 22px' }} />

      <div
        onClick={actions.startSOS}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => {
          setHover(false);
          setActive(false);
        }}
        onMouseDown={() => setActive(true)}
        onMouseUp={() => setActive(false)}
        style={{
          margin: '22px 22px 0',
          background: hover ? '#dd2b0f' : '#ec3013',
          color: '#fff',
          padding: '22px 22px 20px',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          border: '3px solid #201e1d',
          boxShadow: active ? '0 0 0 #201e1d' : hover ? '0 11px 0 #201e1d' : '0 10px 0 #201e1d',
          transform: active ? 'translateY(10px)' : hover ? 'translateY(-1px)' : 'none',
          transition: 'transform .06s, box-shadow .06s',
          userSelect: 'none',
        }}
      >
        <div style={{ fontSize: 64, lineHeight: 0.84, fontWeight: 800, letterSpacing: '-.05em', textAlign: 'center' }}>{h.help}</div>
        <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.86, textAlign: 'center' }}>{h.helpSubtitle}</div>
      </div>

      <div style={{ padding: '20px 22px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase' }}>{h.yourLevers}</span>
        </div>
        <div style={{ height: 2, background: '#201e1d', margin: '10px 0 0' }} />
        {derived.shelf.length === 0 && <p style={{ fontSize: 12, lineHeight: 1.4, color: '#9b9797', margin: '14px 0 0' }}>{h.emptyShelf}</p>}
        {derived.shelf.map((row) => (
          <Hoverable
            key={row.rank}
            onClick={row.open}
            style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '8px 0', borderBottom: '1px solid rgba(32,30,29,.25)', cursor: 'pointer' }}
            hoverStyle={{ background: '#eae7e7' }}
          >
            <span style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 12, fontWeight: 800, color: '#ec3013', paddingTop: 3 }}>{row.rank}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-.01em', lineHeight: 1.2 }}>{row.name}</div>
              <div style={{ fontSize: 12, color: '#201e1d', marginTop: 4, fontWeight: 600 }}>{row.dur}</div>
              <div style={{ fontSize: 12, color: '#605d5d', marginTop: 2 }}>{row.framework}</div>
            </div>
            <span style={{ fontSize: 26, fontWeight: 800, color: '#201e1d', lineHeight: 1, paddingTop: 2 }}>→</span>
          </Hoverable>
        ))}
      </div>

      <div style={{ flex: 1 }} />
      <div style={{ padding: '12px 22px 30px', display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: '#605d5d' }}>
        <Hoverable as="span" onClick={actions.openProfileView} style={{ cursor: 'pointer' }} hoverStyle={{ color: '#ec3013' }}>
          {h.profile}
        </Hoverable>
        <Hoverable as="span" onClick={actions.openHarm} style={{ cursor: 'pointer' }} hoverStyle={{ color: '#ec3013' }}>
          {h.logRelapse}
        </Hoverable>
      </div>
    </div>
  );
}
