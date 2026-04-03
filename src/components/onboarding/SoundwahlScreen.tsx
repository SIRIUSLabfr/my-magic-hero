import { useState } from 'react';
import { SOUNDS, type SoundProfil } from '@/types/profil';
import MagicButton from '@/components/ui/MagicButton';
import { useSound } from '@/hooks/useSound';

interface Props {
  onSelect: (sound: SoundProfil, playCount: number) => void;
}

export default function SoundwahlScreen({ onSelect }: Props) {
  const [selected, setSelected] = useState<SoundProfil | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const { playMutig, playLeise, playSchnell, getPlayCount, resetPlayCount } = useSound();

  const soundPlayers: Record<SoundProfil, () => void> = {
    mutig: playMutig,
    leise: playLeise,
    schnell: playSchnell,
  };

  const handleTap = (sound: SoundProfil) => {
    setSelected(sound);
    setPlayingId(sound);
    soundPlayers[sound]();
    setTimeout(() => setPlayingId(null), 600);
  };

  const handleConfirm = () => {
    if (selected) {
      onSelect(selected, getPlayCount());
      resetPlayCount();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-8 animate-screen-enter">
      <h1 className="text-title text-center font-display text-foreground">
        Wie klingt deine Heldin?
      </h1>

      <div className="flex flex-col gap-5 w-full max-w-md">
        {SOUNDS.map(sound => (
          <button
            key={sound.id}
            onClick={() => handleTap(sound.id)}
            className={`
              touch-target rounded-2xl px-8 py-6
              bg-card text-card-foreground
              font-display text-body-lg
              transition-all duration-300 ease-out
              active:scale-95 flex items-center gap-4
              ${selected === sound.id ? 'ring-4 ring-accent scale-105 glow-gold' : 'ring-2 ring-border'}
              ${playingId === sound.id ? 'scale-110' : ''}
            `}
            style={{ touchAction: 'manipulation' }}
          >
            <span className="text-4xl">{sound.emoji}</span>
            <span>{sound.label}</span>
          </button>
        ))}
      </div>

      {selected && (
        <div className="animate-screen-enter">
          <MagicButton onClick={handleConfirm} variant="gold" size="lg">
            Das passt! ✨
          </MagicButton>
        </div>
      )}
    </div>
  );
}
