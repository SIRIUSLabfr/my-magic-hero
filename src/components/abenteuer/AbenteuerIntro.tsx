import { motion } from 'framer-motion';
import HeldAvatar from '@/components/avatar/HeldAvatar';
import MagicButton from '@/components/ui/MagicButton';
import type { AvatarConfig } from '@/types/profil';

interface Props {
  avatarConfig: AvatarConfig;
  heldenfarbe: string;
  heldName: string | null;
  onStart: () => void;
  onZurueck: () => void;
}

export default function AbenteuerIntro({ avatarConfig, heldenfarbe, heldName, onStart, onZurueck }: Props) {
  const name = heldName || 'Heldin';

  return (
    <div
      className="fixed inset-0 overflow-hidden flex flex-col items-center justify-center px-8"
      style={{ background: 'radial-gradient(ellipse at center, #1a3050 0%, #050a14 100%)' }}
    >
      {/* Lightning / lightning effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0, 0, 0.15, 0, 0] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
        style={{ background: 'white' }}
      />

      {/* Distant ship silhouette - sinking */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
        <motion.g
          initial={{ y: 0 }}
          animate={{ y: 30 }}
          transition={{ duration: 8, ease: 'easeIn' }}
        >
          {/* Tiny sinking ship far in the distance */}
          <path d="M 800 220 L 870 220 L 855 245 L 815 245 Z" fill="#0a1320" opacity="0.7" />
          <line x1="835" y1="220" x2="835" y2="190" stroke="#0a1320" strokeWidth="1" opacity="0.6" />
          {/* Smoke */}
          <motion.circle
            cx="835"
            cy="180"
            r="6"
            fill="#444"
            opacity="0.5"
            animate={{ y: [0, -20, -40], opacity: [0.5, 0.3, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </motion.g>

        {/* Animated rain droplets */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.line
            key={i}
            x1={i * 35}
            y1={-20}
            x2={i * 35 - 6}
            y2={10}
            stroke="#5fa8d3"
            strokeWidth="1"
            opacity="0.4"
            animate={{ y: ['0vh', '120vh'] }}
            transition={{ duration: 1 + (i % 3) * 0.3, repeat: Infinity, delay: i * 0.1, ease: 'linear' }}
          />
        ))}

        {/* Wave at bottom */}
        <motion.path
          d="M0 480 Q250 460 500 480 T1000 480 L1000 600 L0 600 Z"
          fill="#0a1929"
          animate={{ d: [
            'M0 480 Q250 460 500 480 T1000 480 L1000 600 L0 600 Z',
            'M0 480 Q250 470 500 460 T1000 480 L1000 600 L0 600 Z',
            'M0 480 Q250 460 500 480 T1000 480 L1000 600 L0 600 Z',
          ]}}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center gap-6 max-w-lg text-center"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <HeldAvatar config={avatarConfig} size={180} />
        </motion.div>

        <h1 className="text-hero font-display" style={{ color: heldenfarbe, textShadow: `0 0 24px ${heldenfarbe}80` }}>
          Schiffsunglück!
        </h1>

        <p className="text-body-lg font-body text-foreground leading-relaxed">
          Ein heftiger Sturm hat dein Schiff zerstört, <strong>{name}</strong>.
          Du bist in einer dunklen <strong>Höhle</strong> gestrandet.
        </p>
        <p className="text-body font-body text-muted-foreground leading-relaxed">
          Sammle die Teile, die das Meer angeschwemmt hat, und baue ein Floss,
          um wieder hinaus zu segeln.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <button
            onClick={onZurueck}
            className="text-muted-foreground text-body-lg font-display px-6 py-3 rounded-2xl bg-card active:scale-95"
            style={{ touchAction: 'manipulation' }}
          >
            🏠 Heim
          </button>
          <MagicButton onClick={onStart} variant="gold" size="lg">
            Los geht's! ✨
          </MagicButton>
        </div>
      </motion.div>
    </div>
  );
}
