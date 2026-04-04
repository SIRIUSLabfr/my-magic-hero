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
  const darker = darken(farbe, 0.4);
  const light = lighten(farbe);

  switch (outfit) {
    // === SPINNEN-HELDIN (Spiderwoman-inspiriert) ===
    case 'spinne':
      return (
        <g className="outfit">
          {/* Full bodysuit - torso */}
          <path d="M108 135 Q108 130 150 125 Q192 130 192 135 L192 228 Q172 238 150 238 Q128 238 108 228 Z" fill={farbe} />
          {/* Suit arms - full coverage */}
          <rect x="80" y="145" width="30" height="70" rx="15" fill={farbe} />
          <rect x="190" y="145" width="30" height="70" rx="15" fill={farbe} />
          {/* Gloves */}
          <circle cx="95" cy="220" r="12" fill={dark} />
          <circle cx="205" cy="220" r="12" fill={dark} />
          {/* Suit legs */}
          <rect x="115" y="225" width="28" height="80" rx="14" fill={farbe} />
          <rect x="157" y="225" width="28" height="80" rx="14" fill={farbe} />
          
          {/* Web pattern - radiating from center chest */}
          <circle cx="150" cy="170" r="8" fill={darker} opacity="0.4" />
          <circle cx="150" cy="170" r="18" fill="none" stroke={darker} strokeWidth="1" opacity="0.3" />
          <circle cx="150" cy="170" r="30" fill="none" stroke={darker} strokeWidth="1" opacity="0.25" />
          <circle cx="150" cy="170" r="44" fill="none" stroke={darker} strokeWidth="1" opacity="0.2" />
          {/* Web radial lines */}
          <line x1="150" y1="170" x2="150" y2="128" stroke={darker} strokeWidth="1" opacity="0.3" />
          <line x1="150" y1="170" x2="115" y2="140" stroke={darker} strokeWidth="1" opacity="0.3" />
          <line x1="150" y1="170" x2="185" y2="140" stroke={darker} strokeWidth="1" opacity="0.3" />
          <line x1="150" y1="170" x2="108" y2="170" stroke={darker} strokeWidth="1" opacity="0.3" />
          <line x1="150" y1="170" x2="192" y2="170" stroke={darker} strokeWidth="1" opacity="0.3" />
          <line x1="150" y1="170" x2="118" y2="210" stroke={darker} strokeWidth="1" opacity="0.3" />
          <line x1="150" y1="170" x2="182" y2="210" stroke={darker} strokeWidth="1" opacity="0.3" />
          <line x1="150" y1="170" x2="150" y2="230" stroke={darker} strokeWidth="1" opacity="0.3" />
          
          {/* Spider emblem on chest */}
          <ellipse cx="150" cy="170" rx="6" ry="4" fill={darker} opacity="0.8" />
          <line x1="145" y1="167" x2="138" y2="160" stroke={darker} strokeWidth="1.5" opacity="0.7" />
          <line x1="155" y1="167" x2="162" y2="160" stroke={darker} strokeWidth="1.5" opacity="0.7" />
          <line x1="144" y1="170" x2="136" y2="170" stroke={darker} strokeWidth="1.5" opacity="0.7" />
          <line x1="156" y1="170" x2="164" y2="170" stroke={darker} strokeWidth="1.5" opacity="0.7" />
          <line x1="145" y1="173" x2="138" y2="180" stroke={darker} strokeWidth="1.5" opacity="0.7" />
          <line x1="155" y1="173" x2="162" y2="180" stroke={darker} strokeWidth="1.5" opacity="0.7" />
          
          {/* Web pattern on arms */}
          <path d="M84 155 Q95 162 84 170" stroke={darker} strokeWidth="1" fill="none" opacity="0.3" />
          <path d="M84 170 Q95 177 84 185" stroke={darker} strokeWidth="1" fill="none" opacity="0.3" />
          <path d="M216 155 Q205 162 216 170" stroke={darker} strokeWidth="1" fill="none" opacity="0.3" />
          <path d="M216 170 Q205 177 216 185" stroke={darker} strokeWidth="1" fill="none" opacity="0.3" />
          
          {/* Boots - pointed, sleek */}
          <path d="M115 285 L115 300 Q115 312 129 312 Q143 312 143 300 L143 285" fill={dark} />
          <path d="M157 285 L157 300 Q157 312 171 312 Q185 312 185 300 L185 285" fill={dark} />
          <ellipse cx="129" cy="314" rx="16" ry="7" fill={dark} />
          <ellipse cx="171" cy="314" rx="16" ry="7" fill={dark} />
        </g>
      );

    // === GLÜCKS-HELDIN (Ladybug/Miraculous-inspiriert) ===
    case 'glueck':
      return (
        <g className="outfit">
          {/* Full bodysuit - torso */}
          <path d="M108 135 Q108 130 150 125 Q192 130 192 135 L192 228 Q172 238 150 238 Q128 238 108 228 Z" fill={farbe} />
          {/* Suit arms */}
          <rect x="80" y="145" width="30" height="70" rx="15" fill={farbe} />
          <rect x="190" y="145" width="30" height="70" rx="15" fill={farbe} />
          {/* Suit legs */}
          <rect x="115" y="225" width="28" height="80" rx="14" fill={farbe} />
          <rect x="157" y="225" width="28" height="80" rx="14" fill={farbe} />
          
          {/* Ladybug spots - large, prominent */}
          <circle cx="135" cy="155" r="10" fill={darker} opacity="0.45" />
          <circle cx="168" cy="152" r="8" fill={darker} opacity="0.45" />
          <circle cx="150" cy="178" r="11" fill={darker} opacity="0.45" />
          <circle cx="125" cy="185" r="7" fill={darker} opacity="0.45" />
          <circle cx="175" cy="190" r="9" fill={darker} opacity="0.45" />
          <circle cx="140" cy="210" r="8" fill={darker} opacity="0.45" />
          <circle cx="165" cy="215" r="6" fill={darker} opacity="0.45" />
          {/* Spots on legs */}
          <circle cx="129" cy="250" r="6" fill={darker} opacity="0.4" />
          <circle cx="171" cy="255" r="5" fill={darker} opacity="0.4" />
          <circle cx="129" cy="275" r="4" fill={darker} opacity="0.4" />
          <circle cx="171" cy="278" r="5" fill={darker} opacity="0.4" />
          
          {/* Center dividing line */}
          <line x1="150" y1="128" x2="150" y2="235" stroke={darker} strokeWidth="2.5" opacity="0.3" />
          
          {/* High collar - Miraculous style */}
          <path d="M120 130 Q130 122 150 120 Q170 122 180 130" stroke={darker} strokeWidth="3" fill="none" strokeLinecap="round" />
          
          {/* Yo-yo belt */}
          <path d="M108 215 Q150 225 192 215" stroke={darker} strokeWidth="5" fill="none" strokeLinecap="round" />
          <circle cx="108" cy="215" r="8" fill={light} />
          <circle cx="108" cy="215" r="5" fill={farbe} />
          <path d="M108 215 Q100 225 95 232" stroke={dark} strokeWidth="2" strokeDasharray="3 3" fill="none" />
          
          {/* Boots - mid-calf, ladybug */}
          <path d="M115 275 L115 300 Q115 312 129 312 Q143 312 143 300 L143 275" fill={dark} />
          <path d="M157 275 L157 300 Q157 312 171 312 Q185 312 185 300 L185 275" fill={dark} />
          <ellipse cx="129" cy="314" rx="16" ry="7" fill={dark} />
          <ellipse cx="171" cy="314" rx="16" ry="7" fill={dark} />
          {/* Boot spots */}
          <circle cx="129" cy="290" r="4" fill={darker} opacity="0.5" />
          <circle cx="171" cy="288" r="3" fill={darker} opacity="0.5" />
        </g>
      );

    // === KRIEGER-HELDIN (Raya-inspiriert) ===
    case 'krieger':
      return (
        <g className="outfit">
          {/* Wrap top - asymmetric, warrior style */}
          <path d="M108 135 Q108 128 150 122 Q192 128 192 135 L192 195 Q172 205 150 205 Q128 205 108 195 Z" fill={farbe} />
          {/* Diagonal wrap sash across chest */}
          <path d="M180 128 L120 195 L108 190 L168 122 Z" fill={dark} opacity="0.35" />
          {/* Second wrap layer */}
          <path d="M175 132 L118 192 L112 188 L165 128 Z" fill={dark} opacity="0.2" />
          
          {/* Arm wraps - fabric wrapped */}
          <rect x="82" y="147" width="28" height="55" rx="14" fill={farbe} />
          <rect x="190" y="147" width="28" height="55" rx="14" fill={farbe} />
          {/* Arm bracers/guards */}
          <path d="M80 175 L110 175 L110 198 L80 198 Z" rx="4" fill={dark} />
          <path d="M190 175 L220 175 L220 198 L190 198 Z" rx="4" fill={dark} />
          {/* Bracer detail lines */}
          <line x1="83" y1="182" x2="107" y2="182" stroke={darker} strokeWidth="1" opacity="0.4" />
          <line x1="83" y1="188" x2="107" y2="188" stroke={darker} strokeWidth="1" opacity="0.4" />
          <line x1="83" y1="194" x2="107" y2="194" stroke={darker} strokeWidth="1" opacity="0.4" />
          <line x1="193" y1="182" x2="217" y2="182" stroke={darker} strokeWidth="1" opacity="0.4" />
          <line x1="193" y1="188" x2="217" y2="188" stroke={darker} strokeWidth="1" opacity="0.4" />
          <line x1="193" y1="194" x2="217" y2="194" stroke={darker} strokeWidth="1" opacity="0.4" />
          
          {/* Flowing pants */}
          <path d="M115 200 L108 295 Q120 300 135 298 L142 200" fill={dark} />
          <path d="M158 200 L165 298 Q180 300 192 295 L185 200" fill={dark} />
          
          {/* Wide sash/belt */}
          <path d="M105 195 Q150 210 195 195 L195 205 Q150 220 105 205 Z" fill={darker} />
          {/* Belt ornament */}
          <circle cx="150" cy="205" r="7" fill={light} />
          <circle cx="150" cy="205" r="4" fill={farbe} />
          
          {/* Asymmetric shoulder cape (one shoulder) */}
          <path d="M108 132 Q85 140 72 165 Q68 185 75 210 Q80 220 88 215 Q82 195 82 175 Q84 155 100 140 Z" fill={farbe} opacity="0.75" />
          <path d="M108 132 Q90 138 78 158 Q74 175 78 195" stroke={dark} strokeWidth="1.5" fill="none" opacity="0.3" />
          
          {/* Wrapped boots */}
          <path d="M112 285 L112 300 Q112 312 125 312 L140 312 Q140 300 138 285" fill={dark} />
          <path d="M162 285 L162 300 Q162 312 175 312 L190 312 Q190 300 188 285" fill={dark} />
          <ellipse cx="126" cy="314" rx="16" ry="7" fill={dark} />
          <ellipse cx="176" cy="314" rx="16" ry="7" fill={dark} />
          {/* Boot wrap lines */}
          <path d="M115 290 L135 290" stroke={darker} strokeWidth="1.5" opacity="0.4" />
          <path d="M115 296 L135 296" stroke={darker} strokeWidth="1.5" opacity="0.4" />
          <path d="M165 290 L185 290" stroke={darker} strokeWidth="1.5" opacity="0.4" />
          <path d="M165 296 L185 296" stroke={darker} strokeWidth="1.5" opacity="0.4" />
        </g>
      );

    // === OZEAN-HELDIN (Vaiana/Moana-inspiriert) ===
    case 'ozean':
      return (
        <g className="outfit">
          {/* Cropped top - patterned, strapless-ish */}
          <path d="M112 135 Q112 130 150 126 Q188 130 188 135 L188 178 Q170 183 150 183 Q130 183 112 178 Z" fill={farbe} />
          {/* Top pattern - tapa/Polynesian inspired geometric */}
          <path d="M122 145 L130 140 L138 145 L130 150 Z" fill={dark} opacity="0.3" />
          <path d="M142 142 L150 137 L158 142 L150 147 Z" fill={dark} opacity="0.3" />
          <path d="M162 145 L170 140 L178 145 L170 150 Z" fill={dark} opacity="0.3" />
          <path d="M132 155 L140 150 L148 155 L140 160 Z" fill={dark} opacity="0.25" />
          <path d="M152 155 L160 150 L168 155 L160 160 Z" fill={dark} opacity="0.25" />
          <path d="M142 165 L150 160 L158 165 L150 170 Z" fill={dark} opacity="0.2" />
          
          {/* Bare arms (no sleeve) - skin shows from body layer */}
          
          {/* Long flowing skirt - layered, natural */}
          <path d="M108 185 Q98 230 92 280 Q92 305 115 318 L150 322 L185 318 Q208 305 208 280 Q202 230 192 185 Z" fill={farbe} />
          {/* Skirt layers / leaf pattern */}
          <path d="M100 230 Q120 225 140 230 Q160 235 180 230 Q200 225 205 230" stroke={light} strokeWidth="2" fill="none" opacity="0.35" />
          <path d="M96 255 Q118 250 138 255 Q158 260 178 255 Q198 250 208 255" stroke={light} strokeWidth="2" fill="none" opacity="0.35" />
          <path d="M94 280 Q115 275 135 280 Q155 285 175 280 Q195 275 210 280" stroke={light} strokeWidth="2" fill="none" opacity="0.35" />
          <path d="M96 300 Q115 295 135 300 Q155 305 175 300 Q195 295 206 300" stroke={light} strokeWidth="2" fill="none" opacity="0.3" />
          {/* Skirt tapa pattern accents */}
          <path d="M120 240 L125 235 L130 240 L125 245 Z" fill={dark} opacity="0.15" />
          <path d="M165 245 L170 240 L175 245 L170 250 Z" fill={dark} opacity="0.15" />
          <path d="M140 270 L145 265 L150 270 L145 275 Z" fill={dark} opacity="0.15" />
          
          {/* Shell/flower necklace */}
          <path d="M125 128 Q135 135 150 133 Q165 135 175 128" stroke={light} strokeWidth="2.5" fill="none" />
          {/* Shell pendant */}
          <path d="M146 136 Q150 144 154 136" fill={light} stroke={light} strokeWidth="1" />
          <line x1="150" y1="133" x2="150" y2="138" stroke={light} strokeWidth="1.5" />
          {/* Side shells */}
          <circle cx="134" cy="133" r="3" fill={light} opacity="0.7" />
          <circle cx="166" cy="133" r="3" fill={light} opacity="0.7" />
          <circle cx="142" cy="135" r="2.5" fill={light} opacity="0.6" />
          <circle cx="158" cy="135" r="2.5" fill={light} opacity="0.6" />
          
          {/* Flower in hair area (part of outfit) */}
          <g transform="translate(188, 58)">
            <circle cx="0" cy="0" r="9" fill={farbe} opacity="0.9" />
            <circle cx="7" cy="0" r="5" fill={light} opacity="0.7" />
            <circle cx="-7" cy="0" r="5" fill={light} opacity="0.7" />
            <circle cx="0" cy="7" r="5" fill={light} opacity="0.7" />
            <circle cx="0" cy="-7" r="5" fill={light} opacity="0.7" />
            <circle cx="0" cy="0" r="4" fill="#facc15" />
          </g>
          
          {/* Bare feet / simple sandals */}
          <ellipse cx="130" cy="322" rx="15" ry="7" fill={dark} />
          <ellipse cx="170" cy="322" rx="15" ry="7" fill={dark} />
          <path d="M125 318 L130 310" stroke={dark} strokeWidth="2" opacity="0.5" />
          <path d="M135 318 L130 310" stroke={dark} strokeWidth="2" opacity="0.5" />
          <path d="M165 318 L170 310" stroke={dark} strokeWidth="2" opacity="0.5" />
          <path d="M175 318 L170 310" stroke={dark} strokeWidth="2" opacity="0.5" />
        </g>
      );
  }
}
