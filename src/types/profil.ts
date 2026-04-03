export type Welt = 'wald' | 'stadt' | 'unterwasser' | 'weltraum';
export type SoundProfil = 'mutig' | 'leise' | 'schnell';
export type Superkraft = 'sehen' | 'schreiben' | 'zaehlen' | 'erschaffen';

export interface HeldenschuleProfil {
  avatar: {
    name: string | null;
    hauptfarbe: string;
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
  erstellungsDatum: string;
}

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
