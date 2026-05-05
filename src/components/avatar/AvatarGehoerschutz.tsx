interface Props {
  farbe: string;
}

function darken(hex: string, amount = 0.25): string {
  if (!hex.startsWith('#') || hex.length !== 7) return hex;
  const r = Math.max(0, Math.round(parseInt(hex.slice(1, 3), 16) * (1 - amount)));
  const g = Math.max(0, Math.round(parseInt(hex.slice(3, 5), 16) * (1 - amount)));
  const b = Math.max(0, Math.round(parseInt(hex.slice(5, 7), 16) * (1 - amount)));
  return `rgb(${r},${g},${b})`;
}

export default function AvatarGehoerschutz({ farbe }: Props) {
  const dark = darken(farbe);
  return (
    <g className="gehoerschutz">
      {/* Headband arch over the top of the head */}
      <path
        d="M88 60 Q88 12 150 12 Q212 12 212 60"
        stroke={farbe}
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
      />
      {/* Headband shadow underline */}
      <path
        d="M88 60 Q88 12 150 12 Q212 12 212 60"
        stroke={dark}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
        transform="translate(0, 3)"
      />
      {/* Left ear cup - rounded rectangle covering left ear region */}
      <ellipse cx="86" cy="78" rx="20" ry="24" fill={farbe} />
      <ellipse cx="86" cy="78" rx="20" ry="24" fill={dark} opacity="0.35" />
      <ellipse cx="86" cy="78" rx="14" ry="18" fill={farbe} />
      {/* Cushion ring inset on left */}
      <ellipse cx="86" cy="78" rx="11" ry="14" fill="#1f1f2e" opacity="0.45" />
      {/* Highlight */}
      <ellipse cx="80" cy="70" rx="4" ry="6" fill="white" opacity="0.35" />

      {/* Right ear cup */}
      <ellipse cx="214" cy="78" rx="20" ry="24" fill={farbe} />
      <ellipse cx="214" cy="78" rx="20" ry="24" fill={dark} opacity="0.35" />
      <ellipse cx="214" cy="78" rx="14" ry="18" fill={farbe} />
      <ellipse cx="214" cy="78" rx="11" ry="14" fill="#1f1f2e" opacity="0.45" />
      <ellipse cx="220" cy="70" rx="4" ry="6" fill="white" opacity="0.35" />
    </g>
  );
}
