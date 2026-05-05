import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '@/hooks/useSound';
import { FISCH_ITEM, FISCH_ZIEL } from '@/types/abenteuer';
import WortLernPuzzle from './WortLernPuzzle';
import MagicButton from '@/components/ui/MagicButton';

interface Props {
  fischeGefangen: number;
  heldenfarbe: string;
  onFischGefangen: () => void;
  onFertig: () => void;
}

interface Fisch {
  id: number;
  /** percent x position when spawned */
  startX: number;
  /** direction: 1 = right, -1 = left */
  dir: 1 | -1;
  duration: number;
  /** percent y in the pool */
  y: number;
  caught: boolean;
}

let nextFischId = 0;

export default function AngelMinigame({
  fischeGefangen,
  heldenfarbe,
  onFischGefangen,
  onFertig,
}: Props) {
  const { playTone, playChime } = useSound();
  const [fische, setFische] = useState<Fisch[]>([]);
  const [puzzleAktiv, setPuzzleAktiv] = useState(false);
  const fischDone = fischeGefangen >= FISCH_ZIEL;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Spawn fish periodically while in the catching phase
  useEffect(() => {
    if (puzzleAktiv || fischDone) return;
    const spawn = () => {
      const dir = Math.random() < 0.5 ? -1 : 1;
      const id = nextFischId++;
      setFische(f => [
        ...f,
        {
          id,
          startX: dir === 1 ? -10 : 110,
          dir,
          duration: 6 + Math.random() * 4,
          y: 30 + Math.random() * 40,
          caught: false,
        },
      ]);
      // Auto-remove after swim duration
      setTimeout(() => {
        setFische(f => f.filter(fi => fi.id !== id));
      }, 11000);
    };

    spawn();
    intervalRef.current = setInterval(spawn, 1800);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [puzzleAktiv, fischDone]);

  const handleTap = (id: number) => {
    if (puzzleAktiv) return;
    setFische(f => f.map(fi => fi.id === id ? { ...fi, caught: true } : fi));
    playTone(700, 0.2, 'sine', 0.18);
    setTimeout(() => {
      setPuzzleAktiv(true);
      // Stop the spawn loop
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, 600);
  };

  const handlePuzzleGeloest = () => {
    playChime();
    setPuzzleAktiv(false);
    setFische([]);
    onFischGefangen();
  };

  const handlePuzzleAbbrechen = () => {
    setPuzzleAktiv(false);
    setFische([]);
  };

  if (puzzleAktiv) {
    return (
      <div
        className="fixed inset-0 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #0c5775 0%, #040d18 100%)' }}
      >
        <WortLernPuzzle
          wort={FISCH_ITEM.wort}
          emoji={FISCH_ITEM.emoji}
          label={FISCH_ITEM.label}
          hinweis={FISCH_ITEM.hinweis}
          heldenfarbe={heldenfarbe}
          onGeloest={handlePuzzleGeloest}
          onAbbrechen={handlePuzzleAbbrechen}
        />
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 overflow-hidden flex flex-col"
      style={{ touchAction: 'manipulation', background: 'linear-gradient(180deg, #0a1929 0%, #1a3050 60%, #0c5775 100%)' }}
    >
      {/* Top bar */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-30">
        <MagicButton onClick={onFertig} variant="secondary" size="lg">
          ← Höhle
        </MagicButton>
        <div className="bg-card/80 backdrop-blur rounded-2xl px-4 py-2">
          <p className="text-body font-display text-card-foreground">
            🐟 {fischeGefangen}/{FISCH_ZIEL} Fische
          </p>
        </div>
        <div className="w-[100px]" />
      </div>

      {/* Sky / cave roof */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="poolGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5fa8d3" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0c3855" stopOpacity="1" />
          </linearGradient>
        </defs>
        {/* Cave roof */}
        <path d="M0 0 L0 100 Q150 60 300 90 Q500 50 700 90 Q850 60 1000 100 L1000 0 Z" fill="#0a1320" />
        {/* Pool surface */}
        <rect x="0" y="100" width="1000" height="500" fill="url(#poolGrad)" />
        {/* Surface highlight ripples */}
        {[0, 1, 2, 3].map(i => (
          <motion.path
            key={i}
            d={`M${i * 250} 110 Q${100 + i * 250} 105 ${200 + i * 250} 110`}
            stroke="#a3d8ff"
            strokeWidth="2"
            fill="none"
            opacity="0.5"
            animate={{ x: [0, 20, 0, -20, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity }}
          />
        ))}
        {/* Sand bottom */}
        <path d="M0 540 Q200 530 500 540 T1000 540 L1000 600 L0 600 Z" fill="#3a2d1f" />
        {/* Underwater bubbles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.circle
            key={`bubble-${i}`}
            cx={(i * 89) % 1000}
            cy={550}
            r={3 + (i % 3)}
            fill="#a3d8ff"
            opacity="0.6"
            animate={{ y: [-10, -400, -440], opacity: [0, 0.6, 0] }}
            transition={{ duration: 5 + (i % 4), repeat: Infinity, delay: i * 0.6 }}
          />
        ))}
        {/* Underwater plants */}
        <motion.path
          d="M120 600 Q125 540 130 480 Q135 530 140 600 Z"
          fill="#1a4a2c"
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 5, repeat: Infinity }}
          style={{ transformOrigin: '130px 600px' }}
        />
        <motion.path
          d="M860 600 Q866 530 870 470 Q876 530 880 600 Z"
          fill="#1a4a2c"
          animate={{ rotate: [2, -2, 2] }}
          transition={{ duration: 6, repeat: Infinity }}
          style={{ transformOrigin: '870px 600px' }}
        />
      </svg>

      {/* Catchable fish - swimming */}
      <AnimatePresence>
        {fische.map(f => (
          <motion.button
            key={f.id}
            onClick={() => handleTap(f.id)}
            className="absolute"
            style={{
              top: `${f.y}%`,
              touchAction: 'manipulation',
              filter: f.caught ? 'drop-shadow(0 0 20px gold)' : `drop-shadow(0 0 8px ${heldenfarbe}80)`,
            }}
            initial={{ left: `${f.startX}%`, scaleX: f.dir === 1 ? 1 : -1, opacity: 0 }}
            animate={
              f.caught
                ? { y: [-0, -200], scale: [1, 1.4, 0], opacity: [1, 1, 0] }
                : {
                    left: `${f.dir === 1 ? 110 : -10}%`,
                    opacity: 1,
                  }
            }
            transition={{
              duration: f.caught ? 0.6 : f.duration,
              ease: f.caught ? 'easeOut' : 'linear',
            }}
            whileTap={{ scale: 1.4 }}
          >
            <span className="text-5xl select-none">🐟</span>
          </motion.button>
        ))}
      </AnimatePresence>

      {/* Hero with fishing rod silhouette - top right */}
      <div className="absolute top-16 right-8 z-20 pointer-events-none">
        <svg width="120" height="180" viewBox="0 0 120 180">
          {/* Fishing rod */}
          <line x1="20" y1="60" x2="100" y2="20" stroke="#7c5e3c" strokeWidth="3" strokeLinecap="round" />
          <line x1="100" y1="20" x2="60" y2="120" stroke="white" strokeWidth="0.8" strokeDasharray="2,2" opacity="0.7" />
          <circle cx="60" cy="120" r="2" fill="#facc15" />
        </svg>
      </div>

      {/* Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <div className="bg-card/80 backdrop-blur rounded-2xl px-5 py-2">
          <p className="text-body font-display text-card-foreground text-center">
            {fischDone
              ? '✨ Genug Fische gefangen! Zurück zur Höhle.'
              : 'Tippe einen Fisch wenn er vorbeischwimmt!'}
          </p>
        </div>
      </div>

      {fischDone && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30">
          <MagicButton onClick={onFertig} variant="gold" size="lg">
            Zurück zur Höhle
          </MagicButton>
        </div>
      )}
    </div>
  );
}
