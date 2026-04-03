import { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'gold' | 'secondary';
  size?: 'lg' | 'xl';
  className?: string;
}

const variants = {
  primary: 'bg-primary text-primary-foreground glow-primary hover:brightness-110',
  gold: 'bg-accent text-accent-foreground glow-gold hover:brightness-110',
  secondary: 'bg-secondary text-secondary-foreground glow-purple hover:brightness-110',
};

const sizes = {
  lg: 'px-8 py-5 text-body-lg',
  xl: 'px-10 py-6 text-title',
};

export default function MagicButton({ children, onClick, variant = 'primary', size = 'lg', className = '' }: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        touch-target rounded-2xl font-display font-semibold
        transition-all duration-300 ease-out
        active:scale-95
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      style={{ touchAction: 'manipulation' }}
    >
      {children}
    </button>
  );
}
