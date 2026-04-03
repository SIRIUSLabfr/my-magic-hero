import { useState } from 'react';
import HeldAvatar from '@/components/avatar/HeldAvatar';
import MagicButton from '@/components/ui/MagicButton';
import type { AvatarConfig } from '@/types/profil';
import { FARBEN } from '@/types/profil';

interface Props {
  avatarConfig: AvatarConfig;
  onSelect: (hex: string) => void;
  onZurueck: () => void;
}

export default function UmhangfarbeScreen({ avatarConfig, onSelect, onZurueck }: Props) {
  const [selected, setSelected] = useState(avatarConfig.umhangfarbe || '');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-8 animate-screen-enter">
      <button onClick={onZurueck} className="absolute top-6 left-6 text-muted-foreground text-body-lg font-display" style={{ touchAction: 'manipulation' }}>
        ← Zurück
      </button>

      <div className="transition-transform duration-300" style={{ transform: selected ? 'scale(1)' : 'scale(0.95)' }}>
        <HeldAvatar config={{ ...avatarConfig, umhangfarbe: selected || '#999' }} size={200} />
      </div>

      <p className="text-title text-center font-display text-foreground">
        Welche Farbe hat deine Magie?
      </p>

      <div className="grid grid-cols-3 gap-5">
        {FARBEN.map(f => (
          <button
            key={f.id}
            onClick={() => setSelected(f.hex)}
            className={`w-[90px] h-[90px] rounded-full transition-all duration-300 ${selected === f.hex ? 'ring-4 ring-accent scale-110' : 'ring-2 ring-border'}`}
            style={{
              backgroundColor: f.hex,
              touchAction: 'manipulation',
              boxShadow: selected === f.hex ? `0 0 20px ${f.hex}80` : undefined,
            }}
          />
        ))}
      </div>

      {selected && (
        <MagicButton onClick={() => onSelect(selected)} variant="gold" size="lg">
          Weiter ✨
        </MagicButton>
      )}
    </div>
  );
}
