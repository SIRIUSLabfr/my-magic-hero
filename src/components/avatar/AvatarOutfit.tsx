interface Props {
  outfit: 'anzug' | 'kleid' | 'cape' | 'ruestung';
  farbe: string;
}

function darken(hex: string, amount = 0.2): string {
  const r = Math.max(0, Math.round(parseInt(hex.slice(1, 3), 16) * (1 - amount)));
  const g = Math.max(0, Math.round(parseInt(hex.slice(3, 5), 16) * (1 - amount)));
  const b = Math.max(0, Math.round(parseInt(hex.slice(5, 7), 16) * (1 - amount)));
  return `rgb(${r},${g},${b})`;
}

export default function AvatarOutfit({ outfit, farbe }: Props) {
  const dark = darken(farbe);

  switch (outfit) {
    case 'anzug':
      return (
        <g className="outfit">
          {/* Tight superhero suit - torso */}
          <rect x="105" y="135" width="90" height="100" rx="30" fill={farbe} />
          {/* Suit arms */}
          <rect x="80" y="145" width="30" height="65" rx="15" fill={farbe} />
          <rect x="190" y="145" width="30" height="65" rx="15" fill={farbe} />
          {/* Suit legs */}
          <rect x="115" y="225" width="28" height="75" rx="14" fill={farbe} />
          <rect x="157" y="225" width="28" height="75" rx="14" fill={farbe} />
          {/* Belt */}
          <rect x="108" y="210" width="84" height="10" rx="5" fill={dark} />
          {/* Belt buckle */}
          <circle cx="150" cy="215" r="7" fill="#facc15" />
          {/* Collar */}
          <path d="M125 135 L150 145 L175 135" stroke={dark} strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* Boots */}
          <rect x="115" y="280" width="28" height="25" rx="10" fill={dark} />
          <rect x="157" y="280" width="28" height="25" rx="10" fill={dark} />
          <ellipse cx="129" cy="308" rx="18" ry="10" fill={dark} />
          <ellipse cx="171" cy="308" rx="18" ry="10" fill={dark} />
        </g>
      );

    case 'kleid':
      return (
        <g className="outfit">
          {/* Dress top */}
          <rect x="105" y="135" width="90" height="60" rx="25" fill={farbe} />
          {/* Dress skirt */}
          <path d="M100 190 Q100 240 85 260 L215 260 Q200 240 200 190 Z" fill={farbe} />
          {/* Skirt detail */}
          <path d="M110 200 Q110 240 100 255 L200 255 Q190 240 190 200 Z" fill={dark} opacity="0.3" />
          {/* Suit arms */}
          <rect x="80" y="145" width="30" height="50" rx="15" fill={farbe} />
          <rect x="190" y="145" width="30" height="50" rx="15" fill={farbe} />
          {/* Leggings */}
          <rect x="120" y="255" width="24" height="50" rx="12" fill={dark} />
          <rect x="156" y="255" width="24" height="50" rx="12" fill={dark} />
          {/* Boots */}
          <ellipse cx="132" cy="308" rx="16" ry="9" fill={dark} />
          <ellipse cx="168" cy="308" rx="16" ry="9" fill={dark} />
          {/* Collar bow */}
          <circle cx="150" cy="140" r="6" fill={dark} />
          <path d="M140 138 L150 143 L160 138" fill={dark} />
        </g>
      );

    case 'cape':
      return (
        <g className="outfit">
          {/* Casual top */}
          <rect x="107" y="137" width="86" height="90" rx="28" fill={farbe} />
          {/* Arms covered */}
          <rect x="82" y="147" width="28" height="55" rx="14" fill={farbe} />
          <rect x="190" y="147" width="28" height="55" rx="14" fill={farbe} />
          {/* Pants */}
          <rect x="117" y="220" width="26" height="75" rx="13" fill={dark} />
          <rect x="157" y="220" width="26" height="75" rx="13" fill={dark} />
          {/* Boots */}
          <ellipse cx="130" cy="308" rx="17" ry="10" fill={dark} />
          <ellipse cx="170" cy="308" rx="17" ry="10" fill={dark} />
          {/* Cape clasp */}
          <circle cx="130" cy="140" r="5" fill="#facc15" />
          <circle cx="170" cy="140" r="5" fill="#facc15" />
          <path d="M130 140 L150 148 L170 140" stroke="#facc15" strokeWidth="2" fill="none" />
        </g>
      );

    case 'ruestung':
      return (
        <g className="outfit">
          {/* Armor breastplate */}
          <path d="M108 138 L108 210 Q108 230 150 235 Q192 230 192 210 L192 138 Q170 128 150 128 Q130 128 108 138 Z" fill={farbe} />
          {/* Armor detail - center line */}
          <line x1="150" y1="138" x2="150" y2="225" stroke={dark} strokeWidth="3" />
          {/* Armor shoulder pads */}
          <ellipse cx="95" cy="148" rx="20" ry="14" fill={farbe} />
          <ellipse cx="205" cy="148" rx="20" ry="14" fill={farbe} />
          {/* Arms */}
          <rect x="82" y="155" width="28" height="55" rx="14" fill={dark} />
          <rect x="190" y="155" width="28" height="55" rx="14" fill={dark} />
          {/* Armor skirt */}
          <path d="M110 215 L100 245 L200 245 L190 215 Z" fill={farbe} opacity="0.8" />
          {/* Legs */}
          <rect x="118" y="240" width="26" height="60" rx="13" fill={dark} />
          <rect x="156" y="240" width="26" height="60" rx="13" fill={dark} />
          {/* Armored boots */}
          <rect x="115" y="282" width="30" height="22" rx="10" fill={farbe} />
          <rect x="155" y="282" width="30" height="22" rx="10" fill={farbe} />
          <ellipse cx="130" cy="308" rx="18" ry="10" fill={farbe} />
          <ellipse cx="170" cy="308" rx="18" ry="10" fill={farbe} />
          {/* Gem on chest */}
          <polygon points="150,155 143,165 150,175 157,165" fill="#facc15" />
        </g>
      );
  }
}
