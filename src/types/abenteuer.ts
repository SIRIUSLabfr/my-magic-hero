export type FlossTeilId = 'ast' | 'brett' | 'seil' | 'segel' | 'fass';

export interface FlossTeil {
  id: FlossTeilId;
  /** German word the child has to learn (matches the slot count in the puzzle) */
  wort: string;
  emoji: string;
  label: string;
  /** Hint shown after a few wrong attempts */
  hinweis: string;
  /** Position in the cave scene (percent of viewBox) */
  versteckt: { x: number; y: number };
  /** Position on the raft assembly (drop target) */
  zielPosition: { x: number; y: number; rotation: number };
}

export const FLOSS_TEILE: FlossTeil[] = [
  {
    id: 'ast',
    wort: 'AST',
    emoji: '🪵',
    label: 'Ast',
    hinweis: 'Ein dünner Holzstock vom Baum.',
    versteckt: { x: 18, y: 72 },
    zielPosition: { x: 50, y: 35, rotation: 0 },
  },
  {
    id: 'brett',
    wort: 'BRETT',
    emoji: '🟫',
    label: 'Brett',
    hinweis: 'Ein flaches Stück Holz.',
    versteckt: { x: 78, y: 65 },
    zielPosition: { x: 50, y: 55, rotation: 0 },
  },
  {
    id: 'seil',
    wort: 'SEIL',
    emoji: '🪢',
    label: 'Seil',
    hinweis: 'Damit kann man Sachen festbinden.',
    versteckt: { x: 60, y: 80 },
    zielPosition: { x: 30, y: 50, rotation: -15 },
  },
  {
    id: 'fass',
    wort: 'FASS',
    emoji: '🛢️',
    label: 'Fass',
    hinweis: 'Ein rundes Behältnis aus Holz.',
    versteckt: { x: 35, y: 85 },
    zielPosition: { x: 70, y: 50, rotation: 15 },
  },
  {
    id: 'segel',
    wort: 'SEGEL',
    emoji: '⛵',
    label: 'Segel',
    hinweis: 'Damit fängt das Floss den Wind ein.',
    versteckt: { x: 50, y: 25 },
    zielPosition: { x: 50, y: 15, rotation: 0 },
  },
];

export type AbenteuerPhase =
  | 'intro'
  | 'hoehle'
  | 'wortpuzzle'
  | 'werkbank'
  | 'cutscene'
  | 'ende';

export interface AbenteuerState {
  gefunden: FlossTeilId[];
  /** Currently being learned - shows the word puzzle */
  aktuellesTeil: FlossTeilId | null;
  /** Pieces successfully placed on the raft */
  platziert: FlossTeilId[];
  phase: AbenteuerPhase;
}

export const createEmptyAbenteuerState = (): AbenteuerState => ({
  gefunden: [],
  aktuellesTeil: null,
  platziert: [],
  phase: 'intro',
});
