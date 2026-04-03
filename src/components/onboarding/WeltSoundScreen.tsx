import { useState, useRef } from 'react';
import HeldAvatar from '@/components/avatar/HeldAvatar';
import MagicButton from '@/components/ui/MagicButton';
import OptionCard from '@/components/ui/OptionCard';
import { useSound } from '@/hooks/useSound';
import type { AvatarConfig, Welt, SoundProfil } from '@/types/profil';
import { WELTEN, SOUNDS } from '@/types/profil';

interface Props {
  avatarConfig: AvatarConfig;
  onSelect: (data: { maskeAktiv: boolean; welt: Welt; explored: string[]; sound: SoundProfil; playCount: number }) => void;
  onZurueck: () => void;
}

export default function WeltSoundScreen({ avatarConfig, onSelect, onZurueck }: Props) {
  const [maske, setMaske] = useState(avatarConfig.maskeAktiv);
  const [welt, setWelt] = useState<Welt | ''>('');
  const [sound, setSound] = useState<SoundProfil | ''>('');
  const explored = useRef<string[]>([]);
  const playCount = useRef(0);
  const { playMutig, playLeise, playSchnell } = useSound();

  const soundPlayers: Record<SoundProfil, () => void> = {
    mutig: playMutig,
    leise: playLeise,
    schnell: playSchnell,
  };

  const handleWeltTap = (w: Welt) => {
    if (!explored.current.includes(w)) explored.current.push(w);
    setWelt(w);
  };

  const handleSoundTap = (s: SoundProfil) => {
    playCount.current++;
    soundPlayers[s]();
    setSound(s);
  };

  const ready = welt && sound;

  return (
    <div className="flex flex-col items-center min-h-screen gap-6 px-8 py-8 animate-screen-enter overflow-y-auto">
      <button onClick={onZurueck} className="absolute top-6 left-6 text-muted-foreground text-body-lg font-display z-10" style={{ touchAction: 'manipulation' }}>
        ← Zurück
      </button>

      <div className="transition-transform duration-300 mt-4">
        <HeldAvatar config={{ ...avatarConfig, maskeAktiv: maske }} size={200} />
      </div>

      {/* Mask toggle */}
      <button
        onClick={() => setMaske(!maske)}
        className={`touch-target rounded-2xl px-8 py-4 font-display text-body-lg transition-all duration-300 ${maske ? 'bg-accent text-accent-foreground ring-4 ring-accent' : 'bg-card text-card-foreground ring-2 ring-border'}`}
        style={{ touchAction: 'manipulation' }}
      >
        {maske ? 'Maske an ✨' : 'Maske aus'}
      </button>

      {/* World selection */}
      <p className="text-body-lg font-display text-foreground">Dein geheimer Ort?</p>
      <div className="grid grid-cols-2 gap-3 w-full max-w-md">
        {WELTEN.map(w => (
          <OptionCard
            key={w.id}
            selected={welt === w.id}
            onClick={() => handleWeltTap(w.id)}
            className="flex flex-col items-center gap-1 py-4"
          >
            <span className="text-4xl">{w.emoji}</span>
            <span className="text-sm font-display text-card-foreground">{w.label}</span>
          </OptionCard>
        ))}
      </div>

      {/* Sound selection */}
      <p className="text-body-lg font-display text-foreground">Wie klingt deine Heldin?</p>
      <div className="flex flex-col gap-3 w-full max-w-md">
        {SOUNDS.map(s => (
          <OptionCard
            key={s.id}
            selected={sound === s.id}
            onClick={() => handleSoundTap(s.id)}
            className="flex items-center gap-4 px-6 py-4"
          >
            <span className="text-3xl">{s.emoji}</span>
            <span className="text-body-lg font-display text-card-foreground">{s.label}</span>
          </OptionCard>
        ))}
      </div>

      {ready && (
        <MagicButton
          onClick={() => onSelect({
            maskeAktiv: maske,
            welt: welt as Welt,
            explored: explored.current,
            sound: sound as SoundProfil,
            playCount: playCount.current,
          })}
          variant="gold"
          size="lg"
        >
          Das passt! ✨
        </MagicButton>
      )}

      <div className="h-8" />
    </div>
  );
}
