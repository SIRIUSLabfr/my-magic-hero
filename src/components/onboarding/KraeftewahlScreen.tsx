import { useState } from 'react';
import { KRAEFTE, type Superkraft } from '@/types/profil';
import MagicButton from '@/components/ui/MagicButton';
import { useSound } from '@/hooks/useSound';

interface Props {
  onSelect: (kraefte: Superkraft[]) => void;
}

export default function KraeftewahlScreen({ onSelect }: Props) {
  const [selected, setSelected] = useState<Superkraft[]>([]);
  const { playTone } = useSound();

  const toggle = (kraft: Superkraft) => {
    playTone(500 + KRAEFTE.findIndex(k => k.id === kraft) * 100, 0.3, 'sine', 0.15);
    setSelected(prev =>
      prev.includes(kraft) ? prev.filter(k => k !== kraft) : [...prev, kraft]
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-8 animate-screen-enter">
      <h1 className="text-title text-center font-display text-foreground">
        Was kann deine Heldin besonders gut?
      </h1>

      <div className="grid grid-cols-2 gap-6">
        {KRAEFTE.map(kraft => {
          const isSelected = selected.includes(kraft.id);
          return (
            <button
              key={kraft.id}
              onClick={() => toggle(kraft.id)}
              className={`
                touch-target w-[120px] h-[120px] rounded-full
                flex flex-col items-center justify-center gap-2
                bg-card text-card-foreground
                font-display text-body-lg
                transition-all duration-300 ease-out
                active:scale-95
                ${isSelected ? 'ring-4 ring-accent scale-110' : 'ring-2 ring-border'}
              `}
              style={{
                touchAction: 'manipulation',
                boxShadow: isSelected ? '0 0 25px hsl(45 100% 60% / 0.5), 0 0 50px hsl(45 100% 60% / 0.2)' : undefined,
              }}
            >
              <span className="text-4xl">{kraft.emoji}</span>
              <span className="text-sm font-semibold">{kraft.label}</span>
            </button>
          );
        })}
      </div>

      {selected.length > 0 && (
        <div className="animate-screen-enter">
          <MagicButton onClick={() => onSelect(selected)} variant="gold" size="lg">
            Weiter ✨
          </MagicButton>
        </div>
      )}
    </div>
  );
}
