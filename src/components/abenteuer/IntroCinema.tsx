import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeldAvatar from '@/components/avatar/HeldAvatar';
import MagicButton from '@/components/ui/MagicButton';
import type { AvatarConfig } from '@/types/profil';

interface Props {
  avatarConfig: AvatarConfig;
  heldenfarbe: string;
  heldName: string | null;
  onStart: () => void;
  onZurueck: () => void;
}

type Akt = 'sturm' | 'wrack' | 'erwachen' | 'aufruf';

export default function IntroCinema({ avatarConfig, heldenfarbe, heldName, onStart, onZurueck }: Props) {
  const [akt, setAkt] = useState<Akt>('sturm');
  const [skipBlitz, setSkipBlitz] = useState(false);
  const name = heldName || 'Heldin';

  // Auto-advance through acts
  useEffect(() => {
    const timeline: { akt: Akt; ms: number }[] = [
      { akt: 'sturm', ms: 4500 },
      { akt: 'wrack', ms: 4500 },
      { akt: 'erwachen', ms: 4500 },
      { akt: 'aufruf', ms: 0 },
    ];
    let i = 0;
    const tick = () => {
      const cur = timeline[i];
      if (cur.ms === 0 || i >= timeline.length - 1) return;
      const t = setTimeout(() => {
        i++;
        setAkt(timeline[i].akt);
        if (timeline[i].akt !== 'aufruf') tick();
        else if (i < timeline.length - 1) tick();
      }, cur.ms);
      return t;
    };
    const t = tick();
    return () => { if (t) clearTimeout(t); };
  }, []);

  const handleSkip = () => setAkt('aufruf');

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: '#020610' }}>
      {/* Skip + back */}
      <button
        onClick={onZurueck}
        className="absolute top-4 left-4 z-50 text-muted-foreground text-body font-display px-4 py-2 rounded-full bg-card/80 backdrop-blur"
        style={{ touchAction: 'manipulation' }}
      >
        ← Heim
      </button>
      {akt !== 'aufruf' && (
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 z-50 text-muted-foreground text-body font-display px-4 py-2 rounded-full bg-card/80 backdrop-blur"
          style={{ touchAction: 'manipulation' }}
        >
          Überspringen ⏭
        </button>
      )}

      <AnimatePresence mode="wait">
        {akt === 'sturm' && <Akt1Sturm key="sturm" />}
        {akt === 'wrack' && <Akt2Wrack key="wrack" onLightning={() => setSkipBlitz(false)} skipBlitz={skipBlitz} />}
        {akt === 'erwachen' && <Akt3Erwachen key="erwachen" avatarConfig={avatarConfig} />}
        {akt === 'aufruf' && (
          <Akt4Aufruf
            key="aufruf"
            avatarConfig={avatarConfig}
            heldenfarbe={heldenfarbe}
            name={name}
            onStart={onStart}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Act 1: Storm at sea, ship sailing
function Akt1Sturm() {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="sky-storm" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1f3a" />
            <stop offset="60%" stopColor="#3a3850" />
            <stop offset="100%" stopColor="#1a3a5a" />
          </linearGradient>
          <linearGradient id="sea-storm" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a3a5a" />
            <stop offset="100%" stopColor="#0a1929" />
          </linearGradient>
        </defs>
        <rect width="1000" height="400" fill="url(#sky-storm)" />
        <rect y="380" width="1000" height="220" fill="url(#sea-storm)" />

        {/* Storm clouds */}
        {[
          { x: 100, y: 80, w: 220, h: 60 },
          { x: 380, y: 60, w: 280, h: 70 },
          { x: 700, y: 90, w: 240, h: 60 },
        ].map((c, i) => (
          <motion.ellipse
            key={i}
            cx={c.x + c.w / 2}
            cy={c.y}
            rx={c.w / 2}
            ry={c.h / 2}
            fill="#23253a"
            animate={{ x: [0, -20, 0] }}
            transition={{ duration: 5 + i, repeat: Infinity }}
          />
        ))}

        {/* Lightning bolts */}
        {[0, 1, 2].map(i => (
          <motion.path
            key={`bolt-${i}`}
            d={`M${200 + i * 250} 80 L${190 + i * 250} 200 L${220 + i * 250} 180 L${200 + i * 250} 320`}
            stroke="#fffacd"
            strokeWidth="3"
            fill="none"
            opacity={0}
            animate={{ opacity: [0, 1, 0, 1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1.5 + i * 0.7 }}
            style={{ filter: 'drop-shadow(0 0 8px #fffacd)' }}
          />
        ))}

        {/* Lightning flash overlay */}
        <motion.rect
          width="1000"
          height="600"
          fill="#fffacd"
          animate={{ opacity: [0, 0, 0.3, 0, 0.4, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.5 }}
        />

        {/* Rain */}
        {Array.from({ length: 60 }).map((_, i) => (
          <motion.line
            key={i}
            x1={i * 18}
            y1={-20}
            x2={i * 18 - 8}
            y2={20}
            stroke="#7eb8e0"
            strokeWidth="1"
            opacity="0.5"
            animate={{ y: ['-5%', '110%'] }}
            transition={{ duration: 0.8 + (i % 4) * 0.3, repeat: Infinity, delay: i * 0.04, ease: 'linear' }}
          />
        ))}

        {/* Big animated waves */}
        {[0, 1, 2].map(i => (
          <motion.path
            key={i}
            d={`M0 ${420 + i * 30} Q250 ${390 + i * 25} 500 ${420 + i * 30} T1000 ${420 + i * 30} L1000 600 L0 600 Z`}
            fill="#1a3a5a"
            opacity={0.4 + i * 0.2}
            animate={{
              d: [
                `M0 ${420 + i * 30} Q250 ${390 + i * 25} 500 ${420 + i * 30} T1000 ${420 + i * 30} L1000 600 L0 600 Z`,
                `M0 ${420 + i * 30} Q250 ${410 + i * 25} 500 ${400 + i * 30} T1000 ${420 + i * 30} L1000 600 L0 600 Z`,
                `M0 ${420 + i * 30} Q250 ${390 + i * 25} 500 ${420 + i * 30} T1000 ${420 + i * 30} L1000 600 L0 600 Z`,
              ],
            }}
            transition={{ duration: 2.5 + i, repeat: Infinity }}
          />
        ))}

        {/* Ship - rocking and being tossed */}
        <motion.g
          animate={{
            rotate: [-12, 12, -8, 14, -6, 10, -12],
            y: [380, 360, 370, 350, 380, 360, 380],
            x: [400, 420, 410, 440, 420, 430, 400],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '450px 410px' }}
        >
          {/* Hull */}
          <path d="M380 410 L520 410 L500 440 L400 440 Z" fill="#5a3a1f" stroke="#2a1a0f" strokeWidth="2" />
          {/* Mast */}
          <line x1="450" y1="410" x2="450" y2="320" stroke="#3a2a18" strokeWidth="3" />
          {/* Sail - tattered */}
          <path d="M450 325 L490 360 L450 395 Z" fill="#e0d4b8" stroke="#7c5e3c" strokeWidth="1" />
          <path d="M450 325 L490 360 L470 360 L470 380 L450 395 Z" fill="#e0d4b8" />
          {/* Tear in sail */}
          <path d="M470 370 L478 380" stroke="#7c5e3c" strokeWidth="1" />
          {/* Crow's nest */}
          <rect x="445" y="320" width="10" height="6" fill="#3a2a18" />
          {/* Flag */}
          <motion.path
            d="M450 320 L470 318 L470 326 L450 328 Z"
            fill="#d63c3c"
            animate={{ d: ['M450 320 L470 318 L470 326 L450 328 Z', 'M450 320 L468 322 L470 326 L450 328 Z', 'M450 320 L470 318 L470 326 L450 328 Z'] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          {/* Hull detail */}
          <line x1="395" y1="425" x2="505" y2="425" stroke="#3a2415" strokeWidth="1" opacity="0.6" />
        </motion.g>

        {/* Sea spray */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.circle
            key={`spray-${i}`}
            cx={350 + (i * 23) % 200}
            cy={420 + (i % 3) * 8}
            r={2}
            fill="#a3d8ff"
            animate={{ y: [-10, -25, -10], opacity: [0, 0.8, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </svg>

      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <p className="text-title font-display text-foreground text-center px-6" style={{ textShadow: '0 0 16px black' }}>
          Ein furchtbarer Sturm zieht auf...
        </p>
      </motion.div>
    </motion.div>
  );
}

// Act 2: Ship breaks apart on rocks
function Akt2Wrack({ skipBlitz: _skipBlitz, onLightning: _onLightning }: { skipBlitz: boolean; onLightning: () => void }) {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
        <rect width="1000" height="400" fill="#0d1428" />
        <rect y="380" width="1000" height="220" fill="#040c18" />

        {/* Big jagged rocks */}
        <path d="M0 600 L0 380 Q60 360 130 400 L160 410 L150 600 Z" fill="#0a1320" />
        <path d="M180 600 L180 410 L240 380 L300 410 L290 600 Z" fill="#0a1320" />
        <path d="M820 600 L820 400 L900 380 L1000 410 L1000 600 Z" fill="#0a1320" />

        {/* Bright lightning flash */}
        <motion.rect
          width="1000"
          height="600"
          fill="white"
          animate={{ opacity: [0, 0.7, 0, 0.5, 0] }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />

        {/* Ship breaking - debris flying */}
        <motion.g
          initial={{ scale: 1, rotate: 0, x: 0, y: 0 }}
          animate={{
            scale: [1, 0.95, 0.9],
            rotate: [-15, -25, -45],
            x: [-50, -80, -120],
            y: [0, 20, 60],
          }}
          transition={{ duration: 3, ease: 'easeIn' }}
          style={{ transformOrigin: '500px 400px' }}
        >
          {/* Broken hull - left half */}
          <path d="M380 400 L460 400 L470 440 L400 440 Z" fill="#5a3a1f" stroke="#2a1a0f" strokeWidth="2" />
          {/* Splintered edge */}
          <path d="M460 400 L455 410 L465 415 L460 425 L470 440 L455 430 Z" fill="#3a2a18" />
        </motion.g>

        {/* Right half flying off */}
        <motion.g
          initial={{ scale: 1, rotate: 0, x: 0, y: 0 }}
          animate={{
            rotate: [10, 35, 80],
            x: [40, 100, 180],
            y: [0, 30, 100],
            opacity: [1, 0.8, 0],
          }}
          transition={{ duration: 3, ease: 'easeIn' }}
          style={{ transformOrigin: '530px 400px' }}
        >
          <path d="M470 400 L530 400 L520 440 L480 440 Z" fill="#5a3a1f" stroke="#2a1a0f" strokeWidth="2" />
          <line x1="500" y1="400" x2="500" y2="320" stroke="#3a2a18" strokeWidth="3" />
          <path d="M500 325 L535 360 L500 395 Z" fill="#e0d4b8" />
        </motion.g>

        {/* Flying debris/planks */}
        {Array.from({ length: 8 }).map((_, i) => {
          const startX = 450 + i * 12;
          return (
            <motion.rect
              key={i}
              x={startX}
              y={400}
              width="20"
              height="6"
              fill="#5a3a1f"
              initial={{ rotate: 0, x: 0, y: 0 }}
              animate={{
                rotate: i * 70 + 180,
                x: (i % 2 === 0 ? -1 : 1) * (60 + i * 30),
                y: -50 + (i % 3) * 30,
                opacity: [1, 1, 0],
              }}
              transition={{ duration: 2.5, ease: 'easeOut' }}
            />
          );
        })}

        {/* Big crashing wave */}
        <motion.path
          d="M0 460 Q300 380 600 460 T1000 460 L1000 600 L0 600 Z"
          fill="#1a3a5a"
          animate={{
            d: [
              'M0 460 Q300 380 600 460 T1000 460 L1000 600 L0 600 Z',
              'M0 440 Q300 340 600 440 T1000 440 L1000 600 L0 600 Z',
              'M0 460 Q300 380 600 460 T1000 460 L1000 600 L0 600 Z',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Foam */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.circle
            key={`foam-${i}`}
            cx={300 + i * 35}
            cy={420}
            r={6}
            fill="white"
            opacity={0.8}
            animate={{
              y: [0, -30, 30],
              opacity: [0.8, 0.4, 0],
            }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.08 }}
          />
        ))}
      </svg>

      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 text-center px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <p className="text-title font-display text-foreground" style={{ textShadow: '0 0 16px black' }}>
          Eine riesige Welle zerschlägt das Schiff!
        </p>
      </motion.div>
    </motion.div>
  );
}

// Act 3: Heroine washes ashore, slowly wakes up in the cave
function Akt3Erwachen({ avatarConfig }: { avatarConfig: AvatarConfig }) {
  const [augenOffen, setAugenOffen] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAugenOffen(true), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      {/* Cave background dim */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="erwachen-light" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#3a4a6a" />
            <stop offset="100%" stopColor="#040810" />
          </radialGradient>
          <linearGradient id="cliff-erwachen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1c2a3a" />
            <stop offset="100%" stopColor="#0a121c" />
          </linearGradient>
        </defs>
        <rect width="1000" height="600" fill="url(#erwachen-light)" />

        {/* Cave walls */}
        <path d="M0 0 L0 250 Q120 220 240 240 Q360 200 480 230 Q600 200 720 230 Q840 210 1000 240 L1000 0 Z" fill="#0a1320" />
        <path d="M0 600 L0 380 Q80 350 160 410 Q240 370 320 420 L320 600 Z" fill="#0a1320" />
        <path d="M680 600 L680 410 Q760 370 840 420 Q920 380 1000 410 L1000 600 Z" fill="#0a1320" />

        {/* Stalactites */}
        <g fill="url(#cliff-erwachen)">
          <polygon points="120,0 130,90 140,0" />
          <polygon points="240,0 252,110 264,0" />
          <polygon points="380,0 388,80 396,0" />
          <polygon points="520,0 532,110 544,0" />
          <polygon points="700,0 710,100 720,0" />
          <polygon points="850,0 862,90 874,0" />
        </g>

        {/* Beach floor */}
        <path d="M0 480 Q150 460 300 480 Q500 490 700 470 Q850 470 1000 485 L1000 600 L0 600 Z" fill="#3a2d1f" />
        <path d="M0 480 Q150 460 300 480 Q500 490 700 470 Q850 470 1000 485 L1000 600 L0 600 Z" fill="#1a1108" opacity="0.5" />

        {/* Water with waves */}
        {[0, 1, 2].map(i => (
          <motion.path
            key={`wave-${i}`}
            d={`M${200 + i * 50} 510 Q${300 + i * 50} 506 ${400 + i * 50} 510`}
            stroke="#5fa8d3"
            strokeWidth="2"
            fill="none"
            opacity="0.5"
            animate={{ x: [0, 12, 0, -12, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity }}
          />
        ))}

        {/* Cave opening glow - distant light */}
        <ellipse cx="850" cy="290" rx="80" ry="55" fill="#5fa8d3" opacity="0.2" />

        {/* Bioluminescent particles */}
        {Array.from({ length: 8 }).map((_, i) => {
          const startX = 100 + i * 100;
          const startY = 280 + ((i * 37) % 130);
          return (
            <motion.circle
              key={`spark-${i}`}
              cx={startX}
              cy={startY}
              r={2}
              fill="#7eb8e0"
              animate={{ y: [startY, startY - 30, startY], opacity: [0.2, 0.7, 0.2] }}
              transition={{ duration: 4 + (i % 4), repeat: Infinity, delay: i * 0.5 }}
            />
          );
        })}
      </svg>

      {/* Heroine lying on beach, washing up - centered low */}
      <motion.div
        className="absolute"
        style={{ left: '50%', top: '70%', transform: 'translate(-50%, -50%)' }}
        initial={{ x: '-100%', opacity: 0, rotate: -90 }}
        animate={{
          x: ['-50%', '-50%'],
          opacity: 1,
          rotate: augenOffen ? -75 : -90,
          y: augenOffen ? -20 : 0,
        }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <div style={{ transform: 'rotate(0deg)' }}>
          <HeldAvatar config={avatarConfig} size={140} />
        </div>
      </motion.div>

      {/* Fade-in light over hero */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: '50%',
          top: '70%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          height: 300,
          background: 'radial-gradient(circle, #fffacd44, transparent)',
          filter: 'blur(20px)',
        }}
        animate={{ opacity: [0, 1, 0.4, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 text-center px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <p className="text-title font-display text-foreground" style={{ textShadow: '0 0 16px black' }}>
          {augenOffen ? '...langsam erwachst du in einer dunklen Höhle.' : 'Das Wasser spült dich an einen Strand...'}
        </p>
      </motion.div>
    </motion.div>
  );
}

// Act 4: Call to action
function Akt4Aufruf({
  avatarConfig,
  heldenfarbe,
  name,
  onStart,
}: {
  avatarConfig: AvatarConfig;
  heldenfarbe: string;
  name: string;
  onStart: () => void;
}) {
  return (
    <motion.div
      key="aufruf"
      className="absolute inset-0 flex flex-col items-center justify-center px-6 py-8 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{ background: 'radial-gradient(ellipse at center, #1a3050 0%, #050a14 100%)' }}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="flex flex-col items-center gap-4 max-w-lg text-center my-auto"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <HeldAvatar config={avatarConfig} size={120} showBody={false} />
        </motion.div>

        <h1 className="text-hero font-display" style={{ color: heldenfarbe, textShadow: `0 0 24px ${heldenfarbe}80` }}>
          Was nun, {name}?
        </h1>

        <p className="text-body-lg font-body text-foreground leading-relaxed">
          Du bist allein in einer dunklen Höhle. Doch die Wellen haben viele
          Dinge angeschwemmt!
        </p>
        <p className="text-body font-body text-muted-foreground leading-relaxed">
          Sammle <strong>Holz</strong> für ein Floss, <strong>Proviant</strong> für die Reise,
          <strong> fange Fische</strong> und baue eine <strong>Schleuder</strong> — falls Gefahr droht…
        </p>

        <MagicButton onClick={onStart} variant="gold" size="lg">
          Los geht's! ✨
        </MagicButton>
      </motion.div>
    </motion.div>
  );
}
