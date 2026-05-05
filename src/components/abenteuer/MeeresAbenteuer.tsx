import { useState, useCallback } from 'react';
import { FLOSS_TEILE, createEmptyAbenteuerState } from '@/types/abenteuer';
import type { AbenteuerState, FlossTeilId } from '@/types/abenteuer';
import type { AvatarConfig, Lernfortschritt } from '@/types/profil';
import AbenteuerIntro from './AbenteuerIntro';
import HoehlenSzene from './HoehlenSzene';
import WortLernPuzzle from './WortLernPuzzle';
import FlossWerkbank from './FlossWerkbank';
import EndCutscene from './EndCutscene';

interface Props {
  avatarConfig: AvatarConfig;
  heldenfarbe: string;
  heldName: string | null;
  lernfortschritt: Lernfortschritt;
  onUpdate: (lf: Lernfortschritt) => void;
  onZurueck: () => void;
}

const STAUB_PRO_TEIL = 4;
const STAUB_FUER_FLOSS = 10;

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

  const aktuellesTeil = state.aktuellesTeil
    ? FLOSS_TEILE.find(t => t.id === state.aktuellesTeil) ?? null
    : null;

  const handleTeilGefunden = useCallback((id: FlossTeilId) => {
    // Open the word puzzle for this piece
    setState(s => ({ ...s, aktuellesTeil: id, phase: 'wortpuzzle' }));
  }, []);

  const handlePuzzleGeloest = useCallback(() => {
    setState(s => {
      const id = s.aktuellesTeil;
      if (!id) return s;
      const gefunden = s.gefunden.includes(id) ? s.gefunden : [...s.gefunden, id];
      return { ...s, gefunden, aktuellesTeil: null, phase: 'hoehle' };
    });
    setEarnedStaub(staub => staub + STAUB_PRO_TEIL);
    // Persist progress
    const next: Lernfortschritt = {
      ...lernfortschritt,
      sternenstaub: (lernfortschritt.sternenstaub || 0) + STAUB_PRO_TEIL,
    };
    onUpdate(next);
  }, [lernfortschritt, onUpdate]);

  const handlePuzzleAbbrechen = useCallback(() => {
    setState(s => ({ ...s, aktuellesTeil: null, phase: 'hoehle' }));
  }, []);

  const handleZurFloss = useCallback(() => {
    setState(s => ({ ...s, phase: 'werkbank' }));
  }, []);

  const handleZurueckZurHoehle = useCallback(() => {
    setState(s => ({ ...s, phase: 'hoehle' }));
  }, []);

  const handlePlatziert = useCallback((id: FlossTeilId) => {
    setState(s => {
      const platziert = s.platziert.includes(id) ? s.platziert : [...s.platziert, id];
      return { ...s, platziert };
    });
  }, []);

  const handleFlossFertig = useCallback(() => {
    setState(s => ({ ...s, phase: 'cutscene' }));
    setEarnedStaub(st => st + STAUB_FUER_FLOSS);
    const next: Lernfortschritt = {
      ...lernfortschritt,
      sessionsGesamt: lernfortschritt.sessionsGesamt + 1,
      sternenstaub: (lernfortschritt.sternenstaub || 0) + STAUB_FUER_FLOSS,
    };
    onUpdate(next);
  }, [lernfortschritt, onUpdate]);

  const handleStart = useCallback(() => {
    setState(s => ({ ...s, phase: 'hoehle' }));
  }, []);

  // Render current phase
  switch (state.phase) {
    case 'intro':
      return (
        <AbenteuerIntro
          avatarConfig={avatarConfig}
          heldenfarbe={heldenfarbe}
          heldName={heldName}
          onStart={handleStart}
          onZurueck={onZurueck}
        />
      );

    case 'wortpuzzle':
      if (!aktuellesTeil) {
        return null;
      }
      return (
        <div
          className="fixed inset-0 overflow-hidden"
          style={{ background: 'radial-gradient(ellipse at center, #1a3050 0%, #050a14 100%)' }}
        >
          <WortLernPuzzle
            wort={aktuellesTeil.wort}
            emoji={aktuellesTeil.emoji}
            label={aktuellesTeil.label}
            hinweis={aktuellesTeil.hinweis}
            heldenfarbe={heldenfarbe}
            onGeloest={handlePuzzleGeloest}
            onAbbrechen={handlePuzzleAbbrechen}
          />
        </div>
      );

    case 'werkbank':
      return (
        <FlossWerkbank
          gefunden={state.gefunden}
          platziert={state.platziert}
          heldenfarbe={heldenfarbe}
          onPlatziert={handlePlatziert}
          onFertig={handleFlossFertig}
          onZurueck={handleZurueckZurHoehle}
        />
      );

    case 'cutscene':
      return (
        <EndCutscene
          avatarConfig={avatarConfig}
          heldenfarbe={heldenfarbe}
          sternenstaub={earnedStaub}
          onFertig={onZurueck}
        />
      );

    case 'hoehle':
    default:
      return (
        <HoehlenSzene
          avatarConfig={avatarConfig}
          heldenfarbe={heldenfarbe}
          gefunden={state.gefunden}
          onTeilGefunden={handleTeilGefunden}
          onZurueck={onZurueck}
          onZurFloss={handleZurFloss}
        />
      );
  }
}
