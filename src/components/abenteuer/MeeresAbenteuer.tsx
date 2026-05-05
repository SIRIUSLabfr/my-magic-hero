import { useState, useCallback } from 'react';
import {
  FLOSS_TEILE,
  PROVIANT_ITEMS,
  SCHLEUDER_TEILE,
  FISCH_ZIEL,
  KATEGORIE_PHASE,
  createEmptyAbenteuerState,
} from '@/types/abenteuer';
import type {
  AbenteuerState,
  AbenteuerPhase,
  ItemKategorie,
  SammelItem,
} from '@/types/abenteuer';
import type { AvatarConfig, Lernfortschritt } from '@/types/profil';
import IntroCinema from './IntroCinema';
import HoehlenHub from './HoehlenHub';
import StrandSzene from './StrandSzene';
import WaldSzene from './WaldSzene';
import FelsenSzene from './FelsenSzene';
import AngelMinigame from './AngelMinigame';
import WortLernPuzzle from './WortLernPuzzle';
import FlossWerkbank from './FlossWerkbank';
import SchleuderWerkbank from './SchleuderWerkbank';
import EndCutscene from './EndCutscene';
import PiratenLevel from './PiratenLevel';

interface Props {
  avatarConfig: AvatarConfig;
  heldenfarbe: string;
  heldName: string | null;
  lernfortschritt: Lernfortschritt;
  onUpdate: (lf: Lernfortschritt) => void;
  onZurueck: () => void;
}

const STAUB_PRO_ITEM = 4;
const STAUB_PRO_FISCH = 4;
const STAUB_FUER_FLOSS = 10;
const STAUB_FUER_SCHLEUDER = 8;
const STAUB_FUER_SIEG = 20;

