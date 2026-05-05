import { motion } from 'framer-motion';
import { FLOSS_TEILE } from '@/types/abenteuer';
import type { FlossTeilId } from '@/types/abenteuer';
import type { AvatarConfig } from '@/types/profil';
import HeldAvatar from '@/components/avatar/HeldAvatar';
import MagicButton from '@/components/ui/MagicButton';

interface Props {
  avatarConfig: AvatarConfig;
  heldenfarbe: string;
  gefunden: FlossTeilId[];
  onTeilGefunden: (id: FlossTeilId) => void;
  onZurueck: () => void;
  onZurFloss: () => void;
}

export default function HoehlenSzene({
  avatarConfig,
  heldenfarbe,
  gefunden,
  onTeilGefunden,
  onZurueck,
  onZurFloss,
}: Props) {
  const offen = FLOSS_TEILE.filter(t => !gefunden.includes(t.id));
  const alleGefunden = offen.length === 0;

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ touchAction: 'manipulation', background: '#0a1929' }}>
      {/* SVG cave background - layered parallax */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="caveGlow" cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#1f4068" stopOpacity="1" />
            <stop offset="60%" stopColor="#0d1b2a" stopOpacity="1" />
            <stop offset="100%" stopColor="#050a14" stopOpacity="1" />
          </radialGradient>
          <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0c5775" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#040d18" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="cliff" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1c2a3a" />
            <stop offset="100%" stopColor="#0a121c" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background - cave glow */}
        <rect width="1000" height="600" fill="url(#caveGlow)" />

        {/* Distant cave wall - back layer */}
        <path
          d="M0 0 L0 300 Q120 240 240 280 Q360 220 480 260 Q600 210 720 250 Q840 220 1000 280 L1000 0 Z"
          fill="#142339"
          opacity="0.85"
        />

        {/* Sparkly distant points - far stars/crystals */}
        {Array.from({ length: 25 }).map((_, i) => {
          const x = (i * 137) % 1000;
          const y = 30 + ((i * 73) % 200);
          return (
            <motion.circle
              key={`star-${i}`}
              cx={x}
              cy={y}
              r={1.2}
              fill="#a3d8ff"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.13 }}
            />
          );
        })}

        {/* Mid-ground cave wall */}
        <path
          d="M0 80 Q60 60 130 100 Q200 70 280 110 Q360 80 440 130 Q540 90 620 130 Q720 95 820 130 Q900 100 1000 130 L1000 0 L0 0 Z"
          fill="url(#cliff)"
        />

        {/* Stalactites from ceiling */}
        <g fill="url(#cliff)">
          <polygon points="120,80 130,150 140,80" />
          <polygon points="240,90 252,170 264,90" />
          <polygon points="380,100 388,140 396,100" />
          <polygon points="520,90 532,180 544,90" />
          <polygon points="700,100 710,160 720,100" />
          <polygon points="850,80 862,150 874,80" />
        </g>
        {/* Tiny stalactite tip glints */}
        <circle cx="252" cy="170" r="2" fill="#a3d8ff" opacity="0.7" />
        <circle cx="532" cy="180" r="2" fill="#a3d8ff" opacity="0.7" />
        <circle cx="710" cy="160" r="2" fill="#a3d8ff" opacity="0.7" />

        {/* Cave opening ahead - bright distant light */}
        <ellipse cx="850" cy="290" rx="80" ry="55" fill="#5fa8d3" opacity="0.35" filter="url(#glow)" />
        <ellipse cx="850" cy="290" rx="40" ry="28" fill="#a3d8ff" opacity="0.4" />

        {/* Foreground rocks/cliff */}
        <path
          d="M0 600 L0 380 Q80 350 160 410 Q240 370 320 420 L320 600 Z"
          fill="#0a1320"
        />
        <path
          d="M680 600 L680 410 Q760 370 840 420 Q920 380 1000 410 L1000 600 Z"
          fill="#0a1320"
        />

        {/* Sandy beach / ground inside cave */}
        <path
          d="M0 480 Q150 460 300 480 Q500 490 700 470 Q850 470 1000 485 L1000 600 L0 600 Z"
          fill="#3a2d1f"
        />
        <path
          d="M0 480 Q150 460 300 480 Q500 490 700 470 Q850 470 1000 485 L1000 600 L0 600 Z"
          fill="#1a1108"
          opacity="0.5"
        />

        {/* Water pool with animated highlight ripples */}
        <rect x="200" y="500" width="600" height="100" fill="url(#waterGrad)" />
        {[0, 1, 2, 3].map(i => (
          <motion.path
            key={`wave-${i}`}
            d={`M${200 + i * 150} 510 Q${250 + i * 150} ${506 - (i % 2) * 4} ${300 + i * 150} 510`}
            stroke="#5fa8d3"
            strokeWidth="2"
            fill="none"
            opacity="0.5"
            animate={{ x: [0, 8, 0, -8, 0] }}
            transition={{ duration: 3 + i, repeat: Infinity }}
          />
        ))}

        {/* Bioluminescent floating particles */}
        {Array.from({ length: 10 }).map((_, i) => {
          const startX = 100 + i * 90;
          const startY = 300 + ((i * 47) % 150);
          return (
            <motion.circle
              key={`spark-${i}`}
              cx={startX}
              cy={startY}
              r={2}
              fill="#7eb8e0"
              animate={{
                y: [startY, startY - 30, startY],
                opacity: [0.2, 0.9, 0.2],
              }}
              transition={{ duration: 4 + (i % 4), repeat: Infinity, delay: i * 0.4 }}
            />
          );
        })}
      </svg>

      {/* Hidden interactable items - positioned absolute */}
      {offen.map(teil => (
        <motion.button
          key={teil.id}
          onClick={() => onTeilGefunden(teil.id)}
          className="absolute"
          style={{
            left: `${teil.versteckt.x}%`,
            top: `${teil.versteckt.y}%`,
            transform: 'translate(-50%, -50%)',
            touchAction: 'manipulation',
          }}
          initial={{ scale: 0.9, opacity: 0.95 }}
          animate={{
            scale: [0.95, 1.08, 0.95],
            opacity: [0.85, 1, 0.85],
            filter: [
              `drop-shadow(0 0 6px ${heldenfarbe})`,
              `drop-shadow(0 0 18px ${heldenfarbe})`,
              `drop-shadow(0 0 6px ${heldenfarbe})`,
            ],
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1.3 }}
          aria-label={`Aufnehmen: ${teil.label}`}
        >
          <span className="text-5xl select-none">{teil.emoji}</span>
        </motion.button>
      ))}

      {/* Hero on the beach - bottom left */}
      <div className="absolute bottom-2 left-4 z-20" style={{ pointerEvents: 'none' }}>
        <HeldAvatar config={avatarConfig} size={140} />
      </div>

      {/* Top bar - back + inventory + workbench */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-3 z-30">
        <MagicButton onClick={onZurueck} variant="secondary" size="lg">
          🏠
        </MagicButton>

        <div className="flex items-center gap-2 bg-card/80 backdrop-blur rounded-2xl px-4 py-2">
          <span className="text-sm font-display text-card-foreground">Rucksack:</span>
          {FLOSS_TEILE.map(t => (
            <span
              key={t.id}
              className="text-2xl transition-all duration-300"
              style={{ opacity: gefunden.includes(t.id) ? 1 : 0.2, filter: gefunden.includes(t.id) ? 'none' : 'grayscale(1)' }}
              aria-label={t.label}
            >
              {t.emoji}
            </span>
          ))}
        </div>

        {gefunden.length > 0 && (
          <button
            onClick={onZurFloss}
            className={`
              touch-target rounded-2xl px-5 py-3 font-display font-semibold
              bg-accent text-accent-foreground transition-all duration-300
              active:scale-95
              ${alleGefunden ? 'animate-soft-glow' : ''}
            `}
            style={{ touchAction: 'manipulation', minHeight: '60px' }}
          >
            🛠️ Werkbank
          </button>
        )}
      </div>

      {/* Hint text at top center */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="bg-card/70 backdrop-blur rounded-2xl px-5 py-2">
          <p className="text-body font-display text-card-foreground text-center">
            {alleGefunden
              ? 'Alle Teile gefunden! Ab zur Werkbank 🛠️'
              : `Finde die ${offen.length} leuchtenden Teile`}
          </p>
        </div>
      </div>
    </div>
  );
}
