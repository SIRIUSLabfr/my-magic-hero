import { FARBEN, WELTEN } from '@/types/profil';
import type { HeldenschuleProfil } from '@/types/profil';
import OptionCard from '@/components/ui/OptionCard';
import MagicButton from '@/components/ui/MagicButton';

interface Props {
  profil: HeldenschuleProfil;
  onNavigate: (target: 'geheimschrift' | 'kreativ' | 'neustart') => void;
}

export default function HeldenPlatz({ profil, onNavigate }: Props) {
  const farbe = FARBEN.find(f => f.id === profil.avatar.hauptfarbe);
  const welt = WELTEN.find(w => w.id === profil.avatar.welt);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-8 animate-screen-enter">
      {/* Avatar */}
      <div
        className="w-32 h-32 rounded-full flex items-center justify-center animate-gentle-pulse"
        style={{
          backgroundColor: farbe?.hex || '#e63462',
          boxShadow: `0 0 30px ${farbe?.hex || '#e63462'}60`,
        }}
      >
        <span className="text-5xl">{welt?.emoji || '✨'}</span>
      </div>

      <h1 className="text-hero text-center font-display text-foreground">
        {profil.avatar.name || 'Deine Heldin'}
      </h1>

      {/* Orte */}
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
          className="rounded-3xl px-6 py-5 flex items-center gap-5 opacity-40 cursor-default"
          style={{ backgroundColor: 'hsl(var(--card))' }}
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
