import { Hoverable } from '../components/Hoverable';

export function Run({ derived, actions }) {
  const { run, inst } = derived;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#161514', color: '#f3f2f2', padding: '74px 22px 40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: 800 }}>
        <span style={{ color: '#ec3013' }}>{run.counter}</span>
        <span>{inst.name}</span>
      </div>
      <div style={{ height: 6, background: 'rgba(243,242,242,.18)', margin: '10px 0 0' }}>
        <div style={{ height: 6, background: '#ec3013', width: run.pct }} />
      </div>
      <div style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 70, fontWeight: 400, letterSpacing: '-.04em', margin: '28px 0 0' }}>{run.clock}</div>
      <h2 style={{ fontSize: 30, lineHeight: 1.06, letterSpacing: '-.025em', margin: '18px 0 12px', maxWidth: 330 }}>{run.label}</h2>
      <p style={{ fontSize: 16, lineHeight: 1.55, color: 'rgba(243,242,242,.6)', margin: 0, maxWidth: 330 }}>{run.body}</p>
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Hoverable
          onClick={actions.nextRunStep}
          style={{ background: '#f3f2f2', color: '#161514', padding: '18px 20px', fontWeight: 800, fontSize: 16, display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}
          hoverStyle={{ background: '#ec3013', color: '#fff' }}
        >
          <span>{run.cta}</span>
          <span>→</span>
        </Hoverable>
        <Hoverable as="div" onClick={actions.bail} style={{ padding: '12px 2px', fontSize: 13, color: 'rgba(243,242,242,.45)', cursor: 'pointer' }} hoverStyle={{ color: '#ec3013' }}>
          This isn't working →
        </Hoverable>
      </div>
    </div>
  );
}
