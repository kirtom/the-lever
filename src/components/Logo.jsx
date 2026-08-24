let uid = 0;

export function Logo({ width = 330, height = 140, ink = '#f3f2f2', style }) {
  const id = (uid += 1);
  const topClip = `lv-top-${id}`;
  const botClip = `lv-bot-${id}`;
  return (
    <svg width={width} height={height} viewBox="0 0 372 158" fill="none" aria-label="The Lever" style={{ display: 'block', ...style }}>
      <defs>
        <clipPath id={topClip}>
          <rect x="-40" y="0" width="420" height="96" />
        </clipPath>
        <clipPath id={botClip}>
          <rect x="-40" y="96" width="420" height="90" />
        </clipPath>
      </defs>
      <text x="2" y="30" fontFamily="Archivo, sans-serif" fontWeight="800" fontSize="26" letterSpacing="9" fill={ink}>
        THE
      </text>
      <g clipPath={`url(#${botClip})`}>
        <text x="0" y="132" fontFamily="Archivo, sans-serif" fontWeight="800" fontSize="106" letterSpacing="-5" fill={ink}>
          LEVER
        </text>
      </g>
      <g clipPath={`url(#${topClip})`}>
        <text x="0" y="132" fontFamily="Archivo, sans-serif" fontWeight="800" fontSize="106" letterSpacing="-5" fill="#ec3013" transform="rotate(-3.5 8 96)">
          LEVER
        </text>
      </g>
      <rect x="0" y="94" width="372" height="3" fill={ink} />
    </svg>
  );
}
