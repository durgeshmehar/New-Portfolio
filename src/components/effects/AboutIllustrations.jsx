// Custom SVG illustrations for the About Me content, matching the site's
// existing violet/cyan/pink gradient language instead of stock photos.

const gradientDefs = (id) => (
  <defs>
    <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#915EFF" />
      <stop offset="50%" stopColor="#0084ff" />
      <stop offset="100%" stopColor="#ff61a6" />
    </linearGradient>
  </defs>
);

export const ArchitectureIllustration = ({ className }) => (
  <svg viewBox="0 0 200 160" className={className} fill="none">
    {gradientDefs("arch-grad")}
    {[
      [30, 40], [100, 25], [170, 45], [50, 100], [150, 105], [100, 130],
    ].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="7" fill="url(#arch-grad)" opacity="0.9" />
    ))}
    <g stroke="url(#arch-grad)" strokeWidth="1.2" opacity="0.5">
      <line x1="30" y1="40" x2="100" y2="25" />
      <line x1="100" y1="25" x2="170" y2="45" />
      <line x1="30" y1="40" x2="50" y2="100" />
      <line x1="100" y1="25" x2="50" y2="100" />
      <line x1="100" y1="25" x2="150" y2="105" />
      <line x1="170" y1="45" x2="150" y2="105" />
      <line x1="50" y1="100" x2="100" y2="130" />
      <line x1="150" y1="105" x2="100" y2="130" />
    </g>
  </svg>
);

export const WhitepaperIllustration = ({ className }) => (
  <svg viewBox="0 0 200 160" className={className} fill="none">
    {gradientDefs("paper-grad")}
    <rect x="55" y="20" width="90" height="120" rx="6" fill="none" stroke="url(#paper-grad)" strokeWidth="2" opacity="0.8" />
    <line x1="70" y1="45" x2="130" y2="45" stroke="url(#paper-grad)" strokeWidth="2" opacity="0.7" />
    <line x1="70" y1="60" x2="130" y2="60" stroke="url(#paper-grad)" strokeWidth="2" opacity="0.5" />
    <line x1="70" y1="75" x2="110" y2="75" stroke="url(#paper-grad)" strokeWidth="2" opacity="0.5" />
    <line x1="70" y1="95" x2="130" y2="95" stroke="url(#paper-grad)" strokeWidth="2" opacity="0.4" />
    <line x1="70" y1="110" x2="120" y2="110" stroke="url(#paper-grad)" strokeWidth="2" opacity="0.4" />
    <circle cx="100" cy="130" r="4" fill="url(#paper-grad)" opacity="0.6" />
  </svg>
);

export const FoundationIllustration = ({ className }) => (
  <svg viewBox="0 0 200 160" className={className} fill="none">
    {gradientDefs("found-grad")}
    <rect x="80" y="30" width="40" height="20" rx="3" fill="url(#found-grad)" opacity="0.95" />
    <rect x="55" y="58" width="90" height="24" rx="3" fill="url(#found-grad)" opacity="0.75" />
    <rect x="35" y="90" width="130" height="26" rx="3" fill="url(#found-grad)" opacity="0.55" />
    <rect x="20" y="124" width="160" height="20" rx="3" fill="url(#found-grad)" opacity="0.35" />
  </svg>
);
