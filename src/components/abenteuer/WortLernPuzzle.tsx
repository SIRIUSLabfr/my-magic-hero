import { useState, useMemo, useEffect } from 'react';
import { useSound } from '@/hooks/useSound';
import MagicButton from '@/components/ui/MagicButton';

interface Props {
  wort: string;
  emoji: string;
  label: string;
  hinweis: string;
  heldenfarbe: string;
  onGeloest: () => void;
  onAbbrechen: () => void;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ'.split('');

export default function WortLernPuzzle({
  wort,
  emoji,
  label,
  hinweis,
  heldenfarbe,
  onGeloest,
  onAbbrechen,
}: Props) {
  const { playChime, playTone } = useSound();
  const target = wort.toUpperCase();
  const [getippt, setGetippt] = useState<string>('');
  const [fehler, setFehler] = useState(0);
  const [shake, setShake] = useState(false);
  const [solved, setSolved] = useState(false);
  const [hintActive, setHintActive] = useState(false);

  // Show hint after 2 mistakes
  useEffect(() => {
    if (fehler >= 2) setHintActive(true);
  }, [fehler]);

  // Build a small alphabet that always contains the needed letters - keeps the
  // virtual keyboard manageable for a young child while still being a meaningful
  // recognition task. We add a few distractors for difficulty.
  const tasten = useMemo(() => {
    const benoetigt = new Set(target.split(''));
    const distraktoren = ALPHABET.filter(l => !benoetigt.has(l));
    // Shuffle distractors and pick enough so total = 9 letters
    for (let i = distraktoren.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [distraktoren[i], distraktoren[j]] = [distraktoren[j], distraktoren[i]];
    }
    const wanted = Math.max(9, benoetigt.size + 4);
    const total = [...benoetigt, ...distraktoren.slice(0, wanted - benoetigt.size)];
    // Shuffle the final keyboard
    for (let i = total.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [total[i], total[j]] = [total[j], total[i]];
    }
    return total;
  }, [target]);

  const handleTaste = (letter: string) => {
    if (solved) return;
    const expected = target[getippt.length];
    if (letter === expected) {
      const next = getippt + letter;
      setGetippt(next);
      playTone(523 + getippt.length * 80, 0.15, 'sine', 0.18);
      if (next === target) {
        setSolved(true);
        playChime();
        setTimeout(onGeloest, 1400);
      }
    } else {
      setFehler(f => f + 1);
      setShake(true);
      playTone(180, 0.2, 'sine', 0.1);
      setTimeout(() => setShake(false), 400);
    }
  };

  const handleZurueck = () => {
    if (solved || getippt.length === 0) return;
    setGetippt(g => g.slice(0, -1));
    playTone(300, 0.1, 'sine', 0.1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-6 py-8 animate-screen-enter">
      <button
        onClick={onAbbrechen}
        className="absolute top-6 left-6 text-muted-foreground text-body-lg font-display z-10"
        style={{ touchAction: 'manipulation' }}
      >
        ← Zurück
      </button>

      <div className="flex flex-col items-center gap-2">
        <span
          className="text-8xl animate-gentle-pulse"
          style={{ filter: solved ? `drop-shadow(0 0 30px ${heldenfarbe})` : undefined }}
        >
          {emoji}
        </span>
        <p className="text-body-lg font-display text-muted-foreground">
          {solved ? '✨ Geschafft!' : 'Wie heißt das?'}
        </p>
      </div>

      {/* Word slots */}
      <div
        className={`flex gap-2 ${shake ? 'animate-wiggle' : ''}`}
        aria-live="polite"
      >
        {target.split('').map((expected, i) => {
          const filled = i < getippt.length;
          const letter = filled ? getippt[i] : '';
          return (
            <div
              key={i}
              className="w-[56px] h-[68px] rounded-2xl flex items-center justify-center text-3xl font-display font-bold transition-all duration-300"
              style={{
                background: filled ? (solved ? heldenfarbe : 'hsl(var(--card))') : 'hsl(var(--muted))',
                color: filled ? (solved ? 'white' : heldenfarbe) : 'transparent',
                borderBottom: !filled ? `3px solid ${heldenfarbe}80` : 'none',
                boxShadow: solved ? `0 0 16px ${heldenfarbe}80` : filled ? `0 0 8px ${heldenfarbe}40` : 'none',
              }}
            >
              {letter || '_'}
            </div>
          );
        })}
      </div>

      {hintActive && !solved && (
        <p className="text-sm font-body text-muted-foreground italic px-4 text-center max-w-xs">
          💡 {hinweis}
        </p>
      )}

      {/* Keyboard */}
      {!solved && (
        <div className="flex flex-wrap gap-2 justify-center max-w-md mt-2">
          {tasten.map(letter => {
            const isHinted = hintActive && letter === target[getippt.length];
            const used = false; // we don't disable letters since they may repeat
            return (
              <button
                key={letter}
                onClick={() => handleTaste(letter)}
                disabled={used}
                className={`
                  w-[56px] h-[56px] rounded-2xl flex items-center justify-center text-2xl font-display font-bold
                  transition-all duration-200 active:scale-90 bg-card text-card-foreground
                  ${isHinted ? 'animate-gentle-pulse' : ''}
                `}
                style={{
                  touchAction: 'manipulation',
                  border: `2px solid ${heldenfarbe}40`,
                  boxShadow: isHinted ? `0 0 16px ${heldenfarbe}` : undefined,
                }}
              >
                {letter}
              </button>
            );
          })}
        </div>
      )}

      {!solved && getippt.length > 0 && (
        <button
          onClick={handleZurueck}
          className="text-muted-foreground text-body font-display mt-2 px-6 py-2 rounded-full bg-muted active:scale-95"
          style={{ touchAction: 'manipulation' }}
        >
          ⌫ Zurück
        </button>
      )}

      {solved && (
        <div className="flex flex-col items-center gap-2 animate-screen-enter">
          <p className="text-title font-display" style={{ color: heldenfarbe }}>
            {label}!
          </p>
          <p className="text-sm font-body text-muted-foreground">In den Rucksack…</p>
        </div>
      )}
    </div>
  );
}
