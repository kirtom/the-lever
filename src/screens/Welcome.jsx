import { Hoverable } from '../components/Hoverable';
import { Logo } from '../components/Logo';

const denials = ['No sobriety counter.', 'No meetings search.', 'No sponsor calls.', 'No savings calculator.'];

export function Welcome({ derived, actions }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#201e1d', color: '#f3f2f2', padding: '96px 24px 52px' }}>
      <div>
        <Logo width={330} height={140} style={{ margin: '0 auto' }} />
        <div style={{ height: 2, background: '#ec3013', margin: '24px 0 20px', width: '100%' }} />
        <ul style={{ listStyle: 'none', margin: '0 0 34px', padding: 0, display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 340 }}>
          {denials.map((line) => (
            <li key={line} style={{ fontSize: 16, lineHeight: 1.4, color: 'rgba(243,242,242,.72)', display: 'grid', gridTemplateColumns: '14px 1fr', gap: 10, alignItems: 'baseline' }}>
              <span style={{ color: '#ec3013', fontWeight: 800 }}>—</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <p style={{ fontSize: 17, lineHeight: 1.45, margin: 0, color: '#f3f2f2', maxWidth: 340, textWrap: 'balance' }}>
          <span style={{ display: 'block', fontWeight: 800 }}>
            One button. <br />
            Five questions. <br />
            Five honest answers.
          </span>
          <span style={{ display: 'block', marginTop: 6 }}>
            This app will hand you <strong style={{ color: '#ec3013', fontWeight: 800 }}>the lever</strong> that can move things you can't shift by hand.
          </span>
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Hoverable
          onClick={actions.startProfile}
          style={{
            background: '#ec3013',
            color: '#fff',
            padding: '18px 20px',
            fontWeight: 800,
            fontSize: 17,
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
            padding: '18px 20px',
            fontSize: 17,
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
          <span>SKIP IT! I NEED HELP NOW!</span>
          <span>→</span>
        </Hoverable>
        <p style={{ fontSize: 13, lineHeight: 1.45, margin: '6px 0 0', color: 'rgba(243,242,242,.5)', maxWidth: 340 }}>
          No account, no email, no password. <br />
          Your profile stays on this phone.
        </p>
      </div>
    </div>
  );
}
