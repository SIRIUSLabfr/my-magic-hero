import { motion } from 'framer-motion';
import HeldAvatar from '@/components/avatar/HeldAvatar';
import MagicButton from '@/components/ui/MagicButton';
import type { AvatarConfig } from '@/types/profil';

interface Props {
  avatarConfig: AvatarConfig;
  heldenfarbe: string;
  sternenstaub: number;
  onFertig: () => void;
  /** Optional next-level transition message + label */
  weiterLabel?: string;
  titel?: string;
  untertitel?: string;
}

export default function EndCutscene({
  avatarConfig,
  heldenfarbe,
  sternenstaub,
  onFertig,
  weiterLabel = 'Heimkehren 🏠',
  titel = '✨ Geschafft! ✨',
  untertitel = 'Du hast aus der Höhle herausgesegelt!',
}: Props) {
  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a1929 0%, #1a4068 50%, #2a6a98 100%)' }}
    >
      {/* Far light at horizon */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, #ffe6a8aa, #ffe6a800)',
          filter: 'blur(40px)',
        }}
      />

      {/* Distant cave silhouette - frames the scene */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Cave walls receding into distance */}
        <path
          d="M0 0 L0 600 L150 600 Q200 400 250 300 Q150 200 100 100 L0 0 Z"
          fill="#0a1320"
        />
        <path
          d="M1000 0 L1000 600 L850 600 Q800 400 750 300 Q850 200 900 100 L1000 0 Z"
          fill="#0a1320"
        />

        {/* Animated water waves */}
        {[0, 1, 2, 3, 4].map(i => (
          <motion.path
            key={i}
            d={`M0 ${480 + i * 25} Q250 ${475 + i * 25} 500 ${480 + i * 25} T1000 ${480 + i * 25}`}
            stroke="#5fa8d3"
            strokeWidth="2"
            fill="none"
            opacity={0.4 - i * 0.05}
            animate={{ x: [0, 20, 0, -20, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </svg>

      {/* Confetti / sparkles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          style={{ left: `${(i * 53) % 100}%`, top: '-5%' }}
          animate={{
            y: ['-5vh', '110vh'],
            x: [0, (i % 2 === 0 ? 1 : -1) * 50, 0],
            rotate: [0, 720],
          }}
          transition={{
            duration: 5 + (i % 3),
            repeat: Infinity,
            delay: i * 0.4,
            ease: 'linear',
          }}
        >
          {['✨', '⭐', '💫', '🌟'][i % 4]}
        </motion.div>
      ))}

      {/* Floss with hero - sailing across */}
      <motion.div
        className="absolute"
        initial={{ x: '-30vw', y: '60vh' }}
        animate={{
          x: ['-30vw', '50vw', '120vw'],
          y: ['60vh', '55vh', '60vh'],
        }}
        transition={{ duration: 12, ease: 'easeInOut', times: [0, 0.5, 1] }}
        onAnimationComplete={() => { /* nothing - we have a button */ }}
      >
        {/* Slight rocking motion */}
        <motion.div
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'bottom center' }}
        >
          {/* Raft SVG */}
          <svg width="280" height="200" viewBox="0 0 280 200">
            {/* Sail */}
            <motion.path
              d="M140 20 L210 110 L140 110 Z"
              fill="#f5e6c8"
              stroke="#7c5e3c"
              strokeWidth="2"
              animate={{ d: ['M140 20 L210 110 L140 110 Z', 'M140 20 L215 105 L140 110 Z', 'M140 20 L210 110 L140 110 Z'] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <line x1="140" y1="20" x2="140" y2="125" stroke="#7c5e3c" strokeWidth="3" />
            {/* Raft body - barrel & boards */}
            <rect x="40" y="125" width="200" height="20" rx="3" fill="#8B5A2B" />
            <rect x="50" y="125" width="180" height="3" fill="#6b4220" opacity="0.5" />
            <rect x="50" y="138" width="180" height="2" fill="#5a3618" opacity="0.5" />
            {/* Boards detail lines */}
            {[60, 90, 120, 150, 180, 210].map(x => (
              <line key={x} x1={x} y1="125" x2={x} y2="145" stroke="#5a3618" strokeWidth="1" opacity="0.5" />
            ))}
            {/* Barrel */}
            <ellipse cx="220" cy="135" rx="22" ry="14" fill="#a06a3a" />
            <ellipse cx="220" cy="130" rx="22" ry="6" fill="#b97f4d" />
            <line x1="200" y1="130" x2="240" y2="130" stroke="#5a3618" strokeWidth="1.5" />
            {/* Rope */}
            <path d="M50 138 Q120 142 230 138" stroke="#c9a679" strokeWidth="2" fill="none" />
            {/* Hero standing on the raft */}
            <g transform="translate(70, -20) scale(0.45)">
              <foreignObject x="0" y="0" width="200" height="340">
                <HeldAvatar config={avatarConfig} size={140} />
              </foreignObject>
            </g>
            {/* Water spray */}
            <motion.g
              animate={{ opacity: [0, 0.7, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <circle cx="35" cy="155" r="3" fill="#a3d8ff" />
              <circle cx="42" cy="160" r="2" fill="#a3d8ff" />
              <circle cx="245" cy="155" r="3" fill="#a3d8ff" />
              <circle cx="252" cy="160" r="2" fill="#a3d8ff" />
            </motion.g>
          </svg>
        </motion.div>
      </motion.div>

      {/* Top text */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center px-4">
        <motion.h1
          className="text-hero font-display"
          style={{ color: heldenfarbe, textShadow: `0 0 30px ${heldenfarbe}80` }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {titel}
        </motion.h1>
        <motion.p
          className="text-body-lg font-display text-foreground mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          {untertitel}
        </motion.p>
      </div>

      {/* Bottom button + reward */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.8 }}
      >
        <div
          className="flex items-center gap-2 px-5 py-2 rounded-full"
          style={{ background: `${heldenfarbe}30` }}
        >
          <span className="text-2xl">⭐</span>
          <span className="text-body-lg font-display" style={{ color: heldenfarbe }}>
            +{sternenstaub} Sternenstaub
          </span>
        </div>
        <MagicButton onClick={onFertig} variant="gold" size="lg">
          {weiterLabel}
        </MagicButton>
      </motion.div>
    </div>
  );
}
