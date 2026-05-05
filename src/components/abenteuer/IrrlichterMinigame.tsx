import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '@/hooks/useSound';
import { IRRLICHTER_ZIEL } from '@/types/abenteuer';
import MagicButton from '@/components/ui/MagicButton';

interface Props {
  heldenfarbe: string;
  onTreffer: () => void;
  onSieg: () => void;
  onZurueck: () => void;
}

interface Wisp {
  id: number;
  /** color hue */
  farbe: string;
  /** size in px */
  groesse: number;
  /** Path waypoints (percent of viewport) */
  pfad: { x: number; y: number; t: number }[];
  /** total lifetime in ms */
  lebensdauer: number;
  /** spawn timestamp */
  geboren: number;
  /** has been hit */
  getroffen: boolean;
}

interface ProjectilAnim {
  id: number;
  from: { x: number; y: number };
  to: { x: number; y: number };
  start: number;
}

let nextWispId = 0;
let nextProjectilId = 0;

const WISP_COLORS = ['#7eb8e0', '#a3d8ff', '#c4a3ff', '#90ee90', '#ffd97e'];

function makeWisp(): Wisp {
  // Random path: starts off-screen, traverses screen, exits
  const startSide = Math.random() < 0.5 ? 'left' : 'right';
  const startX = startSide === 'left' ? -10 : 110;
  const endX = startSide === 'left' ? 110 : -10;
  // 3-4 waypoints with vertical bobbing
  const baseY = 25 + Math.random() * 50; // 25-75% (avoid top bar + slingshot at bottom)
  const pfad = [
    { x: startX, y: baseY, t: 0 },
    { x: startX + (endX - startX) * 0.33, y: baseY + (Math.random() - 0.5) * 25, t: 0.33 },
    { x: startX + (endX - startX) * 0.66, y: baseY + (Math.random() - 0.5) * 25, t: 0.66 },
    { x: endX, y: baseY + (Math.random() - 0.5) * 15, t: 1 },
  ];
  const farbe = WISP_COLORS[Math.floor(Math.random() * WISP_COLORS.length)];
  const groesse = 36 + Math.random() * 24;
  const lebensdauer = 5500 + Math.random() * 2500; // 5.5-8s travel time
  return {
    id: nextWispId++,
    farbe,
    groesse,
    pfad,
    lebensdauer,
    geboren: performance.now(),
    getroffen: false,
  };
}

function wispPos(w: Wisp, now: number): { x: number; y: number } {
  const p = Math.min(1, (now - w.geboren) / w.lebensdauer);
  // Walk through waypoints
  for (let i = 0; i < w.pfad.length - 1; i++) {
    const a = w.pfad[i];
    const b = w.pfad[i + 1];
    if (p >= a.t && p <= b.t) {
      const local = (p - a.t) / (b.t - a.t);
      return { x: a.x + (b.x - a.x) * local, y: a.y + (b.y - a.y) * local };
    }
  }
  const last = w.pfad[w.pfad.length - 1];
  return { x: last.x, y: last.y };
}

