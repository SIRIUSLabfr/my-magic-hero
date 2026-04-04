interface Props {
  augenfarbe: string;
}

export default function AvatarGesicht({ augenfarbe }: Props) {
  return (
    <g className="gesicht">
      {/* Left eye white - large, expressive */}
      <ellipse cx="131" cy="73" rx="16" ry="18" fill="white" />
      {/* Right eye white */}
      <ellipse cx="169" cy="73" rx="16" ry="18" fill="white" />

      {/* Eye outline - subtle */}
      <ellipse cx="131" cy="73" rx="16" ry="18" fill="none" stroke="#1a1a2e" strokeWidth="1" opacity="0.15" />
      <ellipse cx="169" cy="73" rx="16" ry="18" fill="none" stroke="#1a1a2e" strokeWidth="1" opacity="0.15" />

      {/* Left iris - large for Miraculous style */}
      <circle cx="133" cy="75" r="10" fill={augenfarbe} />
      {/* Right iris */}
      <circle cx="171" cy="75" r="10" fill={augenfarbe} />

      {/* Left pupil */}
      <circle cx="134" cy="75" r="5" fill="#1a1a2e" />
      {/* Right pupil */}
      <circle cx="172" cy="75" r="5" fill="#1a1a2e" />

      {/* Eye sparkle - two highlights per eye for anime/Miraculous feel */}
      <circle cx="137" cy="71" r="3" fill="white" />
      <circle cx="130" cy="77" r="1.5" fill="white" opacity="0.7" />
      <circle cx="175" cy="71" r="3" fill="white" />
      <circle cx="168" cy="77" r="1.5" fill="white" opacity="0.7" />

      {/* Eyelashes - top, cute style */}
      <path d="M115 65 Q120 58 128 60" stroke="#1a1a2e" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M134 57 Q140 54 146 58" stroke="#1a1a2e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M154 58 Q160 54 166 57" stroke="#1a1a2e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M172 60 Q180 58 185 65" stroke="#1a1a2e" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Nose - tiny, cute */}
      <path d="M148 86 Q150 90 152 86" stroke="#1a1a2e" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.35" />

      {/* Smile - warm, confident */}
      <path d="M136 97 Q143 107 150 107 Q157 107 164 97" stroke="#1a1a2e" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Blush cheeks - soft */}
      <ellipse cx="112" cy="90" rx="10" ry="6" fill="#ff9999" opacity="0.2" />
      <ellipse cx="188" cy="90" rx="10" ry="6" fill="#ff9999" opacity="0.2" />
    </g>
  );
}
