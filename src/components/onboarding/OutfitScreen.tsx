import { useState } from 'react';
import HeldAvatar from '@/components/avatar/HeldAvatar';
import MagicButton from '@/components/ui/MagicButton';
import OptionCard from '@/components/ui/OptionCard';
import type { AvatarConfig, Outfit } from '@/types/profil';
import { OUTFITS } from '@/types/profil';

interface Props {
  avatarConfig: AvatarConfig;
  onSelect: (outfit: Outfit) => void;
  onZurueck: () => void;
}

export default function OutfitScreen({ avatarConfig, onSelect, onZurueck }: Props) {
  const [selected, setSelected] = useState<Outfit | ''>(avatarConfig.outfit || '');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-8 animate-screen-enter">
      <button onClick={onZurueck} className="absolute top-6 left-6 text-muted-foreground text-body-lg font-display" style={{ touchAction: 'manipulation' }}>
        ← Zurück
      </button>

      <div className="transition-transform duration-300" style={{ transform: selected ? 'scale(1)' : 'scale(0.95)' }}>
        <HeldAvatar config={{ ...avatarConfig, outfit: selected || 'anzug', umhangfarbe: avatarConfig.umhangfarbe || '#999' }} size={200} />
      </div>

      <p className="text-title text-center font-display text-foreground">
        Welches Outfit?
      </p>

      <div className="grid grid-cols-2 gap-4">
        {OUTFITS.map(o => (
          <OptionCard
            key={o.id}
            selected={selected === o.id}
            onClick={() => setSelected(o.id)}
            className="flex flex-col items-center gap-2 w-[140px] h-[140px] justify-center"
          >
            <span className="text-5xl">{o.emoji}</span>
          </OptionCard>
        ))}
      </div>

      {selected && (
        <MagicButton onClick={() => onSelect(selected as Outfit)} variant="gold" size="lg">
          Weiter ✨
        </MagicButton>
      )}
    </div>
  );
}
