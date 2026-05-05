import { useRef, useState } from 'react';
import { motion, type PanInfo } from 'framer-motion';
import { FLOSS_TEILE } from '@/types/abenteuer';
import type { FlossTeilId } from '@/types/abenteuer';
import { useSound } from '@/hooks/useSound';
import MagicButton from '@/components/ui/MagicButton';

interface Props {
  gefunden: FlossTeilId[];
  platziert: FlossTeilId[];
  heldenfarbe: string;
  onPlatziert: (id: FlossTeilId) => void;
  onFertig: () => void;
  onZurueck: () => void;
}

const SNAP_DISTANCE = 100; // px tolerance for snapping

export default function FlossWerkbank({
  gefunden,
  platziert,
  heldenfarbe,
  onPlatziert,
  onFertig,
  onZurueck,
}: Props) {
  const { playChime, playTone } = useSound();
  const containerRef = useRef<HTMLDivElement>(null);
  const targetsRef = useRef<Map<FlossTeilId, HTMLDivElement | null>>(new Map());
  const [dragging, setDragging] = useState<FlossTeilId | null>(null);

  const offene = gefunden.filter(id => !platziert.includes(id));
  const allesPlatziert = offene.length === 0 && gefunden.length === FLOSS_TEILE.length;

  const handleDragEnd = (id: FlossTeilId, _: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setDragging(null);
    const target = targetsRef.current.get(id);
    const container = containerRef.current;
    if (!target || !container) return;

    const targetRect = target.getBoundingClientRect();
    const targetCenter = {
      x: targetRect.left + targetRect.width / 2,
      y: targetRect.top + targetRect.height / 2,
    };
    const dropPoint = info.point;
    const dist = Math.hypot(dropPoint.x - targetCenter.x, dropPoint.y - targetCenter.y);

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
      style={{ touchAction: 'none', background: 'linear-gradient(180deg, #0a1929 0%, #1a3050 60%, #2a4870 100%)' }}
    >
      {/* Top bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-30 pointer-events-none">
        <div className="pointer-events-auto">
          <MagicButton onClick={onZurueck} variant="secondary" size="lg">
            🌊 Zurück zur Höhle
          </MagicButton>
        </div>
        <div className="bg-card/70 backdrop-blur rounded-2xl px-5 py-2 pointer-events-auto">
          <p className="text-body font-display text-card-foreground text-center">
            {allesPlatziert ? '✨ Floss fertig!' : 'Ziehe die Teile auf das Floss'}
          </p>
        </div>
        <div className="w-[180px]" />
      </div>

      {/* Workbench - raft outline */}
      <div className="flex-1 flex items-center justify-center relative">
        {/* Wooden table backdrop */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="lightSpot" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#ffd97e" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ffd97e" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="800" height="600" fill="url(#lightSpot)" />
          {/* Sand/floor texture lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1="0"
              y1={75 * i + 20}
              x2="800"
              y2={75 * i + 20}
              stroke="#ffffff"
              strokeWidth="0.5"
              opacity="0.04"
            />
          ))}
        </svg>

        {/* Raft target zone - large rectangle showing piece outlines */}
        <div className="relative" style={{ width: 'min(560px, 80vw)', height: 'min(320px, 50vh)' }}>
          {/* Outlined raft frame */}
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              border: `3px dashed ${heldenfarbe}40`,
              background: 'rgba(120, 80, 40, 0.15)',
            }}
          />

          {/* Drop target placeholders */}
          {FLOSS_TEILE.map(teil => {
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
                  width: 80,
                  height: 80,
                  borderRadius: 16,
                  border: isPlatziert
                    ? 'none'
                    : `2px dashed ${heldenfarbe}60`,
                  background: isPlatziert ? `${heldenfarbe}30` : 'transparent',
                  transition: 'all 300ms ease',
                }}
              >
                <span
                  className="text-5xl transition-all duration-500"
                  style={{
                    opacity: isPlatziert ? 1 : 0.2,
                    filter: isPlatziert ? `drop-shadow(0 0 12px ${heldenfarbe})` : 'grayscale(1)',
                  }}
                >
                  {teil.emoji}
                </span>
              </div>
            );
          })}
        </div>

        {/* Done button - shows when complete */}
        {allesPlatziert && (
          <div className="absolute bottom-32 left-1/2 -translate-x-1/2 animate-screen-enter">
            <MagicButton onClick={onFertig} variant="gold" size="xl">
              Floss zu Wasser lassen! 🌊
            </MagicButton>
          </div>
        )}
      </div>

      {/* Bottom shelf - pieces to drag */}
      <div className="relative pb-6 pt-3 px-6 z-20" style={{ minHeight: 130 }}>
        <div className="flex gap-4 justify-center items-center flex-wrap bg-card/60 backdrop-blur rounded-3xl py-4 px-6 mx-auto" style={{ maxWidth: 720 }}>
          {offene.length === 0 && !allesPlatziert && (
            <p className="text-body font-display text-muted-foreground">
              Sammle erst noch mehr Teile in der Höhle 🌊
            </p>
          )}
          {offene.length === 0 && allesPlatziert && (
            <p className="text-body font-display text-card-foreground">
              ✨ Alles auf dem Floss! Bereit zum Ablegen.
            </p>
          )}
          {offene.map(id => {
            const teil = FLOSS_TEILE.find(t => t.id === id)!;
            const isDragging = dragging === id;
            return (
              <motion.div
                key={id}
                drag
                dragSnapToOrigin
                dragMomentum={false}
                onDragStart={() => setDragging(id)}
                onDragEnd={(e, info) => handleDragEnd(id, e, info)}
                whileDrag={{ scale: 1.25, zIndex: 50 }}
                className="cursor-grab active:cursor-grabbing select-none"
                style={{
                  touchAction: 'none',
                  filter: isDragging ? `drop-shadow(0 0 16px ${heldenfarbe})` : `drop-shadow(0 0 6px ${heldenfarbe}80)`,
                }}
              >
                <div
                  className="w-[88px] h-[88px] rounded-2xl flex flex-col items-center justify-center bg-card"
                  style={{ border: `2px solid ${heldenfarbe}80` }}
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
