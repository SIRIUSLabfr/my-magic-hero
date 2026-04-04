interface Props {
  farbe: string;
}

export default function AvatarUmhang({ farbe }: Props) {
  return (
    <g className="umhang">
      {/* Cape flowing behind body */}
      <path
        d="M105 130 Q82 185 72 275 Q75 310 115 330 L150 335 L185 330 Q225 310 228 275 Q218 185 195 130 Z"
        fill={farbe}
        opacity="0.85"
      />
      {/* Cape inner shadow for depth */}
      <path
        d="M115 140 Q98 195 90 265 Q95 298 125 318 L150 322 L175 318 Q205 298 210 265 Q202 195 185 140 Z"
        fill={farbe}
        opacity="0.55"
      />
      {/* Cape fold highlights */}
      <path d="M95 180 Q100 220 98 270" stroke="white" strokeWidth="2" fill="none" opacity="0.08" />
      <path d="M205 180 Q200 220 202 270" stroke="white" strokeWidth="2" fill="none" opacity="0.08" />
    </g>
  );
}
