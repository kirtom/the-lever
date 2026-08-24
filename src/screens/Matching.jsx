export function Matching({ derived }) {
  const m = derived.ui.matching;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#161514', color: '#f3f2f2', padding: '0 22px' }}>
      <div style={{ width: 36, height: 36, background: '#ec3013', animation: 'lv-pulse 1s infinite' }} />
      <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-.02em', marginTop: 22 }}>{derived.matchLine}</div>
      <div style={{ height: 2, background: 'rgba(243,242,242,.25)', margin: '20px 0 0' }} />
      {derived.fastPath ? (
        <div style={{ marginTop: 10 }}>
          <div style={{ fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: 800, color: '#ec3013' }}>{derived.ui.fastPath.kicker}</div>
          <div style={{ fontSize: 13, lineHeight: 1.45, color: 'rgba(243,242,242,.6)', marginTop: 6, maxWidth: 320 }}>{derived.ui.fastPath.line}</div>
        </div>
      ) : (
        <div style={{ fontSize: 12, color: 'rgba(243,242,242,.45)', marginTop: 10 }}>{m.footer}</div>
      )}
    </div>
  );
}
