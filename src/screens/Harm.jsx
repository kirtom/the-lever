import { Hoverable } from '../components/Hoverable';

export function Harm({ derived, actions }) {
  const hm = derived.ui.harm;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#161514', color: '#f3f2f2', padding: '54px 22px 24px' }}>
      <div style={{ fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: 800, color: '#ec3013' }}>{hm.kicker}</div>
      <div style={{ height: 2, background: '#ec3013', margin: '8px 0 10px' }} />
      <h2 style={{ fontSize: 24, lineHeight: 1.05, letterSpacing: '-.03em', margin: '0 0 6px', whiteSpace: 'nowrap' }}>{hm.title}</h2>
      <p style={{ fontSize: 14, lineHeight: 1.4, color: 'rgba(243,242,242,.6)', margin: '0 0 8px' }}>{hm.body}</p>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {derived.harmItems.map((item, i) => (
          <div key={i} onClick={item.toggle} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '7px 0', borderTop: '1px solid rgba(243,242,242,.2)', cursor: 'pointer' }}>
            <span style={{ fontSize: 14, color: '#ec3013', width: 14, paddingTop: 2 }}>{item.checked ? '■' : '□'}</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, lineHeight: 1.2 }}>{item.label}</div>
              <div style={{ fontSize: 11.5, color: 'rgba(243,242,242,.5)', marginTop: 2, lineHeight: 1.35 }}>{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1 }} />
      {/* Three equal-height buttons in a deliberate order of preference:
          getting back to a solution is the one we want pressed, sharing a
          location is the safety net, logging a relapse is available but never
          inviting. */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        <Hoverable
          onClick={actions.goHome}
          style={{ background: '#ec3013', color: '#fff', height: 48, padding: '0 20px', fontWeight: 800, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
          hoverStyle={{ background: '#dd2b0f' }}
        >
          <span>{hm.back}</span>
          <span>→</span>
        </Hoverable>
        <Hoverable
          onClick={actions.sendLocation}
          title={derived.locationNote}
          style={{
            border: '2px solid rgba(243,242,242,.55)',
            color: '#f3f2f2',
            height: 48,
            padding: '0 20px',
            fontWeight: 800,
            fontSize: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
          hoverStyle={{ background: '#f3f2f2', color: '#161514', borderColor: '#f3f2f2' }}
        >
          <span>{derived.locationCta}</span>
          <span>→</span>
        </Hoverable>
        <Hoverable
          onClick={actions.logRelapse}
          style={{
            border: '1px solid rgba(243,242,242,.22)',
            color: 'rgba(243,242,242,.55)',
            height: 48,
            padding: '0 20px',
            fontWeight: 600,
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
          hoverStyle={{ color: '#f3f2f2', borderColor: 'rgba(243,242,242,.45)' }}
        >
          <span>{hm.logRelapse}</span>
          <span>→</span>
        </Hoverable>
      </div>
    </div>
  );
}
