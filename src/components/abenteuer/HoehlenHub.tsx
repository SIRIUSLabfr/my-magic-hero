import { motion } from 'framer-motion';
import {
  FLOSS_TEILE,
  PROVIANT_ITEMS,
  SCHLEUDER_TEILE,
  FISCH_ZIEL,
  KATEGORIE_INFO,
} from '@/types/abenteuer';
import type { ItemKategorie } from '@/types/abenteuer';
import type { AvatarConfig } from '@/types/profil';
import HeldAvatar from '@/components/avatar/HeldAvatar';
import MagicButton from '@/components/ui/MagicButton';

interface Props {
  avatarConfig: AvatarConfig;
  heldenfarbe: string;
  gefunden: string[];
  fischeGefangen: number;
  schleuderGetestet: boolean;
  onZurueck: () => void;
  onTaskWaehlen: (kat: ItemKategorie) => void;
  onZurFlossWerkbank: () => void;
  onZurSchleuderWerkbank: () => void;
}

interface ZoneCard {
  kat: ItemKategorie;
  beschreibung: string;
  hintergrund: string;
  emojiZeichen: string[];
}

const ZONES: ZoneCard[] = [
  {
    kat: 'floss',
    beschreibung: 'Holz und Reste am Strand',
    hintergrund: 'linear-gradient(135deg, #8b6a3a 0%, #5a4220 100%)',
    emojiZeichen: ['🪵', '🟫', '⛵'],
  },
  {
    kat: 'proviant',
    beschreibung: 'Früchte und Pilze sammeln',
    hintergrund: 'linear-gradient(135deg, #1f5f3a 0%, #0a2418 100%)',
    emojiZeichen: ['🍌', '🥥', '🍄'],
  },
  {
    kat: 'schleuder',
    beschreibung: 'Steine und Äste in den Felsen',
    hintergrund: 'linear-gradient(135deg, #5a3030 0%, #2a1818 100%)',
    emojiZeichen: ['🌿', '🪨', '➰'],
  },
  {
    kat: 'fisch',
    beschreibung: 'Im Pool angeln gehen',
    hintergrund: 'linear-gradient(135deg, #1a3a5a 0%, #0c3855 100%)',
    emojiZeichen: ['🎣', '🐟', '🐙'],
  },
];

