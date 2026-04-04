export interface BuchstabeBild {
  emoji: string;
  wort: string;
  istRichtig: boolean;
}

export interface BuchstabeData {
  buchstabe: string;
  bilder: BuchstabeBild[];
}

export interface SessionData {
  buchstaben: BuchstabeData[];
  loesungswort: string;
}

export const SESSIONS: SessionData[] = [
  {
    loesungswort: 'MALER',
    buchstaben: [
      { buchstabe: 'M', bilder: [
        { emoji: '🌙', wort: 'Mond', istRichtig: true },
        { emoji: '🍎', wort: 'Apfel', istRichtig: false },
        { emoji: '🌈', wort: 'Regenbogen', istRichtig: false },
      ]},
      { buchstabe: 'A', bilder: [
        { emoji: '🍎', wort: 'Apfel', istRichtig: true },
        { emoji: '🐟', wort: 'Fisch', istRichtig: false },
        { emoji: '🌳', wort: 'Baum', istRichtig: false },
      ]},
      { buchstabe: 'L', bilder: [
        { emoji: '🦁', wort: 'Löwe', istRichtig: true },
        { emoji: '🐘', wort: 'Elefant', istRichtig: false },
        { emoji: '🍌', wort: 'Banane', istRichtig: false },
      ]},
      { buchstabe: 'E', bilder: [
        { emoji: '🐘', wort: 'Elefant', istRichtig: true },
        { emoji: '🏠', wort: 'Haus', istRichtig: false },
        { emoji: '🌙', wort: 'Mond', istRichtig: false },
      ]},
      { buchstabe: 'R', bilder: [
        { emoji: '🌹', wort: 'Rose', istRichtig: true },
        { emoji: '🌙', wort: 'Mond', istRichtig: false },
        { emoji: '🐘', wort: 'Elefant', istRichtig: false },
      ]},
    ],
  },
  {
    loesungswort: 'STERN',
    buchstaben: [
      { buchstabe: 'S', bilder: [
        { emoji: '☀️', wort: 'Sonne', istRichtig: true },
        { emoji: '🦁', wort: 'Löwe', istRichtig: false },
        { emoji: '🏠', wort: 'Haus', istRichtig: false },
      ]},
      { buchstabe: 'T', bilder: [
        { emoji: '🚪', wort: 'Tür', istRichtig: true },
        { emoji: '🦔', wort: 'Igel', istRichtig: false },
        { emoji: '🍎', wort: 'Apfel', istRichtig: false },
      ]},
      { buchstabe: 'E', bilder: [
        { emoji: '🐘', wort: 'Elefant', istRichtig: true },
        { emoji: '🌺', wort: 'Blume', istRichtig: false },
        { emoji: '⭐', wort: 'Stern', istRichtig: false },
      ]},
      { buchstabe: 'R', bilder: [
        { emoji: '🌹', wort: 'Rose', istRichtig: true },
        { emoji: '🍌', wort: 'Banane', istRichtig: false },
        { emoji: '🐱', wort: 'Katze', istRichtig: false },
      ]},
      { buchstabe: 'N', bilder: [
        { emoji: '🔩', wort: 'Nagel', istRichtig: true },
        { emoji: '☀️', wort: 'Sonne', istRichtig: false },
        { emoji: '🐟', wort: 'Fisch', istRichtig: false },
      ]},
    ],
  },
  {
    loesungswort: 'INSEL',
    buchstaben: [
      { buchstabe: 'I', bilder: [
        { emoji: '🦔', wort: 'Igel', istRichtig: true },
        { emoji: '🎈', wort: 'Ballon', istRichtig: false },
        { emoji: '🐱', wort: 'Katze', istRichtig: false },
      ]},
      { buchstabe: 'N', bilder: [
        { emoji: '🔩', wort: 'Nagel', istRichtig: true },
        { emoji: '🌺', wort: 'Blume', istRichtig: false },
        { emoji: '🍎', wort: 'Apfel', istRichtig: false },
      ]},
      { buchstabe: 'S', bilder: [
        { emoji: '☀️', wort: 'Sonne', istRichtig: true },
        { emoji: '🐘', wort: 'Elefant', istRichtig: false },
        { emoji: '🌙', wort: 'Mond', istRichtig: false },
      ]},
      { buchstabe: 'E', bilder: [
        { emoji: '🐘', wort: 'Elefant', istRichtig: true },
        { emoji: '🚪', wort: 'Tür', istRichtig: false },
        { emoji: '🌈', wort: 'Regenbogen', istRichtig: false },
      ]},
      { buchstabe: 'L', bilder: [
        { emoji: '🦁', wort: 'Löwe', istRichtig: true },
        { emoji: '🌹', wort: 'Rose', istRichtig: false },
        { emoji: '⭐', wort: 'Stern', istRichtig: false },
      ]},
    ],
  },
  {
    loesungswort: 'TIGER',
    buchstaben: [
      { buchstabe: 'T', bilder: [
        { emoji: '🚪', wort: 'Tür', istRichtig: true },
        { emoji: '🌙', wort: 'Mond', istRichtig: false },
        { emoji: '🍌', wort: 'Banane', istRichtig: false },
      ]},
      { buchstabe: 'I', bilder: [
        { emoji: '🦔', wort: 'Igel', istRichtig: true },
        { emoji: '🌹', wort: 'Rose', istRichtig: false },
        { emoji: '☀️', wort: 'Sonne', istRichtig: false },
      ]},
      { buchstabe: 'G', bilder: [
        { emoji: '🎸', wort: 'Gitarre', istRichtig: true },
        { emoji: '🐟', wort: 'Fisch', istRichtig: false },
        { emoji: '🏠', wort: 'Haus', istRichtig: false },
      ]},
      { buchstabe: 'E', bilder: [
        { emoji: '🐘', wort: 'Elefant', istRichtig: true },
        { emoji: '🍎', wort: 'Apfel', istRichtig: false },
        { emoji: '🦁', wort: 'Löwe', istRichtig: false },
      ]},
      { buchstabe: 'R', bilder: [
        { emoji: '🌹', wort: 'Rose', istRichtig: true },
        { emoji: '🔩', wort: 'Nagel', istRichtig: false },
        { emoji: '🎈', wort: 'Ballon', istRichtig: false },
      ]},
    ],
  },
];

// Flat list for backward compat
export const BUCHSTABEN_DATEN: BuchstabeData[] = SESSIONS.flatMap(s => s.buchstaben);
