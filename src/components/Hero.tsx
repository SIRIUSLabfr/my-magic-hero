import { motion } from 'framer-motion';

/**
 * Die Heldin (Jetti) — sitzt auf dem Tisch in der Mitte der Bibliothek,
 * atmet sanft, schwebt minimal. Kein Tap-Handler — sie ist Stimmung, kein UI-Element.
 */
export default function Hero() {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        // ~ Tisch-Position im Library-BG. Wenn du den BG änderst,
        // pass diese Werte an, damit sie auf dem Tisch sitzt.
        left: '50%',
        bottom: '14%',
        translateX: '-50%',
        width: 'min(38vw, 360px)',
      }}
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <img
        src="/assets/characters/jetti.png"
        alt=""
        className="w-full h-auto select-none"
        draggable={false}
        style={{
          filter: 'drop-shadow(0 12px 24px rgba(0, 0, 0, 0.35))',
        }}
      />
    </motion.div>
  );
}
