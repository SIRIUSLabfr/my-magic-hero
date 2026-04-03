export interface BuchstabeBild {
  emoji: string;
  wort: string;
  istRichtig: boolean;
}

export interface BuchstabeData {
  buchstabe: string;
  laut: string;
  bilder: BuchstabeBild[];
}

export const BUCHSTABEN_DATEN: BuchstabeData[] = [
  { buchstabe: 'A', laut: 'aaa', bilder: [
    { emoji: '🍎', wort: 'Apfel', istRichtig: true },
    { emoji: '🐟', wort: 'Fisch', istRichtig: false },
    { emoji: '🌳', wort: 'Baum', istRichtig: false },
  ]},
  { buchstabe: 'E', laut: 'eee', bilder: [
    { emoji: '🐘', wort: 'Elefant', istRichtig: true },
    { emoji: '🏠', wort: 'Haus', istRichtig: false },
    { emoji: '🌙', wort: 'Mond', istRichtig: false },
  ]},
  { buchstabe: 'I', laut: 'iii', bilder: [
    { emoji: '🦔', wort: 'Igel', istRichtig: true },
    { emoji: '🎈', wort: 'Ballon', istRichtig: false },
    { emoji: '🐱', wort: 'Katze', istRichtig: false },
  ]},
  { buchstabe: 'O', laut: 'ooo', bilder: [
    { emoji: '👂', wort: 'Ohr', istRichtig: true },
    { emoji: '🌺', wort: 'Blume', istRichtig: false },
    { emoji: '⭐', wort: 'Stern', istRichtig: false },
  ]},
  { buchstabe: 'M', laut: 'mmm', bilder: [
    { emoji: '🌙', wort: 'Mond', istRichtig: true },
    { emoji: '🍎', wort: 'Apfel', istRichtig: false },
    { emoji: '🌈', wort: 'Regenbogen', istRichtig: false },
  ]},
  { buchstabe: 'L', laut: 'lll', bilder: [
    { emoji: '🦁', wort: 'Löwe', istRichtig: true },
    { emoji: '🐘', wort: 'Elefant', istRichtig: false },
    { emoji: '🍌', wort: 'Banane', istRichtig: false },
  ]},
  { buchstabe: 'S', laut: 'sss', bilder: [
    { emoji: '☀️', wort: 'Sonne', istRichtig: true },
    { emoji: '🦁', wort: 'Löwe', istRichtig: false },
    { emoji: '🏠', wort: 'Haus', istRichtig: false },
  ]},
  { buchstabe: 'N', laut: 'nnn', bilder: [
    { emoji: '🔩', wort: 'Nagel', istRichtig: true },
    { emoji: '☀️', wort: 'Sonne', istRichtig: false },
    { emoji: '🐟', wort: 'Fisch', istRichtig: false },
  ]},
  { buchstabe: 'T', laut: 'ttt', bilder: [
    { emoji: '🚪', wort: 'Tür', istRichtig: true },
    { emoji: '🦔', wort: 'Igel', istRichtig: false },
    { emoji: '🍎', wort: 'Apfel', istRichtig: false },
  ]},
  { buchstabe: 'R', laut: 'rrr', bilder: [
    { emoji: '🌹', wort: 'Rose', istRichtig: true },
    { emoji: '🌙', wort: 'Mond', istRichtig: false },
    { emoji: '🐘', wort: 'Elefant', istRichtig: false },
  ]},
];
