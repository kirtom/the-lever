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
      <p style={{ fontSize: 12, lineHeight: 1.4, color: 'rgba(243,242,242,.45)', margin: '0 0 10px' }}>{derived.locationNote}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Hoverable
          onClick={actions.sendLocation}
          style={{ background: '#ec3013', color: '#fff', padding: '18px 20px', fontWeight: 800, fontSize: 16, display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}
          hoverStyle={{ background: '#dd2b0f' }}
        >
          <span>{derived.locationCta}</span>
          <span>→</span>
        </Hoverable>
        <Hoverable
          onClick={actions.goHome}
          style={{ border: '2px solid rgba(243,242,242,.3)', padding: '16px 20px', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}
          hoverStyle={{ borderColor: '#ec3013' }}
        >
          <span style={{ color: '#f3f2f2' }}>Back to </span>
          <span style={{ color: '#ec3013' }}>The Lever</span>
        </Hoverable>
        <Hoverable
          as="div"
          onClick={actions.logRelapse}
          style={{ fontSize: 12, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'rgba(243,242,242,.45)', cursor: 'pointer', padding: '4px 0' }}
          hoverStyle={{ color: '#f3f2f2' }}
        >
          Log tonight as a relapse
        </Hoverable>
      </div>
    </div>
  );
}
