import { Hoverable } from '../components/Hoverable';

export function ProfileView({ derived, actions }) {
  const pv = derived.ui.profileView;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f3f2f2', padding: '74px 22px 40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 800 }}>
        <span>{pv.title}</span>
        <span onClick={actions.goHome} style={{ cursor: 'pointer', color: '#9b9797' }}>
          {pv.close}
        </span>
      </div>
      <div style={{ height: 2, background: '#201e1d', margin: '10px 0 18px' }} />
      {derived.profileRows.map((row) => (
        <div key={row.label} style={{ padding: '12px 0', borderBottom: '1px solid rgba(32,30,29,.22)' }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: '#ec3013' }}>{row.label}</div>
          <div style={{ fontSize: 15, lineHeight: 1.4, marginTop: 4 }}>{row.value}</div>
        </div>
      ))}
      <div style={{ flex: 1 }} />
      <Hoverable
        onClick={actions.redoProfile}
        style={{ border: '2px solid #201e1d', padding: '16px 20px', fontWeight: 800, fontSize: 15, display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}
        hoverStyle={{ background: '#eae7e7' }}
      >
        <span>{pv.redo}</span>
        <span>→</span>
      </Hoverable>
    </div>
  );
}
