export function History({ derived, actions }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f3f2f2', padding: '74px 22px 40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 800 }}>
        <span>Private log</span>
        <span onClick={actions.goHome} style={{ cursor: 'pointer', color: '#9b9797' }}>
          Close
        </span>
      </div>
      <div style={{ height: 2, background: '#201e1d', margin: '10px 0 6px' }} />
      <p style={{ fontSize: 12.5, color: '#605d5d', margin: '0 0 14px' }}>On this device only. Nothing syncs, nothing is shared.</p>
      {derived.history.map((ep, i) => (
        <div key={i} style={{ display: 'flex', gap: 14, padding: '13px 0', borderBottom: '1px solid rgba(32,30,29,.22)' }}>
          <div style={{ width: 52, fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 11, color: '#605d5d', paddingTop: 3 }}>{ep.when}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.2 }}>{ep.name}</div>
            <div style={{ fontSize: 12, color: '#605d5d', marginTop: 2 }}>{ep.detail}</div>
          </div>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', paddingTop: 3 }}>
            <span style={{ color: ep.color, background: ep.bg, padding: ep.chip ? '3px 7px 4px' : 0, display: 'inline-block' }}>{ep.outcome}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