export default function MeeresAbenteuer({
  avatarConfig,
  heldenfarbe,
  heldName,
  lernfortschritt,
  onUpdate,
  onZurueck,
}: Props) {
  const [state, setState] = useState<AbenteuerState>(createEmptyAbenteuerState);
  const [earnedStaub, setEarnedStaub] = useState(0);
  /** Where to return after solving a word puzzle */
  const [puzzleRueckkehr, setPuzzleRueckkehr] = useState<AbenteuerPhase>('hub');

  const grantStaub = useCallback((amount: number) => {
    setEarnedStaub(s => s + amount);
    onUpdate({
      ...lernfortschritt,
      sternenstaub: (lernfortschritt.sternenstaub || 0) + amount,
    });
  }, [lernfortschritt, onUpdate]);

  const handleStart = useCallback(() => {
    setState(s => ({ ...s, phase: 'hub' }));
  }, []);

  // ===== Hub navigation =====
  const handleTaskWaehlen = useCallback((kat: ItemKategorie) => {
    setState(s => ({ ...s, phase: KATEGORIE_PHASE[kat] }));
  }, []);

  const handleZurueckZumHub = useCallback(() => {
    setState(s => ({ ...s, phase: 'hub' }));
  }, []);

  // ===== Item collection (floss / proviant / schleuder) =====
  const handleItemAufnehmen = useCallback((item: SammelItem) => {
    setState(s => {
      // Remember which scene we came from to return to
      setPuzzleRueckkehr(s.phase);
      return { ...s, aktuellesItem: item, phase: 'wortpuzzle' };
    });
  }, []);

  const handlePuzzleGeloest = useCallback(() => {
    setState(s => {
      if (!s.aktuellesItem) return s;
      const id = s.aktuellesItem.id;
      const gefunden = s.gefunden.includes(id) ? s.gefunden : [...s.gefunden, id];
      return { ...s, gefunden, aktuellesItem: null, phase: puzzleRueckkehr };
    });
    grantStaub(STAUB_PRO_ITEM);
  }, [grantStaub, puzzleRueckkehr]);

  const handlePuzzleAbbrechen = useCallback(() => {
    setState(s => ({ ...s, aktuellesItem: null, phase: puzzleRueckkehr }));
  }, [puzzleRueckkehr]);

  // ===== Fishing =====
  const handleFischGefangen = useCallback(() => {
    setState(s => ({ ...s, fischeGefangen: s.fischeGefangen + 1 }));
    grantStaub(STAUB_PRO_FISCH);
  }, [grantStaub]);

  // ===== Floss-Werkbank =====
  const handleZurFlossWerkbank = useCallback(() => {
    setState(s => ({ ...s, phase: 'flossWerkbank' }));
  }, []);

  const handleFlossPlatziert = useCallback((id: string) => {
    setState(s => {
      if (s.flossPlatziert.includes(id)) return s;
      return { ...s, flossPlatziert: [...s.flossPlatziert, id] };
    });
  }, []);

  const handleFlossFertig = useCallback(() => {
    const flossDone = FLOSS_TEILE.every(i => state.gefunden.includes(i.id));
    const proviantDone = PROVIANT_ITEMS.every(i => state.gefunden.includes(i.id));
    const schleuderDone = SCHLEUDER_TEILE.every(i => state.gefunden.includes(i.id));
    const fischDone = state.fischeGefangen >= FISCH_ZIEL;
    const allesGesammelt = flossDone && proviantDone && schleuderDone && fischDone;

    if (!allesGesammelt) {
      setState(s => ({ ...s, phase: 'hub' }));
      return;
    }

    setState(s => ({ ...s, phase: 'cutsceneAusFahrt' }));
    grantStaub(STAUB_FUER_FLOSS);
    onUpdate({
      ...lernfortschritt,
      sessionsGesamt: lernfortschritt.sessionsGesamt + 1,
      sternenstaub: (lernfortschritt.sternenstaub || 0) + STAUB_FUER_FLOSS,
    });
  }, [state.gefunden, state.fischeGefangen, lernfortschritt, onUpdate, grantStaub]);

  // ===== Schleuder-Werkbank =====
  const handleZurSchleuderWerkbank = useCallback(() => {
    setState(s => ({ ...s, phase: 'schleuderWerkbank' }));
  }, []);

  const handleSchleuderPlatziert = useCallback((id: string) => {
    setState(s => {
      if (s.schleuderPlatziert.includes(id)) return s;
      return { ...s, schleuderPlatziert: [...s.schleuderPlatziert, id] };
    });
  }, []);

  const handleSchleuderFertig = useCallback(() => {
    setState(s => ({ ...s, phase: 'hub' }));
    grantStaub(STAUB_FUER_SCHLEUDER);
  }, [grantStaub]);

  // ===== Cutscenes / Level transitions =====
  const handleAusFahrtFertig = useCallback(() => {
    setState(s => ({ ...s, phase: 'piraten' }));
  }, []);

  const handlePiratenSieg = useCallback(() => {
    setState(s => ({ ...s, phase: 'cutsceneSieg' }));
    grantStaub(STAUB_FUER_SIEG);
  }, [grantStaub]);

  const handleSiegFertig = useCallback(() => {
    onZurueck();
  }, [onZurueck]);

  // ===== Render =====
  switch (state.phase) {
    case 'intro':
      return (
        <IntroCinema
          avatarConfig={avatarConfig}
          heldenfarbe={heldenfarbe}
          heldName={heldName}
          onStart={handleStart}
          onZurueck={onZurueck}
        />
      );

    case 'wortpuzzle':
      if (!state.aktuellesItem) return null;
      return (
        <div
          className="fixed inset-0 overflow-hidden"
          style={{ background: 'radial-gradient(ellipse at center, #1a3050 0%, #050a14 100%)' }}
        >
          <WortLernPuzzle
            wort={state.aktuellesItem.wort}
            emoji={state.aktuellesItem.emoji}
            label={state.aktuellesItem.label}
            hinweis={state.aktuellesItem.hinweis}
            heldenfarbe={heldenfarbe}
            onGeloest={handlePuzzleGeloest}
            onAbbrechen={handlePuzzleAbbrechen}
          />
        </div>
      );

    case 'strand':
      return (
        <StrandSzene
          heldenfarbe={heldenfarbe}
          gefunden={state.gefunden}
          onItemAufnehmen={handleItemAufnehmen}
          onZurueck={handleZurueckZumHub}
        />
      );

    case 'wald':
      return (
        <WaldSzene
          heldenfarbe={heldenfarbe}
          gefunden={state.gefunden}
          onItemAufnehmen={handleItemAufnehmen}
          onZurueck={handleZurueckZumHub}
        />
      );

    case 'felsen':
      return (
        <FelsenSzene
          heldenfarbe={heldenfarbe}
          gefunden={state.gefunden}
          onItemAufnehmen={handleItemAufnehmen}
          onZurueck={handleZurueckZumHub}
        />
      );

    case 'angeln':
      return (
        <AngelMinigame
          fischeGefangen={state.fischeGefangen}
          heldenfarbe={heldenfarbe}
          onFischGefangen={handleFischGefangen}
          onFertig={handleZurueckZumHub}
        />
      );

    case 'flossWerkbank':
      return (
        <FlossWerkbank
          gefunden={state.gefunden}
          platziert={state.flossPlatziert}
          heldenfarbe={heldenfarbe}
          onPlatziert={handleFlossPlatziert}
          onFertig={handleFlossFertig}
          onZurueck={handleZurueckZumHub}
        />
      );

    case 'schleuderWerkbank':
      return (
        <SchleuderWerkbank
          gefunden={state.gefunden}
          platziert={state.schleuderPlatziert}
          heldenfarbe={heldenfarbe}
          onPlatziert={handleSchleuderPlatziert}
          onFertig={handleSchleuderFertig}
          onZurueck={handleZurueckZumHub}
        />
      );

    case 'cutsceneAusFahrt':
      return (
        <EndCutscene
          avatarConfig={avatarConfig}
          heldenfarbe={heldenfarbe}
          sternenstaub={earnedStaub}
          titel="Endlich frei!"
          untertitel="...doch dann tauchen Piraten am Horizont auf!"
          weiterLabel="🏴‍☠️ Den Piraten begegnen"
          onFertig={handleAusFahrtFertig}
        />
      );

    case 'piraten':
      return (
        <PiratenLevel
          avatarConfig={avatarConfig}
          heldenfarbe={heldenfarbe}
          onSieg={handlePiratenSieg}
          onZurueck={handleZurueckZumHub}
        />
      );

    case 'cutsceneSieg':
      return (
        <EndCutscene
          avatarConfig={avatarConfig}
          heldenfarbe={heldenfarbe}
          sternenstaub={earnedStaub}
          titel="✨ Heldin der Meere! ✨"
          untertitel="Piraten verjagt. Du segelst nach Hause."
          weiterLabel="Heimkehren 🏠"
          onFertig={handleSiegFertig}
        />
      );

    case 'hub':
    default:
      return (
        <HoehlenHub
          avatarConfig={avatarConfig}
          heldenfarbe={heldenfarbe}
          gefunden={state.gefunden}
          fischeGefangen={state.fischeGefangen}
          onZurueck={onZurueck}
          onTaskWaehlen={handleTaskWaehlen}
          onZurFlossWerkbank={handleZurFlossWerkbank}
          onZurSchleuderWerkbank={handleZurSchleuderWerkbank}
        />
      );
  }
}
