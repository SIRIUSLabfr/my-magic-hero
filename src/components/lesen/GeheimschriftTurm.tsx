import { useState, useRef, useCallback } from 'react';
import { SESSIONS } from '@/types/buchstaben';
import type { Lernfortschritt, AvatarConfig } from '@/types/profil';
import BuchstabeScreen from './BuchstabeScreen';
import SessionEndeScreen from './SessionEndeScreen';
import WortRaetselScreen from './WortRaetselScreen';
import HeldAvatar from '@/components/avatar/HeldAvatar';
import MagicButton from '@/components/ui/MagicButton';

interface Props {
  heldenfarbe: string;
  avatarConfig: AvatarConfig;
  lernfortschritt: Lernfortschritt;
  onUpdate: (lf: Lernfortschritt) => void;
  onZurueck: () => void;
}

type Phase = 'buchstaben' | 'wort' | 'ende';

export default function GeheimschriftTurm({ heldenfarbe, avatarConfig, lernfortschritt, onUpdate, onZurueck }: Props) {
  const [sessionIndex, setSessionIndex] = useState(0);
  const [currentInSession, setCurrentInSession] = useState(0);
  const [phase, setPhase] = useState<Phase>('buchstaben');
  const sessionStart = useRef(Date.now());
  const lf = useRef<Lernfortschritt>({ ...lernfortschritt });
  const [earnedStaub, setEarnedStaub] = useState(0);

  const currentSession = SESSIONS[sessionIndex % SESSIONS.length];
  const sessionBuchstaben = currentSession.buchstaben;
  const currentData = sessionBuchstaben[currentInSession];

  const handleRichtig = useCallback((erstenVersuch: boolean, audioCount: number) => {
    const b = currentData.buchstabe;
    const prev = lf.current.buchstaben[b] || {
      versuche: 0, richtigBeimErstenVersuch: 0, letzterVersuch: '', audioAbgespielt: 0,
    };
    lf.current = {
      ...lf.current,
      buchstaben: {
        ...lf.current.buchstaben,
        [b]: {
          versuche: prev.versuche + 1,
          richtigBeimErstenVersuch: prev.richtigBeimErstenVersuch + (erstenVersuch ? 1 : 0),
          letzterVersuch: new Date().toISOString(),
          audioAbgespielt: prev.audioAbgespielt + audioCount,
        },
      },
    };

    if (currentInSession + 1 >= sessionBuchstaben.length) {
      // All letters done — go to word puzzle
      setPhase('wort');
    } else {
      setCurrentInSession(c => c + 1);
    }
  }, [currentData, currentInSession, sessionBuchstaben.length]);

  const handleWortGeloest = useCallback(() => {
    const staub = 10;
    setEarnedStaub(staub);
    const dauer = Math.round((Date.now() - sessionStart.current) / 1000);
    const totalSessions = lf.current.sessionsGesamt + 1;
    const avgDauer = Math.round(
      ((lf.current.durchschnittlicheSessionDauer * lf.current.sessionsGesamt) + dauer) / totalSessions
    );
    lf.current = {
      ...lf.current,
      sessionsGesamt: totalSessions,
      durchschnittlicheSessionDauer: avgDauer,
      sternenstaub: (lf.current.sternenstaub || 0) + staub,
    };
    onUpdate(lf.current);
    setPhase('ende');
  }, [onUpdate]);

  const handleWeiter = () => {
    setSessionIndex(s => s + 1);
    setCurrentInSession(0);
    setPhase('buchstaben');
    setEarnedStaub(0);
    sessionStart.current = Date.now();
  };

  if (phase === 'ende') {
    return (
      <SessionEndeScreen
        buchstaben={sessionBuchstaben.map(b => b.buchstabe)}
        loesungswort={currentSession.loesungswort}
        sternenstaub={earnedStaub}
        heldenfarbe={heldenfarbe}
        avatarConfig={avatarConfig}
        onWeiter={handleWeiter}
        onZurueck={onZurueck}
      />
    );
  }

  if (phase === 'wort') {
    return (
      <div className="relative min-h-screen">
        <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
          <MagicButton onClick={onZurueck} variant="secondary" size="lg">
            🏠
          </MagicButton>
          <HeldAvatar config={avatarConfig} size={60} />
        </div>
        <WortRaetselScreen
          buchstaben={currentSession.loesungswort.split('')}
          loesungswort={currentSession.loesungswort}
          heldenfarbe={heldenfarbe}
          onGeloest={handleWortGeloest}
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
        <MagicButton onClick={onZurueck} variant="secondary" size="lg">
          🏠
        </MagicButton>
        <HeldAvatar config={avatarConfig} size={60} />
      </div>

      <BuchstabeScreen
        key={currentData.buchstabe + currentInSession}
        data={currentData}
        heldenfarbe={heldenfarbe}
        onRichtig={handleRichtig}
      />
    </div>
  );
}
