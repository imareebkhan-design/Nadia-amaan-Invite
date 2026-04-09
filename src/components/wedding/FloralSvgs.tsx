export const PeonySvg = ({ className = "", color = "#F4A7B4" }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none">
    <ellipse cx="60" cy="60" rx="18" ry="28" fill={color} opacity="0.7" transform="rotate(0 60 60)" />
    <ellipse cx="60" cy="60" rx="18" ry="28" fill={color} opacity="0.6" transform="rotate(45 60 60)" />
    <ellipse cx="60" cy="60" rx="18" ry="28" fill={color} opacity="0.65" transform="rotate(90 60 60)" />
    <ellipse cx="60" cy="60" rx="18" ry="28" fill={color} opacity="0.6" transform="rotate(135 60 60)" />
    <ellipse cx="60" cy="60" rx="16" ry="24" fill={color} opacity="0.8" transform="rotate(22 60 60)" />
    <ellipse cx="60" cy="60" rx="16" ry="24" fill={color} opacity="0.75" transform="rotate(67 60 60)" />
    <ellipse cx="60" cy="60" rx="16" ry="24" fill={color} opacity="0.8" transform="rotate(112 60 60)" />
    <ellipse cx="60" cy="60" rx="16" ry="24" fill={color} opacity="0.75" transform="rotate(157 60 60)" />
    <circle cx="60" cy="60" r="10" fill="#F5D97A" opacity="0.9" />
    <circle cx="58" cy="58" r="3" fill="#E8C84A" opacity="0.7" />
    <circle cx="63" cy="61" r="2.5" fill="#E8C84A" opacity="0.6" />
    <circle cx="59" cy="64" r="2" fill="#E8C84A" opacity="0.5" />
  </svg>
);

export const LilySvg = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <path d="M50 15 L58 45 L85 50 L58 55 L50 85 L42 55 L15 50 L42 45 Z" fill="#F08040" opacity="0.8" />
    <path d="M50 20 L55 45 L78 50 L55 55 L50 80 L45 55 L22 50 L45 45 Z" fill="#F4A060" opacity="0.6" />
    <circle cx="50" cy="50" r="6" fill="#F5D97A" opacity="0.9" />
    <line x1="50" y1="44" x2="50" y2="35" stroke="#C9A84C" strokeWidth="1" opacity="0.6" />
    <line x1="56" y1="48" x2="62" y2="42" stroke="#C9A84C" strokeWidth="1" opacity="0.6" />
    <line x1="44" y1="48" x2="38" y2="42" stroke="#C9A84C" strokeWidth="1" opacity="0.6" />
    <circle cx="50" cy="34" r="2" fill="#C9A84C" opacity="0.7" />
    <circle cx="63" cy="41" r="2" fill="#C9A84C" opacity="0.7" />
    <circle cx="37" cy="41" r="2" fill="#C9A84C" opacity="0.7" />
  </svg>
);

export const MimosaSvg = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 80 100" className={className} fill="none">
    <path d="M40 90 Q38 60 30 40 Q25 25 20 15" stroke="#4A7C59" strokeWidth="2" fill="none" />
    <path d="M40 90 Q42 55 50 35 Q55 20 60 10" stroke="#4A7C59" strokeWidth="1.5" fill="none" />
    <circle cx="20" cy="15" r="4" fill="#F5D97A" opacity="0.9" />
    <circle cx="25" cy="22" r="3.5" fill="#F5D97A" opacity="0.85" />
    <circle cx="28" cy="30" r="3" fill="#F5D97A" opacity="0.8" />
    <circle cx="32" cy="38" r="3.5" fill="#F5D97A" opacity="0.85" />
    <circle cx="60" cy="10" r="3.5" fill="#F5D97A" opacity="0.9" />
    <circle cx="56" cy="18" r="3" fill="#F5D97A" opacity="0.85" />
    <circle cx="53" cy="26" r="3.5" fill="#F5D97A" opacity="0.8" />
    <circle cx="50" cy="34" r="3" fill="#F5D97A" opacity="0.85" />
    <circle cx="22" cy="18" r="2" fill="#E8C84A" opacity="0.5" />
    <circle cx="58" cy="13" r="2" fill="#E8C84A" opacity="0.5" />
  </svg>
);

export const LeafSvg = ({ className = "", flip = false }: { className?: string; flip?: boolean }) => (
  <svg viewBox="0 0 60 100" className={className} fill="none" style={flip ? { transform: 'scaleX(-1)' } : {}}>
    <path d="M30 95 Q30 50 15 20 Q10 10 20 5 Q35 0 40 15 Q50 35 30 95Z" fill="#4A7C59" opacity="0.8" />
    <path d="M30 90 Q30 55 22 30" stroke="#3A6349" strokeWidth="1" opacity="0.5" fill="none" />
    <path d="M30 70 Q35 55 38 40" stroke="#3A6349" strokeWidth="0.8" opacity="0.4" fill="none" />
  </svg>
);

export const LeafSprig = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 40" className={className} fill="none">
    <path d="M10 20 Q50 20 90 20" stroke="#4A7C59" strokeWidth="1.5" fill="none" />
    <path d="M25 20 Q20 10 30 8 Q38 6 35 15 Q33 18 25 20Z" fill="#A8C5A0" opacity="0.7" />
    <path d="M45 20 Q40 28 50 30 Q58 32 55 23 Q53 20 45 20Z" fill="#4A7C59" opacity="0.6" />
    <path d="M65 20 Q60 10 70 8 Q78 6 75 15 Q73 18 65 20Z" fill="#A8C5A0" opacity="0.7" />
  </svg>
);

export const FloralCorner = ({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) => {
  const transforms: Record<string, string> = {
    'top-left': '',
    'top-right': 'scaleX(-1)',
    'bottom-left': 'scaleY(-1)',
    'bottom-right': 'scale(-1)',
  };

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        [position.includes('top') ? 'top' : 'bottom']: '-10px',
        [position.includes('left') ? 'left' : 'right']: '-10px',
        transform: transforms[position],
        width: '140px',
        height: '140px',
      }}
    >
      <PeonySvg className="absolute w-16 h-16" color={position === 'top-left' || position === 'bottom-right' ? '#F4A7B4' : '#F08040'} />
      <LeafSvg className="absolute w-8 h-16 top-12 left-2" />
      <LeafSvg className="absolute w-8 h-16 top-0 left-14" flip />
      {(position === 'bottom-left' || position === 'top-right') && (
        <MimosaSvg className="absolute w-10 h-12 top-8 left-10" />
      )}
    </div>
  );
};
