import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeldAvatar from '@/components/avatar/HeldAvatar';
import MagicButton from '@/components/ui/MagicButton';
import WortLernPuzzle from './WortLernPuzzle';
import { PIRATEN } from '@/types/abenteuer';
import type { Pirat } from '@/types/abenteuer';
import type { AvatarConfig } from '@/types/profil';
import { useSound } from '@/hooks/useSound';

interface Props {
  avatarConfig: AvatarConfig;
  heldenfarbe: string;
  onSieg: () => void;
  onZurueck: () => void;
}

export default function PiratenLevel({ avatarConfig, heldenfarbe, onSieg, onZurueck }: Props) {
  const { playChime, playTone } = useSound();
  const [aktuellerPirat, setAktuellerPirat] = useState<Pirat | null>(null);
  const [besiegt, setBesiegt] = useState<string[]>([]);
  const [shotAnim, setShotAnim] = useState<{ id: string; from: { x: number; y: number }; to: { x: number; y: number } } | null>(null);

  const offen = PIRATEN.filter(p => !besiegt.includes(p.id));
  const alleBesiegt = offen.length === 0;

  const handlePiratClick = (p: Pirat) => {
    if (besiegt.includes(p.id)) return;
    setAktuellerPirat(p);
  };

  const handlePuzzleGeloest = () => {
    if (!aktuellerPirat) return;
    const id = aktuellerPirat.id;
    const target = aktuellerPirat.position;
    setShotAnim({ id, from: { x: 50, y: 70 }, to: { x: target.x, y: target.y } });
    playTone(550, 0.18, 'square', 0.22);
    setAktuellerPirat(null);
    setTimeout(() => {
      setBesiegt(b => [...b, id]);
      setShotAnim(null);
      playChime();
    }, 700);
  };

  const handlePuzzleAbbrechen = () => {
    setAktuellerPirat(null);
  };

  if (aktuellerPirat) {
    return (
      <div
        className="fixed inset-0 overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at center, #1a1424 0%, #050a14 100%)' }}
      >
        <WortLernPuzzle
          wort={aktuellerPirat.wort}
          emoji={aktuellerPirat.emoji}
          label={`Wirf den Stein nach: ${aktuellerPirat.wort}`}
          hinweis={aktuellerPirat.hinweis}
          heldenfarbe={heldenfarbe}
          onGeloest={handlePuzzleGeloest}
          onAbbrechen={handlePuzzleAbbrechen}
        />
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #2a1840 0%, #4a2868 40%, #1a3050 100%)' }}
    >
      {/* Top bar */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-30">
        <MagicButton onClick={onZurueck} variant="secondary" size="lg">
          ←
        </MagicButton>
        <div className="bg-card/70 backdrop-blur rounded-2xl px-4 py-2">
          <p className="text-body font-display text-card-foreground">
            🏴‍☠️ {besiegt.length}/{PIRATEN.length} Piraten verjagt
          </p>
        </div>
        <div className="w-[60px]" />
      </div>

      {/* Sky / clouds */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="duskSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a1a48" />
            <stop offset="50%" stopColor="#7a3060" />
            <stop offset="100%" stopColor="#ff8a4f" />
          </linearGradient>
          <linearGradient id="duskSea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7a3060" />
            <stop offset="100%" stopColor="#1a3050" />
          </linearGradient>
        </defs>
        <rect width="1000" height="380" fill="url(#duskSky)" />
        <rect y="380" width="1000" height="220" fill="url(#duskSea)" />

        {/* Sun */}
        <circle cx="850" cy="320" r="60" fill="#ffcc70" opacity="0.85" />
        <circle cx="850" cy="320" r="80" fill="#ffcc70" opacity="0.2" />

        {/* Clouds */}
        {[
          { x: 100, y: 80, w: 200, h: 30 },
          { x: 350, y: 130, w: 250, h: 40 },
          { x: 700, y: 70, w: 230, h: 30 },
        ].map((c, i) => (
          <motion.ellipse
            key={i}
            cx={c.x + c.w / 2}
            cy={c.y}
            rx={c.w / 2}
            ry={c.h / 2}
            fill="#7a3060"
            opacity="0.6"
            animate={{ x: [0, 30, 0] }}
            transition={{ duration: 12 + i * 2, repeat: Infinity }}
          />
        ))}

        {/* Sea horizon shimmer */}
        <line x1="0" y1="380" x2="1000" y2="380" stroke="#ffcc70" strokeWidth="2" opacity="0.5" />
        <line x1="200" y1="383" x2="800" y2="383" stroke="white" strokeWidth="1" opacity="0.4" />

        {/* Animated waves */}
        {[0, 1, 2, 3].map(i => (
          <motion.path
            key={i}
            d={`M0 ${410 + i * 30} Q250 ${405 + i * 30} 500 ${410 + i * 30} T1000 ${410 + i * 30} L1000 600 L0 600 Z`}
            fill="#1a3050"
            opacity={0.35 + i * 0.15}
            animate={{ x: [0, 20, 0, -20, 0] }}
            transition={{ duration: 5 + i, repeat: Infinity }}
          />
        ))}

        {/* Pirate ship - large in background */}
        <motion.g
          animate={{ y: [0, -8, 0], rotate: [-1.5, 1.5, -1.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '500px 400px' }}
        >
          {/* Hull */}
          <path d="M180 380 L820 380 L780 460 L220 460 Z" fill="#3a1a0a" stroke="#1a0e05" strokeWidth="2" />
          <line x1="200" y1="420" x2="800" y2="420" stroke="#1a0e05" strokeWidth="1" opacity="0.6" />
          {/* Cabins */}
          <rect x="280" y="320" width="120" height="60" fill="#5a2a18" />
          <rect x="600" y="320" width="120" height="60" fill="#5a2a18" />
          <rect x="295" y="340" width="20" height="20" fill="#facc15" opacity="0.7" />
          <rect x="365" y="340" width="20" height="20" fill="#facc15" opacity="0.7" />
          <rect x="615" y="340" width="20" height="20" fill="#facc15" opacity="0.7" />
          <rect x="685" y="340" width="20" height="20" fill="#facc15" opacity="0.7" />
          {/* Mast */}
          <line x1="500" y1="380" x2="500" y2="180" stroke="#3a2a18" strokeWidth="5" />
          <line x1="350" y1="320" x2="350" y2="200" stroke="#3a2a18" strokeWidth="3" />
          <line x1="650" y1="320" x2="650" y2="200" stroke="#3a2a18" strokeWidth="3" />
          {/* Sails - tattered black */}
          <path d="M500 200 L580 320 L500 320 Z" fill="#2a2030" stroke="#1a1020" strokeWidth="1" />
          <path d="M500 200 L420 320 L500 320 Z" fill="#2a2030" stroke="#1a1020" strokeWidth="1" />
          <path d="M350 220 L390 320 L310 320 Z" fill="#2a2030" />
          <path d="M650 220 L690 320 L610 320 Z" fill="#2a2030" />
          {/* Skull on main sail */}
          <text x="500" y="270" textAnchor="middle" fontSize="40">💀</text>
          {/* Pirate flag */}
          <motion.path
            d="M500 180 L540 175 L540 195 L500 200 Z"
            fill="#1a0e05"
            animate={{ d: [
              'M500 180 L540 175 L540 195 L500 200 Z',
              'M500 180 L538 178 L540 195 L500 200 Z',
              'M500 180 L540 175 L540 195 L500 200 Z',
            ]}}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        </motion.g>

        {/* Hero's raft - bottom center, smaller */}
        <motion.g
          animate={{ y: [0, -4, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ transformOrigin: '500px 540px' }}
        >
          <rect x="430" y="525" width="140" height="14" rx="3" fill="#8B5A2B" />
          <ellipse cx="555" cy="530" rx="14" ry="9" fill="#a06a3a" />
          {/* Sail */}
          <line x1="500" y1="525" x2="500" y2="475" stroke="#7c5e3c" strokeWidth="2" />
          <path d="M500 480 L540 510 L500 510 Z" fill="#f5e6c8" />
        </motion.g>
      </svg>

      {/* Hero with slingshot - bottom left */}
      <div className="absolute z-20" style={{ bottom: '8%', left: '4%', pointerEvents: 'none' }}>
        <div className="relative">
          <HeldAvatar config={avatarConfig} size={130} />
          {/* Slingshot in hand */}
          <svg
            width="60"
            height="80"
            viewBox="0 0 60 80"
            className="absolute"
            style={{ top: 50, right: -10 }}
          >
            <line x1="30" y1="80" x2="30" y2="40" stroke="#7c5e3c" strokeWidth="4" />
            <line x1="30" y1="40" x2="14" y2="14" stroke="#7c5e3c" strokeWidth="3" />
            <line x1="30" y1="40" x2="46" y2="14" stroke="#7c5e3c" strokeWidth="3" />
            <path d="M14 14 Q30 30 46 14" stroke="#ef4444" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </div>

      {/* Pirates as click targets on the ship */}
      {PIRATEN.map(p => (
        <AnimatePresence key={p.id}>
          {!besiegt.includes(p.id) && (
            <motion.button
              onClick={() => handlePiratClick(p)}
              className="absolute"
              style={{
                left: `${p.position.x}%`,
                top: `${p.position.y}%`,
                transform: 'translate(-50%, -50%)',
                touchAction: 'manipulation',
              }}
              initial={{ scale: 0 }}
              animate={{
                scale: [0.95, 1.1, 0.95],
                filter: [
                  'drop-shadow(0 0 6px #ef4444)',
                  'drop-shadow(0 0 18px #ef4444)',
                  'drop-shadow(0 0 6px #ef4444)',
                ],
              }}
              exit={{ scale: 0, opacity: 0, rotate: 180 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 1.35 }}
            >
              <div className="flex flex-col items-center">
                <span className="text-5xl">{p.emoji}</span>
                <span
                  className="text-xs font-display px-2 py-0.5 rounded-full bg-card/80 mt-1"
                  style={{ color: '#ef4444' }}
                >
                  {p.wort}
                </span>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      ))}

      {/* Stone projectile animation */}
      <AnimatePresence>
        {shotAnim && (
          <motion.div
            className="absolute z-40"
            initial={{
              left: `${shotAnim.from.x}%`,
              top: `${shotAnim.from.y}%`,
              opacity: 1,
              scale: 1,
            }}
            animate={{
              left: `${shotAnim.to.x}%`,
              top: `${shotAnim.to.y}%`,
              scale: 1.4,
              rotate: 720,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <span className="text-3xl select-none">🪨</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <div className="bg-card/80 backdrop-blur rounded-2xl px-4 py-2 max-w-md mx-4">
          <p className="text-body font-display text-card-foreground text-center">
            {alleBesiegt
              ? '🎉 Alle Piraten verjagt!'
              : 'Tippe einen Piraten und buchstabiere das Wort, um den Stein zu werfen!'}
          </p>
        </div>
      </div>

      {alleBesiegt && (
        <motion.div
          className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <MagicButton onClick={onSieg} variant="gold" size="xl">
            Weitersegeln 🌊
          </MagicButton>
        </motion.div>
      )}
    </div>
  );
}
