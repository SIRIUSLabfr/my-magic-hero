import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '@/hooks/useSound';
import { ANGEL_ITEMS, FISCH_ZIEL } from '@/types/abenteuer';
import type { AngelItem } from '@/types/abenteuer';
import WortLernPuzzle from './WortLernPuzzle';
import MagicButton from '@/components/ui/MagicButton';

interface Props {
  fischeGefangen: number;
  heldenfarbe: string;
  onFischGefangen: () => void;
  onFertig: () => void;
}

type AngelStatus =
  | 'idle'        // ready to cast
  | 'casting'     // bobber flying out
  | 'waiting'     // bobber floating, waiting for bite
  | 'biting'      // something is biting, player must tap to start the pull
  | 'kraftmesser' // skill game: time the pull-up
  | 'verpasst'    // missed the timing
  | 'reeling'     // reeling in successfully
  | 'puzzle'      // word puzzle (sea creatures)
  | 'muell';      // showing trash message

interface BobberPos {
  x: number; // percent
  y: number; // percent
}

// Pick a random item, with weighted distribution: more fish, less other
function pickRandomCatch(): AngelItem {
  const weights = [
    { typ: 'fisch', w: 35 },
    { typ: 'krabbe', w: 18 },
    { typ: 'oktopus', w: 14 },
    { typ: 'seestern', w: 14 },
    { typ: 'muell', w: 19 },
  ];
  const total = weights.reduce((a, b) => a + b.w, 0);
  let r = Math.random() * total;
  for (const w of weights) {
    r -= w.w;
    if (r < 0) return ANGEL_ITEMS.find(i => i.typ === w.typ)!;
  }
  return ANGEL_ITEMS[0];
}

