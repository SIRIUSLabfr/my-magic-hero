import { motion } from 'framer-motion';
import { SCHLEUDER_TEILE } from '@/types/abenteuer';
import type { SammelItem } from '@/types/abenteuer';
import MagicButton from '@/components/ui/MagicButton';

interface Props {
  heldenfarbe: string;
  gefunden: string[];
  onItemAufnehmen: (item: SammelItem) => void;
  onZurueck: () => void;
}

const ITEM_POSITIONEN: Record<string, { x: number; y: number; rotation: number }> = {
  gabel: { x: 28, y: 70, rotation: 12 },
  gummi: { x: 78, y: 78, rotation: 0 },
  stein: { x: 52, y: 82, rotation: 0 },
};

export default function FelsenSzene({ heldenfarbe, gefunden, onItemAufnehmen, onZurueck }: Props) {
  const offen = SCHLEUDER_TEILE.filter(t => !gefunden.includes(t.id));
  const allDone = offen.length === 0;

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ touchAction: 'manipulation', background: '#1a1424' }}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="felsenLight" cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#3a2840" />
            <stop offset="100%" stopColor="#0a0814" />
          </radialGradient>
          <linearGradient id="rockBig" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4a4458" />
            <stop offset="100%" stopColor="#1a1828" />
          </linearGradient>
          <linearGradient id="rockMid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a3448" />
            <stop offset="100%" stopColor="#15121e" />
          </linearGradient>
          <linearGradient id="floorRock" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a2030" />
            <stop offset="100%" stopColor="#15101a" />
          </linearGradient>
        </defs>

        <rect width="1000" height="600" fill="url(#felsenLight)" />

        {/* Rocky cave wall in the back */}
        <path d="M0 0 L0 280 Q150 220 350 270 Q550 200 750 260 Q900 220 1000 280 L1000 0 Z" fill="#1a1424" />

        {/* Big stalactites */}
        <g fill="url(#rockBig)">
          <polygon points="100,260 110,330 120,260" />
          <polygon points="240,250 254,340 268,250" />
          <polygon points="430,260 440,310 450,260" />
          <polygon points="580,250 595,340 610,250" />
          <polygon points="780,260 790,320 800,260" />
          <polygon points="900,255 912,340 924,255" />
        </g>

        {/* Wall crystals - spread around */}
        <g>
          {[
            { x: 60, y: 360, c: '#ef4444' },
            { x: 140, y: 380, c: '#fa6f6f' },
            { x: 320, y: 400, c: '#ef4444' },
            { x: 880, y: 400, c: '#fa6f6f' },
            { x: 950, y: 380, c: '#ef4444' },
          ].map((cr, i) => (
            <g key={i}>
              <polygon points={`${cr.x},${cr.y} ${cr.x + 10},${cr.y - 18} ${cr.x + 22},${cr.y} ${cr.x + 16},${cr.y + 18} ${cr.x + 4},${cr.y + 18}`} fill={cr.c} opacity="0.85" />
              <polygon points={`${cr.x + 10},${cr.y - 18} ${cr.x + 14},${cr.y - 4} ${cr.x + 22},${cr.y}`} fill="#fff" opacity="0.5" />
            </g>
          ))}
        </g>

        {/* Big rock formations on the ground */}
        <g>
          {/* Big rocks - back layer */}
          <ellipse cx="120" cy="520" rx="100" ry="40" fill="url(#rockMid)" />
          <ellipse cx="880" cy="510" rx="120" ry="50" fill="url(#rockMid)" />

          {/* Medium rocks middle */}
          <path d="M150 540 Q200 480 290 510 Q340 530 350 555 L350 600 L150 600 Z" fill="url(#rockBig)" />
          <path d="M650 540 Q720 470 820 500 Q890 520 900 560 L900 600 L650 600 Z" fill="url(#rockBig)" />

          {/* Foreground floor */}
          <path d="M0 540 Q200 520 500 540 Q800 525 1000 540 L1000 600 L0 600 Z" fill="url(#floorRock)" />

          {/* Pebbles scattered */}
          {Array.from({ length: 18 }).map((_, i) => (
            <ellipse
              key={i}
              cx={(i * 67) % 1000}
              cy={550 + (i % 4) * 12}
              rx={4 + (i % 3)}
              ry={2 + (i % 2)}
              fill="#3a3448"
              opacity={0.7}
            />
          ))}
        </g>

        {/* Embers / dust motes - reddish */}
        {Array.from({ length: 10 }).map((_, i) => {
          const startX = 80 + i * 90;
          const startY = 280 + ((i * 47) % 150);
          return (
            <motion.circle
              key={`ember-${i}`}
              cx={startX}
              cy={startY}
              r={2}
              fill="#fa6f6f"
              animate={{
                y: [startY, startY - 25, startY],
                opacity: [0.2, 0.85, 0.2],
              }}
              transition={{ duration: 4 + (i % 4), repeat: Infinity, delay: i * 0.4 }}
            />
          );
        })}

        {/* Drip from stalactite */}
        <motion.circle
          cx="254"
          cy="340"
          r="3"
          fill="#a3d8ff"
          animate={{ y: [0, 200], opacity: [1, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
        />
      </svg>

      {/* Items lying among rocks */}
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
            <div
              className="absolute rounded-full"
              style={{
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 56,
                height: 10,
                background: 'rgba(0,0,0,0.5)',
                filter: 'blur(5px)',
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
              whileHover={{ scale: 1.18 }}
              whileTap={{ scale: 1.25 }}
              aria-label={`Aufnehmen: ${item.label}`}
            >
              <span className="text-5xl select-none">{item.emoji}</span>
            </motion.button>
          </div>
        );
      })}

      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-30 gap-2">
        <MagicButton onClick={onZurueck} variant="secondary" size="lg">
          ← Höhle
        </MagicButton>
        <div className="bg-card/80 backdrop-blur rounded-2xl px-4 py-2 flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-display text-card-foreground">Schleuder-Teile</span>
            <span className="text-xs font-body text-muted-foreground">
              {SCHLEUDER_TEILE.length - offen.length}/{SCHLEUDER_TEILE.length}{allDone && ' ✓'}
            </span>
          </div>
        </div>
        <div className="w-[60px]" />
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <div className="bg-card/80 backdrop-blur rounded-2xl px-5 py-2 max-w-md">
          <p className="text-body font-display text-card-foreground text-center">
            {allDone
              ? '✨ Alle Schleuder-Teile gefunden!'
              : 'Suche zwischen den Felsen'}
          </p>
        </div>
      </div>
    </div>
  );
}
