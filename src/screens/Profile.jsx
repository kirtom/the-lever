import { Hoverable } from '../components/Hoverable';

export function Profile({ derived, actions }) {
  const { step } = derived;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '62px 22px 34px', background: '#f3f2f2' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 800, color: '#201e1d' }}>
        <span>{step.counter}</span>
      </div>
      <div style={{ height: 2, background: '#201e1d', margin: '10px 0 22px' }} />
      <div style={{ fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 800, color: '#ec3013', marginBottom: 8 }}>{step.kicker}</div>
      <h2 style={{ fontSize: 26, lineHeight: 1.06, letterSpacing: '-.02em', margin: '0 0 5px', color: '#201e1d' }}>{step.title}</h2>
      <p style={{ fontSize: 13, color: '#605d5d', margin: '0 0 14px' }}>{step.hint}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
        {step.options.map((opt) => (
          <Hoverable
            key={opt.id}
            onClick={opt.toggle}
            style={{
              display: 'flex',
              gap: 10,
              alignItems: 'center',
              border: '2px solid #201e1d',
              padding: '9px 13px',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              background: '#f3f2f2',
              color: '#201e1d',
              minHeight: 42,
            }}
            hoverStyle={{ background: '#eae7e7' }}
          >
            <span style={{ fontSize: 13, color: '#ec3013', width: 12 }}>{opt.checked ? '■' : '□'}</span>
            <span>{opt.label}</span>
          </Hoverable>
        ))}
      </div>
      {step.hasNote && <p style={{ fontSize: 11, lineHeight: 1.4, color: '#9b9797', margin: '14px 0 0' }}>* {step.note}</p>}
      <div style={{ height: 2, background: '#201e1d', margin: '14px 0 14px' }} />
      <Hoverable
        onClick={actions.nextStep}
        style={{ background: '#201e1d', color: '#f3f2f2', padding: '18px 20px', fontWeight: 800, fontSize: 16, display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}
        hoverStyle={{ background: '#ec3013' }}
      >
        <span>{step.cta}</span>
        <span>→</span>
      </Hoverable>
    </div>
  );
}
