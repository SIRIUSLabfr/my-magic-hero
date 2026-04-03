import { useState, useRef, useCallback } from 'react';
import { BUCHSTABEN_DATEN } from '@/types/buchstaben';
import type { Lernfortschritt } from '@/types/profil';
import BuchstabeScreen from './BuchstabeScreen';
import SessionEndeScreen from './SessionEndeScreen';
import MagicButton from '@/components/ui/MagicButton';

interface Props {
  heldenfarbe: string;
  lernfortschritt: Lernfortschritt;
  onUpdate: (lf: Lernfortschritt) => void;
  onZurueck: () => void;
}

const SESSION_SIZE = 5;

export default function GeheimschriftTurm({ heldenfarbe, lernfortschritt, onUpdate, onZurueck }: Props) {
  const [sessionIndex, setSessionIndex] = useState(0);
  const [currentInSession, setCurrentInSession] = useState(0);
  const [sessionDone, setSessionDone] = useState(false);
  const sessionStart = useRef(Date.now());
  const lf = useRef<Lernfortschritt>({ ...lernfortschritt });

  // Pick which 5 letters for this session
  const sessionBuchstaben = BUCHSTABEN_DATEN.slice(
    (sessionIndex * SESSION_SIZE) % BUCHSTABEN_DATEN.length,
    ((sessionIndex * SESSION_SIZE) % BUCHSTABEN_DATEN.length) + SESSION_SIZE
  );

  // Handle wrap-around
  const effectiveBuchstaben = sessionBuchstaben.length < SESSION_SIZE
    ? [...sessionBuchstaben, ...BUCHSTABEN_DATEN.slice(0, SESSION_SIZE - sessionBuchstaben.length)]
    : sessionBuchstaben;

  const currentData = effectiveBuchstaben[currentInSession];

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

    if (currentInSession + 1 >= SESSION_SIZE) {
      // Session done
      const dauer = Math.round((Date.now() - sessionStart.current) / 1000);
      const totalSessions = lf.current.sessionsGesamt + 1;
      const avgDauer = Math.round(
        ((lf.current.durchschnittlicheSessionDauer * lf.current.sessionsGesamt) + dauer) / totalSessions
      );
      lf.current = {
        ...lf.current,
        sessionsGesamt: totalSessions,
        durchschnittlicheSessionDauer: avgDauer,
      };
      onUpdate(lf.current);
      setSessionDone(true);
    } else {
      setCurrentInSession(c => c + 1);
    }
  }, [currentData, currentInSession, onUpdate]);

  const handleWeiter = () => {
    setSessionIndex(s => s + 1);
    setCurrentInSession(0);
    setSessionDone(false);
    sessionStart.current = Date.now();
  };

  if (sessionDone) {
    return (
      <SessionEndeScreen
        buchstaben={effectiveBuchstaben.map(b => b.buchstabe)}
        heldenfarbe={heldenfarbe}
        onWeiter={handleWeiter}
        onZurueck={onZurueck}
      />
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Back button */}
      <div className="absolute top-6 left-6 z-20">
        <MagicButton onClick={onZurueck} variant="secondary" size="lg">
          🏠
        </MagicButton>
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
