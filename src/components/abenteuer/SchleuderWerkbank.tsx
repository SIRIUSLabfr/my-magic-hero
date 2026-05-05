import { useRef, useState } from 'react';
import { motion, type PanInfo } from 'framer-motion';
import { SCHLEUDER_TEILE } from '@/types/abenteuer';
import { useSound } from '@/hooks/useSound';
import MagicButton from '@/components/ui/MagicButton';

interface Props {
  gefunden: string[];
  platziert: string[];
  heldenfarbe: string;
  onPlatziert: (id: string) => void;
  onFertig: () => void;
  onZurueck: () => void;
}

const SNAP_DISTANCE = 90;

export default function SchleuderWerkbank({
  gefunden,
  platziert,
  heldenfarbe,
  onPlatziert,
  onFertig,
  onZurueck,
}: Props) {
  const { playChime, playTone } = useSound();
  const containerRef = useRef<HTMLDivElement>(null);
  const targetsRef = useRef<Map<string, HTMLDivElement | null>>(new Map());
  const [dragging, setDragging] = useState<string | null>(null);

  const verfuegbar = SCHLEUDER_TEILE.filter(t => gefunden.includes(t.id));
  const offene = verfuegbar.filter(t => !platziert.includes(t.id));
  const allesPlatziert = offene.length === 0 && verfuegbar.length === SCHLEUDER_TEILE.length;

  const handleDragEnd = (id: string, _: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setDragging(null);
    const target = targetsRef.current.get(id);
    if (!target) return;

    const targetRect = target.getBoundingClientRect();
    const targetCenter = {
      x: targetRect.left + targetRect.width / 2,
      y: targetRect.top + targetRect.height / 2,
    };
    const dist = Math.hypot(info.point.x - targetCenter.x, info.point.y - targetCenter.y);

    if (dist <= SNAP_DISTANCE) {
      playChime();
      onPlatziert(id);
    } else {
      playTone(220, 0.15, 'sine', 0.1);
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden flex flex-col"
      style={{ touchAction: 'none', background: 'linear-gradient(180deg, #1a1424 0%, #2a1a30 60%, #3a2440 100%)' }}
    >
      {/* Top bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-30 pointer-events-none">
        <div className="pointer-events-auto">
          <MagicButton onClick={onZurueck} variant="secondary" size="lg">
            🌊 Zur Höhle
          </MagicButton>
        </div>
        <div className="bg-card/70 backdrop-blur rounded-2xl px-5 py-2 pointer-events-auto">
          <p className="text-body font-display text-card-foreground text-center">
            🎯 {allesPlatziert ? 'Schleuder fertig!' : 'Baue eine Schleuder zum Schutz'}
          </p>
        </div>
        <div className="w-[180px]" />
      </div>

      {/* Workbench background */}
      <div className="flex-1 flex items-center justify-center relative">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="schleuderLight" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#fa6f6f" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#fa6f6f" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="800" height="600" fill="url(#schleuderLight)" />
          {/* Slingshot Y-frame outline */}
          <g opacity="0.25">
            <line x1="400" y1="450" x2="400" y2="280" stroke="#ef4444" strokeWidth="3" strokeDasharray="6,6" />
            <line x1="400" y1="280" x2="340" y2="200" stroke="#ef4444" strokeWidth="3" strokeDasharray="6,6" />
            <line x1="400" y1="280" x2="460" y2="200" stroke="#ef4444" strokeWidth="3" strokeDasharray="6,6" />
            <path d="M340 200 Q400 180 460 200" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4" fill="none" />
          </g>
        </svg>

        {/* Slingshot target zone */}
        <div className="relative" style={{ width: 'min(420px, 80vw)', height: 'min(340px, 55vh)' }}>
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              border: `3px dashed #ef4444aa`,
              background: 'rgba(239, 68, 68, 0.06)',
            }}
          />
          {SCHLEUDER_TEILE.map(teil => {
            const isPlatziert = platziert.includes(teil.id);
            return (
              <div
                key={`target-${teil.id}`}
                ref={el => { targetsRef.current.set(teil.id, el); }}
                className="absolute flex items-center justify-center"
                style={{
                  left: `${teil.zielPosition.x}%`,
                  top: `${teil.zielPosition.y}%`,
                  transform: `translate(-50%, -50%) rotate(${teil.zielPosition.rotation}deg)`,
                  width: 84,
                  height: 84,
                  borderRadius: 18,
                  border: isPlatziert ? 'none' : `2px dashed #ef444460`,
                  background: isPlatziert ? '#ef444440' : 'transparent',
                  transition: 'all 300ms ease',
                }}
              >
                <span
                  className="text-5xl transition-all duration-500"
                  style={{
                    opacity: isPlatziert ? 1 : 0.2,
                    filter: isPlatziert ? 'drop-shadow(0 0 12px #ef4444)' : 'grayscale(1)',
                  }}
                >
                  {teil.emoji}
                </span>
              </div>
            );
          })}
        </div>

        {allesPlatziert && (
          <div className="absolute bottom-32 left-1/2 -translate-x-1/2 animate-screen-enter">
            <MagicButton onClick={onFertig} variant="gold" size="xl">
              Bereit! 🎯
            </MagicButton>
          </div>
        )}
      </div>

      {/* Bottom shelf */}
      <div className="relative pb-6 pt-3 px-6 z-20" style={{ minHeight: 130 }}>
        <div className="flex gap-4 justify-center items-center flex-wrap bg-card/60 backdrop-blur rounded-3xl py-4 px-6 mx-auto" style={{ maxWidth: 720 }}>
          {offene.length === 0 && !allesPlatziert && (
            <p className="text-body font-display text-muted-foreground">
              Sammle erst noch mehr Schleuder-Teile in der Höhle 🌊
            </p>
          )}
          {allesPlatziert && (
            <p className="text-body font-display text-card-foreground">
              ✨ Schleuder bereit!
            </p>
          )}
          {offene.map(teil => {
            const isDragging = dragging === teil.id;
            return (
              <motion.div
                key={teil.id}
                drag
                dragSnapToOrigin
                dragMomentum={false}
                onDragStart={() => setDragging(teil.id)}
                onDragEnd={(e, info) => handleDragEnd(teil.id, e, info)}
                whileDrag={{ scale: 1.25, zIndex: 50 }}
                className="cursor-grab active:cursor-grabbing select-none"
                style={{
                  touchAction: 'none',
                  filter: isDragging ? 'drop-shadow(0 0 16px #ef4444)' : 'drop-shadow(0 0 6px #ef444480)',
                }}
              >
                <div
                  className="w-[88px] h-[88px] rounded-2xl flex flex-col items-center justify-center bg-card"
                  style={{ border: '2px solid #ef444480' }}
                >
                  <span className="text-4xl">{teil.emoji}</span>
                  <span className="text-xs font-display text-card-foreground">{teil.label}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
