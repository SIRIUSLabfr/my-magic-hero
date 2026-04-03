import HeldAvatar from '@/components/avatar/HeldAvatar';
import MagicButton from '@/components/ui/MagicButton';
import type { AvatarConfig } from '@/types/profil';

interface Props {
  buchstaben: string[];
  heldenfarbe: string;
  avatarConfig: AvatarConfig;
  onWeiter: () => void;
  onZurueck: () => void;
}

export default function SessionEndeScreen({ buchstaben, heldenfarbe, avatarConfig, onWeiter, onZurueck }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-8 animate-screen-enter">
      <HeldAvatar config={avatarConfig} size={180} />

      <p className="text-title text-center font-display text-foreground">
        Deine Heldin hat neue Geheimzeichen entdeckt!
      </p>

      <div className="flex gap-4 flex-wrap justify-center">
        {buchstaben.map(b => (
          <span
            key={b}
            className="text-[80px] font-display font-bold"
            style={{
              color: heldenfarbe,
              textShadow: `0 0 20px ${heldenfarbe}60`,
            }}
          >
            {b}
          </span>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4 mt-4">
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
