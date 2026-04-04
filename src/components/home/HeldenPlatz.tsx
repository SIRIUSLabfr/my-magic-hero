import HeldAvatar from '@/components/avatar/HeldAvatar';
import type { HeldenschuleProfil } from '@/types/profil';
import { WELTEN } from '@/types/profil';
import OptionCard from '@/components/ui/OptionCard';

interface Props {
  profil: HeldenschuleProfil;
  onNavigate: (target: 'geheimschrift' | 'kreativ' | 'neustart') => void;
}

export default function HeldenPlatz({ profil, onNavigate }: Props) {
  const sternenstaub = profil.lernfortschritt.sternenstaub || 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-8 animate-screen-enter">
      <HeldAvatar config={profil.avatar.config} size={200} />

      <h1 className="text-hero text-center font-display text-foreground">
        {profil.avatar.name || 'Deine Heldin'}
      </h1>

      {sternenstaub > 0 && (
        <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: `${profil.avatar.config.umhangfarbe}20` }}>
          <span className="text-xl">⭐</span>
          <span className="text-body-lg font-display" style={{ color: profil.avatar.config.umhangfarbe }}>
            {sternenstaub} Sternenstaub
          </span>
        </div>
      )}

      <div className="flex flex-col gap-5 w-full max-w-md">
        <OptionCard
          selected={false}
          onClick={() => onNavigate('geheimschrift')}
          className="flex items-center gap-5 px-6 py-5"
        >
          <span className="text-5xl">🔮</span>
          <span className="text-body-lg font-display text-card-foreground">Geheimschrift-Turm</span>
        </OptionCard>

        <OptionCard
          selected={false}
          onClick={() => onNavigate('kreativ')}
          className="flex items-center gap-5 px-6 py-5"
        >
          <span className="text-5xl">🎨</span>
          <span className="text-body-lg font-display text-card-foreground">Kreativ-Höhle</span>
        </OptionCard>

        <div
          className="rounded-3xl px-6 py-5 flex items-center gap-5 opacity-40 cursor-default bg-card"
        >
          <span className="text-5xl grayscale">🔢</span>
          <div className="flex flex-col">
            <span className="text-body-lg font-display text-card-foreground">Zahlen-Labor</span>
            <span className="text-sm text-muted-foreground font-body">Bald...</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => onNavigate('neustart')}
        className="text-muted-foreground text-body font-display transition-opacity hover:opacity-80 mt-4"
        style={{ touchAction: 'manipulation' }}
      >
        Heldin ändern ✨
      </button>
    </div>
  );
}
