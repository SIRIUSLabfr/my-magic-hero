import { motion } from 'framer-motion';
import { PROVIANT_ITEMS } from '@/types/abenteuer';
import type { SammelItem } from '@/types/abenteuer';
import MagicButton from '@/components/ui/MagicButton';

interface Props {
  heldenfarbe: string;
  gefunden: string[];
  onItemAufnehmen: (item: SammelItem) => void;
  onZurueck: () => void;
}

// Items spread over palm tree, bushes, ground
const ITEM_POSITIONEN: Record<string, { x: number; y: number; rotation: number }> = {
  banane: { x: 30, y: 32, rotation: -10 },   // hanging from palm
  kokos: { x: 26, y: 42, rotation: 0 },      // also in palm
  pilz: { x: 60, y: 76, rotation: 0 },       // ground / mossy area
  beere: { x: 82, y: 70, rotation: 0 },      // on bush
};

export default function WaldSzene({ heldenfarbe, gefunden, onItemAufnehmen, onZurueck }: Props) {
  const offen = PROVIANT_ITEMS.filter(t => !gefunden.includes(t.id));
  const allDone = offen.length === 0;

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ touchAction: 'manipulation', background: '#082016' }}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="waldSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a3a5a" />
            <stop offset="100%" stopColor="#0a2418" />
          </linearGradient>
          <linearGradient id="waldFoliage" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a7a4a" />
            <stop offset="100%" stopColor="#0e3a22" />
          </linearGradient>
          <linearGradient id="waldGround" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a5a30" />
            <stop offset="100%" stopColor="#1a2a14" />
          </linearGradient>
          <radialGradient id="sunBeam" cx="30%" cy="0%" r="40%">
            <stop offset="0%" stopColor="#fffacd" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#fffacd" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Backdrop - through cave opening, view of jungle */}
        <rect width="1000" height="600" fill="url(#waldSky)" />

        {/* Sun beam through trees */}
        <ellipse cx="300" cy="100" rx="500" ry="200" fill="url(#sunBeam)" />

        {/* Distant jungle silhouettes */}
        {Array.from({ length: 6 }).map((_, i) => {
          const baseX = i * 180;
          return (
            <ellipse
              key={`tree-bg-${i}`}
              cx={baseX + 50 + (i % 2) * 30}
              cy={250}
              rx={70}
              ry={50}
              fill="#0e3a22"
              opacity={0.7}
            />
          );
        })}

        {/* Mid-foliage band */}
        <path d="M0 280 Q100 250 200 290 Q300 240 400 280 Q500 250 600 290 Q700 240 800 280 Q900 250 1000 290 L1000 360 L0 360 Z" fill="#143828" />

        {/* Ground - jungle floor */}
        <path d="M0 380 Q200 360 500 380 Q800 370 1000 380 L1000 600 L0 600 Z" fill="url(#waldGround)" />

        {/* Grass tufts */}
        {Array.from({ length: 25 }).map((_, i) => {
          const x = (i * 41) % 1000;
          const y = 400 + (i % 5) * 35;
          return (
            <motion.path
              key={`grass-${i}`}
              d={`M${x} ${y + 12} Q${x - 2} ${y} ${x} ${y - 4} Q${x + 2} ${y} ${x} ${y + 12} Z`}
              fill="#2a5a32"
              opacity={0.8}
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.1 }}
              style={{ transformOrigin: `${x}px ${y + 12}px` }}
            />
          );
        })}

        {/* Big palm tree on the left */}
        <g>
          {/* Trunk */}
          <rect x="170" y="270" width="22" height="240" fill="#5a3a18" />
          <rect x="170" y="270" width="22" height="240" fill="#3a2410" opacity="0.4" />
          {/* Trunk rings */}
          {[0, 1, 2, 3, 4, 5, 6].map(i => (
            <rect key={i} x="170" y={290 + i * 32} width="22" height="3" fill="#3a2410" opacity="0.6" />
          ))}
          {/* Palm fronds */}
          <motion.path
            d="M180 270 Q120 220 80 200 Q140 240 180 270 Z"
            fill="url(#waldFoliage)"
            animate={{ rotate: [-2, 3, -2] }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{ transformOrigin: '180px 270px' }}
          />
          <motion.path
            d="M180 268 Q230 220 270 200 Q220 240 180 268 Z"
            fill="#1a4a2c"
            animate={{ rotate: [2, -3, 2] }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{ transformOrigin: '180px 268px' }}
          />
          <motion.path
            d="M182 265 Q200 200 215 175 Q200 230 182 270 Z"
            fill="url(#waldFoliage)"
            animate={{ rotate: [-1, 2, -1] }}
            transition={{ duration: 6, repeat: Infinity }}
            style={{ transformOrigin: '182px 265px' }}
          />
          <motion.path
            d="M180 270 Q150 230 130 200 Q160 250 180 270 Z"
            fill="#1a4a2c"
            animate={{ rotate: [1, -2, 1] }}
            transition={{ duration: 5.5, repeat: Infinity }}
            style={{ transformOrigin: '180px 270px' }}
          />
        </g>

        {/* Big bush on the right */}
        <g>
          <ellipse cx="800" cy="450" rx="120" ry="60" fill="#1a4a2c" />
          <ellipse cx="850" cy="445" rx="60" ry="38" fill="url(#waldFoliage)" />
          <ellipse cx="760" cy="450" rx="50" ry="32" fill="#143828" />
          <ellipse cx="820" cy="425" rx="35" ry="22" fill="#2a6a3a" />
          {/* Tiny flowers */}
          <circle cx="780" cy="430" r="3" fill="#ec4899" />
          <circle cx="820" cy="425" r="3" fill="#facc15" />
          <circle cx="850" cy="445" r="2.5" fill="#fff" opacity="0.8" />
          <circle cx="790" cy="455" r="2.5" fill="#facc15" />
        </g>

        {/* Mossy log on ground (where pilz sits) */}
        <ellipse cx="600" cy="490" rx="80" ry="14" fill="#3a2515" />
        <ellipse cx="600" cy="485" rx="80" ry="10" fill="#5a3a1a" />
        <ellipse cx="595" cy="482" rx="35" ry="6" fill="#2a4a2a" opacity="0.7" />
        <ellipse cx="635" cy="484" rx="22" ry="4" fill="#2a4a2a" opacity="0.6" />

        {/* Fireflies / dust motes */}
        {Array.from({ length: 12 }).map((_, i) => {
          const startX = 100 + i * 70;
          const startY = 200 + ((i * 53) % 250);
          return (
            <motion.circle
              key={`spark-${i}`}
              cx={startX}
              cy={startY}
              r={2}
              fill="#fff5b8"
              animate={{
                y: [startY, startY - 25, startY],
                x: [startX, startX + 8, startX],
                opacity: [0.2, 0.85, 0.2],
              }}
              transition={{ duration: 4 + (i % 4), repeat: Infinity, delay: i * 0.4 }}
            />
          );
        })}

        {/* Butterfly */}
        <motion.g
          animate={{
            x: [0, 200, 100, 300, 50, 0],
            y: [0, -30, 20, -40, -10, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '500px 350px' }}
        >
          <motion.path
            d="M500 350 L490 340 L480 345 L490 355 Z"
            fill="#ec4899"
            animate={{ scaleX: [1, 0.6, 1] }}
            transition={{ duration: 0.4, repeat: Infinity }}
            style={{ transformOrigin: '500px 350px' }}
          />
          <motion.path
            d="M500 350 L510 340 L520 345 L510 355 Z"
            fill="#ec4899"
            animate={{ scaleX: [1, 0.6, 1] }}
            transition={{ duration: 0.4, repeat: Infinity }}
            style={{ transformOrigin: '500px 350px' }}
          />
        </motion.g>
      </svg>

      {/* Items in foliage / on ground */}
      {offen.map(item => {
        const pos = ITEM_POSITIONEN[item.id] || { x: 50, y: 70, rotation: 0 };
        const hatSchatten = pos.y > 60; // ground items have a shadow
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
            {hatSchatten && (
              <div
                className="absolute rounded-full"
                style={{
                  bottom: -10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 56,
                  height: 10,
                  background: 'rgba(0,0,0,0.4)',
                  filter: 'blur(5px)',
                }}
              />
            )}
            <motion.button
              onClick={() => onItemAufnehmen(item)}
              className="relative"
              style={{ touchAction: 'manipulation', transformOrigin: 'center' }}
              initial={{ rotate: pos.rotation }}
              animate={{
                rotate: pos.rotation,
                filter: [
                  `drop-shadow(0 0 6px ${heldenfarbe})`,
                  `drop-shadow(0 0 18px ${heldenfarbe})`,
                  `drop-shadow(0 0 6px ${heldenfarbe})`,
                ],
                y: hatSchatten ? 0 : [0, -3, 0],
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

      {/* Top bar */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-30 gap-2">
        <MagicButton onClick={onZurueck} variant="secondary" size="lg">
          ← Höhle
        </MagicButton>
        <div className="bg-card/80 backdrop-blur rounded-2xl px-4 py-2 flex items-center gap-2">
          <span className="text-2xl">🍱</span>
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-display text-card-foreground">Proviant</span>
            <span className="text-xs font-body text-muted-foreground">
              {PROVIANT_ITEMS.length - offen.length}/{PROVIANT_ITEMS.length}{allDone && ' ✓'}
            </span>
          </div>
        </div>
        <div className="w-[60px]" />
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <div className="bg-card/80 backdrop-blur rounded-2xl px-5 py-2 max-w-md">
          <p className="text-body font-display text-card-foreground text-center">
            {allDone
              ? '✨ Genug Proviant gesammelt!'
              : 'Tippe Früchte und Pilze zum Sammeln'}
          </p>
        </div>
      </div>
    </div>
  );
}
