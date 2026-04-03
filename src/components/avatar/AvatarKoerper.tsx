interface Props {
  hautfarbe: string;
}

export default function AvatarKoerper({ hautfarbe }: Props) {
  return (
    <g className="koerper">
      {/* Neck */}
      <rect x="135" y="115" width="30" height="25" rx="8" fill={hautfarbe} />
      {/* Body / Torso */}
      <rect x="105" y="135" width="90" height="100" rx="30" fill={hautfarbe} />
      {/* Left arm */}
      <rect x="80" y="145" width="30" height="70" rx="15" fill={hautfarbe} />
      {/* Right arm */}
      <rect x="190" y="145" width="30" height="70" rx="15" fill={hautfarbe} />
      {/* Left hand */}
      <circle cx="95" cy="220" r="12" fill={hautfarbe} />
      {/* Right hand */}
      <circle cx="205" cy="220" r="12" fill={hautfarbe} />
      {/* Left leg */}
      <rect x="115" y="225" width="28" height="80" rx="14" fill={hautfarbe} />
      {/* Right leg */}
      <rect x="157" y="225" width="28" height="80" rx="14" fill={hautfarbe} />
      {/* Left foot */}
      <ellipse cx="129" cy="308" rx="18" ry="10" fill={hautfarbe} />
      {/* Right foot */}
      <ellipse cx="171" cy="308" rx="18" ry="10" fill={hautfarbe} />
      {/* Head */}
      <circle cx="150" cy="80" r="52" fill={hautfarbe} />
      {/* Ears */}
      <ellipse cx="97" cy="82" rx="8" ry="12" fill={hautfarbe} />
      <ellipse cx="203" cy="82" rx="8" ry="12" fill={hautfarbe} />
    </g>
  );
}