export default function IrrlichterMinigame({
  heldenfarbe,
  onTreffer,
  onSieg,
  onZurueck,
}: Props) {
  const { playTone, playChime } = useSound();
  const [treffer, setTreffer] = useState(0);
  const [verfehlt, setVerfehlt] = useState(0);
  const [wisps, setWisps] = useState<Wisp[]>([]);
  const [projectile, setProjectile] = useState<ProjectilAnim[]>([]);
  const [now, setNow] = useState(performance.now());
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const fertig = treffer >= IRRLICHTER_ZIEL;

  // rAF tick to drive the wisp positions and remove expired ones
  useEffect(() => {
    const tick = () => {
      const t = performance.now();
      setNow(t);
      setWisps(ws => ws.filter(w => t - w.geboren < w.lebensdauer + 600));
      setProjectile(ps => ps.filter(p => t - p.start < 600));
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  // Spawn wisps periodically (until won)
  useEffect(() => {
    if (fertig) return;
    const spawn = () => {
      setWisps(ws => {
        if (ws.length < 4) {
          return [...ws, makeWisp()];
        }
        return ws;
      });
    };
    spawn();
    const id = setInterval(spawn, 1100);
    return () => clearInterval(id);
  }, [fertig]);

  const handleWispTap = useCallback((wispId: number, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (fertig) return;
    const w = wisps.find(x => x.id === wispId);
    if (!w || w.getroffen) return;
    const pos = wispPos(w, performance.now());
    // Projectile animation - origin = slingshot position, bottom-left
    setProjectile(p => [...p, {
      id: nextProjectilId++,
      from: { x: 12, y: 80 },
      to: pos,
      start: performance.now(),
    }]);
    // Mark wisp as hit
    setWisps(ws => ws.map(x => x.id === wispId ? { ...x, getroffen: true } : x));
    setTimeout(() => {
      setWisps(curr => curr.filter(x => x.id !== wispId));
    }, 350);
    playTone(620 + Math.random() * 200, 0.15, 'sine', 0.18);
    setTreffer(t => t + 1);
    onTreffer();
  }, [fertig, wisps, onTreffer, playTone]);

  // Detect win and play chime
  useEffect(() => {
    if (treffer >= IRRLICHTER_ZIEL) {
      playChime();
    }
  }, [treffer, playChime]);

  const handleBackgroundTap = useCallback(() => {
    if (fertig) return;
    setVerfehlt(v => v + 1);
    playTone(220, 0.12, 'sine', 0.08);
  }, [fertig, playTone]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #1a3050 0%, #050a14 100%)',
        touchAction: 'manipulation',
      }}
      onClick={handleBackgroundTap}
    >
      {/* Cave background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="irrAtm" cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#1f4068" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#050a14" stopOpacity="1" />
          </radialGradient>
          <linearGradient id="irrCliff" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1c2a3a" />
            <stop offset="100%" stopColor="#0a121c" />
          </linearGradient>
        </defs>
        <rect width="1000" height="600" fill="url(#irrAtm)" />
        <path d="M0 0 L0 200 Q120 160 240 200 Q360 150 480 200 Q600 150 720 200 Q840 160 1000 200 L1000 0 Z" fill="#0a1320" />
        {/* Stalactites */}
        <g fill="url(#irrCliff)">
          <polygon points="120,60 130,140 140,60" />
          <polygon points="240,70 252,160 264,70" />
          <polygon points="380,80 388,130 396,80" />
          <polygon points="520,70 532,170 544,70" />
          <polygon points="700,90 710,150 720,90" />
          <polygon points="850,60 862,140 874,60" />
        </g>
        {/* Floor */}
        <path d="M0 540 Q200 520 500 540 T1000 540 L1000 600 L0 600 Z" fill="#1a1108" />
        <path d="M0 520 Q200 500 500 520 T1000 520 L1000 600 L0 600 Z" fill="#3a2d1f" opacity="0.7" />
        {/* Mist on floor */}
        <motion.ellipse
          cx="500"
          cy="535"
          rx="440"
          ry="30"
          fill="#7eb8e0"
          opacity="0.15"
          animate={{ rx: [400, 480, 400], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </svg>

      {/* Top bar */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-30 gap-2">
        <MagicButton onClick={onZurueck} variant="secondary" size="lg">
          ← Höhle
        </MagicButton>
        <div className="flex items-center gap-2">
          <div className="bg-card/80 backdrop-blur rounded-2xl px-4 py-2 flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            <div className="flex flex-col leading-tight">
              <span className="text-xs font-display text-card-foreground">Treffer</span>
              <span className="text-xs font-body text-muted-foreground">
                {treffer}/{IRRLICHTER_ZIEL}{fertig && ' ✓'}
              </span>
            </div>
          </div>
          {verfehlt > 0 && (
            <div className="bg-card/60 backdrop-blur rounded-2xl px-3 py-2 flex items-center gap-1">
              <span className="text-lg">💨</span>
              <span className="text-xs font-body text-muted-foreground">{verfehlt}</span>
            </div>
          )}
        </div>
      </div>

      {/* Wisps */}
      <AnimatePresence>
        {wisps.map(w => {
          const p = wispPos(w, now);
          const fadeIn = Math.min(1, (now - w.geboren) / 400);
          const fadeOut = Math.max(0, 1 - Math.max(0, (now - w.geboren - w.lebensdauer) / 600));
          const opacity = w.getroffen ? 0 : Math.min(fadeIn, fadeOut);
          return (
            <motion.button
              key={w.id}
              onClick={(e) => handleWispTap(w.id, e)}
              onTouchStart={(e) => handleWispTap(w.id, e)}
              className="absolute z-20"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                transform: 'translate(-50%, -50%)',
                width: w.groesse,
                height: w.groesse,
                touchAction: 'manipulation',
                pointerEvents: w.getroffen ? 'none' : 'auto',
              }}
              animate={
                w.getroffen
                  ? { scale: [1, 2, 0], opacity: [1, 0.8, 0] }
                  : { opacity, scale: [0.9, 1.05, 0.9] }
              }
              transition={
                w.getroffen
                  ? { duration: 0.35 }
                  : { scale: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' } }
              }
              aria-label="Irrlicht"
            >
              {/* Wisp glow */}
              <div
                className="rounded-full"
                style={{
                  width: '100%',
                  height: '100%',
                  background: `radial-gradient(circle at 30% 30%, white 0%, ${w.farbe} 30%, transparent 75%)`,
                  filter: `blur(0.5px) drop-shadow(0 0 16px ${w.farbe}) drop-shadow(0 0 32px ${w.farbe})`,
                }}
              />
              {/* Tiny core */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: 8,
                  height: 8,
                  background: 'white',
                  boxShadow: '0 0 12px white',
                }}
              />
            </motion.button>
          );
        })}
      </AnimatePresence>

      {/* Stone projectiles */}
      {projectile.map(pr => (
        <motion.div
          key={pr.id}
          className="absolute z-25 pointer-events-none"
          style={{ left: `${pr.from.x}%`, top: `${pr.from.y}%`, transform: 'translate(-50%, -50%)' }}
          animate={{ left: `${pr.to.x}%`, top: `${pr.to.y}%`, rotate: 720 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <span className="text-2xl select-none">🪨</span>
        </motion.div>
      ))}

      {/* Hero with slingshot - bottom left */}
      <div className="absolute z-20 pointer-events-none" style={{ bottom: '8%', left: '4%' }}>
        <svg width="120" height="180" viewBox="0 0 120 180">
          {/* Rocky platform */}
          <ellipse cx="60" cy="170" rx="55" ry="14" fill="#2a2030" />
          {/* Stylized hero silhouette */}
          <circle cx="60" cy="80" r="22" fill={heldenfarbe} opacity="0.8" />
          <rect x="48" y="100" width="24" height="55" rx="6" fill={heldenfarbe} opacity="0.85" />
          {/* Slingshot */}
          <line x1="80" y1="100" x2="95" y2="60" stroke="#7c5e3c" strokeWidth="3" strokeLinecap="round" />
          <line x1="95" y1="60" x2="85" y2="40" stroke="#7c5e3c" strokeWidth="3" strokeLinecap="round" />
          <line x1="95" y1="60" x2="105" y2="40" stroke="#7c5e3c" strokeWidth="3" strokeLinecap="round" />
          <path d="M85 40 Q95 50 105 40" stroke="#ef4444" strokeWidth="2" fill="none" />
        </svg>
      </div>

      {/* Win overlay */}
      {fertig && (
        <motion.div
          className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card rounded-3xl px-8 py-6 max-w-sm flex flex-col items-center gap-4"
            style={{ border: `3px solid ${heldenfarbe}`, boxShadow: `0 0 40px ${heldenfarbe}` }}
          >
            <span className="text-7xl">🎯</span>
            <h2 className="text-title font-display" style={{ color: heldenfarbe }}>
              Zielsicher!
            </h2>
            <p className="text-body font-body text-card-foreground text-center">
              Alle 10 Irrlichter getroffen — die Schleuder sitzt perfekt!
            </p>
            <MagicButton onClick={onSieg} variant="gold" size="lg">
              Zurück zur Höhle ✨
            </MagicButton>
          </motion.div>
        </motion.div>
      )}

      {/* Hint */}
      {!fertig && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <div className="bg-card/80 backdrop-blur rounded-2xl px-5 py-2 max-w-md">
            <p className="text-body font-display text-card-foreground text-center">
              Tippe die leuchtenden Irrlichter — triff 10!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
