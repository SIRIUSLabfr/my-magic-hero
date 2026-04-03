import { useState, useRef } from 'react';
import { WELTEN, type Welt } from '@/types/profil';
import OptionCard from '@/components/ui/OptionCard';
import { useSound } from '@/hooks/useSound';

interface Props {
  onSelect: (welt: Welt, explored: string[]) => void;
}

const weltBGs: Record<Welt, string> = {
  wald: 'linear-gradient(180deg, hsl(150 40% 12%), hsl(150 60% 8%))',
  stadt: 'linear-gradient(180deg, hsl(220 50% 10%), hsl(240 40% 6%))',
  unterwasser: 'linear-gradient(180deg, hsl(195 60% 12%), hsl(200 70% 6%))',
  weltraum: 'linear-gradient(180deg, hsl(260 40% 8%), hsl(280 30% 4%))',
};

export default function WeltwahlScreen({ onSelect }: Props) {
  const [selected, setSelected] = useState<Welt | null>(null);
  const explored = useRef<string[]>([]);
  const { playTone } = useSound();

  const handleTap = (welt: Welt) => {
    if (!explored.current.includes(welt)) {
      explored.current.push(welt);
    }
    playTone(330 + WELTEN.findIndex(w => w.id === welt) * 60, 0.5, 'sine', 0.15);
    setSelected(welt);
    setTimeout(() => onSelect(welt, explored.current), 1200);
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen gap-8 px-8 animate-screen-enter transition-all duration-700"
      style={{ background: selected ? weltBGs[selected] : undefined }}
    >
      <h1 className="text-title text-center font-display text-foreground">
        Wo ist dein geheimer Ort?
      </h1>

      <div className="grid grid-cols-2 gap-5 max-w-xl">
        {WELTEN.map(welt => (
          <OptionCard
            key={welt.id}
            selected={selected === welt.id}
            onClick={() => handleTap(welt.id)}
            className={`flex flex-col items-center justify-center gap-3 w-[200px] h-[250px] ${selected === welt.id ? 'animate-card-flip' : ''}`}
          >
            <span className="text-6xl">{welt.emoji}</span>
            <span className="text-body-lg font-display text-card-foreground">{welt.label}</span>
          </OptionCard>
        ))}
      </div>
    </div>
  );
}
