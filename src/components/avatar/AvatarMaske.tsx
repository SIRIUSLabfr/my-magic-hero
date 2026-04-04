interface Props {
  farbe: string;
}

export default function AvatarMaske({ farbe }: Props) {
  return (
    <g className="maske">
      {/* Miraculous-style mask over the eyes */}
      <path
        d="M106 68 Q114 56 131 59 Q144 62 150 66 Q156 62 169 59 Q186 56 194 68 Q190 80 176 82 Q164 83 156 76 Q150 73 144 76 Q136 83 124 82 Q110 80 106 68 Z"
        fill={farbe}
        opacity="0.85"
      />
      {/* Mask edge highlight */}
      <path
        d="M106 68 Q114 56 131 59 Q144 62 150 66 Q156 62 169 59 Q186 56 194 68"
        stroke="white"
        strokeWidth="1"
        fill="none"
        opacity="0.25"
      />
      {/* Mask inner shadow */}
      <path
        d="M112 70 Q118 62 131 63 Q142 65 150 68 Q158 65 169 63 Q182 62 188 70"
        stroke="white"
        strokeWidth="0.5"
        fill="none"
        opacity="0.15"
      />
    </g>
  );
}
