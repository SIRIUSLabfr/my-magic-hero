import { useMemo } from 'react';

type Props = {
  count?: number;
  className?: string;
};

/**
 * Schwebende Sparkles über die ganze Szene.
 * Jeder Funken bekommt zufällige Position, Größe, Geschwindigkeit, Drift-Richtung.
 */
export default function Sparkles({ count = 30, className = '' }: Props) {
  const sparkles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 3 + 2; // 2-5px
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const duration = Math.random() * 4 + 4; // 4-8s
      const delay = Math.random() * 6;
      const dx = (Math.random() - 0.5) * 80;
      const dy = -(Math.random() * 60 + 20);
      const opacity = Math.random() * 0.6 + 0.4;
      return { i, size, top, left, duration, delay, dx, dy, opacity };
    });
  }, [count]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {sparkles.map((s) => (
        <span
          key={s.i}
          className="sparkle"
          style={
            {
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animation: `sparkle-drift ${s.duration}s ease-in-out ${s.delay}s infinite`,
              '--dx': `${s.dx}px`,
              '--dy': `${s.dy}px`,
              opacity: s.opacity,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
