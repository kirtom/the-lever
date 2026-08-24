export function Matching({ derived }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#161514', color: '#f3f2f2', padding: '0 22px' }}>
      <div style={{ width: 36, height: 36, background: '#ec3013', animation: 'lv-pulse 1s infinite' }} />
      <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-.02em', marginTop: 22 }}>{derived.matchLine}</div>
      <div style={{ height: 2, background: 'rgba(243,242,242,.25)', margin: '20px 0 0' }} />
      <div style={{ fontSize: 12, color: 'rgba(243,242,242,.45)', marginTop: 10 }}>Reading every instrument against your profile</div>
    </div>
  );
}
