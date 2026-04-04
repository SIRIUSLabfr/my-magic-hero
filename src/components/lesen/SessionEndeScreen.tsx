import HeldAvatar from '@/components/avatar/HeldAvatar';
import MagicButton from '@/components/ui/MagicButton';
import type { AvatarConfig } from '@/types/profil';

interface Props {
  buchstaben: string[];
  loesungswort: string;
  sternenstaub: number;
  heldenfarbe: string;
  avatarConfig: AvatarConfig;
  onWeiter: () => void;
  onZurueck: () => void;
}

export default function SessionEndeScreen({ buchstaben, loesungswort, sternenstaub, heldenfarbe, avatarConfig, onWeiter, onZurueck }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-8 animate-screen-enter">
      <HeldAvatar config={avatarConfig} size={180} />

      <p className="text-title text-center font-display text-foreground">
        Deine Heldin hat neue Geheimzeichen entdeckt!
      </p>

      <div className="flex gap-4 flex-wrap justify-center">
        {buchstaben.map((b, i) => (
          <span
            key={i}
            className="text-[60px] font-display font-bold"
            style={{
              color: heldenfarbe,
              textShadow: `0 0 20px ${heldenfarbe}60`,
            }}
          >
            {b}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2 px-6 py-3 rounded-2xl" style={{ background: `${heldenfarbe}20` }}>
        <span className="text-3xl">✨</span>
        <span className="text-body-lg font-display" style={{ color: heldenfarbe }}>
          Geheimwort: <strong>{loesungswort}</strong>
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-3xl">⭐</span>
        <span className="text-body-lg font-display" style={{ color: heldenfarbe }}>
          +{sternenstaub} Sternenstaub
        </span>
      </div>

      <div className="flex flex-col items-center gap-4 mt-2">
        <MagicButton onClick={onWeiter} variant="gold" size="lg">
          Mehr entdecken ✨
        </MagicButton>
        <MagicButton onClick={onZurueck} variant="secondary" size="lg">
          Zurück zum Heldenplatz 🏠
        </MagicButton>
      </div>
    </div>
  );
}
