interface Props {
  frisur: 'bob' | 'ponytail' | 'lang' | 'hochzopf';
  farbe: string;
}

export default function AvatarHaare({ frisur, farbe }: Props) {
  switch (frisur) {
    case 'bob':
      return (
        <g className="haare">
          {/* Bob hair cap - rounded, chin-length */}
          <path
            d="M96 78 Q96 26 150 26 Q204 26 204 78 Q204 50 150 42 Q96 50 96 78 Z"
            fill={farbe}
          />
          {/* Left side - chin length, curved inward */}
          <path d="M96 65 Q88 78 86 105 Q86 120 92 125 Q98 118 100 105 Q102 85 96 65 Z" fill={farbe} />
          {/* Right side - chin length, curved inward */}
          <path d="M204 65 Q212 78 214 105 Q214 120 208 125 Q202 118 200 105 Q198 85 204 65 Z" fill={farbe} />
          {/* Bangs - side-swept */}
          <path d="M105 48 Q115 32 135 36 Q128 46 122 54 Z" fill={farbe} />
          <path d="M130 38 Q145 28 160 34 Q154 44 146 48 Z" fill={farbe} />
          <path d="M155 36 Q170 30 185 40 Q178 48 170 50 Z" fill={farbe} />
          {/* Volume on top */}
          <ellipse cx="150" cy="32" rx="40" ry="10" fill={farbe} opacity="0.6" />
        </g>
      );

    case 'ponytail':
      return (
        <g className="haare">
          {/* Hair cap - pulled back */}
          <path
            d="M98 80 Q98 28 150 28 Q202 28 202 80 Q202 55 150 45 Q98 55 98 80 Z"
            fill={farbe}
          />
          {/* Sides pulled back tight */}
          <path d="M98 65 Q92 75 94 95 Q98 88 100 78 Z" fill={farbe} />
          <path d="M202 65 Q208 75 206 95 Q202 88 200 78 Z" fill={farbe} />
          {/* Ponytail flowing from back of head */}
          <path d="M185 50 Q210 55 215 80 Q218 110 215 150 Q212 180 205 200 Q200 205 195 198 Q200 170 202 140 Q204 110 200 80 Q196 60 185 50 Z" fill={farbe} />
          {/* Ponytail volume */}
          <path d="M195 80 Q208 100 210 130 Q212 160 208 185 Q204 175 205 145 Q206 115 198 90 Z" fill={farbe} opacity="0.7" />
          {/* Hair tie */}
          <circle cx="192" cy="58" r="5" fill="#facc15" />
          {/* Small bangs */}
          <path d="M112 48 Q125 36 140 42 Q134 50 128 54 Z" fill={farbe} />
          <path d="M145 42 Q158 34 170 42 Q164 48 156 50 Z" fill={farbe} />
        </g>
      );

    case 'lang':
      return (
        <g className="haare">
          {/* Hair cap */}
          <path
            d="M98 80 Q98 28 150 28 Q202 28 202 80 Q202 55 150 48 Q98 55 98 80 Z"
            fill={farbe}
          />
          {/* Left side - long straight flowing */}
          <path d="M98 65 Q88 80 86 120 Q84 170 86 220 Q88 250 94 260 Q96 240 96 200 Q96 150 98 110 Q100 85 98 65 Z" fill={farbe} />
          {/* Right side - long straight flowing */}
          <path d="M202 65 Q212 80 214 120 Q216 170 214 220 Q212 250 206 260 Q204 240 204 200 Q204 150 202 110 Q200 85 202 65 Z" fill={farbe} />
          {/* Back hair layer */}
          <path d="M92 100 Q86 150 88 210 Q90 245 96 255 Q94 215 94 170 Q93 130 92 100 Z" fill={farbe} opacity="0.7" />
          <path d="M208 100 Q214 150 212 210 Q210 245 204 255 Q206 215 206 170 Q207 130 208 100 Z" fill={farbe} opacity="0.7" />
          {/* Straight bangs */}
          <path d="M108 50 Q118 36 132 40 Q126 50 120 56 Z" fill={farbe} />
          <path d="M135 42 Q148 32 162 38 Q156 48 148 52 Z" fill={farbe} />
          <path d="M160 40 Q175 34 188 44 Q180 50 174 52 Z" fill={farbe} />
        </g>
      );

    case 'hochzopf':
      return (
        <g className="haare">
          {/* Hair cap - pulled up */}
          <path
            d="M98 80 Q98 30 150 30 Q202 30 202 80 Q202 55 150 48 Q98 55 98 80 Z"
            fill={farbe}
          />
          {/* Sides pulled up tight */}
          <path d="M98 68 Q92 78 94 95 Q98 85 100 75 Z" fill={farbe} />
          <path d="M202 68 Q208 78 206 95 Q202 85 200 75 Z" fill={farbe} />
          {/* High bun/zopf on top */}
          <ellipse cx="150" cy="18" rx="22" ry="18" fill={farbe} />
          {/* Braid wrapping around bun */}
          <path d="M130 22 Q135 5 150 2 Q165 5 170 22" stroke={farbe} strokeWidth="10" fill="none" strokeLinecap="round" />
          <path d="M135 28 Q140 12 150 8 Q160 12 165 28" stroke={farbe} strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.7" />
          {/* Hair tie at base */}
          <circle cx="150" cy="32" r="5" fill="#facc15" />
          {/* Wisps */}
          <path d="M105 55 Q100 62 102 72 Q106 65 105 55 Z" fill={farbe} opacity="0.6" />
          <path d="M195 55 Q200 62 198 72 Q194 65 195 55 Z" fill={farbe} opacity="0.6" />
          {/* Small bangs */}
          <path d="M118 46 Q130 36 142 42 Q136 48 128 52 Z" fill={farbe} />
          <path d="M148 40 Q162 34 174 42 Q166 48 158 50 Z" fill={farbe} />
        </g>
      );
  }
}
