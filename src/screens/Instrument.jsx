import { Hoverable } from '../components/Hoverable';

export function Instrument({ derived, actions }) {
  const { inst } = derived;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f3f2f2', padding: '74px 22px 40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 800, color: '#ec3013' }}>
        <span>{inst.kicker}</span>
        <span onClick={actions.goHome} style={{ cursor: 'pointer', color: '#9b9797' }}>
          Close
        </span>
      </div>
      <div style={{ height: 2, background: '#201e1d', margin: '10px 0 18px' }} />
      <h2 style={{ fontSize: 36, lineHeight: 1, letterSpacing: '-.03em', margin: '0 0 4px' }}>{inst.name}</h2>
      <div
        onClick={actions.toggleFramework}
        style={{ fontSize: 12, fontWeight: 600, color: '#ae1800', borderBottom: '1px dotted #ae1800', alignSelf: 'flex-start', cursor: 'pointer', paddingBottom: 1 }}
      >
        {inst.framework}
      </div>
      {derived.frameworkOpen && (
        <div style={{ background: '#eae7e7', borderLeft: '2px solid #ec3013', padding: '12px 14px', fontSize: 13, lineHeight: 1.5, color: '#444141', marginTop: 12 }}>{inst.frameworkNote}</div>
      )}
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', margin: '22px 0 8px' }}>Why this one</div>
      <p style={{ fontSize: 15, lineHeight: 1.5, margin: '0 0 6px', color: '#201e1d' }}>{derived.readback}</p>
      <p style={{ fontSize: 15, lineHeight: 1.5, margin: 0, color: '#605d5d' }}>{inst.why}</p>
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', margin: '22px 0 8px' }}>What it does</div>
      <p style={{ fontSize: 15, lineHeight: 1.5, margin: 0, color: '#605d5d' }}>{inst.does}</p>
      <div style={{ height: 2, background: '#201e1d', margin: '22px 0 12px' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#605d5d' }}>
        <span>{inst.stepCount}</span>
        <span>{inst.duration}</span>
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Hoverable
          onClick={actions.startRun}
          style={{ background: '#ec3013', color: '#fff', padding: 20, fontWeight: 800, fontSize: 17, display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}
          hoverStyle={{ background: '#dd2b0f' }}
        >
          <span>{inst.cta}</span>
          <span>→</span>
        </Hoverable>
        <Hoverable
          onClick={actions.swapInstrument}
          style={{ border: '2px solid #201e1d', padding: '14px 20px', fontWeight: 800, fontSize: 14, cursor: 'pointer' }}
          hoverStyle={{ background: '#eae7e7' }}
        >
          Give me a different one
        </Hoverable>
      </div>
    </div>
  );
}
