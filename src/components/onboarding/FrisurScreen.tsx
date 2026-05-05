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
    <div className="flex flex-col items-center min-h-screen gap-6 px-8 py-8 animate-screen-enter overflow-y-auto">
      <button onClick={onZurueck} className="absolute top-6 left-6 text-muted-foreground text-body-lg font-display z-10" style={{ touchAction: 'manipulation' }}>
        ← Zurück
      </button>

      <div className="transition-transform duration-300 mt-4" style={{ transform: selected ? 'scale(1)' : 'scale(0.95)' }}>
        <HeldAvatar config={{ ...avatarConfig, frisur: selected || 'lang' }} showBody={false} size={200} />
      </div>

      <p className="text-title text-center font-display text-foreground">
        Welche Frisur?
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl">
        {FRISUREN.map(f => (
          <OptionCard
            key={f.id}
            selected={selected === f.id}
            onClick={() => setSelected(f.id)}
            className="flex flex-col items-center gap-1 h-[150px] justify-center px-2"
          >
            <HeldAvatar config={{ ...avatarConfig, frisur: f.id }} showBody={false} size={70} />
            <span className="text-xs font-display text-card-foreground">{f.label}</span>
          </OptionCard>
        ))}
      </div>

      {selected && (
        <MagicButton onClick={() => onSelect(selected as Frisur)} variant="gold" size="lg">
          Weiter ✨
        </MagicButton>
      )}

      <div className="h-4" />
    </div>
  );
}