export default function AngelMinigame({
  fischeGefangen,
  heldenfarbe,
  onFischGefangen,
  onFertig,
}: Props) {
  const { playTone, playChime } = useSound();
  const [status, setStatus] = useState<AngelStatus>('idle');
  const [bobber, setBobber] = useState<BobberPos>({ x: 50, y: 60 });
  const [aktuell, setAktuell] = useState<AngelItem | null>(null);
  const biteTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reactionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [muellAnzahl, setMuellAnzahl] = useState(0);

  const fischDone = fischeGefangen >= FISCH_ZIEL;

  const clearTimers = () => {
    if (biteTimerRef.current) { clearTimeout(biteTimerRef.current); biteTimerRef.current = null; }
    if (reactionTimerRef.current) { clearTimeout(reactionTimerRef.current); reactionTimerRef.current = null; }
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  const handleAuswerfen = useCallback(() => {
    if (status !== 'idle' && status !== 'verpasst') return;
    // Random target spot in the pool
    const x = 35 + Math.random() * 45; // 35-80%
    const y = 55 + Math.random() * 18; // 55-73%
    setBobber({ x, y });
    setStatus('casting');
    playTone(380, 0.25, 'sine', 0.18);
    // After cast animation completes
    setTimeout(() => {
      setStatus('waiting');
      // Random delay until bite
      const delay = 1500 + Math.random() * 2500;
      biteTimerRef.current = setTimeout(() => {
        const item = pickRandomCatch();
        setAktuell(item);
        setStatus('biting');
        playTone(700, 0.18, 'square', 0.15);
        playTone(900, 0.18, 'square', 0.15);
        // Player must react in time
        reactionTimerRef.current = setTimeout(() => {
          // Too late
          setStatus('verpasst');
          setAktuell(null);
          playTone(180, 0.3, 'sine', 0.1);
        }, item.reaktionszeit);
      }, delay);
    }, 700);
  }, [status, playTone]);

  const handleTapBite = useCallback(() => {
    if (status !== 'biting' || !aktuell) return;
    clearTimers();
    // Transition to skill game instead of going straight to reeling
    setStatus('kraftmesser');
    playTone(500, 0.18, 'sine', 0.15);
  }, [status, aktuell, playTone]);

  const handleKraftmesserHit = useCallback(() => {
    if (!aktuell) return;
    setStatus('reeling');
    playTone(700, 0.2, 'sine', 0.2);
    playTone(900, 0.2, 'sine', 0.2);
    setTimeout(() => {
      if (aktuell.zaehlt) {
        setStatus('puzzle');
      } else {
        setMuellAnzahl(m => m + 1);
        setStatus('muell');
      }
    }, 900);
  }, [aktuell, playTone]);

  const handleKraftmesserMiss = useCallback(() => {
    setStatus('verpasst');
    setAktuell(null);
    playTone(180, 0.3, 'sine', 0.1);
  }, [playTone]);

  const handlePuzzleGeloest = useCallback(() => {
    playChime();
    onFischGefangen();
    setAktuell(null);
    setStatus('idle');
  }, [onFischGefangen, playChime]);

  const handlePuzzleAbbrechen = useCallback(() => {
    setAktuell(null);
    setStatus('idle');
  }, []);

  const handleMuellWeg = useCallback(() => {
    setAktuell(null);
    setStatus('idle');
  }, []);

  // Tension-meter skill game
  if (status === 'kraftmesser' && aktuell) {
    return (
      <Kraftmesser
        item={aktuell}
        heldenfarbe={heldenfarbe}
        onHit={handleKraftmesserHit}
        onMiss={handleKraftmesserMiss}
      />
    );
  }

  // Render word puzzle as full screen
  if (status === 'puzzle' && aktuell) {
    return (
      <div
        className="fixed inset-0 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #0c5775 0%, #040d18 100%)' }}
      >
        <WortLernPuzzle
          wort={aktuell.wort}
          emoji={aktuell.emoji}
          label={aktuell.label}
          hinweis={aktuell.hinweis}
          heldenfarbe={heldenfarbe}
          onGeloest={handlePuzzleGeloest}
          onAbbrechen={handlePuzzleAbbrechen}
        />
      </div>
    );
  }

  // Müll modal
  if (status === 'muell' && aktuell) {
    return (
      <div
        className="fixed inset-0 overflow-hidden flex flex-col items-center justify-center px-6"
        style={{ background: 'rgba(0,0,0,0.7)' }}
      >
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-card rounded-3xl px-8 py-6 max-w-sm flex flex-col items-center gap-3"
          style={{ border: '3px solid #6b6b6b' }}
        >
          <motion.span
            className="text-7xl"
            animate={{ rotate: [-12, 12, -12] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {aktuell.emoji}
          </motion.span>
          <h2 className="text-title font-display text-card-foreground">Iiih, Müll!</h2>
          <p className="text-body font-body text-muted-foreground text-center">
            Das gehört nicht ins Meer. Wirf es lieber weg!
          </p>
          <p className="text-sm font-body text-muted-foreground italic text-center">
            (Müll zählt nicht zu den gefangenen Tieren)
          </p>
          <MagicButton onClick={handleMuellWeg} variant="primary" size="lg">
            Wegwerfen 🗑️
          </MagicButton>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{
        touchAction: 'manipulation',
        background: 'linear-gradient(180deg, #0a1929 0%, #1a3050 35%, #0c5775 100%)',
      }}
      onClick={status === 'biting' ? handleTapBite : undefined}
    >
      {/* Top bar */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-30 gap-2">
        <MagicButton onClick={onFertig} variant="secondary" size="lg">
          ← Höhle
        </MagicButton>
        <div className="bg-card/80 backdrop-blur rounded-2xl px-4 py-2 flex items-center gap-2">
          <span className="text-2xl">🎣</span>
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-display text-card-foreground">Fang</span>
            <span className="text-xs font-body text-muted-foreground">
              {fischeGefangen}/{FISCH_ZIEL}{fischDone && ' ✓'}
            </span>
          </div>
        </div>
        {muellAnzahl > 0 && (
          <div className="bg-card/60 backdrop-blur rounded-2xl px-3 py-2 flex items-center gap-1">
            <span className="text-lg">🗑️</span>
            <span className="text-xs font-body text-muted-foreground">{muellAnzahl}</span>
          </div>
        )}
        {muellAnzahl === 0 && <div className="w-[60px]" />}
      </div>

      {/* Background */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="poolGradAngel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5fa8d3" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0c3855" stopOpacity="1" />
          </linearGradient>
        </defs>
        {/* Cave roof */}
        <path d="M0 0 L0 100 Q150 60 300 90 Q500 50 700 90 Q850 60 1000 100 L1000 0 Z" fill="#0a1320" />

        {/* Stalactites */}
        <g fill="#0a1320">
          <polygon points="160,90 168,140 176,90" />
          <polygon points="380,90 390,150 400,90" />
          <polygon points="620,90 630,140 640,90" />
          <polygon points="820,90 830,140 840,90" />
        </g>

        {/* Pool water */}
        <rect x="0" y="280" width="1000" height="320" fill="url(#poolGradAngel)" />

        {/* Wave ripples on the surface */}
        {[0, 1, 2, 3].map(i => (
          <motion.path
            key={i}
            d={`M${i * 250} 290 Q${100 + i * 250} 285 ${200 + i * 250} 290`}
            stroke="#a3d8ff"
            strokeWidth="2"
            fill="none"
            opacity="0.5"
            animate={{ x: [0, 18, 0, -18, 0] }}
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
            opacity="0.5"
            animate={{ y: [-10, -250, -270], opacity: [0, 0.6, 0] }}
            transition={{ duration: 5 + (i % 4), repeat: Infinity, delay: i * 0.6 }}
          />
        ))}

        {/* Underwater plants */}
        <motion.path
          d="M120 600 Q125 540 130 480 Q135 530 140 600 Z"
          fill="#1a4a2c"
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ duration: 5, repeat: Infinity }}
          style={{ transformOrigin: '130px 600px' }}
        />
        <motion.path
          d="M860 600 Q866 530 870 470 Q876 530 880 600 Z"
          fill="#1a4a2c"
          animate={{ rotate: [3, -3, 3] }}
          transition={{ duration: 6, repeat: Infinity }}
          style={{ transformOrigin: '870px 600px' }}
        />

        {/* Distant fish silhouettes - swim direction matched to flip */}
        {[
          { y: 480, dir: 1, dur: 14, delay: 0 },
          { y: 510, dir: -1, dur: 16, delay: 2 },
          { y: 460, dir: 1, dur: 18, delay: 6 },
        ].map((f, i) => (
          <motion.g
            key={`bg-fish-${i}`}
            initial={{ x: f.dir === 1 ? -100 : 1100 }}
            animate={{ x: f.dir === 1 ? 1100 : -100 }}
            transition={{ duration: f.dur, repeat: Infinity, delay: f.delay, ease: 'linear' }}
          >
            <g transform={`scale(${f.dir}, 1)`} style={{ transformOrigin: '0 0' }}>
              <ellipse cx="0" cy={f.y} rx="14" ry="6" fill="#5fa8d3" opacity="0.5" />
              <polygon points={`${-14},${f.y} ${-22},${f.y - 5} ${-22},${f.y + 5}`} fill="#5fa8d3" opacity="0.5" />
            </g>
          </motion.g>
        ))}
      </svg>

      {/* Heroine on the rocky shore - top-left, above water */}
      <div className="absolute top-12 left-3 z-10 pointer-events-none">
        <svg width="160" height="180" viewBox="0 0 160 180">
          {/* Rock platform */}
          <ellipse cx="60" cy="170" rx="55" ry="14" fill="#2a2030" />
          {/* Stylized hero with rod - simple silhouette so background hero doesn't block */}
          <circle cx="60" cy="80" r="22" fill={heldenfarbe} opacity="0.8" />
          <rect x="48" y="100" width="24" height="55" rx="6" fill={heldenfarbe} opacity="0.85" />
          {/* Rod */}
          <line x1="80" y1="100" x2="155" y2="55" stroke="#7c5e3c" strokeWidth="3" strokeLinecap="round" />
          <circle cx="155" cy="55" r="2" fill="#facc15" />
        </svg>
      </div>

      {/* Fishing line + bobber */}
      {(status === 'casting' || status === 'waiting' || status === 'biting' || status === 'reeling') && (
        <>
          {/* Line from rod tip to bobber */}
          <svg className="absolute inset-0 pointer-events-none z-10" style={{ width: '100%', height: '100%' }}>
            <motion.line
              x1="158"
              y1="67"
              animate={{
                x2: status === 'casting' ? `${bobber.x}%` : status === 'reeling' ? '160' : `${bobber.x}%`,
                y2: status === 'casting' ? `${bobber.y}%` : status === 'reeling' ? '70' : `${bobber.y}%`,
              }}
              transition={{ duration: status === 'casting' ? 0.7 : status === 'reeling' ? 0.9 : 0.1 }}
              stroke="white"
              strokeWidth="1"
              strokeDasharray="3,3"
              opacity="0.7"
            />
          </svg>

          {/* Bobber */}
          <motion.div
            className="absolute z-20"
            style={{ touchAction: 'manipulation', transform: 'translate(-50%, -50%)' }}
            initial={{ left: '160px', top: '67px', scale: 0.6 }}
            animate={
              status === 'casting'
                ? { left: `${bobber.x}%`, top: `${bobber.y}%`, scale: 1 }
                : status === 'reeling'
                ? { left: '160px', top: '67px', scale: 0.6 }
                : status === 'biting'
                ? {
                    left: `${bobber.x}%`,
                    top: [`${bobber.y}%`, `${bobber.y + 4}%`, `${bobber.y - 2}%`, `${bobber.y + 5}%`, `${bobber.y}%`],
                    scale: 1,
                    rotate: [-25, 25, -20, 20, 0],
                  }
                : {
                    left: `${bobber.x}%`,
                    top: [`${bobber.y}%`, `${bobber.y + 0.4}%`, `${bobber.y}%`],
                    scale: 1,
                  }
            }
            transition={{
              left: { duration: status === 'casting' || status === 'reeling' ? 0.7 : 0 },
              top: status === 'biting'
                ? { duration: 0.4, repeat: Infinity }
                : status === 'waiting'
                ? { duration: 1.6, repeat: Infinity }
                : { duration: status === 'casting' || status === 'reeling' ? 0.7 : 0 },
              scale: { duration: 0.4 },
              rotate: status === 'biting' ? { duration: 0.3, repeat: Infinity } : { duration: 0.4 },
            }}
          >
            <div className="relative">
              {/* Bobber */}
              <div
                className="rounded-full"
                style={{
                  width: 28,
                  height: 28,
                  background: 'radial-gradient(circle at 30% 30%, #ff7a7a, #d63c3c)',
                  border: '2px solid white',
                  boxShadow: status === 'biting' ? '0 0 18px #ef4444' : '0 0 6px rgba(0,0,0,0.4)',
                }}
              />
              {/* Splash circles when biting */}
              {status === 'biting' && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ border: '2px solid #a3d8ff' }}
                    animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
                    transition={{ duration: 0.7, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ border: '2px solid #a3d8ff' }}
                    animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                  />
                </>
              )}
            </div>
          </motion.div>

          {/* Tap target overlay when biting */}
          {status === 'biting' && (
            <motion.button
              onClick={handleTapBite}
              className="absolute z-30 flex items-center justify-center pointer-events-auto"
              style={{
                left: `${bobber.x}%`,
                top: `${bobber.y}%`,
                transform: 'translate(-50%, -50%)',
                width: 200,
                height: 200,
                background: 'transparent',
                touchAction: 'manipulation',
              }}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              aria-label="Anbeißen!"
            >
              <motion.div
                className="px-4 py-2 rounded-full font-display font-bold text-2xl text-white"
                style={{
                  background: '#ef4444',
                  boxShadow: '0 0 24px #ef4444, 0 0 60px #ef4444',
                }}
                animate={{ scale: [0.95, 1.1, 0.95] }}
                transition={{ duration: 0.4, repeat: Infinity }}
              >
                ZUPACKEN!
              </motion.div>
            </motion.button>
          )}
        </>
      )}

      {/* Status banners + actions at bottom */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 max-w-md w-full px-4 pointer-events-none">
        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-2 pointer-events-auto"
            >
              <div className="bg-card/80 backdrop-blur rounded-2xl px-5 py-2">
                <p className="text-body font-display text-card-foreground text-center">
                  {fischDone ? '✨ Genug gefangen!' : 'Wirf die Angel ins Wasser!'}
                </p>
              </div>
              {fischDone ? (
                <MagicButton onClick={onFertig} variant="gold" size="lg">
                  Zurück zur Höhle
                </MagicButton>
              ) : (
                <MagicButton onClick={handleAuswerfen} variant="gold" size="lg">
                  🎣 Auswerfen
                </MagicButton>
              )}
            </motion.div>
          )}

          {status === 'casting' && (
            <motion.div
              key="casting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-card/80 backdrop-blur rounded-2xl px-5 py-2"
            >
              <p className="text-body font-display text-card-foreground">Auswerfen…</p>
            </motion.div>
          )}

          {status === 'waiting' && (
            <motion.div
              key="waiting"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-card/80 backdrop-blur rounded-2xl px-5 py-2"
            >
              <p className="text-body font-display text-card-foreground">
                Warte... etwas naht 🐠
              </p>
            </motion.div>
          )}

          {status === 'biting' && (
            <motion.div
              key="biting"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl px-5 py-2 font-display font-bold"
              style={{ background: '#ef4444', color: 'white', boxShadow: '0 0 16px #ef4444' }}
            >
              ⚡ Schnell tippen!
            </motion.div>
          )}

          {status === 'reeling' && (
            <motion.div
              key="reeling"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-card/80 backdrop-blur rounded-2xl px-5 py-2"
            >
              <p className="text-body font-display text-card-foreground">Einholen…</p>
            </motion.div>
          )}

          {status === 'verpasst' && (
            <motion.div
              key="verpasst"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-2 pointer-events-auto"
            >
              <div className="bg-card/80 backdrop-blur rounded-2xl px-5 py-2">
                <p className="text-body font-display text-card-foreground text-center">
                  💨 Entwischt! Versuch es nochmal.
                </p>
              </div>
              <MagicButton onClick={handleAuswerfen} variant="gold" size="lg">
                🎣 Nochmal auswerfen
              </MagicButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// =====================================================================
// Tension-meter skill game: time the pull-up to land in the gold zone.
// =====================================================================
interface KraftmesserProps {
  item: AngelItem;
  heldenfarbe: string;
  onHit: () => void;
  onMiss: () => void;
}

function Kraftmesser({ item, heldenfarbe, onHit, onMiss }: KraftmesserProps) {
  const { playTone } = useSound();
  const [pos, setPos] = useState(0); // 0..100 indicator position
  const [resolved, setResolved] = useState<'hit' | 'miss' | null>(null);
  const animRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const decidedRef = useRef(false);

  // Sweet zone: faster items have a narrower zone. Centered around 50.
  // reaktionszeit: 1100ms (fast) -> small zone, 1700ms (slow) -> large zone.
  const zoneWidth = Math.round(((item.reaktionszeit - 900) / 800) * 22 + 12); // 12-34
  const zoneStart = 50 - zoneWidth / 2;
  const zoneEnd = 50 + zoneWidth / 2;

  // Indicator oscillates with sine wave; speed depends on item
  const periodMs = Math.max(1100, item.reaktionszeit);

  // Auto-miss after 5 seconds of no decision
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!decidedRef.current) {
        decidedRef.current = true;
        setResolved('miss');
        playTone(180, 0.3, 'sine', 0.1);
        setTimeout(onMiss, 700);
      }
    }, 5500);
    return () => clearTimeout(timeout);
  }, [onMiss, playTone]);

  // Animate the indicator with rAF
  useEffect(() => {
    startRef.current = performance.now();
    const tick = () => {
      const elapsed = performance.now() - startRef.current;
      const phase = (elapsed % periodMs) / periodMs; // 0..1
      // Triangle wave for predictable timing
      const tri = phase < 0.5 ? phase * 2 : 2 - phase * 2; // 0..1..0
      setPos(tri * 100);
      if (!decidedRef.current) animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [periodMs]);

  const handleZiehen = () => {
    if (decidedRef.current) return;
    decidedRef.current = true;
    if (animRef.current) cancelAnimationFrame(animRef.current);
    if (pos >= zoneStart && pos <= zoneEnd) {
      setResolved('hit');
      playTone(750, 0.18, 'sine', 0.2);
      setTimeout(onHit, 600);
    } else {
      setResolved('miss');
      playTone(180, 0.3, 'sine', 0.1);
      setTimeout(onMiss, 700);
    }
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden flex flex-col items-center justify-center px-4 py-6"
      style={{
        background: 'radial-gradient(ellipse at center, #0c5775 0%, #040d18 100%)',
        touchAction: 'manipulation',
      }}
    >
      {/* Mystery silhouette wiggling under water */}
      <motion.div
        className="text-7xl select-none mb-2"
        style={{ filter: 'blur(1px) drop-shadow(0 0 18px #00000099)' }}
        animate={{
          y: [-4, 4, -4],
          x: [-3, 3, -3],
          rotate: [-6, 6, -6],
        }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        ❓
      </motion.div>
      <p className="text-body-lg font-display text-foreground text-center" style={{ textShadow: '0 0 12px black' }}>
        Es zappelt heftig!
      </p>
      <p className="text-body font-body text-muted-foreground text-center max-w-sm mb-3">
        Tippe wenn der Pfeil im <span style={{ color: '#facc15' }}>goldenen</span> Bereich ist!
      </p>

      {/* Tension meter */}
      <div className="relative w-full max-w-md h-12 my-2">
        {/* Bar track */}
        <div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-6 rounded-full overflow-hidden"
          style={{
            background: 'linear-gradient(90deg, #ef4444 0%, #ef4444 ' + zoneStart + '%, #facc15 ' + zoneStart + '%, #facc15 ' + zoneEnd + '%, #ef4444 ' + zoneEnd + '%, #ef4444 100%)',
            boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.4)',
            border: '2px solid rgba(255,255,255,0.3)',
          }}
        />
        {/* Sweet zone glow */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-8 rounded-full pointer-events-none"
          style={{
            left: `${zoneStart}%`,
            width: `${zoneEnd - zoneStart}%`,
            background: 'linear-gradient(180deg, transparent, #facc1544, transparent)',
            boxShadow: '0 0 20px #facc15aa',
          }}
        />
        {/* Indicator (animated arrow) */}
        <motion.div
          className="absolute top-1/2 pointer-events-none"
          style={{ left: `${pos}%`, transform: 'translate(-50%, -50%)' }}
        >
          <div
            className="w-0 h-0"
            style={{
              borderLeft: '12px solid transparent',
              borderRight: '12px solid transparent',
              borderTop: '20px solid white',
              filter: 'drop-shadow(0 0 6px white) drop-shadow(0 0 12px white)',
            }}
          />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-12 -mt-12"
            style={{
              background: 'white',
              boxShadow: '0 0 6px white',
            }}
          />
        </motion.div>
      </div>

      {/* Resolution feedback */}
      {resolved === 'hit' && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
          className="text-3xl font-display font-bold mt-2"
          style={{ color: '#facc15', textShadow: '0 0 24px #facc15' }}
        >
          ⭐ Volltreffer!
        </motion.div>
      )}
      {resolved === 'miss' && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 1 }}
          className="text-2xl font-display font-bold mt-2"
          style={{ color: '#ef4444', textShadow: '0 0 16px #ef4444' }}
        >
          💨 Entwischt!
        </motion.div>
      )}

      {/* Big pull button */}
      {!resolved && (
        <motion.button
          onClick={handleZiehen}
          className="mt-4 px-10 py-5 rounded-3xl font-display font-bold text-2xl text-white touch-target"
          style={{
            background: heldenfarbe,
            boxShadow: `0 0 24px ${heldenfarbe}, 0 0 60px ${heldenfarbe}88`,
            touchAction: 'manipulation',
            minWidth: 220,
          }}
          animate={{ scale: [0.97, 1.03, 0.97] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          whileTap={{ scale: 0.92 }}
        >
          HOCHZIEHEN!
        </motion.button>
      )}
    </div>
  );
}
