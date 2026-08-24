import { Hoverable } from '../components/Hoverable';

export function Held({ derived, actions }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f3f2f2', padding: '74px 22px 40px' }}>
      <div style={{ width: 44, height: 44, background: '#ec3013' }} />
      <h2 style={{ fontSize: 38, lineHeight: 1, letterSpacing: '-.03em', margin: '24px 0 10px' }}>Logged.</h2>
      <p style={{ fontSize: 16, lineHeight: 1.5, color: '#605d5d', margin: '0 0 4px' }}>{derived.heldLine}</p>
      <div style={{ flex: 1 }} />
      <Hoverable
        onClick={actions.goHome}
        style={{ background: '#201e1d', color: '#f3f2f2', padding: '18px 20px', fontWeight: 800, fontSize: 16, display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}
        hoverStyle={{ background: '#ec3013' }}
      >
        <span>Done</span>
        <span>→</span>
      </Hoverable>
    </div>
  );
}
