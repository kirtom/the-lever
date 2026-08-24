import { useEffect, useState } from 'react';
import { Hoverable } from '../components/Hoverable';

function Slider({ slider }) {
  const [value, setValue] = useState(slider.initial);

  // Each slider question mounts fresh, but the key changes as the flow moves
  // between two slider questions in a row — reset so the second one doesn't
  // inherit the first one's number.
  useEffect(() => setValue(slider.initial), [slider.initial, slider.lowLabel]);

  const pct = ((value - slider.min) / (slider.max - slider.min)) * 100;
  const emoji = slider.emojis ? slider.emojis[Math.min(slider.emojis.length - 1, Math.floor((pct / 100) * slider.emojis.length))] : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
        {emoji && <span style={{ fontSize: 40, lineHeight: 1 }}>{emoji}</span>}
        <span style={{ fontSize: 68, fontWeight: 800, letterSpacing: '-.05em', lineHeight: 1, color: '#ec3013' }}>{value}</span>
      </div>

      <input
        type="range"
        min={slider.min}
        max={slider.max}
        step={1}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        aria-label={slider.lowLabel + ' — ' + slider.highLabel}
        style={{
          width: '100%',
          appearance: 'none',
          WebkitAppearance: 'none',
          height: 6,
          borderRadius: 0,
          outline: 'none',
          cursor: 'pointer',
          background: `linear-gradient(to right, #ec3013 0%, #ec3013 ${pct}%, rgba(243,242,242,.25) ${pct}%, rgba(243,242,242,.25) 100%)`,
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(243,242,242,.5)' }}>
        <span>{slider.lowLabel}</span>
        <span style={{ textAlign: 'right' }}>{slider.highLabel}</span>
      </div>

      <Hoverable
        onClick={() => slider.submit(value)}
        style={{
          background: '#ec3013',
          color: '#fff',
          padding: '16px 20px',
          fontWeight: 800,
          fontSize: 16,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        hoverStyle={{ background: '#dd2b0f' }}
      >
        <span>{slider.cta}</span>
        <span>→</span>
      </Hoverable>
    </div>
  );
}

export function Question({ derived, actions }) {
  const { q } = derived;
  const qi = derived.ui.question;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#161514', color: '#f3f2f2', padding: '58px 22px 26px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: 800 }}>
        <span style={{ color: '#ec3013' }}>{q.counter}</span>
        <span onClick={actions.goHome} style={{ cursor: 'pointer', color: 'rgba(243,242,242,.45)' }}>
          {qi.exit}
        </span>
      </div>
      <div style={{ height: 2, background: '#ec3013', margin: '8px 0 14px' }} />
      <h2 style={{ fontSize: 27, lineHeight: 1.04, letterSpacing: '-.025em', margin: '0 0 14px', color: '#f3f2f2', maxWidth: 320 }}>{q.title}</h2>

      {q.type === 'slider' ? (
        <Slider slider={q.slider} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {q.options.map((opt) => (
            <Hoverable
              key={opt.id}
              onClick={opt.pick}
              style={{
                border: '2px solid rgba(243,242,242,.3)',
                padding: '0 14px',
                minHeight: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                cursor: 'pointer',
              }}
              hoverStyle={{ borderColor: '#ec3013', background: '#ec3013' }}
            >
              <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-.01em' }}>{opt.label}</span>
              <span style={{ fontSize: 12, color: 'rgba(243,242,242,.5)', textAlign: 'right' }}>{opt.sub}</span>
            </Hoverable>
          ))}
        </div>
      )}

      <div style={{ flex: 1 }} />
      <Hoverable as="div" onClick={actions.backQuestion} style={{ fontSize: 12, color: 'rgba(243,242,242,.4)', cursor: 'pointer' }} hoverStyle={{ color: '#f3f2f2' }}>
        {qi.back}
      </Hoverable>
    </div>
  );
}
