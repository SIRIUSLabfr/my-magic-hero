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
  const darker = darken(farbe, 0.35);
  const light = lighten(farbe);
  const lighter = lighten(farbe, 0.5);

  switch (outfit) {
    // === SPINNEN-HELDIN (Spiderwoman-inspiriert) ===
    case 'spinne':
      return (
        <g className="outfit">
          {/* Full bodysuit torso - covers entire body */}
          <path d="M112 140 Q110 138 118 135 Q135 130 150 130 Q165 130 182 135 Q190 138 188 140 L192 195 Q192 230 150 232 Q108 230 108 195 Z" fill={farbe} />

          {/* Suit arms - full coverage */}
          <path d="M108 148 Q95 145 88 150 Q78 158 80 175 Q80 195 82 210 Q84 218 90 218 Q96 218 96 210 Q96 195 95 175 Q94 160 108 155 Z" fill={farbe} />
          <path d="M192 148 Q205 145 212 150 Q222 158 220 175 Q220 195 218 210 Q216 218 210 218 Q204 218 204 210 Q204 195 205 175 Q206 160 192 155 Z" fill={farbe} />

          {/* Gloves */}
          <ellipse cx="86" cy="220" rx="10" ry="11" fill={dark} />
          <ellipse cx="214" cy="220" rx="10" ry="11" fill={dark} />

          {/* Suit legs */}
          <path d="M120 222 Q116 225 116 240 L114 285 Q114 295 128 295 Q142 295 140 285 L138 240 Q138 225 134 222 Z" fill={farbe} />
          <path d="M166 222 Q162 225 162 240 L160 285 Q160 295 174 295 Q188 295 186 285 L184 240 Q184 225 180 222 Z" fill={farbe} />

          {/* Collar - V-neckline accent */}
          <path d="M125 135 L150 155 L175 135" stroke={darker} strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* Web pattern - radiating from chest emblem */}
          <circle cx="150" cy="168" r="6" fill={darker} opacity="0.5" />
          <circle cx="150" cy="168" r="16" fill="none" stroke={darker} strokeWidth="0.8" opacity="0.25" />
          <circle cx="150" cy="168" r="28" fill="none" stroke={darker} strokeWidth="0.8" opacity="0.2" />
          <circle cx="150" cy="168" r="42" fill="none" stroke={darker} strokeWidth="0.8" opacity="0.15" />
          {/* Radial web lines */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
            <line key={angle}
              x1="150" y1="168"
              x2={150 + Math.cos(angle * Math.PI / 180) * 48}
              y2={168 + Math.sin(angle * Math.PI / 180) * 48}
              stroke={darker} strokeWidth="0.8" opacity="0.2"
            />
          ))}

          {/* Spider emblem */}
          <ellipse cx="150" cy="168" rx="4" ry="3" fill={darker} opacity="0.7" />
          <line x1="146" y1="166" x2="140" y2="160" stroke={darker} strokeWidth="1.2" opacity="0.6" />
          <line x1="154" y1="166" x2="160" y2="160" stroke={darker} strokeWidth="1.2" opacity="0.6" />
          <line x1="146" y1="168" x2="139" y2="168" stroke={darker} strokeWidth="1.2" opacity="0.6" />
          <line x1="154" y1="168" x2="161" y2="168" stroke={darker} strokeWidth="1.2" opacity="0.6" />
          <line x1="146" y1="170" x2="140" y2="176" stroke={darker} strokeWidth="1.2" opacity="0.6" />
          <line x1="154" y1="170" x2="160" y2="176" stroke={darker} strokeWidth="1.2" opacity="0.6" />

          {/* Belt line */}
          <path d="M108 210 Q150 218 192 210" stroke={dark} strokeWidth="3" fill="none" />

          {/* Boots - sleek, pointed */}
          <path d="M114 278 L112 290 Q110 302 127 304 Q144 302 142 290 L140 278" fill={dark} />
          <path d="M160 278 L158 290 Q156 302 173 304 Q190 302 188 290 L186 278" fill={dark} />
          <ellipse cx="127" cy="305" rx="17" ry="6" fill={dark} />
          <ellipse cx="173" cy="305" rx="17" ry="6" fill={dark} />

          {/* Arm accent stripes */}
          <path d="M85 185 Q90 183 95 185" stroke={dark} strokeWidth="2" fill="none" opacity="0.4" />
          <path d="M84 195 Q90 193 96 195" stroke={dark} strokeWidth="2" fill="none" opacity="0.4" />
          <path d="M205 185 Q210 183 215 185" stroke={dark} strokeWidth="2" fill="none" opacity="0.4" />
          <path d="M204 195 Q210 193 216 195" stroke={dark} strokeWidth="2" fill="none" opacity="0.4" />
        </g>
      );

    // === GLÜCKS-HELDIN (Ladybug/Miraculous-inspiriert) ===
    case 'glueck':
      return (
        <g className="outfit">
          {/* Full bodysuit torso */}
          <path d="M112 140 Q110 138 118 135 Q135 130 150 130 Q165 130 182 135 Q190 138 188 140 L192 195 Q192 230 150 232 Q108 230 108 195 Z" fill={farbe} />

          {/* Suit arms */}
          <path d="M108 148 Q95 145 88 150 Q78 158 80 175 Q80 195 82 210 Q84 218 90 218 Q96 218 96 210 Q96 195 95 175 Q94 160 108 155 Z" fill={farbe} />
          <path d="M192 148 Q205 145 212 150 Q222 158 220 175 Q220 195 218 210 Q216 218 210 218 Q204 218 204 210 Q204 195 205 175 Q206 160 192 155 Z" fill={farbe} />

          {/* Gloves */}
          <ellipse cx="86" cy="220" rx="10" ry="11" fill={darker} />
          <ellipse cx="214" cy="220" rx="10" ry="11" fill={darker} />

          {/* Suit legs */}
          <path d="M120 222 Q116 225 116 240 L114 285 Q114 295 128 295 Q142 295 140 285 L138 240 Q138 225 134 222 Z" fill={farbe} />
          <path d="M166 222 Q162 225 162 240 L160 285 Q160 295 174 295 Q188 295 186 285 L184 240 Q184 225 180 222 Z" fill={farbe} />

          {/* Spots - signature ladybug pattern, prominent */}
          <circle cx="135" cy="152" r="9" fill={darker} opacity="0.5" />
          <circle cx="167" cy="150" r="7" fill={darker} opacity="0.5" />
          <circle cx="150" cy="175" r="10" fill={darker} opacity="0.5" />
          <circle cx="124" cy="180" r="6" fill={darker} opacity="0.45" />
          <circle cx="178" cy="185" r="8" fill={darker} opacity="0.45" />
          <circle cx="140" cy="205" r="7" fill={darker} opacity="0.4" />
          <circle cx="162" cy="210" r="5.5" fill={darker} opacity="0.4" />

          {/* Spots on legs */}
          <circle cx="127" cy="248" r="5" fill={darker} opacity="0.4" />
          <circle cx="173" cy="252" r="4.5" fill={darker} opacity="0.4" />
          <circle cx="128" cy="272" r="3.5" fill={darker} opacity="0.35" />
          <circle cx="172" cy="275" r="4" fill={darker} opacity="0.35" />

          {/* Center line - subtle division */}
          <line x1="150" y1="132" x2="150" y2="230" stroke={darker} strokeWidth="2" opacity="0.2" />

          {/* High collar */}
          <path d="M122 135 Q136 128 150 127 Q164 128 178 135" stroke={darker} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.4" />

          {/* Yo-yo belt */}
          <path d="M108 210 Q150 220 192 210" stroke={darker} strokeWidth="4" fill="none" strokeLinecap="round" />
          <circle cx="108" cy="210" r="7" fill={lighter} />
          <circle cx="108" cy="210" r="4" fill={farbe} />
          <circle cx="108" cy="210" r="2" fill={darker} opacity="0.3" />

          {/* Boots */}
          <path d="M114 272 L112 290 Q110 302 127 304 Q144 302 142 290 L140 272" fill={dark} />
          <path d="M160 272 L158 290 Q156 302 173 304 Q190 302 188 290 L186 272" fill={dark} />
          <ellipse cx="127" cy="305" rx="17" ry="6" fill={dark} />
          <ellipse cx="173" cy="305" rx="17" ry="6" fill={dark} />
          {/* Boot spot accents */}
          <circle cx="127" cy="288" r="3.5" fill={darker} opacity="0.5" />
          <circle cx="173" cy="286" r="3" fill={darker} opacity="0.5" />

          {/* Earring accents (part of outfit) */}
          <circle cx="93" cy="88" r="3.5" fill={darker} />
          <circle cx="207" cy="88" r="3.5" fill={darker} />
        </g>
      );

    // === KRIEGER-HELDIN (Raya-inspiriert) ===
    case 'krieger':
      return (
        <g className="outfit">
          {/* Wrap top - asymmetric, layered */}
          <path d="M112 140 Q110 138 118 135 Q135 130 150 130 Q165 130 182 135 Q190 138 188 140 L190 198 Q170 208 150 208 Q130 208 110 198 Z" fill={farbe} />

          {/* Cross-wrap sash */}
          <path d="M178 132 L122 198 L112 192 L170 128 Z" fill={dark} opacity="0.3" />
          <path d="M172 135 L118 195 L113 190 L165 130 Z" fill={dark} opacity="0.15" />

          {/* Arm wraps */}
          <path d="M108 148 Q95 145 88 150 Q78 158 80 175 Q80 195 82 210 Q84 218 90 218 Q96 218 96 210 Q96 195 95 175 Q94 160 108 155 Z" fill={farbe} />
          <path d="M192 148 Q205 145 212 150 Q222 158 220 175 Q220 195 218 210 Q216 218 210 218 Q204 218 204 210 Q204 195 205 175 Q206 160 192 155 Z" fill={farbe} />

          {/* Arm bracers - detailed */}
          <path d="M79 178 Q87 175 96 178 L96 205 Q87 208 79 205 Z" fill={dark} rx="3" />
          <path d="M204 178 Q212 175 221 178 L221 205 Q212 208 204 205 Z" fill={dark} rx="3" />
          {/* Bracer detail engravings */}
          <path d="M83 185 L92 185" stroke={lighter} strokeWidth="1" opacity="0.4" />
          <path d="M83 191 L92 191" stroke={lighter} strokeWidth="1" opacity="0.4" />
          <path d="M83 197 L92 197" stroke={lighter} strokeWidth="1" opacity="0.4" />
          <path d="M208 185 L217 185" stroke={lighter} strokeWidth="1" opacity="0.4" />
          <path d="M208 191 L217 191" stroke={lighter} strokeWidth="1" opacity="0.4" />
          <path d="M208 197 L217 197" stroke={lighter} strokeWidth="1" opacity="0.4" />

          {/* Gloves */}
          <ellipse cx="86" cy="220" rx="10" ry="11" fill={dark} />
          <ellipse cx="214" cy="220" rx="10" ry="11" fill={dark} />

          {/* Wide ornate belt */}
          <path d="M107 198 Q150 212 193 198 L193 210 Q150 224 107 210 Z" fill={darker} />
          {/* Belt ornament - gem */}
          <circle cx="150" cy="208" r="6" fill={light} />
          <circle cx="150" cy="208" r="3.5" fill={farbe} />
          <circle cx="150" cy="206" r="1.5" fill="white" opacity="0.5" />

          {/* Flowing warrior pants */}
          <path d="M118 218 Q114 222 112 240 L108 285 Q108 298 127 300 Q146 298 142 285 L138 240 Q136 225 134 218 Z" fill={dark} />
          <path d="M166 218 Q162 222 162 240 L158 285 Q158 298 173 300 Q192 298 188 285 L184 240 Q184 225 180 218 Z" fill={dark} />

          {/* Pant wrinkle details */}
          <path d="M116 250 Q127 248 138 250" stroke={darker} strokeWidth="1" fill="none" opacity="0.25" />
          <path d="M116 268 Q127 266 138 268" stroke={darker} strokeWidth="1" fill="none" opacity="0.25" />
          <path d="M162 252 Q173 250 184 252" stroke={darker} strokeWidth="1" fill="none" opacity="0.25" />
          <path d="M162 270 Q173 268 184 270" stroke={darker} strokeWidth="1" fill="none" opacity="0.25" />

          {/* Asymmetric shoulder cape */}
          <path d="M112 138 Q88 145 74 168 Q68 190 72 218 Q76 230 84 225 Q78 200 80 178 Q82 158 102 142 Z" fill={farbe} opacity="0.7" />
          <path d="M112 138 Q92 144 80 162 Q74 180 76 205" stroke={dark} strokeWidth="1.5" fill="none" opacity="0.25" />

          {/* Wrapped boots */}
          <path d="M108 282 L107 292 Q106 304 127 306 Q148 304 146 292 L142 282" fill={darker} />
          <path d="M158 282 L157 292 Q156 304 173 306 Q194 304 192 292 L188 282" fill={darker} />
          <ellipse cx="127" cy="307" rx="17" ry="6" fill={darker} />
          <ellipse cx="175" cy="307" rx="17" ry="6" fill={darker} />
          {/* Boot wrap straps */}
          <path d="M112 288 L142 288" stroke={light} strokeWidth="1.5" opacity="0.3" />
          <path d="M112 294 L142 294" stroke={light} strokeWidth="1.5" opacity="0.3" />
          <path d="M162 288 L188 288" stroke={light} strokeWidth="1.5" opacity="0.3" />
          <path d="M162 294 L188 294" stroke={light} strokeWidth="1.5" opacity="0.3" />
        </g>
      );

    // === OZEAN-HELDIN (Vaiana/Moana-inspiriert) ===
    case 'ozean':
      return (
        <g className="outfit">
          {/* Patterned crop top - strapless */}
          <path d="M115 140 Q115 136 130 132 Q142 130 150 130 Q158 130 170 132 Q185 136 185 140 L186 180 Q170 186 150 186 Q130 186 114 180 Z" fill={farbe} />

          {/* Tapa pattern on top */}
          <path d="M125 148 L132 143 L139 148 L132 153 Z" fill={dark} opacity="0.3" />
          <path d="M143 145 L150 140 L157 145 L150 150 Z" fill={dark} opacity="0.3" />
          <path d="M161 148 L168 143 L175 148 L168 153 Z" fill={dark} opacity="0.3" />
          <path d="M134 158 L141 153 L148 158 L141 163 Z" fill={dark} opacity="0.25" />
          <path d="M152 158 L159 153 L166 158 L159 163 Z" fill={dark} opacity="0.25" />
          <path d="M143 168 L150 163 L157 168 L150 173 Z" fill={dark} opacity="0.2" />
          {/* Top border trim */}
          <path d="M118 138 Q135 132 150 131 Q165 132 182 138" stroke={darker} strokeWidth="2" fill="none" opacity="0.3" />

          {/* Shell / flower necklace */}
          <path d="M122 128 Q136 134 150 132 Q164 134 178 128" stroke={lighter} strokeWidth="3" fill="none" />
          {/* Shell pendant */}
          <path d="M146 134 Q150 142 154 134" fill={lighter} />
          <line x1="150" y1="132" x2="150" y2="138" stroke={lighter} strokeWidth="1.5" />
          {/* Side shell beads */}
          <circle cx="130" cy="132" r="3" fill={lighter} opacity="0.8" />
          <circle cx="170" cy="132" r="3" fill={lighter} opacity="0.8" />
          <circle cx="138" cy="134" r="2.5" fill={lighter} opacity="0.6" />
          <circle cx="162" cy="134" r="2.5" fill={lighter} opacity="0.6" />

          {/* Bare arms - no sleeves, skin shows through from body layer */}

          {/* Long flowing skirt - layered, organic */}
          <path d="M108 186 Q96 230 92 275 Q92 300 118 312 L150 316 L182 312 Q208 300 208 275 Q204 230 192 186 Z" fill={farbe} />

          {/* Skirt wave layers */}
          <path d="M96 225 Q118 220 140 225 Q162 230 182 225 Q200 220 206 225" stroke={light} strokeWidth="2" fill="none" opacity="0.35" />
          <path d="M94 250 Q116 245 138 250 Q160 255 180 250 Q198 245 208 250" stroke={light} strokeWidth="2" fill="none" opacity="0.35" />
          <path d="M93 275 Q114 270 135 275 Q156 280 176 275 Q196 270 210 275" stroke={light} strokeWidth="2" fill="none" opacity="0.3" />
          <path d="M96 295 Q114 290 135 295 Q156 300 176 295 Q195 290 206 295" stroke={light} strokeWidth="2" fill="none" opacity="0.25" />

          {/* Tapa pattern accents on skirt */}
          <path d="M120 238 L125 233 L130 238 L125 243 Z" fill={dark} opacity="0.15" />
          <path d="M168 242 L173 237 L178 242 L173 247 Z" fill={dark} opacity="0.15" />
          <path d="M142 265 L147 260 L152 265 L147 270 Z" fill={dark} opacity="0.12" />
          <path d="M110 270 L115 265 L120 270 L115 275 Z" fill={dark} opacity="0.12" />
          <path d="M180 268 L185 263 L190 268 L185 273 Z" fill={dark} opacity="0.12" />

          {/* Waist sash / tie */}
          <path d="M108 186 Q150 196 192 186" stroke={darker} strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M145 192 Q140 205 135 215" stroke={darker} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.5" />
          <path d="M155 192 Q148 205 145 215" stroke={darker} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.5" />

          {/* Flower in hair (outfit accessory) */}
          <g transform="translate(192, 52)">
            <circle cx="0" cy="0" r="8" fill={farbe} opacity="0.9" />
            <circle cx="6" cy="0" r="4.5" fill={light} opacity="0.75" />
            <circle cx="-6" cy="0" r="4.5" fill={light} opacity="0.75" />
            <circle cx="0" cy="6" r="4.5" fill={light} opacity="0.75" />
            <circle cx="0" cy="-6" r="4.5" fill={light} opacity="0.75" />
            <circle cx="4" cy="4" r="3.5" fill={light} opacity="0.6" />
            <circle cx="-4" cy="4" r="3.5" fill={light} opacity="0.6" />
            <circle cx="0" cy="0" r="3.5" fill="#facc15" />
          </g>

          {/* Bare feet / sandals */}
          <ellipse cx="130" cy="316" rx="14" ry="6" fill={dark} />
          <ellipse cx="170" cy="316" rx="14" ry="6" fill={dark} />
          <path d="M126 312 L130 304" stroke={dark} strokeWidth="2" opacity="0.5" />
          <path d="M134 312 L130 304" stroke={dark} strokeWidth="2" opacity="0.5" />
          <path d="M166 312 L170 304" stroke={dark} strokeWidth="2" opacity="0.5" />
          <path d="M174 312 L170 304" stroke={dark} strokeWidth="2" opacity="0.5" />
        </g>
      );
  }
}
