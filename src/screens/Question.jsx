import { Hoverable } from '../components/Hoverable';

export function Question({ derived, actions }) {
  const { q } = derived;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#161514', color: '#f3f2f2', padding: '58px 22px 26px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: 800 }}>
        <span style={{ color: '#ec3013' }}>{q.counter}</span>
        <span onClick={actions.goHome} style={{ cursor: 'pointer', color: 'rgba(243,242,242,.45)' }}>
          Exit
        </span>
      </div>
      <div style={{ height: 2, background: '#ec3013', margin: '8px 0 14px' }} />
      <h2 style={{ fontSize: 27, lineHeight: 1.04, letterSpacing: '-.025em', margin: '0 0 14px', color: '#f3f2f2', maxWidth: 320 }}>{q.title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {q.options.map((opt) => (
          <Hoverable
            key={opt.label}
            onClick={opt.pick}
            style={{
              border: '2px solid rgba(243,242,242,.3)',
              padding: '0 14px',
              minHeight: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              cursor: 'pointer',
            }}
            hoverStyle={{ borderColor: '#ec3013', background: '#ec3013' }}
          >
            <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-.01em' }}>{opt.label}</span>
            <span style={{ fontSize: 12, color: 'rgba(243,242,242,.5)', textAlign: 'right' }}>{opt.sub}</span>
          </Hoverable>
        ))}
      </div>
      <div style={{ flex: 1 }} />
      <Hoverable as="div" onClick={actions.backQuestion} style={{ fontSize: 12, color: 'rgba(243,242,242,.4)', cursor: 'pointer' }} hoverStyle={{ color: '#f3f2f2' }}>
        ← Back
      </Hoverable>
    </div>
  );
}