export default function HoehlenHub({
  avatarConfig,
  heldenfarbe,
  gefunden,
  fischeGefangen,
  schleuderGetestet,
  onZurueck,
  onTaskWaehlen,
  onZurFlossWerkbank,
  onZurSchleuderWerkbank,
}: Props) {
  const flossCollected = FLOSS_TEILE.every(i => gefunden.includes(i.id));
  const proviantDone = PROVIANT_ITEMS.every(i => gefunden.includes(i.id));
  const schleuderCollected = SCHLEUDER_TEILE.every(i => gefunden.includes(i.id));
  const schleuderDone = schleuderCollected && schleuderGetestet;
  const fischDone = fischeGefangen >= FISCH_ZIEL;

  const progress = (kat: ItemKategorie): { found: number; total: number; done: boolean } => {
    if (kat === 'fisch') return { found: fischeGefangen, total: FISCH_ZIEL, done: fischDone };
    if (kat === 'schleuder') {
      const found = SCHLEUDER_TEILE.filter(i => gefunden.includes(i.id)).length;
      return { found, total: SCHLEUDER_TEILE.length, done: schleuderDone };
    }
    const items = kat === 'floss' ? FLOSS_TEILE : PROVIANT_ITEMS;
    const found = items.filter(i => gefunden.includes(i.id)).length;
    return { found, total: items.length, done: found === items.length };
  };

  const allesGesammelt = flossCollected && proviantDone && schleuderDone && fischDone;
  const flossKannGebautWerden = gefunden.some(id => FLOSS_TEILE.find(t => t.id === id));
  // Schleuder workbench button only shows while we still need to build/test
  const schleuderKannGebautWerden = gefunden.some(id => SCHLEUDER_TEILE.find(t => t.id === id))
    && !schleuderGetestet;

  return (
    <div className="fixed inset-0 overflow-y-auto" style={{ background: '#040b14' }}>
      {/* Cave panorama backdrop */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="hubAtmosphere" cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#1f4068" />
            <stop offset="60%" stopColor="#0d1b2a" />
            <stop offset="100%" stopColor="#050a14" />
          </radialGradient>
          <linearGradient id="hubCliff" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1c2a3a" />
            <stop offset="100%" stopColor="#0a121c" />
          </linearGradient>
        </defs>
        <rect width="1000" height="600" fill="url(#hubAtmosphere)" />
        <path d="M0 0 L0 280 Q120 220 240 260 Q360 200 480 240 Q600 190 720 230 Q840 200 1000 260 L1000 0 Z" fill="#142339" opacity="0.85" />
        <path d="M0 80 Q60 60 130 100 Q200 70 280 110 Q360 80 440 130 Q540 90 620 130 Q720 95 820 130 Q900 100 1000 130 L1000 0 L0 0 Z" fill="url(#hubCliff)" />
        {/* Stalactites */}
        <g fill="url(#hubCliff)">
          <polygon points="120,80 130,150 140,80" />
          <polygon points="240,90 252,170 264,90" />
          <polygon points="380,100 388,140 396,100" />
          <polygon points="520,90 532,180 544,90" />
          <polygon points="700,100 710,160 720,100" />
          <polygon points="850,80 862,150 874,80" />
        </g>
        {/* Distant cave mouth */}
        <ellipse cx="850" cy="250" rx="80" ry="45" fill="#a3d8ff" opacity="0.25" />
        {/* Bioluminescent particles */}
        {Array.from({ length: 14 }).map((_, i) => {
          const startX = 60 + i * 70;
          const startY = 250 + ((i * 47) % 200);
          return (
            <motion.circle
              key={`spark-${i}`}
              cx={startX}
              cy={startY}
              r={2}
              fill="#7eb8e0"
              animate={{ y: [startY, startY - 30, startY], opacity: [0.2, 0.9, 0.2] }}
              transition={{ duration: 4 + (i % 4), repeat: Infinity, delay: i * 0.4 }}
            />
          );
        })}
      </svg>

      <div className="relative z-10 flex flex-col min-h-screen px-4 py-4">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <MagicButton onClick={onZurueck} variant="secondary" size="lg">
            🏠
          </MagicButton>
          <h1 className="text-title font-display text-foreground" style={{ textShadow: '0 0 12px black' }}>
            Was machst du als Nächstes?
          </h1>
          <div className="w-[60px]" />
        </div>

        {/* Hero centered, smaller, decorative */}
        <div className="flex flex-col items-center my-2">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <HeldAvatar config={avatarConfig} size={110} showBody={false} />
          </motion.div>
        </div>

        {/* Task cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl w-full mx-auto">
          {ZONES.map(zone => {
            const p = progress(zone.kat);
            const info = KATEGORIE_INFO[zone.kat];
            return (
              <motion.button
                key={zone.kat}
                onClick={() => onTaskWaehlen(zone.kat)}
                className="relative rounded-3xl p-4 text-left overflow-hidden transition-all duration-300 active:scale-95"
                style={{
                  background: zone.hintergrund,
                  border: p.done ? `3px solid ${heldenfarbe}` : '3px solid rgba(255,255,255,0.1)',
                  boxShadow: p.done ? `0 0 20px ${heldenfarbe}80` : '0 4px 12px rgba(0,0,0,0.3)',
                  touchAction: 'manipulation',
                  minHeight: 120,
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Floating emojis */}
                <div className="absolute right-3 top-2 flex gap-1 opacity-60">
                  {zone.emojiZeichen.map((e, i) => (
                    <motion.span
                      key={i}
                      className="text-2xl"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                    >
                      {e}
                    </motion.span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-5xl">{info.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-body-lg font-display font-semibold text-white">
                      {info.label}
                    </p>
                    <p className="text-sm font-body text-white/70">
                      {zone.beschreibung}
                    </p>
                  </div>
                </div>

                {/* Progress bar at bottom */}
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 h-2 rounded-full bg-black/30 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: heldenfarbe }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(p.found / p.total) * 100}%` }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                  <span className="text-xs font-display text-white whitespace-nowrap">
                    {p.found}/{p.total} {p.done && '✓'}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Workbench actions */}
        <div className="flex flex-wrap gap-3 justify-center mt-4 max-w-3xl w-full mx-auto">
          {schleuderKannGebautWerden && (
            <button
              onClick={onZurSchleuderWerkbank}
              className={`
                touch-target rounded-2xl px-5 py-3 font-display font-semibold
                bg-card text-card-foreground transition-all duration-300
                active:scale-95 border-2 flex items-center gap-2
                ${schleuderDone ? 'animate-soft-glow' : ''}
              `}
              style={{ borderColor: '#ef4444', touchAction: 'manipulation', minHeight: 60 }}
            >
              🎯 Schleuder-Werkbank
            </button>
          )}
          {flossKannGebautWerden && (
            <button
              onClick={onZurFlossWerkbank}
              className={`
                touch-target rounded-2xl px-5 py-3 font-display font-semibold
                bg-accent text-accent-foreground transition-all duration-300
                active:scale-95 flex items-center gap-2
                ${allesGesammelt ? 'animate-soft-glow' : ''}
              `}
              style={{ touchAction: 'manipulation', minHeight: 60 }}
            >
              🛠️ Floss-Werkbank
            </button>
          )}
        </div>

        {/* Footer hint */}
        <div className="mt-auto pt-4">
          <div className="bg-card/70 backdrop-blur rounded-2xl px-4 py-2 max-w-md mx-auto">
            <p className="text-sm font-display text-card-foreground text-center">
              {allesGesammelt
                ? '✨ Alles bereit! Jetzt das Floss bauen.'
                : 'Wähle eine Aufgabe — sammle alles, um abzulegen.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
