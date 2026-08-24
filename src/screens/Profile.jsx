import { Hoverable } from '../components/Hoverable';

export function Profile({ derived, actions }) {
  const { step } = derived;
  const ready = step.canProceed;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '58px 22px 30px', background: '#f3f2f2' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 800, color: '#201e1d' }}>
        <span>{step.counter}</span>
        <Hoverable as="span" onClick={actions.backStep} style={{ cursor: 'pointer', color: '#9b9797', letterSpacing: '.08em' }} hoverStyle={{ color: '#ec3013' }}>
          {step.back}
        </Hoverable>
      </div>
      <div style={{ height: 2, background: '#201e1d', margin: '10px 0 18px' }} />
      <div style={{ fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 800, color: '#ec3013', marginBottom: 8 }}>{step.kicker}</div>
      <h2 style={{ fontSize: 25, lineHeight: 1.06, letterSpacing: '-.02em', margin: '0 0 5px', color: '#201e1d' }}>{step.title}</h2>
      <p style={{ fontSize: 13, color: '#605d5d', margin: '0 0 12px' }}>{step.hint}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: 1 }}>
        {step.options.map((opt) => (
          <Hoverable
            key={opt.id}
            onClick={opt.disabled ? undefined : opt.toggle}
            style={{
              display: 'flex',
              gap: 10,
              alignItems: 'center',
              border: opt.disabled ? '2px solid rgba(32,30,29,.18)' : '2px solid #201e1d',
              padding: '8px 13px',
              fontSize: 14,
              fontWeight: 600,
              cursor: opt.disabled ? 'default' : 'pointer',
              background: '#f3f2f2',
              color: opt.disabled ? '#b6b2b2' : '#201e1d',
              minHeight: 40,
            }}
            hoverStyle={opt.disabled ? {} : { background: '#eae7e7' }}
          >
            <span style={{ fontSize: 13, color: opt.disabled ? '#cfcbcb' : '#ec3013', width: 12 }}>{opt.checked ? '■' : '□'}</span>
            <span>{opt.label}</span>
          </Hoverable>
        ))}
      </div>
      {step.hasNote && <p style={{ fontSize: 11, lineHeight: 1.4, color: '#9b9797', margin: '12px 0 0' }}>* {step.note}</p>}
      <div style={{ height: 2, background: '#201e1d', margin: '12px 0 12px' }} />
      <Hoverable
        onClick={ready ? actions.nextStep : undefined}
        style={{
          background: ready ? '#201e1d' : 'rgba(32,30,29,.18)',
          color: ready ? '#f3f2f2' : '#8d8989',
          padding: '16px 20px',
          fontWeight: 800,
          fontSize: 16,
          display: 'flex',
          justifyContent: 'space-between',
          cursor: ready ? 'pointer' : 'default',
        }}
        hoverStyle={ready ? { background: '#ec3013' } : {}}
      >
        <span>{ready ? step.cta : step.pickOne}</span>
        <span>→</span>
      </Hoverable>
    </div>
  );
}
