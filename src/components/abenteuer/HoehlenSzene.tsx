import { motion } from 'framer-motion';
import {
  ALLE_SAMMEL_ITEMS,
  FLOSS_TEILE,
  PROVIANT_ITEMS,
  SCHLEUDER_TEILE,
  FISCH_ZIEL,
  KATEGORIE_INFO,
} from '@/types/abenteuer';
import type { SammelItem, ItemKategorie } from '@/types/abenteuer';
import type { AvatarConfig } from '@/types/profil';
import HeldAvatar from '@/components/avatar/HeldAvatar';
import MagicButton from '@/components/ui/MagicButton';

interface Props {
  avatarConfig: AvatarConfig;
  heldenfarbe: string;
  gefunden: string[];
  fischeGefangen: number;
  onItemAufnehmen: (item: SammelItem) => void;
  onAngeln: () => void;
  onZurueck: () => void;
  onZurFlossWerkbank: () => void;
  onZurSchleuderWerkbank: () => void;
}

export default function HoehlenSzene({
  avatarConfig,
  heldenfarbe,
  gefunden,
  fischeGefangen,
  onItemAufnehmen,
  onAngeln,
  onZurueck,
  onZurFlossWerkbank,
  onZurSchleuderWerkbank,
}: Props) {
  const offen = ALLE_SAMMEL_ITEMS.filter(i => !gefunden.includes(i.id));

  // Per-category progress
  const flossDone = FLOSS_TEILE.every(i => gefunden.includes(i.id));
  const proviantDone = PROVIANT_ITEMS.every(i => gefunden.includes(i.id));
  const schleuderDone = SCHLEUDER_TEILE.every(i => gefunden.includes(i.id));
  const fischDone = fischeGefangen >= FISCH_ZIEL;

  const categoryProgress = (kat: ItemKategorie): { found: number; total: number; done: boolean } => {
    if (kat === 'fisch') return { found: fischeGefangen, total: FISCH_ZIEL, done: fischDone };
    const items = ALLE_SAMMEL_ITEMS.filter(i => i.kategorie === kat);
    const found = items.filter(i => gefunden.includes(i.id)).length;
    return { found, total: items.length, done: found === items.length };
  };

  const allesGesammelt = flossDone && proviantDone && schleuderDone && fischDone;

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ touchAction: 'manipulation', background: '#040b14' }}>
      {/* Layered SVG cave background */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="caveAtmosphere" cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#1f4068" stopOpacity="1" />
            <stop offset="60%" stopColor="#0d1b2a" stopOpacity="1" />
            <stop offset="100%" stopColor="#050a14" stopOpacity="1" />
          </radialGradient>
          <linearGradient id="waterDeep" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0c5775" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#040d18" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="cliffStone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1c2a3a" />
            <stop offset="100%" stopColor="#0a121c" />
          </linearGradient>
          <linearGradient id="sand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5e4530" />
            <stop offset="100%" stopColor="#2a1d10" />
          </linearGradient>
          <linearGradient id="foliage" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1f5f3a" />
            <stop offset="100%" stopColor="#0a2418" />
          </linearGradient>
          <radialGradient id="cavemouth" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a3d8ff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#a3d8ff" stopOpacity="0" />
          </radialGradient>
          <filter id="caveGlow">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* Atmosphere */}
        <rect width="1000" height="600" fill="url(#caveAtmosphere)" />

        {/* Distant cave wall */}
        <path
          d="M0 0 L0 280 Q120 220 240 260 Q360 200 480 240 Q600 190 720 230 Q840 200 1000 260 L1000 0 Z"
          fill="#142339"
          opacity="0.9"
        />

        {/* Stars / distant glints */}
        {Array.from({ length: 30 }).map((_, i) => {
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
          fill="url(#cliffStone)"
        />

        {/* Stalactites with detail */}
        <g fill="url(#cliffStone)">
          <polygon points="120,80 130,150 140,80" />
          <polygon points="240,90 252,170 264,90" />
          <polygon points="380,100 388,140 396,100" />
          <polygon points="520,90 532,180 544,90" />
          <polygon points="700,100 710,160 720,100" />
          <polygon points="850,80 862,150 874,80" />
          <polygon points="60,120 68,150 76,120" />
          <polygon points="430,140 436,160 442,140" />
          <polygon points="600,150 608,180 614,150" />
          <polygon points="770,140 776,170 782,140" />
        </g>
        {/* Stalactite tip glints */}
        <circle cx="252" cy="170" r="2" fill="#a3d8ff" opacity="0.7" />
        <circle cx="532" cy="180" r="2" fill="#a3d8ff" opacity="0.7" />
        <circle cx="710" cy="160" r="2" fill="#a3d8ff" opacity="0.7" />

        {/* Crystals on walls - left cluster */}
        <g>
          <polygon points="50,250 60,230 72,250 66,270 56,270" fill="#7eb8e0" opacity="0.65" />
          <polygon points="70,260 78,245 88,260 84,275 74,275" fill="#a3d8ff" opacity="0.7" />
          <polygon points="40,290 48,275 58,290 54,305 44,305" fill="#5fa8d3" opacity="0.6" />
        </g>
        {/* Crystals on walls - right cluster */}
        <g>
          <polygon points="930,260 940,240 952,260 946,280 936,280" fill="#7eb8e0" opacity="0.65" />
          <polygon points="950,270 960,255 970,270 965,285 955,285" fill="#a3d8ff" opacity="0.7" />
        </g>

        {/* Bright distant cave mouth on the right - exit */}
        <ellipse cx="850" cy="290" rx="100" ry="60" fill="url(#cavemouth)" />
        <ellipse cx="850" cy="290" rx="50" ry="32" fill="#a3d8ff" opacity="0.45" />

        {/* Foreground rocks/cliff */}
        <path
          d="M0 600 L0 380 Q80 350 160 410 Q240 370 320 420 L320 600 Z"
          fill="#0a1320"
        />
        <path
          d="M680 600 L680 410 Q760 370 840 420 Q920 380 1000 410 L1000 600 Z"
          fill="#0a1320"
        />

        {/* Sandy beach floor (left side) */}
        <path d="M0 480 Q150 460 320 480 L320 600 L0 600 Z" fill="url(#sand)" />

        {/* Forest opening on the right side - tropical foliage */}
        <g>
          {/* Palm tree base on right */}
          <rect x="870" y="370" width="14" height="120" fill="#3a2415" />
          <path d="M877 370 Q880 365 880 360 Q884 358 890 362 Q885 350 870 355 Q860 350 858 360 Q872 358 877 370 Z" fill="url(#foliage)" />
          {/* Palm fronds */}
          <motion.path
            d="M870 360 Q830 320 820 300 Q830 340 870 360 Z"
            fill="url(#foliage)"
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{ transformOrigin: '870px 360px' }}
          />
          <motion.path
            d="M870 358 Q920 320 935 305 Q925 345 870 358 Z"
            fill="#1a4a2c"
            animate={{ rotate: [2, -2, 2] }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{ transformOrigin: '870px 358px' }}
          />
          <motion.path
            d="M880 355 Q900 290 915 270 Q900 320 880 358 Z"
            fill="url(#foliage)"
            animate={{ rotate: [-1, 1, -1] }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{ transformOrigin: '880px 355px' }}
          />

          {/* Bushes */}
          <ellipse cx="780" cy="445" rx="40" ry="22" fill="#1a4a2c" />
          <ellipse cx="800" cy="440" rx="30" ry="18" fill="url(#foliage)" />
          <ellipse cx="755" cy="448" rx="22" ry="14" fill="#143828" />

          {/* Flower spots */}
          <circle cx="770" cy="438" r="3" fill="#ec4899" opacity="0.8" />
          <circle cx="785" cy="430" r="3" fill="#facc15" opacity="0.8" />
          <circle cx="810" cy="437" r="3" fill="#fff" opacity="0.7" />
        </g>

        {/* Center water pool - where fishing happens */}
        <ellipse cx="500" cy="540" rx="220" ry="50" fill="url(#waterDeep)" />
        {/* Pool ripples */}
        {[0, 1, 2].map(i => (
          <motion.ellipse
            key={`ripple-${i}`}
            cx="500"
            cy="540"
            rx={50 + i * 50}
            ry={12 + i * 10}
            fill="none"
            stroke="#5fa8d3"
            strokeWidth="1.5"
            opacity={0.4 - i * 0.1}
            animate={{ scale: [0.8, 1.05, 0.8], opacity: [0.5 - i * 0.1, 0.2, 0.5 - i * 0.1] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 1 }}
          />
        ))}

        {/* Fish silhouettes swimming under the pool */}
        {[0, 1, 2].map(i => (
          <motion.path
            key={`fishshadow-${i}`}
            d="M0 0 Q12 -4 18 0 Q24 -2 26 0 Q24 2 18 0 Q12 4 0 0 Z"
            fill="#5fa8d3"
            opacity="0.6"
            animate={{ x: [400 + i * 60, 600 + i * 60, 400 + i * 60] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i }}
            style={{ y: 545 + i * 6 }}
          />
        ))}

        {/* Bioluminescent floating particles */}
        {Array.from({ length: 12 }).map((_, i) => {
          const startX = 100 + i * 80;
          const startY = 280 + ((i * 47) % 150);
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

        {/* Smoke from a small campfire at center-bottom */}
        <g>
          <rect x="485" y="465" width="30" height="6" fill="#3a2415" />
          <polygon points="490,465 500,440 510,465" fill="#facc15" opacity="0.6" />
          <motion.polygon
            points="495,455 500,425 505,455"
            fill="#ff6b35"
            animate={{ scaleY: [1, 1.2, 1], opacity: [0.7, 0.95, 0.7] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            style={{ transformOrigin: '500px 455px' }}
          />
          {/* Smoke wisps */}
          {[0, 1, 2].map(i => (
            <motion.circle
              key={`smoke-${i}`}
              cx={500 + i * 4}
              cy={420}
              r={6}
              fill="#666"
              opacity="0.4"
              animate={{ y: [-5, -80], opacity: [0.4, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.6 }}
            />
          ))}
        </g>

        {/* Rocky alcove on far right, where slingshot parts gather */}
        <g>
          <ellipse cx="650" cy="465" rx="20" ry="12" fill="#3a3a4a" />
          <ellipse cx="640" cy="468" rx="14" ry="9" fill="#2a2a38" />
          <ellipse cx="665" cy="470" rx="11" ry="7" fill="#3a3a4a" />
        </g>
      </svg>

      {/* Hidden interactable items - positioned absolute */}
      {offen.map(item => {
        const colorByKat: Record<ItemKategorie, string> = {
          floss: '#facc15',
          proviant: '#22c55e',
          schleuder: '#ef4444',
          fisch: '#3b82f6',
        };
        const glow = colorByKat[item.kategorie] || heldenfarbe;
        return (
          <motion.button
            key={item.id}
            onClick={() => onItemAufnehmen(item)}
            className="absolute"
            style={{
              left: `${item.versteckt.x}%`,
              top: `${item.versteckt.y}%`,
              transform: 'translate(-50%, -50%)',
              touchAction: 'manipulation',
            }}
            initial={{ scale: 0.9, opacity: 0.95 }}
            animate={{
              scale: [0.95, 1.1, 0.95],
              opacity: [0.85, 1, 0.85],
              filter: [
                `drop-shadow(0 0 6px ${glow})`,
                `drop-shadow(0 0 18px ${glow})`,
                `drop-shadow(0 0 6px ${glow})`,
              ],
            }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 1.3 }}
            aria-label={`Aufnehmen: ${item.label}`}
          >
            <span className="text-4xl select-none">{item.emoji}</span>
          </motion.button>
        );
      })}

      {/* Fishing trigger zone over the pool */}
      {!fischDone && (
        <motion.button
          onClick={onAngeln}
          className="absolute"
          style={{
            left: '50%',
            top: '88%',
            transform: 'translate(-50%, -50%)',
            touchAction: 'manipulation',
          }}
          animate={{
            scale: [1, 1.08, 1],
            filter: [
              'drop-shadow(0 0 8px #3b82f6)',
              'drop-shadow(0 0 24px #3b82f6)',
              'drop-shadow(0 0 8px #3b82f6)',
            ],
          }}
          transition={{ duration: 2.2, repeat: Infinity }}
          whileHover={{ scale: 1.18 }}
          whileTap={{ scale: 1.25 }}
        >
          <div className="flex flex-col items-center gap-1 px-4 py-2 bg-card/80 backdrop-blur rounded-2xl border-2" style={{ borderColor: '#3b82f6' }}>
            <span className="text-3xl">🎣</span>
            <span className="text-xs font-display text-card-foreground">Angeln</span>
          </div>
        </motion.button>
      )}

      {/* Hero on the beach - bottom left */}
      <div className="absolute bottom-2 left-4 z-20" style={{ pointerEvents: 'none' }}>
        <HeldAvatar config={avatarConfig} size={120} />
      </div>

      {/* Top bar - back + per-category progress */}
      <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 z-30 flex-wrap">
        <MagicButton onClick={onZurueck} variant="secondary" size="lg">
          🏠
        </MagicButton>

        <div className="flex flex-wrap gap-2 flex-1 justify-center max-w-3xl">
          {(['floss', 'proviant', 'schleuder', 'fisch'] as ItemKategorie[]).map(kat => {
            const p = categoryProgress(kat);
            const info = KATEGORIE_INFO[kat];
            return (
              <div
                key={kat}
                className="flex items-center gap-2 bg-card/80 backdrop-blur rounded-2xl px-3 py-2"
                style={{
                  border: p.done ? `2px solid ${heldenfarbe}` : '2px solid transparent',
                  boxShadow: p.done ? `0 0 12px ${heldenfarbe}80` : undefined,
                }}
              >
                <span className="text-2xl">{info.emoji}</span>
                <div className="flex flex-col">
                  <span className="text-xs font-display text-card-foreground leading-tight">
                    {info.label}
                  </span>
                  <span className="text-xs font-body text-muted-foreground leading-tight">
                    {p.found}/{p.total}{p.done && ' ✓'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action buttons bottom right - workbench buttons */}
      <div className="absolute bottom-4 right-3 flex flex-col gap-2 z-30">
        {gefunden.some(id => SCHLEUDER_TEILE.find(t => t.id === id)) && (
          <button
            onClick={onZurSchleuderWerkbank}
            className={`
              touch-target rounded-2xl px-4 py-2 font-display
              bg-card/90 text-card-foreground transition-all duration-300
              active:scale-95 border-2
              ${schleuderDone ? 'animate-soft-glow' : ''}
            `}
            style={{ touchAction: 'manipulation', minHeight: '50px', borderColor: '#ef4444' }}
          >
            🎯 Schleuder bauen
          </button>
        )}
        {gefunden.some(id => FLOSS_TEILE.find(t => t.id === id)) && (
          <button
            onClick={onZurFlossWerkbank}
            className={`
              touch-target rounded-2xl px-4 py-2 font-display font-semibold
              bg-accent text-accent-foreground transition-all duration-300
              active:scale-95
              ${allesGesammelt ? 'animate-soft-glow' : ''}
            `}
            style={{ touchAction: 'manipulation', minHeight: '50px' }}
          >
            🛠️ Floss-Werkbank
          </button>
        )}
      </div>

      {/* Hint text bottom center */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="bg-card/70 backdrop-blur rounded-2xl px-4 py-1.5">
          <p className="text-sm font-display text-card-foreground text-center">
            {allesGesammelt
              ? '✨ Alles bereit! Jetzt das Floss bauen.'
              : 'Tippe leuchtende Dinge zum Sammeln'}
          </p>
        </div>
      </div>
    </div>
  );
}
