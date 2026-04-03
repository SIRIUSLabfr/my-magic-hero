import { useEffect, useState } from 'react';
import MagicButton from '@/components/ui/MagicButton';
import { useSound } from '@/hooks/useSound';

interface Props {
  onNext: () => void;
}

export default function WelcomeScreen({ onNext }: Props) {
  const [visible, setVisible] = useState(false);
  const { playChime } = useSound();

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const handleTap = () => {
    playChime();
    onNext();
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen gap-10 px-8 transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Animated magic crystal */}
      <div className="animate-gentle-pulse">
        <div className="w-40 h-40 rounded-full bg-gradient-to-br from-accent via-primary to-secondary flex items-center justify-center animate-soft-glow">
          <span className="text-7xl">✨</span>
        </div>
      </div>

      <p className="text-title text-center font-display text-foreground max-w-lg">
        Etwas Magisches wartet auf dich...
      </p>

      <MagicButton onClick={handleTap} variant="gold" size="xl">
        ✨ Antippen
      </MagicButton>
    </div>
  );
}
