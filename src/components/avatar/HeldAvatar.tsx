import AvatarUmhang from './AvatarUmhang';
import AvatarKoerper from './AvatarKoerper';
import AvatarOutfit from './AvatarOutfit';
import AvatarHaare from './AvatarHaare';
import AvatarGesicht from './AvatarGesicht';
import AvatarMaske from './AvatarMaske';
import AvatarGehoerschutz from './AvatarGehoerschutz';
import AvatarBrille from './AvatarBrille';
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
  const outfit = config.outfit || 'spinne';
  const frisur = config.frisur || 'lang';

  if (!showBody) {
    // Head-only preview
    return (
      <svg viewBox="20 0 260 140" width={size} height={size * 0.54} xmlns="http://www.w3.org/2000/svg">
        {/* Head */}
        <circle cx="150" cy="75" r="55" fill={h} />
        {/* Ears - hidden when wearing hearing protection */}
        {!config.gehoerschutzAktiv && <ellipse cx="94" cy="78" rx="7" ry="10" fill={h} />}
        {!config.gehoerschutzAktiv && <ellipse cx="206" cy="78" rx="7" ry="10" fill={h} />}
        {/* Hair */}
        <AvatarHaare frisur={frisur} farbe={haar} />
        {/* Face */}
        <AvatarGesicht augenfarbe={augen} />
        {/* Glasses (over face, under mask) */}
        {config.brilleAktiv && <AvatarBrille />}
        {/* Mask */}
        {config.maskeAktiv && <AvatarMaske farbe={umhang} />}
        {/* Hearing protection - over hair, top layer */}
        {config.gehoerschutzAktiv && <AvatarGehoerschutz farbe={config.gehoerschutzFarbe || '#3b82f6'} />}
      </svg>
    );
  }

  return (
    <svg
      viewBox="60 -10 180 340"
      width={size}
      height={size * (340 / 180)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cape behind */}
      {umhang !== PLACEHOLDER && <AvatarUmhang farbe={umhang} />}
      {/* Body (ears are part of body but we mask them when gehoerschutz is on by overlay) */}
      <AvatarKoerper hautfarbe={h} />
      {/* Outfit */}
      {umhang !== PLACEHOLDER && <AvatarOutfit outfit={outfit} farbe={umhang} />}
      {/* Hair */}
      {haar !== PLACEHOLDER && <AvatarHaare frisur={frisur} farbe={haar} />}
      {/* Face */}
      <AvatarGesicht augenfarbe={augen} />
      {/* Glasses */}
      {config.brilleAktiv && <AvatarBrille />}
      {/* Mask */}
      {config.maskeAktiv && <AvatarMaske farbe={umhang} />}
      {/* Hearing protection - drawn last (over hair) */}
      {config.gehoerschutzAktiv && <AvatarGehoerschutz farbe={config.gehoerschutzFarbe || '#3b82f6'} />}
    </svg>
  );
}
