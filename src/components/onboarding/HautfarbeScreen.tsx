import { useState } from 'react';
import HeldAvatar from '@/components/avatar/HeldAvatar';
import MagicButton from '@/components/ui/MagicButton';
import type { AvatarConfig } from '@/types/profil';
import { HAUTFARBEN } from '@/types/profil';

interface Props {
  avatarConfig: AvatarConfig;
  onSelect: (hex: string) => void;
  onZurueck: () => void;
}

export default function HautfarbeScreen({ avatarConfig, onSelect, onZurueck }: Props) {
  const [selected, setSelected] = useState(avatarConfig.hautfarbe || '');

  return (
    <div className="flex flex-col items-center min-h-screen gap-6 px-8 py-8 animate-screen-enter overflow-y-auto">
      <button onClick={onZurueck} className="absolute top-6 left-6 text-muted-foreground text-body-lg font-display z-10" style={{ touchAction: 'manipulation' }}>
        ← Zurück
      </button>

      <div className="transition-transform duration-300 mt-4" style={{ transform: selected ? 'scale(1)' : 'scale(0.95)' }}>
        <HeldAvatar config={{ ...avatarConfig, hautfarbe: selected || '#888' }} showBody={false} size={200} />
      </div>

      <p className="text-title text-center font-display text-foreground">
        Wie sieht deine Heldin aus?
      </p>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 max-w-xl">
        {HAUTFARBEN.map(h => (
          <button
            key={h.id}
            onClick={() => setSelected(h.hex)}
            className={`w-[72px] h-[72px] rounded-full transition-all duration-300 ${selected === h.hex ? 'ring-4 ring-accent scale-110' : 'ring-2 ring-border'}`}
            style={{
              backgroundColor: h.hex,
              touchAction: 'manipulation',
              boxShadow: selected === h.hex ? `0 0 20px ${h.hex}80` : undefined,
            }}
          />
        ))}
      </div>

      {selected && (
        <MagicButton onClick={() => onSelect(selected)} variant="gold" size="lg">
          Weiter ✨
        </MagicButton>
      )}

      <div className="h-4" />
    </div>
  );
}
