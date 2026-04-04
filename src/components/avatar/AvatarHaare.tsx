interface Props {
  frisur: 'bob' | 'ponytail' | 'lang' | 'hochzopf';
  farbe: string;
}

function darken(hex: string, amount = 0.15): string {
  const r = Math.max(0, Math.round(parseInt(hex.slice(1, 3), 16) * (1 - amount)));
  const g = Math.max(0, Math.round(parseInt(hex.slice(3, 5), 16) * (1 - amount)));
  const b = Math.max(0, Math.round(parseInt(hex.slice(5, 7), 16) * (1 - amount)));
  return `rgb(${r},${g},${b})`;
}

export default function AvatarHaare({ frisur, farbe }: Props) {
  const shadow = darken(farbe);

  switch (frisur) {
    case 'bob':
      return (
        <g className="haare">
          {/* Hair cap */}
          <path d="M93 75 Q93 18 150 18 Q207 18 207 75 Q207 45 150 35 Q93 45 93 75 Z" fill={farbe} />
          {/* Left side - chin length */}
          <path d="M93 58 Q84 72 82 100 Q82 118 88 125 Q94 115 96 100 Q98 78 93 58 Z" fill={farbe} />
          {/* Right side */}
          <path d="M207 58 Q216 72 218 100 Q218 118 212 125 Q206 115 204 100 Q202 78 207 58 Z" fill={farbe} />
          {/* Shadow layer */}
          <path d="M93 58 Q86 70 84 95 Q84 108 86 115" stroke={shadow} strokeWidth="3" fill="none" opacity="0.3" />
          <path d="M207 58 Q214 70 216 95 Q216 108 214 115" stroke={shadow} strokeWidth="3" fill="none" opacity="0.3" />
          {/* Bangs - side-swept, layered */}
          <path d="M105 42 Q118 26 138 32 Q128 42 120 50 Z" fill={farbe} />
          <path d="M132 32 Q148 22 165 30 Q156 40 148 44 Z" fill={farbe} />
          <path d="M158 30 Q175 24 192 36 Q182 42 174 44 Z" fill={farbe} />
          {/* Volume highlight */}
          <ellipse cx="150" cy="26" rx="35" ry="8" fill={farbe} opacity="0.5" />
        </g>
      );

    case 'ponytail':
      return (
        <g className="haare">
          {/* Hair cap - sleek, pulled back */}
          <path d="M95 78 Q95 20 150 20 Q205 20 205 78 Q205 48 150 38 Q95 48 95 78 Z" fill={farbe} />
          {/* Sides - tight against head */}
          <path d="M95 58 Q90 68 92 88 Q95 80 97 70 Z" fill={farbe} />
          <path d="M205 58 Q210 68 208 88 Q205 80 203 70 Z" fill={farbe} />
          {/* Ponytail - flowing from back, thick and dynamic */}
          <path d="M188 42 Q215 50 220 80 Q224 120 220 165 Q216 200 208 225 Q202 232 196 224 Q204 195 207 155 Q210 115 205 80 Q200 55 188 42 Z" fill={farbe} />
          {/* Ponytail inner shine */}
          <path d="M198 70 Q214 95 216 135 Q217 170 212 200" stroke={shadow} strokeWidth="4" fill="none" opacity="0.2" />
          {/* Hair band */}
          <ellipse cx="193" cy="50" rx="6" ry="5" fill="#facc15" />
          {/* Subtle bangs */}
          <path d="M112 42 Q128 30 145 38 Q136 46 128 50 Z" fill={farbe} />
          <path d="M148 36 Q162 28 175 36 Q166 44 158 46 Z" fill={farbe} />
        </g>
      );

    case 'lang':
      return (
        <g className="haare">
          {/* Hair cap */}
          <path d="M93 78 Q93 18 150 18 Q207 18 207 78 Q207 48 150 38 Q93 48 93 78 Z" fill={farbe} />
          {/* Left side - long, straight, flowing past shoulders */}
          <path d="M93 58 Q82 78 80 120 Q78 175 80 230 Q82 255 88 262 Q90 240 90 200 Q90 150 93 110 Q95 80 93 58 Z" fill={farbe} />
          {/* Right side */}
          <path d="M207 58 Q218 78 220 120 Q222 175 220 230 Q218 255 212 262 Q210 240 210 200 Q210 150 207 110 Q205 80 207 58 Z" fill={farbe} />
          {/* Back hair layer for volume */}
          <path d="M88 95 Q82 150 84 215 Q86 248 90 258" stroke={shadow} strokeWidth="5" fill="none" opacity="0.2" />
          <path d="M212 95 Q218 150 216 215 Q214 248 210 258" stroke={shadow} strokeWidth="5" fill="none" opacity="0.2" />
          {/* Straight bangs - full fringe */}
          <path d="M105 44 Q120 30 138 36 Q128 46 120 52 Z" fill={farbe} />
          <path d="M132 36 Q150 24 168 34 Q158 44 148 48 Z" fill={farbe} />
          <path d="M162 34 Q178 26 195 40 Q186 46 178 48 Z" fill={farbe} />
        </g>
      );

    case 'hochzopf':
      return (
        <g className="haare">
          {/* Hair cap - pulled up tight */}
          <path d="M95 78 Q95 22 150 22 Q205 22 205 78 Q205 50 150 40 Q95 50 95 78 Z" fill={farbe} />
          {/* Sides pulled up */}
          <path d="M95 62 Q90 72 92 88 Q96 78 97 68 Z" fill={farbe} />
          <path d="M205 62 Q210 72 208 88 Q204 78 203 68 Z" fill={farbe} />
          {/* High braided bun */}
          <ellipse cx="150" cy="10" rx="20" ry="16" fill={farbe} />
          {/* Braid wrapping */}
          <path d="M132 16 Q138 0 150 -4 Q162 0 168 16" stroke={shadow} strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.25" />
          <path d="M136 20 Q142 6 150 2 Q158 6 164 20" stroke={shadow} strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.2" />
          {/* Hair tie */}
          <ellipse cx="150" cy="26" rx="6" ry="4" fill="#facc15" />
          {/* Wispy side strands */}
          <path d="M100 50 Q96 60 98 72 Q102 62 100 50 Z" fill={farbe} opacity="0.7" />
          <path d="M200 50 Q204 60 202 72 Q198 62 200 50 Z" fill={farbe} opacity="0.7" />
          {/* Bangs */}
          <path d="M118 40 Q132 30 146 36 Q138 44 130 48 Z" fill={farbe} />
          <path d="M150 34 Q165 28 178 38 Q170 44 162 46 Z" fill={farbe} />
        </g>
      );
  }
}
