interface Props {
  outfit: 'spinne' | 'glueck' | 'krieger' | 'ozean';
  farbe: string;
}

function darken(hex: string, amount = 0.2): string {
  const r = Math.max(0, Math.round(parseInt(hex.slice(1, 3), 16) * (1 - amount)));
  const g = Math.max(0, Math.round(parseInt(hex.slice(3, 5), 16) * (1 - amount)));
  const b = Math.max(0, Math.round(parseInt(hex.slice(5, 7), 16) * (1 - amount)));
  return `rgb(${r},${g},${b})`;
}

function lighten(hex: string, amount = 0.3): string {
  const r = Math.min(255, Math.round(parseInt(hex.slice(1, 3), 16) + (255 - parseInt(hex.slice(1, 3), 16)) * amount));
  const g = Math.min(255, Math.round(parseInt(hex.slice(3, 5), 16) + (255 - parseInt(hex.slice(3, 5), 16)) * amount));
  const b = Math.min(255, Math.round(parseInt(hex.slice(5, 7), 16) + (255 - parseInt(hex.slice(5, 7), 16)) * amount));
  return `rgb(${r},${g},${b})`;
}

export default function AvatarOutfit({ outfit, farbe }: Props) {
  const dark = darken(farbe);
  const light = lighten(farbe);

  switch (outfit) {
    case 'spinne':
      return (
        <g className="outfit">
          {/* Tight spider suit - torso */}
          <rect x="105" y="135" width="90" height="100" rx="30" fill={farbe} />
          {/* Suit arms */}
          <rect x="80" y="145" width="30" height="65" rx="15" fill={farbe} />
          <rect x="190" y="145" width="30" height="65" rx="15" fill={farbe} />
          {/* Suit legs */}
          <rect x="115" y="225" width="28" height="75" rx="14" fill={farbe} />
          <rect x="157" y="225" width="28" height="75" rx="14" fill={farbe} />
          {/* Web pattern on arms */}
          <path d="M85 155 Q95 165 85 175" stroke={dark} strokeWidth="1.5" fill="none" opacity="0.5" />
          <path d="M85 170 Q95 180 85 190" stroke={dark} strokeWidth="1.5" fill="none" opacity="0.5" />
          <path d="M215 155 Q205 165 215 175" stroke={dark} strokeWidth="1.5" fill="none" opacity="0.5" />
          <path d="M215 170 Q205 180 215 190" stroke={dark} strokeWidth="1.5" fill="none" opacity="0.5" />
          {/* Spider emblem on chest */}
          <ellipse cx="150" cy="170" rx="12" ry="8" fill={dark} opacity="0.7" />
          <line x1="150" y1="162" x2="150" y2="178" stroke={dark} strokeWidth="2" opacity="0.7" />
          <line x1="140" y1="165" x2="135" y2="158" stroke={dark} strokeWidth="1.5" opacity="0.5" />
          <line x1="160" y1="165" x2="165" y2="158" stroke={dark} strokeWidth="1.5" opacity="0.5" />
          <line x1="139" y1="170" x2="133" y2="170" stroke={dark} strokeWidth="1.5" opacity="0.5" />
          <line x1="161" y1="170" x2="167" y2="170" stroke={dark} strokeWidth="1.5" opacity="0.5" />
          <line x1="140" y1="175" x2="135" y2="182" stroke={dark} strokeWidth="1.5" opacity="0.5" />
          <line x1="160" y1="175" x2="165" y2="182" stroke={dark} strokeWidth="1.5" opacity="0.5" />
          {/* Belt */}
          <rect x="108" y="212" width="84" height="8" rx="4" fill={dark} />
          {/* Boots */}
          <rect x="115" y="282" width="28" height="22" rx="10" fill={dark} />
          <rect x="157" y="282" width="28" height="22" rx="10" fill={dark} />
          <ellipse cx="129" cy="308" rx="18" ry="10" fill={dark} />
          <ellipse cx="171" cy="308" rx="18" ry="10" fill={dark} />
        </g>
      );

    case 'glueck':
      return (
        <g className="outfit">
          {/* Tight ladybug suit - torso */}
          <rect x="105" y="135" width="90" height="100" rx="30" fill={farbe} />
          {/* Suit arms */}
          <rect x="80" y="145" width="30" height="65" rx="15" fill={farbe} />
          <rect x="190" y="145" width="30" height="65" rx="15" fill={farbe} />
          {/* Suit legs */}
          <rect x="115" y="225" width="28" height="75" rx="14" fill={farbe} />
          <rect x="157" y="225" width="28" height="75" rx="14" fill={farbe} />
          {/* Spots pattern */}
          <circle cx="135" cy="160" r="7" fill={dark} opacity="0.5" />
          <circle cx="165" cy="155" r="5" fill={dark} opacity="0.5" />
          <circle cx="145" cy="185" r="6" fill={dark} opacity="0.5" />
          <circle cx="168" cy="180" r="4" fill={dark} opacity="0.5" />
          <circle cx="130" cy="200" r="5" fill={dark} opacity="0.5" />
          <circle cx="160" cy="205" r="7" fill={dark} opacity="0.5" />
          {/* Center line */}
          <line x1="150" y1="138" x2="150" y2="225" stroke={dark} strokeWidth="2" opacity="0.3" />
          {/* Round belt buckle */}
          <rect x="108" y="210" width="84" height="10" rx="5" fill={dark} />
          <circle cx="150" cy="215" r="9" fill={light} />
          <circle cx="150" cy="215" r="6" fill={farbe} />
          {/* Collar */}
          <path d="M125 135 L150 143 L175 135" stroke={dark} strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Boots */}
          <rect x="115" y="280" width="28" height="25" rx="10" fill={dark} />
          <rect x="157" y="280" width="28" height="25" rx="10" fill={dark} />
          <ellipse cx="129" cy="308" rx="18" ry="10" fill={dark} />
          <ellipse cx="171" cy="308" rx="18" ry="10" fill={dark} />
        </g>
      );

    case 'krieger':
      return (
        <g className="outfit">
          {/* Wrap top */}
          <path d="M108 138 Q108 135 150 128 Q192 135 192 138 L192 200 Q170 210 150 210 Q130 210 108 200 Z" fill={farbe} />
          {/* Wrap diagonal */}
          <path d="M130 138 L170 180 L165 185 L125 143 Z" fill={dark} opacity="0.3" />
          {/* Arm wraps */}
          <rect x="82" y="147" width="28" height="55" rx="14" fill={farbe} />
          <rect x="190" y="147" width="28" height="55" rx="14" fill={farbe} />
          {/* Arm guards / bracers */}
          <rect x="82" y="180" width="28" height="18" rx="6" fill={dark} />
          <rect x="190" y="180" width="28" height="18" rx="6" fill={dark} />
          {/* Flowing skirt over pants */}
          <path d="M105 200 Q100 240 90 270 L210 270 Q200 240 195 200 Z" fill={farbe} opacity="0.85" />
          <path d="M115 205 Q112 240 105 265 L195 265 Q188 240 185 205 Z" fill={dark} opacity="0.2" />
          {/* Pants underneath */}
          <rect x="118" y="260" width="26" height="40" rx="13" fill={dark} />
          <rect x="156" y="260" width="26" height="40" rx="13" fill={dark} />
          {/* Asymmetric shoulder cape */}
          <path d="M108 138 Q80 145 70 180 Q72 200 85 210 L108 195 Z" fill={farbe} opacity="0.7" />
          {/* Sash/belt */}
          <path d="M108 200 L192 200" stroke={dark} strokeWidth="6" strokeLinecap="round" />
          <circle cx="150" cy="200" r="5" fill={light} />
          {/* Boots */}
          <ellipse cx="131" cy="308" rx="17" ry="10" fill={dark} />
          <ellipse cx="169" cy="308" rx="17" ry="10" fill={dark} />
        </g>
      );

    case 'ozean':
      return (
        <g className="outfit">
          {/* Crop top with pattern */}
          <path d="M112 140 Q112 135 150 130 Q188 135 188 140 L188 180 Q170 185 150 185 Q130 185 112 180 Z" fill={farbe} />
          {/* Top pattern - wave lines */}
          <path d="M118 155 Q130 150 140 155 Q150 160 160 155 Q170 150 182 155" stroke={light} strokeWidth="2" fill="none" opacity="0.5" />
          <path d="M118 165 Q130 160 140 165 Q150 170 160 165 Q170 160 182 165" stroke={light} strokeWidth="2" fill="none" opacity="0.5" />
          {/* Arms (bare skin shows between - handled by body layer) */}
          <rect x="82" y="147" width="28" height="35" rx="14" fill={farbe} />
          <rect x="190" y="147" width="28" height="35" rx="14" fill={farbe} />
          {/* Long flowing skirt */}
          <path d="M108 185 Q100 230 95 280 Q97 300 120 315 L150 318 L180 315 Q203 300 205 280 Q200 230 192 185 Z" fill={farbe} />
          {/* Skirt wave pattern */}
          <path d="M105 250 Q120 245 135 250 Q150 255 165 250 Q180 245 195 250" stroke={light} strokeWidth="2" fill="none" opacity="0.4" />
          <path d="M102 270 Q118 265 134 270 Q150 275 166 270 Q182 265 198 270" stroke={light} strokeWidth="2" fill="none" opacity="0.4" />
          <path d="M100 290 Q116 285 132 290 Q150 295 168 290 Q184 285 200 290" stroke={light} strokeWidth="2" fill="none" opacity="0.4" />
          {/* Shell necklace */}
          <path d="M130 132 Q140 138 150 135 Q160 138 170 132" stroke={light} strokeWidth="2" fill="none" />
          <circle cx="150" cy="137" r="4" fill={light} />
          <circle cx="140" cy="135" r="2.5" fill={light} opacity="0.7" />
          <circle cx="160" cy="135" r="2.5" fill={light} opacity="0.7" />
          {/* Flower accessory (in hair area, but part of outfit) */}
          <circle cx="185" cy="65" r="8" fill={farbe} opacity="0.8" />
          <circle cx="185" cy="65" r="4" fill={light} />
          {/* Bare feet / sandals */}
          <ellipse cx="130" cy="318" rx="14" ry="8" fill={dark} />
          <ellipse cx="170" cy="318" rx="14" ry="8" fill={dark} />
        </g>
      );
  }
}
