import { useState } from 'react';
import HeldAvatar from '@/components/avatar/HeldAvatar';
import MagicButton from '@/components/ui/MagicButton';
import OptionCard from '@/components/ui/OptionCard';
import type { AvatarConfig, Frisur } from '@/types/profil';
import { FRISUREN } from '@/types/profil';

interface Props {
  avatarConfig: AvatarConfig;
  onSelect: (frisur: Frisur) => void;
  onZurueck: () => void;
}

export default function FrisurScreen({ avatarConfig, onSelect, onZurueck }: Props) {
  const [selected, setSelected] = useState<Frisur | ''>(avatarConfig.frisur || '');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-8 animate-screen-enter">
      <button onClick={onZurueck} className="absolute top-6 left-6 text-muted-foreground text-body-lg font-display" style={{ touchAction: 'manipulation' }}>
        ← Zurück
      </button>

      <div className="transition-transform duration-300" style={{ transform: selected ? 'scale(1)' : 'scale(0.95)' }}>
        <HeldAvatar config={{ ...avatarConfig, frisur: selected || 'lang' }} showBody={false} size={220} />
      </div>

      <p className="text-title text-center font-display text-foreground">
        Welche Frisur?
      </p>

      <div className="grid grid-cols-2 gap-4">
        {FRISUREN.map(f => (
          <OptionCard
            key={f.id}
            selected={selected === f.id}
            onClick={() => setSelected(f.id)}
            className="flex flex-col items-center gap-2 w-[140px] h-[140px] justify-center"
          >
            <HeldAvatar config={{ ...avatarConfig, frisur: f.id }} showBody={false} size={80} />
          </OptionCard>
        ))}
      </div>

      {selected && (
        <MagicButton onClick={() => onSelect(selected as Frisur)} variant="gold" size="lg">
          Weiter ✨
        </MagicButton>
      )}
    </div>
  );
}
