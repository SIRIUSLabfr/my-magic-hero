interface Props {
  augenfarbe: string;
}

export default function AvatarGesicht({ augenfarbe }: Props) {
  return (
    <g className="gesicht">
      {/* Left eye white */}
      <ellipse cx="132" cy="78" rx="14" ry="16" fill="white" />
      {/* Right eye white */}
      <ellipse cx="168" cy="78" rx="14" ry="16" fill="white" />

      {/* Left iris */}
      <circle cx="134" cy="80" r="9" fill={augenfarbe} />
      {/* Right iris */}
      <circle cx="170" cy="80" r="9" fill={augenfarbe} />

      {/* Left pupil */}
      <circle cx="135" cy="80" r="4.5" fill="#1a1a2e" />
      {/* Right pupil */}
      <circle cx="171" cy="80" r="4.5" fill="#1a1a2e" />

      {/* Eye sparkle left */}
      <circle cx="137" cy="76" r="2.5" fill="white" />
      {/* Eye sparkle right */}
      <circle cx="173" cy="76" r="2.5" fill="white" />

      {/* Eyebrows */}
      <path d="M118 62 Q127 56 144 60" stroke="#1a1a2e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M156 60 Q173 56 182 62" stroke="#1a1a2e" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Nose - subtle */}
      <path d="M148 88 Q150 92 152 88" stroke="#1a1a2e" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4" />

      {/* Smile */}
      <path d="M135 100 Q142 112 150 112 Q158 112 165 100" stroke="#1a1a2e" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Blush cheeks */}
      <ellipse cx="115" cy="95" rx="10" ry="6" fill="#ff9999" opacity="0.25" />
      <ellipse cx="185" cy="95" rx="10" ry="6" fill="#ff9999" opacity="0.25" />
    </g>
  );
}
