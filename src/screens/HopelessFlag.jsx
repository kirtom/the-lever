import { Hoverable } from '../components/Hoverable';

export function HopelessFlag({ derived }) {
  const h = derived.hopelessFlag;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#161514', color: '#f3f2f2', padding: '74px 22px 40px' }}>
      <div style={{ fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: 800, color: '#ec3013' }}>{h.kicker}</div>
      <div style={{ height: 2, background: '#ec3013', margin: '10px 0 26px' }} />
      <h2 style={{ fontSize: 32, lineHeight: 1.02, letterSpacing: '-.03em', margin: '0 0 14px', maxWidth: 330 }}>{h.title}</h2>
      <p style={{ fontSize: 16, lineHeight: 1.5, color: 'rgba(243,242,242,.72)', margin: 0, maxWidth: 340 }}>{h.body}</p>
      <div style={{ flex: 1 }} />
      <Hoverable
        onClick={h.dismiss}
        style={{
          border: '2px solid rgba(243,242,242,.4)',
          padding: '18px 20px',
          fontWeight: 800,
          fontSize: 16,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        hoverStyle={{ background: '#f3f2f2', color: '#161514', borderColor: '#f3f2f2' }}
      >
        <span>{h.cta}</span>
        <span>→</span>
      </Hoverable>
    </div>
  );
}
