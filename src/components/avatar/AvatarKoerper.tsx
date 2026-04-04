interface Props {
  hautfarbe: string;
}

export default function AvatarKoerper({ hautfarbe }: Props) {
  return (
    <g className="koerper">
      {/* Head - larger, rounder for cute proportions */}
      <circle cx="150" cy="75" r="55" fill={hautfarbe} />
      {/* Ears */}
      <ellipse cx="94" cy="78" rx="7" ry="10" fill={hautfarbe} />
      <ellipse cx="206" cy="78" rx="7" ry="10" fill={hautfarbe} />

      {/* Neck - shorter, wider */}
      <rect x="137" y="125" width="26" height="18" rx="10" fill={hautfarbe} />

      {/* Torso - smooth curved shape */}
      <path
        d="M112 140 Q110 138 118 135 Q135 130 150 130 Q165 130 182 135 Q190 138 188 140 L192 195 Q192 230 150 232 Q108 230 108 195 Z"
        fill={hautfarbe}
      />

      {/* Left arm - tapered, natural */}
      <path d="M108 148 Q95 145 88 150 Q78 158 80 175 Q80 195 82 210 Q84 218 90 218 Q96 218 96 210 Q96 195 95 175 Q94 160 108 155 Z" fill={hautfarbe} />
      {/* Right arm */}
      <path d="M192 148 Q205 145 212 150 Q222 158 220 175 Q220 195 218 210 Q216 218 210 218 Q204 218 204 210 Q204 195 205 175 Q206 160 192 155 Z" fill={hautfarbe} />

      {/* Left hand */}
      <ellipse cx="86" cy="220" rx="10" ry="11" fill={hautfarbe} />
      {/* Right hand */}
      <ellipse cx="214" cy="220" rx="10" ry="11" fill={hautfarbe} />

      {/* Left leg - smooth */}
      <path d="M120 222 Q116 225 116 240 L114 285 Q114 295 128 295 Q142 295 140 285 L138 240 Q138 225 134 222 Z" fill={hautfarbe} />
      {/* Right leg */}
      <path d="M166 222 Q162 225 162 240 L160 285 Q160 295 174 295 Q188 295 186 285 L184 240 Q184 225 180 222 Z" fill={hautfarbe} />

      {/* Left foot */}
      <ellipse cx="127" cy="298" rx="17" ry="8" fill={hautfarbe} />
      {/* Right foot */}
      <ellipse cx="173" cy="298" rx="17" ry="8" fill={hautfarbe} />
    </g>
  );
}
