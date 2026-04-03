import { useState } from 'react';
import { FARBEN } from '@/types/profil';
import { useSound } from '@/hooks/useSound';

interface Props {
  onSelect: (farbe: string) => void;
}

export default function FarbwahlScreen({ onSelect }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const { playTone } = useSound();

  const handleTap = (farbe: typeof FARBEN[number]) => {
    playTone(440 + FARBEN.indexOf(farbe) * 80, 0.4, 'sine', 0.2);
    setSelected(farbe.id);
    setTimeout(() => onSelect(farbe.id), 1000);
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen gap-10 px-8 animate-screen-enter transition-all duration-700"
      style={{
        background: selected
          ? `linear-gradient(180deg, hsl(${FARBEN.find(f => f.id === selected)?.hsl} / 0.3), hsl(var(--background)))`
          : undefined,
      }}
    >
      <h1 className="text-title text-center font-display text-foreground">
        Welche Farbe hat deine Magie?
      </h1>

      <div className="grid grid-cols-3 gap-6">
        {FARBEN.map(farbe => (
          <button
            key={farbe.id}
            onClick={() => handleTap(farbe)}
            className={`
              touch-target w-[100px] h-[100px] rounded-full
              transition-all duration-300 ease-out
              active:scale-95
              ${selected === farbe.id ? 'scale-125 ring-4 ring-foreground/30' : 'hover:scale-105'}
            `}
            style={{
              backgroundColor: farbe.hex,
              touchAction: 'manipulation',
              boxShadow: selected === farbe.id
                ? `0 0 30px ${farbe.hex}, 0 0 60px ${farbe.hex}60`
                : `0 0 10px ${farbe.hex}40`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
