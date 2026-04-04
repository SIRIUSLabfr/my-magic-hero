import { useState, useEffect, useMemo } from 'react';
import type { BuchstabeData } from '@/types/buchstaben';
import { useSound } from '@/hooks/useSound';

interface Props {
  data: BuchstabeData;
  heldenfarbe: string;
  onRichtig: (erstenVersuch: boolean, audioCount: number) => void;
}

export default function BuchstabeScreen({ data, heldenfarbe, onRichtig }: Props) {
  const { playChime, playTone } = useSound();
  const [fehler, setFehler] = useState(0);
  const [wackelId, setWackelId] = useState<number | null>(null);
  const [richtig, setRichtig] = useState(false);
  const [hintActive, setHintActive] = useState(false);

  const shuffledBilder = useMemo(() => {
    const arr = data.bilder.map((b, i) => ({ ...b, origIndex: i }));
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [data.buchstabe]);

  useEffect(() => {
    if (fehler >= 2) setHintActive(true);
  }, [fehler]);

  const handleBildTap = (bild: typeof shuffledBilder[number], index: number) => {
    if (richtig) return;

    if (bild.istRichtig) {
      setRichtig(true);
      playChime();
      setTimeout(() => onRichtig(fehler === 0, 0), 1500);
    } else {
      playTone(200, 0.2, 'sine', 0.1);
      setFehler(f => f + 1);
      setWackelId(index);
      setTimeout(() => setWackelId(null), 400);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-10 px-8 animate-screen-enter">
      {/* Big letter */}
      <div
        className={`text-[200px] leading-none font-display font-bold transition-all duration-500 ${richtig ? 'opacity-0 -translate-y-20' : ''}`}
        style={{
          color: heldenfarbe,
          textShadow: `0 0 40px ${heldenfarbe}80, 0 0 80px ${heldenfarbe}30`,
        }}
      >
        {data.buchstabe}
      </div>

      {/* Image choices */}
      <div className="flex gap-8">
        {shuffledBilder.map((bild, i) => {
          const isCorrect = bild.istRichtig;
          const showHint = hintActive && isCorrect;
          const showGlow = richtig && isCorrect;

          return (
            <button
              key={i}
              onClick={() => handleBildTap(bild, i)}
              className={`
                touch-target w-[120px] h-[120px] rounded-3xl
                bg-card flex flex-col items-center justify-center gap-1
                transition-all duration-300
                active:scale-95
                ${wackelId === i ? 'animate-wiggle' : ''}
                ${showHint ? 'animate-gentle-pulse' : ''}
              `}
              style={{
                touchAction: 'manipulation',
                boxShadow: showGlow
                  ? `0 0 30px ${heldenfarbe}, 0 0 60px ${heldenfarbe}60`
                  : showHint
                  ? `0 0 15px ${heldenfarbe}40`
                  : undefined,
              }}
            >
              <span className="text-5xl">{bild.emoji}</span>
              <span className="text-xs text-muted-foreground font-body">{bild.wort}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
