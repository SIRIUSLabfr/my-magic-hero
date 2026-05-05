export type ItemKategorie = 'floss' | 'proviant' | 'schleuder' | 'fisch';

export interface SammelItem {
  id: string;
  kategorie: ItemKategorie;
  /** German word the child has to learn (matches the slot count in the puzzle) */
  wort: string;
  emoji: string;
  label: string;
  /** Hint shown after a few wrong attempts */
  hinweis: string;
  /** Position in the cave scene (percent of viewBox) */
  versteckt: { x: number; y: number };
}

export interface FlossTeilDetail extends SammelItem {
  kategorie: 'floss';
  /** Position on the raft assembly (drop target) */
  zielPosition: { x: number; y: number; rotation: number };
}

export interface SchleuderTeilDetail extends SammelItem {
  kategorie: 'schleuder';
  /** Position on the slingshot assembly */
  zielPosition: { x: number; y: number; rotation: number };
}

export const FLOSS_TEILE: FlossTeilDetail[] = [
  {
    id: 'ast',
    kategorie: 'floss',
    wort: 'AST',
    emoji: '🪵',
    label: 'Ast',
    hinweis: 'Ein dünner Holzstock vom Baum.',
    versteckt: { x: 14, y: 70 },
    zielPosition: { x: 50, y: 35, rotation: 0 },
  },
  {
    id: 'brett',
    kategorie: 'floss',
    wort: 'BRETT',
    emoji: '🟫',
    label: 'Brett',
    hinweis: 'Ein flaches Stück Holz.',
    versteckt: { x: 24, y: 76 },
    zielPosition: { x: 50, y: 55, rotation: 0 },
  },
  {
    id: 'seil',
    kategorie: 'floss',
    wort: 'SEIL',
    emoji: '🪢',
    label: 'Seil',
    hinweis: 'Damit kann man Sachen festbinden.',
    versteckt: { x: 8, y: 84 },
    zielPosition: { x: 30, y: 50, rotation: -15 },
  },
  {
    id: 'fass',
    kategorie: 'floss',
    wort: 'FASS',
    emoji: '🛢️',
    label: 'Fass',
    hinweis: 'Ein rundes Behältnis aus Holz.',
    versteckt: { x: 30, y: 88 },
    zielPosition: { x: 70, y: 50, rotation: 15 },
  },
  {
    id: 'segel',
    kategorie: 'floss',
    wort: 'SEGEL',
    emoji: '⛵',
    label: 'Segel',
    hinweis: 'Damit fängt das Floss den Wind ein.',
    versteckt: { x: 18, y: 56 },
    zielPosition: { x: 50, y: 15, rotation: 0 },
  },
];

export const PROVIANT_ITEMS: SammelItem[] = [
  {
    id: 'banane',
    kategorie: 'proviant',
    wort: 'BANANE',
    emoji: '🍌',
    label: 'Banane',
    hinweis: 'Eine gelbe, krumme Frucht.',
    versteckt: { x: 78, y: 38 },
  },
  {
    id: 'kokos',
    kategorie: 'proviant',
    wort: 'KOKOS',
    emoji: '🥥',
    label: 'Kokosnuss',
    hinweis: 'Eine harte, runde Nuss von der Palme.',
    versteckt: { x: 86, y: 50 },
  },
  {
    id: 'pilz',
    kategorie: 'proviant',
    wort: 'PILZ',
    emoji: '🍄',
    label: 'Pilz',
    hinweis: 'Wächst im Wald, hat einen Hut.',
    versteckt: { x: 70, y: 78 },
  },
  {
    id: 'beere',
    kategorie: 'proviant',
    wort: 'BEERE',
    emoji: '🫐',
    label: 'Beere',
    hinweis: 'Eine kleine, runde, blaue Frucht.',
    versteckt: { x: 92, y: 70 },
  },
];

export const SCHLEUDER_TEILE: SchleuderTeilDetail[] = [
  {
    id: 'gabel',
    kategorie: 'schleuder',
    wort: 'GABEL',
    emoji: '🌿',
    label: 'Astgabel',
    hinweis: 'Ein Y-förmiger Ast für die Schleuder.',
    versteckt: { x: 50, y: 30 },
    zielPosition: { x: 50, y: 60, rotation: 0 },
  },
  {
    id: 'gummi',
    kategorie: 'schleuder',
    wort: 'GUMMI',
    emoji: '➰',
    label: 'Gummi',
    hinweis: 'Es dehnt sich und schnellt zurück.',
    versteckt: { x: 58, y: 88 },
    zielPosition: { x: 50, y: 30, rotation: 0 },
  },
  {
    id: 'stein',
    kategorie: 'schleuder',
    wort: 'STEIN',
    emoji: '🪨',
    label: 'Stein',
    hinweis: 'Hart und schwer, fliegt weit.',
    versteckt: { x: 64, y: 70 },
    zielPosition: { x: 50, y: 45, rotation: 0 },
  },
];

/** Fish to catch in the fishing minigame */
export const FISCH_ITEM: SammelItem = {
  id: 'fisch',
  kategorie: 'fisch',
  wort: 'FISCH',
  emoji: '🐟',
  label: 'Fisch',
  hinweis: 'Schwimmt im Wasser.',
  versteckt: { x: 0, y: 0 }, // unused for fishing minigame
};

