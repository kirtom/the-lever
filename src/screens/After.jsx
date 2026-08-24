import { Hoverable } from '../components/Hoverable';

export function After({ actions }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#161514', color: '#f3f2f2', padding: '74px 22px 40px' }}>
      <div style={{ fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: 800, color: '#ec3013' }}>One question</div>
      <div style={{ height: 2, background: '#ec3013', margin: '10px 0 26px' }} />
      <h2 style={{ fontSize: 38, lineHeight: 1, letterSpacing: '-.03em', margin: '0 0 10px' }}>Where is it now?</h2>
      <p style={{ fontSize: 15, color: 'rgba(243,242,242,.55)', margin: 0 }}>Honest answer. Wrong answers make the next pick worse.</p>
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Hoverable onClick={actions.itHeld} style={{ border: '2px solid rgba(243,242,242,.3)', padding: '20px 18px', cursor: 'pointer' }} hoverStyle={{ borderColor: '#ec3013', background: '#ec3013' }}>
          <div style={{ fontSize: 20, fontWeight: 800 }}>It came down</div>
          <div style={{ fontSize: 13, color: 'rgba(243,242,242,.55)', marginTop: 2 }}>This one moves up your levers</div>
        </Hoverable>
        <Hoverable onClick={actions.itFailed} style={{ border: '2px solid rgba(243,242,242,.3)', padding: '20px 18px', cursor: 'pointer' }} hoverStyle={{ borderColor: '#ec3013', background: '#ec3013' }}>
          <div style={{ fontSize: 20, fontWeight: 800 }}>Still climbing</div>
          <div style={{ fontSize: 13, color: 'rgba(243,242,242,.55)', marginTop: 2 }}>We try a different instrument</div>
        </Hoverable>
      </div>
    </div>
  );
}
