import { motion } from 'framer-motion';
import { FLOSS_TEILE } from '@/types/abenteuer';
import type { SammelItem } from '@/types/abenteuer';
import MagicButton from '@/components/ui/MagicButton';

interface Props {
  heldenfarbe: string;
  gefunden: string[];
  onItemAufnehmen: (item: SammelItem) => void;
  onZurueck: () => void;
}

// Items lie on the sand - positions are spread along the beach
const ITEM_POSITIONEN: Record<string, { x: number; y: number; rotation: number }> = {
  ast: { x: 18, y: 78, rotation: -15 },
  brett: { x: 38, y: 82, rotation: 8 },
  seil: { x: 60, y: 76, rotation: 0 },
  fass: { x: 78, y: 80, rotation: 0 },
  segel: { x: 50, y: 65, rotation: -8 },
};

export default function StrandSzene({ heldenfarbe, gefunden, onItemAufnehmen, onZurueck }: Props) {
  const offen = FLOSS_TEILE.filter(t => !gefunden.includes(t.id));
  const allDone = offen.length === 0;

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ touchAction: 'manipulation', background: '#0d1426' }}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="strandLight" cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#1f4068" />
            <stop offset="100%" stopColor="#040814" />
          </radialGradient>
          <linearGradient id="strandSand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7a5a3a" />
            <stop offset="100%" stopColor="#3a2415" />
          </linearGradient>
          <linearGradient id="strandWater" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5fa8d3" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0c3855" stopOpacity="1" />
          </linearGradient>
        </defs>

        <rect width="1000" height="600" fill="url(#strandLight)" />

        {/* Cave ceiling silhouette */}
        <path d="M0 0 L0 200 Q150 160 300 190 Q500 150 700 190 Q850 160 1000 200 L1000 0 Z" fill="#0a1320" />

        {/* Stalactites */}
        <g fill="#0a1320">
          <polygon points="160,180 170,230 180,180" />
          <polygon points="380,180 390,250 400,180" />
          <polygon points="620,180 630,230 640,180" />
          <polygon points="820,180 832,240 844,180" />
        </g>

        {/* Distant water visible at the horizon */}
        <rect x="0" y="380" width="1000" height="40" fill="url(#strandWater)" />
        {[0, 1, 2].map(i => (
          <motion.path
            key={i}
            d={`M0 ${385 + i * 8} Q250 ${380 + i * 8} 500 ${385 + i * 8} T1000 ${385 + i * 8}`}
            stroke="#a3d8ff"
            strokeWidth="1.5"
            fill="none"
            opacity={0.4 - i * 0.1}
            animate={{ x: [0, 18, 0, -18, 0] }}
            transition={{ duration: 5 + i, repeat: Infinity }}
          />
        ))}

        {/* Sand beach takes the lower half */}
        <path d="M0 420 Q200 400 500 420 Q800 410 1000 420 L1000 600 L0 600 Z" fill="url(#strandSand)" />

        {/* Sand texture - tiny ripples */}
        {Array.from({ length: 30 }).map((_, i) => (
          <ellipse
            key={i}
            cx={(i * 71) % 1000}
            cy={440 + (i % 4) * 40}
            rx={8 + (i % 3)}
            ry={1.5}
            fill="#5a4220"
            opacity={0.4}
          />
        ))}

        {/* Footprints leading from water to inland */}
        {[
          { cx: 850, cy: 440 }, { cx: 800, cy: 460 },
          { cx: 750, cy: 480 }, { cx: 700, cy: 470 },
          { cx: 650, cy: 490 }, { cx: 600, cy: 480 },
        ].map((f, i) => (
          <ellipse key={i} cx={f.cx} cy={f.cy} rx="14" ry="6" fill="#3a2415" opacity="0.6" transform={`rotate(${(i % 2) * 20 - 10} ${f.cx} ${f.cy})`} />
        ))}

        {/* Some shells / pebbles for atmosphere */}
        <g>
          <ellipse cx="180" cy="540" rx="6" ry="4" fill="#d9c9a5" opacity="0.7" />
          <ellipse cx="250" cy="560" rx="5" ry="3" fill="#c9b48a" opacity="0.7" />
          <circle cx="380" cy="555" r="4" fill="#b9a070" opacity="0.6" />
          <ellipse cx="720" cy="565" rx="6" ry="4" fill="#d9c9a5" opacity="0.7" />
          <circle cx="900" cy="540" r="3.5" fill="#c9b48a" opacity="0.7" />
        </g>

        {/* Bioluminescent floating particles */}
        {Array.from({ length: 8 }).map((_, i) => {
          const startX = 60 + i * 120;
          const startY = 240 + ((i * 47) % 100);
          return (
            <motion.circle
              key={`spark-${i}`}
              cx={startX}
              cy={startY}
              r={2}
              fill="#7eb8e0"
              animate={{ y: [startY, startY - 30, startY], opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 4 + (i % 4), repeat: Infinity, delay: i * 0.4 }}
            />
          );
        })}
      </svg>

      {/* Items lying on the sand */}
      {offen.map(item => {
        const pos = ITEM_POSITIONEN[item.id] || { x: 50, y: 80, rotation: 0 };
        return (
          <div
            key={item.id}
            className="absolute"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Shadow on sand */}
            <div
              className="absolute rounded-full"
              style={{
                bottom: -12,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 64,
                height: 12,
                background: 'rgba(0,0,0,0.45)',
                filter: 'blur(6px)',
              }}
            />
            <motion.button
              onClick={() => onItemAufnehmen(item)}
              className="relative"
              style={{ touchAction: 'manipulation', transformOrigin: 'center bottom' }}
              initial={{ rotate: pos.rotation }}
              animate={{
                rotate: pos.rotation,
                filter: [
                  `drop-shadow(0 0 6px ${heldenfarbe})`,
                  `drop-shadow(0 0 18px ${heldenfarbe})`,
                  `drop-shadow(0 0 6px ${heldenfarbe})`,
                ],
              }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.18, rotate: pos.rotation - 4 }}
              whileTap={{ scale: 1.25 }}
              aria-label={`Aufnehmen: ${item.label}`}
            >
              <span className="text-5xl select-none">{item.emoji}</span>
            </motion.button>
          </div>
        );
      })}

      {/* Top bar */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-30 gap-2">
        <MagicButton onClick={onZurueck} variant="secondary" size="lg">
          ← Höhle
        </MagicButton>
        <div className="bg-card/80 backdrop-blur rounded-2xl px-4 py-2 flex items-center gap-2">
          <span className="text-2xl">🛟</span>
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-display text-card-foreground">Floss-Teile</span>
            <span className="text-xs font-body text-muted-foreground">
              {FLOSS_TEILE.length - offen.length}/{FLOSS_TEILE.length}{allDone && ' ✓'}
            </span>
          </div>
        </div>
        <div className="w-[60px]" />
      </div>

      {/* Hint */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <div className="bg-card/80 backdrop-blur rounded-2xl px-5 py-2 max-w-md">
          <p className="text-body font-display text-card-foreground text-center">
            {allDone
              ? '✨ Alle Floss-Teile gesammelt!'
              : 'Tippe ein Teil am Strand zum Aufheben'}
          </p>
        </div>
      </div>
    </div>
  );
}
