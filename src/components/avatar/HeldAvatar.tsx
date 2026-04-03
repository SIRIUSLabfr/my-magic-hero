import AvatarUmhang from './AvatarUmhang';
import AvatarKoerper from './AvatarKoerper';
import AvatarOutfit from './AvatarOutfit';
import AvatarHaare from './AvatarHaare';
import AvatarGesicht from './AvatarGesicht';
import AvatarMaske from './AvatarMaske';
import type { AvatarConfig } from '@/types/profil';

interface Props {
  config: AvatarConfig;
  size?: number;
  showBody?: boolean; // false = only head preview
}

const PLACEHOLDER = '#888';

export default function HeldAvatar({ config, size = 300, showBody = true }: Props) {
  const h = config.hautfarbe || PLACEHOLDER;
  const haar = config.haarfarbe || PLACEHOLDER;
  const augen = config.augenfarbe || '#3498DB';
  const umhang = config.umhangfarbe || PLACEHOLDER;
  const outfit = config.outfit || 'anzug';
  const frisur = config.frisur || 'lang';

  if (!showBody) {
    // Head-only preview
    return (
      <svg viewBox="20 10 260 140" width={size} height={size * 0.54} xmlns="http://www.w3.org/2000/svg">
        {/* Head */}
        <circle cx="150" cy="80" r="52" fill={h} />
        <ellipse cx="97" cy="82" rx="8" ry="12" fill={h} />
        <ellipse cx="203" cy="82" rx="8" ry="12" fill={h} />
        {/* Hair */}
        <AvatarHaare frisur={frisur} farbe={haar} />
        {/* Face */}
        <AvatarGesicht augenfarbe={augen} />
        {/* Mask */}
        {config.maskeAktiv && <AvatarMaske farbe={umhang} />}
      </svg>
    );
  }

  return (
    <svg
      viewBox="60 10 180 310"
      width={size}
      height={size * (310 / 180)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cape behind */}
      {umhang !== PLACEHOLDER && <AvatarUmhang farbe={umhang} />}
      {/* Body */}
      <AvatarKoerper hautfarbe={h} />
      {/* Outfit */}
      {umhang !== PLACEHOLDER && <AvatarOutfit outfit={outfit} farbe={umhang} />}
      {/* Hair */}
      {haar !== PLACEHOLDER && <AvatarHaare frisur={frisur} farbe={haar} />}
      {/* Face */}
      <AvatarGesicht augenfarbe={augen} />
      {/* Mask */}
      {config.maskeAktiv && <AvatarMaske farbe={umhang} />}
    </svg>
  );
}
