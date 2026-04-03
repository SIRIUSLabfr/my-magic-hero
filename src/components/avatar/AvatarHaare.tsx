interface Props {
  frisur: 'lang' | 'kurz' | 'zopf' | 'locken';
  farbe: string;
}

export default function AvatarHaare({ frisur, farbe }: Props) {
  switch (frisur) {
    case 'lang':
      return (
        <g className="haare">
          {/* Hair cap */}
          <path
            d="M98 80 Q98 28 150 28 Q202 28 202 80 Q202 55 150 48 Q98 55 98 80 Z"
            fill={farbe}
          />
          {/* Side hair */}
          <path d="M98 68 Q90 80 88 130 Q86 160 92 180 Q96 165 100 130 Q102 100 98 68 Z" fill={farbe} />
          <path d="M202 68 Q210 80 212 130 Q214 160 208 180 Q204 165 200 130 Q198 100 202 68 Z" fill={farbe} />
          {/* Long flowing hair back */}
          <path d="M92 110 Q85 160 88 220 Q92 240 100 240 Q98 200 96 160 Q95 130 92 110 Z" fill={farbe} opacity="0.8" />
          <path d="M208 110 Q215 160 212 220 Q208 240 200 240 Q202 200 204 160 Q205 130 208 110 Z" fill={farbe} opacity="0.8" />
          {/* Bangs */}
          <path d="M110 52 Q120 38 135 42 Q130 52 125 58 Z" fill={farbe} />
          <path d="M140 45 Q150 34 165 38 Q160 48 150 52 Z" fill={farbe} />
          <path d="M165 42 Q178 36 188 48 Q180 52 172 54 Z" fill={farbe} />
        </g>
      );

    case 'kurz':
      return (
        <g className="haare">
          {/* Short hair cap */}
          <path
            d="M96 85 Q96 26 150 26 Q204 26 204 85 Q204 55 150 45 Q96 55 96 85 Z"
            fill={farbe}
          />
          {/* Side tufts */}
          <path d="M96 68 Q90 78 92 100 Q96 95 98 80 Z" fill={farbe} />
          <path d="M204 68 Q210 78 208 100 Q204 95 202 80 Z" fill={farbe} />
          {/* Textured bangs */}
          <path d="M108 50 Q115 36 130 40 Q125 50 120 56 Z" fill={farbe} />
          <path d="M135 42 Q148 30 162 38 Q155 48 148 50 Z" fill={farbe} />
          <path d="M162 40 Q175 32 190 44 Q182 50 175 52 Z" fill={farbe} />
        </g>
      );

    case 'zopf':
      return (
        <g className="haare">
          {/* Hair cap */}
          <path
            d="M98 80 Q98 28 150 28 Q202 28 202 80 Q202 55 150 48 Q98 55 98 80 Z"
            fill={farbe}
          />
          {/* Left braid */}
          <path d="M100 75 Q92 90 94 120" stroke={farbe} strokeWidth="14" fill="none" strokeLinecap="round" />
          <circle cx="94" cy="100" r="5" fill={farbe} />
          <circle cx="92" cy="115" r="5" fill={farbe} />
          <circle cx="94" cy="130" r="5" fill={farbe} />
          <circle cx="92" cy="145" r="5" fill={farbe} />
          <circle cx="94" cy="160" r="5" fill={farbe} />
          {/* Right braid */}
          <path d="M200 75 Q208 90 206 120" stroke={farbe} strokeWidth="14" fill="none" strokeLinecap="round" />
          <circle cx="206" cy="100" r="5" fill={farbe} />
          <circle cx="208" cy="115" r="5" fill={farbe} />
          <circle cx="206" cy="130" r="5" fill={farbe} />
          <circle cx="208" cy="145" r="5" fill={farbe} />
          <circle cx="206" cy="160" r="5" fill={farbe} />
          {/* Braid ties */}
          <circle cx="94" cy="170" r="6" fill="#facc15" />
          <circle cx="206" cy="170" r="6" fill="#facc15" />
          {/* Bangs */}
          <path d="M115 48 Q130 36 145 42 Q138 50 130 55 Z" fill={farbe} />
          <path d="M150 40 Q165 32 180 42 Q172 50 162 52 Z" fill={farbe} />
        </g>
      );

    case 'locken':
      return (
        <g className="haare">
          {/* Curly hair volume */}
          <path
            d="M90 85 Q86 20 150 20 Q214 20 210 85 Q215 60 150 42 Q85 60 90 85 Z"
            fill={farbe}
          />
          {/* Curls around head */}
          <circle cx="92" cy="60" r="12" fill={farbe} />
          <circle cx="88" cy="80" r="11" fill={farbe} />
          <circle cx="90" cy="100" r="10" fill={farbe} />
          <circle cx="92" cy="118" r="9" fill={farbe} />
          <circle cx="208" cy="60" r="12" fill={farbe} />
          <circle cx="212" cy="80" r="11" fill={farbe} />
          <circle cx="210" cy="100" r="10" fill={farbe} />
          <circle cx="208" cy="118" r="9" fill={farbe} />
          {/* Top curls */}
          <circle cx="115" cy="30" r="10" fill={farbe} />
          <circle cx="140" cy="24" r="11" fill={farbe} />
          <circle cx="165" cy="24" r="11" fill={farbe} />
          <circle cx="188" cy="30" r="10" fill={farbe} />
          {/* Bangs curls */}
          <circle cx="120" cy="48" r="9" fill={farbe} />
          <circle cx="145" cy="44" r="10" fill={farbe} />
          <circle cx="170" cy="46" r="9" fill={farbe} />
        </g>
      );
  }
}
