export type Welt = 'wald' | 'stadt' | 'unterwasser' | 'weltraum';
export type SoundProfil = 'mutig' | 'leise' | 'schnell';
export type Superkraft = 'sehen' | 'schreiben' | 'zaehlen' | 'erschaffen';
export type Frisur = 'bob' | 'ponytail' | 'lang' | 'hochzopf' | 'locken' | 'kurz' | 'afro' | 'kopftuch';
export type Outfit = 'spinne' | 'glueck' | 'krieger' | 'ozean';

export interface AvatarConfig {
  hautfarbe: string;
  haarfarbe: string;
  frisur: Frisur;
  augenfarbe: string;
  outfit: Outfit;
  umhangfarbe: string;
  maskeAktiv: boolean;
  gehoerschutzAktiv: boolean;
  gehoerschutzFarbe: string;
  brilleAktiv: boolean;
}

export interface BuchstabenFortschritt {
  versuche: number;
  richtigBeimErstenVersuch: number;
  letzterVersuch: string;
  audioAbgespielt: number;
}

export interface Lernfortschritt {
  buchstaben: Record<string, BuchstabenFortschritt>;
  sessionsGesamt: number;
  durchschnittlicheSessionDauer: number;
  sternenstaub: number;
}

export interface HeldenschuleProfil {
  avatar: {
    name: string | null;
    config: AvatarConfig;
    welt: Welt;
    soundProfil: SoundProfil;
    superkraefte: Superkraft[];
  };
  profil: {
    entscheidungsTempo: number[];
    explorationsVerhalten: string[];
    audioEngagement: number;
    explorationsStil: 'sofort' | 'probierend' | 'unbekannt';
    zeitAufScreen: number[];
  };
  lernfortschritt: Lernfortschritt;
  erstellungsDatum: string;
}

export const HAUTFARBEN = [
  { id: 'sehr-hell', hex: '#FFE0C2' },
  { id: 'hell', hex: '#FDDCB5' },
  { id: 'mittelhell', hex: '#E8B88A' },
  { id: 'mittel', hex: '#D9A06D' },
  { id: 'oliv', hex: '#C68E5B' },
  { id: 'mittelbraun', hex: '#A67449' },
  { id: 'braun', hex: '#7B4B2A' },
  { id: 'dunkelbraun', hex: '#5C3416' },
  { id: 'sehr-dunkel', hex: '#3A2210' },
] as const;

export const HAARFARBEN = [
  { id: 'blond', hex: '#F5D76E' },
  { id: 'braun', hex: '#6B3E26' },
  { id: 'schwarz', hex: '#1A1A2E' },
  { id: 'rot', hex: '#C0392B' },
  { id: 'lila', hex: '#9B59B6' },
  { id: 'blau', hex: '#3498DB' },
] as const;

export const AUGENFARBEN = [
  { id: 'braun', hex: '#8B4513' },
  { id: 'blau', hex: '#3498DB' },
  { id: 'gruen', hex: '#27AE60' },
  { id: 'grau', hex: '#7F8C8D' },
  { id: 'lila', hex: '#8E44AD' },
  { id: 'gold', hex: '#D4AC0D' },
] as const;

export const FRISUREN: { id: Frisur; emoji: string; label: string }[] = [
  { id: 'bob', emoji: '💇‍♀️', label: 'Bob' },
  { id: 'ponytail', emoji: '🎀', label: 'Ponytail' },
  { id: 'lang', emoji: '✨', label: 'Lange Haare' },
  { id: 'hochzopf', emoji: '🌟', label: 'Hochzopf' },
  { id: 'locken', emoji: '🌀', label: 'Locken' },
  { id: 'kurz', emoji: '✂️', label: 'Kurz' },
  { id: 'afro', emoji: '🌟', label: 'Afro' },
  { id: 'kopftuch', emoji: '🧕', label: 'Kopftuch' },
];

export const OUTFITS: { id: Outfit; emoji: string; label: string }[] = [
  { id: 'spinne', emoji: '🕷️', label: 'Spinnen-Heldin' },
  { id: 'glueck', emoji: '🐞', label: 'Glücks-Heldin' },
  { id: 'krieger', emoji: '⚔️', label: 'Krieger-Heldin' },
  { id: 'ozean', emoji: '🌊', label: 'Ozean-Heldin' },
];

export const FARBEN = [
  { id: 'rot', label: 'Rot', hsl: '345 85% 55%', hex: '#e63462' },
  { id: 'lila', label: 'Lila', hsl: '280 60% 50%', hex: '#9333ea' },
  { id: 'blau', label: 'Blau', hsl: '220 80% 55%', hex: '#3b82f6' },
  { id: 'gruen', label: 'Grün', hsl: '150 60% 45%', hex: '#22c55e' },
  { id: 'gold', label: 'Gold', hsl: '45 100% 60%', hex: '#facc15' },
  { id: 'pink', label: 'Pink', hsl: '330 80% 65%', hex: '#ec4899' },
] as const;

export const WELTEN: { id: Welt; label: string; emoji: string; farbe: string }[] = [
  { id: 'wald', label: 'Magischer Wald', emoji: '🌳', farbe: '150 60% 25%' },
  { id: 'stadt', label: 'Nacht-Stadt', emoji: '🏙️', farbe: '220 60% 15%' },
  { id: 'unterwasser', label: 'Kristallhöhle', emoji: '🌊', farbe: '195 70% 20%' },
  { id: 'weltraum', label: 'Sternenhimmel', emoji: '🌌', farbe: '260 50% 10%' },
];

export const SOUNDS: { id: SoundProfil; label: string; emoji: string }[] = [
  { id: 'mutig', label: 'Mutig und laut', emoji: '🔊' },
  { id: 'leise', label: 'Leise und geheimnisvoll', emoji: '🌙' },
  { id: 'schnell', label: 'Schnell und wild', emoji: '⚡' },
];

export const KRAEFTE: { id: Superkraft; label: string; emoji: string }[] = [
  { id: 'sehen', label: 'Sehen', emoji: '👁️' },
  { id: 'schreiben', label: 'Schreiben', emoji: '✍️' },
  { id: 'zaehlen', label: 'Zählen', emoji: '🔢' },
  { id: 'erschaffen', label: 'Erschaffen', emoji: '🎨' },
];

export const createEmptyAvatarConfig = (): AvatarConfig => ({
  hautfarbe: '',
  haarfarbe: '',
  frisur: 'lang',
  augenfarbe: '',
  outfit: 'spinne',
  umhangfarbe: '',
  maskeAktiv: false,
  gehoerschutzAktiv: false,
  gehoerschutzFarbe: '#3b82f6',
  brilleAktiv: false,
});

export const GEHOERSCHUTZ_FARBEN = [
  { id: 'blau', hex: '#3b82f6', label: 'Blau' },
  { id: 'pink', hex: '#ec4899', label: 'Pink' },
  { id: 'lila', hex: '#9333ea', label: 'Lila' },
  { id: 'gruen', hex: '#22c55e', label: 'Grün' },
  { id: 'gelb', hex: '#facc15', label: 'Gelb' },
  { id: 'schwarz', hex: '#1f2937', label: 'Schwarz' },
] as const;
