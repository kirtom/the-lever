import { Hoverable } from '../components/Hoverable';
import { Logo } from '../components/Logo';

export function Welcome({ derived, actions }) {
  const w = derived.ui.welcome;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#201e1d', color: '#f3f2f2', padding: '72px 24px 38px' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
          <div style={{ display: 'flex', border: '1px solid rgba(243,242,242,.35)' }}>
            <div
              onClick={derived.lang === 'ru' ? actions.toggleLang : undefined}
              style={{
                padding: '5px 10px',
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '.06em',
                cursor: derived.lang === 'ru' ? 'pointer' : 'default',
                background: derived.lang === 'en' ? '#ec3013' : 'transparent',
                color: derived.lang === 'en' ? '#fff' : 'rgba(243,242,242,.55)',
              }}
            >
              EN
            </div>
            <div
              onClick={derived.lang === 'en' ? actions.toggleLang : undefined}
              style={{
                padding: '5px 10px',
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '.06em',
                cursor: derived.lang === 'en' ? 'pointer' : 'default',
                background: derived.lang === 'ru' ? '#ec3013' : 'transparent',
                color: derived.lang === 'ru' ? '#fff' : 'rgba(243,242,242,.55)',
              }}
            >
              RU
            </div>
          </div>
        </div>
        <Logo width={288} height={122} style={{ margin: '0 auto' }} />
        <div style={{ height: 2, background: '#ec3013', margin: '18px 0 16px', width: '100%' }} />
        <ul style={{ listStyle: 'none', margin: '0 0 22px', padding: 0, display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 340 }}>
          {w.denials.map((line) => (
            <li key={line} style={{ fontSize: 15, lineHeight: 1.35, color: 'rgba(243,242,242,.72)', display: 'grid', gridTemplateColumns: '14px 1fr', gap: 10, alignItems: 'baseline' }}>
              <span style={{ color: '#ec3013', fontWeight: 800 }}>—</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <p style={{ fontSize: 16, lineHeight: 1.4, margin: 0, color: '#f3f2f2', maxWidth: 340, textWrap: 'balance' }}>
          <span style={{ display: 'block', fontWeight: 800 }}>
            {[w.leadLine1, w.leadLine2, w.leadLine3].filter(Boolean).map((line, i, all) => (
              <span key={line}>
                {line}
                {i < all.length - 1 && <br />}
              </span>
            ))}
          </span>
          <span style={{ display: 'block', marginTop: 6 }}>
            {w.taglineBefore}
            <strong style={{ color: '#ec3013', fontWeight: 800 }}>{w.leverWord}</strong>
            {w.taglineAfter}
          </span>
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        <Hoverable
          onClick={actions.startProfile}
          style={{
            background: '#ec3013',
            color: '#fff',
            padding: '15px 20px',
            fontWeight: 800,
            fontSize: 16,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            border: '2px solid #ec3013',
            transition: 'background .12s, color .12s',
          }}
          hoverStyle={{ background: '#f3f2f2', color: '#ec3013', borderColor: '#f3f2f2' }}
        >
          <span>{derived.registerLabel}</span>
          <span>→</span>
        </Hoverable>
        <Hoverable
          onClick={actions.skipToHome}
          style={{
            padding: '15px 20px',
            fontSize: 15,
            fontWeight: 800,
            letterSpacing: '.02em',
            color: '#f3f2f2',
            cursor: 'pointer',
            border: '2px solid rgba(243,242,242,.45)',
            textAlign: 'left',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          hoverStyle={{ background: '#f3f2f2', color: '#161514', borderColor: '#f3f2f2' }}
        >
          <span>{w.skip}</span>
          <span>→</span>
        </Hoverable>
        <p style={{ fontSize: 12, lineHeight: 1.4, margin: '4px 0 0', color: 'rgba(243,242,242,.5)', maxWidth: 340 }}>
          {w.noteLine1} <br />
          {w.noteLine2}
        </p>
      </div>
    </div>
  );
}
