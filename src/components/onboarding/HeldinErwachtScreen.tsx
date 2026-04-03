import { useState, useEffect, useMemo } from 'react';
import MagicButton from '@/components/ui/MagicButton';
import { useSound } from '@/hooks/useSound';
import { FARBEN, WELTEN } from '@/types/profil';
import type { HeldenschuleProfil } from '@/types/profil';

interface Props {
  profil: HeldenschuleProfil;
  onSetName: (name: string | null) => void;
  onFinish: () => void;
}

function ConfettiEffect() {
  const pieces = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      color: ['#e63462', '#9333ea', '#facc15', '#ec4899', '#3b82f6', '#22c55e'][i % 6],
      size: Math.random() * 8 + 4,
    })), []
  );

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 50 }}>
      {pieces.map(p => (
        <div
          key={p.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            width: p.size,
            height: p.size,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            backgroundColor: p.color,
          }}
        />
      ))}
    </div>
  );
}

export default function HeldinErwachtScreen({ profil, onSetName, onFinish }: Props) {
  const [name, setName] = useState(profil.avatar.name || '');
  const [showConfetti, setShowConfetti] = useState(false);
  const { playTransformation } = useSound();

  const farbe = FARBEN.find(f => f.id === profil.avatar.hauptfarbe);
  const welt = WELTEN.find(w => w.id === profil.avatar.welt);

  const handleFinish = () => {
    playTransformation();
    if (name.trim()) onSetName(name.trim());
    setShowConfetti(true);
    setTimeout(onFinish, 2500);
  };

  const handleSkip = () => {
    onSetName(null);
    playTransformation();
    setShowConfetti(true);
    setTimeout(onFinish, 2500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-8 animate-screen-enter">
      {showConfetti && <ConfettiEffect />}

      <h1 className="text-title text-center font-display text-foreground">
        Deine Heldin erwacht!
      </h1>

      {/* Avatar preview */}
      <div
        className="w-48 h-48 rounded-full flex items-center justify-center animate-gentle-pulse"
        style={{
          backgroundColor: farbe?.hex || '#e63462',
          boxShadow: `0 0 40px ${farbe?.hex || '#e63462'}80, 0 0 80px ${farbe?.hex || '#e63462'}30`,
        }}
      >
        <span className="text-7xl">{welt?.emoji || '✨'}</span>
      </div>

      {/* Name input */}
      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        <label className="text-body-lg font-display text-foreground">
          Wie heißt deine Heldin?
        </label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Tippe einen Namen..."
          className="w-full text-center text-title font-display bg-card text-card-foreground rounded-2xl px-6 py-4 border-2 border-border focus:border-accent focus:outline-none transition-colors"
          style={{ touchAction: 'manipulation' }}
        />
      </div>

      <div className="flex flex-col items-center gap-4">
        <MagicButton onClick={handleFinish} variant="primary" size="xl">
          Los geht's! 🚀
        </MagicButton>

        {!name.trim() && (
          <button
            onClick={handleSkip}
            className="text-muted-foreground text-body-lg font-display transition-opacity hover:opacity-80"
            style={{ touchAction: 'manipulation' }}
          >
            Später ✨
          </button>
        )}
      </div>
    </div>
  );
}