/** Things that can bite at the line during fishing */
export type AngelItemTyp = 'fisch' | 'oktopus' | 'seestern' | 'krabbe' | 'muell';

export interface AngelItem {
  typ: AngelItemTyp;
  emoji: string;
  /** Word to spell after catching (only when zaehlt = true) */
  wort: string;
  label: string;
  hinweis: string;
  /** Counts toward the "catch X creatures" goal */
  zaehlt: boolean;
  /** Reaction window in ms once it bites */
  reaktionszeit: number;
}

export const ANGEL_ITEMS: AngelItem[] = [
  {
    typ: 'fisch',
    emoji: '🐟',
    wort: 'FISCH',
    label: 'Fisch',
    hinweis: 'Schwimmt im Wasser, hat Flossen.',
    zaehlt: true,
    reaktionszeit: 1400,
  },
  {
    typ: 'oktopus',
    emoji: '🐙',
    wort: 'OKTOPUS',
    label: 'Oktopus',
    hinweis: 'Hat acht Tentakel.',
    zaehlt: true,
    reaktionszeit: 1100,
  },
  {
    typ: 'seestern',
    emoji: '⭐',
    wort: 'STERN',
    label: 'Seestern',
    hinweis: 'Hat fünf Zacken und lebt im Meer.',
    zaehlt: true,
    reaktionszeit: 1500,
  },
  {
    typ: 'krabbe',
    emoji: '🦀',
    wort: 'KRABBE',
    label: 'Krabbe',
    hinweis: 'Läuft seitwärts, hat Scheren.',
    zaehlt: true,
    reaktionszeit: 1100,
  },
  {
    typ: 'muell',
    emoji: '🗑️',
    wort: 'MUELL',
    label: 'Müll',
    hinweis: 'Igitt — gehört nicht ins Meer!',
    zaehlt: false,
    reaktionszeit: 1700,
  },
];

export const ALLE_SAMMEL_ITEMS: SammelItem[] = [
  ...FLOSS_TEILE,
  ...PROVIANT_ITEMS,
  ...SCHLEUDER_TEILE,
];

export const FISCH_ZIEL = 3; // catch 3 fish to complete
export const IRRLICHTER_ZIEL = 10; // hit 10 wisps to pass slingshot test

export const KATEGORIE_INFO: Record<ItemKategorie, { label: string; emoji: string }> = {
  floss: { label: 'Floss bauen', emoji: '🛟' },
  proviant: { label: 'Proviant', emoji: '🍱' },
  schleuder: { label: 'Schleuder', emoji: '🎯' },
  fisch: { label: 'Fische fangen', emoji: '🎣' },
};

export type AbenteuerPhase =
  | 'intro'
  | 'hub'
  | 'strand'
  | 'wald'
  | 'felsen'
  | 'angeln'
  | 'wortpuzzle'
  | 'flossWerkbank'
  | 'schleuderWerkbank'
  | 'irrlichter'
  | 'cutsceneAusFahrt'
  | 'piraten'
  | 'cutsceneSieg'
  | 'ende';

export interface AbenteuerState {
  /** All collected items by id */
  gefunden: string[];
  /** Currently being learned - shows the word puzzle */
  aktuellesItem: SammelItem | null;
  /** Pieces successfully placed on the raft */
  flossPlatziert: string[];
  /** Pieces successfully placed on the slingshot */
  schleuderPlatziert: string[];
  /** Number of fish caught */
  fischeGefangen: number;
  /** Number of wisps hit during slingshot test */
  irrlichterTreffer: number;
  /** True once the slingshot has been test-fired (10 wisps hit) */
  schleuderGetestet: boolean;
  phase: AbenteuerPhase;
}

export const createEmptyAbenteuerState = (): AbenteuerState => ({
  gefunden: [],
  aktuellesItem: null,
  flossPlatziert: [],
  schleuderPlatziert: [],
  fischeGefangen: 0,
  irrlichterTreffer: 0,
  schleuderGetestet: false,
  phase: 'intro',
});

/** Where the hub returns from after each task screen */
export const KATEGORIE_PHASE: Record<ItemKategorie, AbenteuerPhase> = {
  floss: 'strand',
  proviant: 'wald',
  schleuder: 'felsen',
  fisch: 'angeln',
};

// Pirates for level 2
export interface Pirat {
  id: string;
  /** Word to spell to defeat */
  wort: string;
  emoji: string;
  /** Visual position, percent of screen */
  position: { x: number; y: number };
  /** Hint to show */
  hinweis: string;
}

export const PIRATEN: Pirat[] = [
  {
    id: 'pirat1',
    wort: 'GOLD',
    emoji: '🏴‍☠️',
    position: { x: 28, y: 35 },
    hinweis: 'Glänzendes, gelbes Metall.',
  },
  {
    id: 'pirat2',
    wort: 'RUM',
    emoji: '🏴‍☠️',
    position: { x: 60, y: 28 },
    hinweis: 'Ein typisches Piratengetränk.',
  },
  {
    id: 'pirat3',
    wort: 'KARTE',
    emoji: '🏴‍☠️',
    position: { x: 78, y: 42 },
    hinweis: 'Zeigt, wo der Schatz liegt.',
  },
];
