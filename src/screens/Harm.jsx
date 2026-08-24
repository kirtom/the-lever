import { Hoverable } from '../components/Hoverable';

export function Harm({ derived, actions }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#161514', color: '#f3f2f2', padding: '62px 22px 30px' }}>
      <div style={{ fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: 800, color: '#ec3013' }}>Harm reduction</div>
      <div style={{ height: 2, background: '#ec3013', margin: '8px 0 14px' }} />
      <h2 style={{ fontSize: 30, lineHeight: 1.02, letterSpacing: '-.03em', margin: '0 0 8px', maxWidth: 320 }}>Harm reduction strategy</h2>
      <p style={{ fontSize: 15, lineHeight: 1.5, color: 'rgba(243,242,242,.6)', margin: '0 0 12px' }}>The goal is no longer to stop. It is to stay alive and not be alone. Work down the list.</p>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {derived.harmItems.map((item, i) => (
          <div key={i} onClick={item.toggle} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 0', borderTop: '1px solid rgba(243,242,242,.2)', cursor: 'pointer' }}>
            <span style={{ fontSize: 14, color: '#ec3013', width: 14, paddingTop: 2 }}>{item.checked ? '■' : '□'}</span>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.22 }}>{item.label}</div>
              <div style={{ fontSize: 12, color: 'rgba(243,242,242,.5)', marginTop: 2 }}>{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Hoverable
          onClick={actions.goHome}
          style={{ border: '2px solid rgba(243,242,242,.3)', padding: '16px 20px', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}
          hoverStyle={{ borderColor: '#ec3013' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Back to finding a solution</span>
            <span>→</span>
          </div>
        </Hoverable>
        <Hoverable
          onClick={actions.sendLocation}
          style={{ background: '#ec3013', color: '#fff', padding: '18px 20px', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}
          hoverStyle={{ background: '#dd2b0f' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{derived.locationCta}</span>
            <span>→</span>
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.85, marginTop: 4 }}>{derived.locationNote}</div>
        </Hoverable>
        <Hoverable
          onClick={actions.logRelapse}
          style={{ background: '#201e1d', color: '#f3f2f2', padding: '18px 20px', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}
          hoverStyle={{ background: '#2d2b2b' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Log a relapse</span>
            <span>→</span>
          </div>
        </Hoverable>
      </div>
    </div>
  );
}
