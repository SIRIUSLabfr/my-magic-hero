import { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  selected?: boolean;
  onClick: () => void;
  glowColor?: string;
  className?: string;
}

export default function OptionCard({ children, selected, onClick, glowColor, className = '' }: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        touch-target rounded-2xl p-6
        bg-card text-card-foreground
        transition-all duration-300 ease-out
        active:scale-95
        ${selected ? 'ring-4 ring-accent scale-105' : 'ring-2 ring-border'}
        ${className}
      `}
      style={{
        touchAction: 'manipulation',
        boxShadow: selected && glowColor
          ? `0 0 20px ${glowColor}, 0 0 40px ${glowColor}40`
          : undefined,
      }}
    >
      {children}
    </button>
  );
}
