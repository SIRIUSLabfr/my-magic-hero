import { useState, useMemo } from 'react';
import { useSound } from '@/hooks/useSound';
import MagicButton from '@/components/ui/MagicButton';

interface Props {
  buchstaben: string[];
  loesungswort: string;
  heldenfarbe: string;
  onGeloest: () => void;
}

export default function WortRaetselScreen({ buchstaben, loesungswort, heldenfarbe, onGeloest }: Props) {
  const { playChime, playTone } = useSound();

  // Scramble the letters
  const scrambled = useMemo(() => {
    const arr = [...buchstaben];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Make sure it's actually scrambled
    if (arr.join('') === loesungswort) {
      [arr[0], arr[arr.length - 1]] = [arr[arr.length - 1], arr[0]];
    }
    return arr;
  }, [buchstaben, loesungswort]);

  const [available, setAvailable] = useState<(string | null)[]>(scrambled);
  const [placed, setPlaced] = useState<(string | null)[]>(Array(loesungswort.length).fill(null));
  const [solved, setSolved] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);

  const handlePickLetter = (index: number) => {
    if (solved || available[index] === null) return;
    const letter = available[index]!;
    const firstEmpty = placed.indexOf(null);
    if (firstEmpty === -1) return;

    const newAvail = [...available];
    newAvail[index] = null;
    setAvailable(newAvail);

    const newPlaced = [...placed];
    newPlaced[firstEmpty] = letter;
    setPlaced(newPlaced);

    // Check if word is complete
    if (firstEmpty === loesungswort.length - 1) {
      const word = newPlaced.join('');
      if (word === loesungswort) {
        setSolved(true);
        playChime();
        setTimeout(() => onGeloest(), 2000);
      } else {
        // Wrong word - shake and reset
        playTone(200, 0.15, 'sine', 0.1);
        setWrongShake(true);
        setTimeout(() => {
          setAvailable(scrambled.map((l, i) => l));
          setPlaced(Array(loesungswort.length).fill(null));
          setWrongShake(false);
        }, 600);
      }
    }
  };

  const handleRemovePlaced = (index: number) => {
    if (solved || placed[index] === null) return;
    const letter = placed[index]!;
    const newPlaced = [...placed];
    newPlaced[index] = null;
    setPlaced(newPlaced);

    // Put it back in the first null spot in available
    const newAvail = [...available];
    const emptySpot = newAvail.indexOf(null);
    if (emptySpot !== -1) {
      newAvail[emptySpot] = letter;
    }
    setAvailable(newAvail);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-8 animate-screen-enter">
      <p className="text-title text-center font-display text-foreground">
        {solved ? '✨ Geheimcode entschlüsselt! ✨' : 'Finde das Geheimwort!'}
      </p>

      {/* Placed letters - target slots */}
      <div className={`flex gap-3 ${wrongShake ? 'animate-wiggle' : ''}`}>
        {placed.map((letter, i) => (
          <button
            key={i}
            onClick={() => handleRemovePlaced(i)}
            className="w-[60px] h-[72px] rounded-2xl flex items-center justify-center text-3xl font-display font-bold transition-all duration-300"
            style={{
              background: letter
                ? solved ? heldenfarbe : 'hsl(var(--card))'
                : 'hsl(var(--muted))',
              color: letter
                ? solved ? 'white' : heldenfarbe
                : 'transparent',
              boxShadow: solved && letter
                ? `0 0 20px ${heldenfarbe}80`
                : letter
                ? `0 0 8px ${heldenfarbe}30`
                : 'none',
              borderBottom: !letter ? `3px solid ${heldenfarbe}40` : 'none',
              touchAction: 'manipulation',
            }}
          >
            {letter || '_'}
          </button>
        ))}
      </div>

      {/* Available letters to pick from */}
      {!solved && (
        <div className="flex gap-3 flex-wrap justify-center">
          {available.map((letter, i) => (
            <button
              key={i}
              onClick={() => handlePickLetter(i)}
              className="w-[64px] h-[64px] rounded-2xl flex items-center justify-center text-2xl font-display font-bold transition-all duration-200 active:scale-90"
              style={{
                background: letter ? 'hsl(var(--card))' : 'transparent',
                color: letter ? 'hsl(var(--foreground))' : 'transparent',
                opacity: letter ? 1 : 0.2,
                border: letter ? `2px solid ${heldenfarbe}40` : '2px solid transparent',
                touchAction: 'manipulation',
              }}
            >
              {letter || ''}
            </button>
          ))}
        </div>
      )}

      {solved && (
        <div className="flex flex-col items-center gap-3 animate-screen-enter">
          <span className="text-6xl">⭐</span>
          <p className="text-body-lg font-display" style={{ color: heldenfarbe }}>
            +10 Sternenstaub
          </p>
        </div>
      )}
    </div>
  );
}
