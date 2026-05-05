interface Props {
  frisur: 'bob' | 'ponytail' | 'lang' | 'hochzopf' | 'locken' | 'kurz' | 'afro' | 'kopftuch';
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

    case 'locken': {
      // Curly hair - clusters of small curls around the head
      const curls: { cx: number; cy: number; r: number }[] = [
        { cx: 100, cy: 30, r: 12 }, { cx: 120, cy: 18, r: 13 }, { cx: 142, cy: 14, r: 14 },
        { cx: 165, cy: 14, r: 14 }, { cx: 188, cy: 18, r: 13 }, { cx: 208, cy: 30, r: 12 },
        { cx: 92, cy: 50, r: 13 }, { cx: 216, cy: 50, r: 13 },
        { cx: 86, cy: 80, r: 15 }, { cx: 222, cy: 80, r: 15 },
        { cx: 88, cy: 110, r: 16 }, { cx: 220, cy: 110, r: 16 },
        { cx: 95, cy: 138, r: 14 }, { cx: 213, cy: 138, r: 14 },
        { cx: 110, cy: 50, r: 11 }, { cx: 198, cy: 50, r: 11 },
      ];
      return (
        <g className="haare">
          {/* Base hair shape behind ears for volume */}
          <path d="M88 78 Q86 130 96 160 Q150 175 204 160 Q214 130 212 78 Q207 22 150 22 Q93 22 88 78 Z" fill={farbe} />
          {/* Curls cluster */}
          {curls.map((c, i) => (
            <g key={i}>
              <circle cx={c.cx} cy={c.cy} r={c.r} fill={farbe} />
              <circle cx={c.cx - 2} cy={c.cy - 2} r={c.r * 0.5} fill={shadow} opacity="0.3" />
              <circle cx={c.cx + c.r * 0.3} cy={c.cy - c.r * 0.3} r={2} fill="white" opacity="0.4" />
            </g>
          ))}
          {/* Forehead curls */}
          <circle cx="128" cy="42" r="9" fill={farbe} />
          <circle cx="150" cy="38" r="9" fill={farbe} />
          <circle cx="172" cy="42" r="9" fill={farbe} />
        </g>
      );
    }

    case 'kurz':
      return (
        <g className="haare">
          {/* Short pixie/buzz style hair cap */}
          <path d="M95 70 Q95 22 150 22 Q205 22 205 70 Q205 48 150 40 Q95 48 95 70 Z" fill={farbe} />
          {/* Side temples - very short */}
          <path d="M95 60 Q92 72 94 82 Q96 72 97 64 Z" fill={farbe} />
          <path d="M205 60 Q208 72 206 82 Q204 72 203 64 Z" fill={farbe} />
          {/* Side-swept fringe */}
          <path d="M104 38 Q126 22 158 30 Q140 44 122 48 Z" fill={farbe} />
          {/* Texture lines */}
          <path d="M118 32 Q130 28 144 32" stroke={shadow} strokeWidth="2" fill="none" opacity="0.3" />
          <path d="M152 30 Q170 26 192 36" stroke={shadow} strokeWidth="2" fill="none" opacity="0.3" />
          {/* Small back of neck strands */}
          <path d="M108 78 Q104 84 106 90 Z" fill={farbe} opacity="0.7" />
          <path d="M192 78 Q196 84 194 90 Z" fill={farbe} opacity="0.7" />
        </g>
      );

    case 'afro': {
      // Big rounded afro silhouette, with subtle texture circles
      const dots: { cx: number; cy: number; r: number }[] = [];
      for (let i = 0; i < 18; i++) {
        const angle = (i / 18) * Math.PI * 2;
        dots.push({
          cx: 150 + Math.cos(angle) * 65,
          cy: 35 + Math.sin(angle) * 40,
          r: 10 + (i % 3),
        });
      }
      return (
        <g className="haare">
          {/* Main afro silhouette - large rounded cloud */}
          <ellipse cx="150" cy="38" rx="80" ry="55" fill={farbe} />
          {/* Sides extending down past ears */}
          <ellipse cx="82" cy="78" rx="22" ry="32" fill={farbe} />
          <ellipse cx="218" cy="78" rx="22" ry="32" fill={farbe} />
          {/* Texture dots for hair structure */}
          {dots.map((d, i) => (
            <circle key={i} cx={d.cx} cy={d.cy} r={d.r * 0.5} fill={shadow} opacity="0.18" />
          ))}
          {/* Highlights */}
          <ellipse cx="125" cy="18" rx="20" ry="6" fill="white" opacity="0.15" />
          <ellipse cx="180" cy="22" rx="14" ry="4" fill="white" opacity="0.12" />
          {/* Forehead edge */}
          <path d="M105 60 Q150 50 195 60" stroke={shadow} strokeWidth="2" fill="none" opacity="0.3" />
        </g>
      );
    }

    case 'kopftuch': {
      // Hijab/Headscarf - smooth fabric over the head, draping down sides and around shoulders
      return (
        <g className="haare">
          {/* Main headscarf cap covering full hair area */}
          <path
            d="M82 90 Q78 50 110 24 Q150 8 190 24 Q222 50 218 90 Q220 110 215 130 L 230 220 Q230 240 210 245 Q150 255 90 245 Q70 240 70 220 L 85 130 Q80 110 82 90 Z"
            fill={farbe}
          />
          {/* Front edge band over the forehead */}
          <path d="M88 64 Q150 38 212 64 Q210 70 150 56 Q90 70 88 64 Z" fill={shadow} opacity="0.25" />
          {/* Fold line on left side */}
          <path d="M90 130 Q86 180 96 230" stroke={shadow} strokeWidth="3" fill="none" opacity="0.25" />
          {/* Fold line on right side */}
          <path d="M210 130 Q214 180 204 230" stroke={shadow} strokeWidth="3" fill="none" opacity="0.25" />
          {/* Subtle fabric highlight */}
          <path d="M115 30 Q150 18 185 30" stroke="white" strokeWidth="3" fill="none" opacity="0.18" strokeLinecap="round" />
          {/* Pin/decoration */}
          <circle cx="195" cy="58" r="3" fill="#facc15" />
          <circle cx="195" cy="58" r="1.5" fill="white" opacity="0.7" />
        </g>
      );
    }
  }
}
