import { motion } from 'framer-motion';
import type { Adventure } from '../data/adventures';

type Props = {
  adventure: Adventure;
  onActivate: (a: Adventure) => void;
  delayIndex: number; // staggered Pulsieren, damit sie nicht synchron blinken
};

/**
 * Ein Hotspot ist die Tap-Zone auf einem Buch im Regal.
 * Visuell: ein weicher pulsierender Glow in der Farbe des Adventures.
 * Kein sichtbares Element, das wie ein Button aussieht — nur Magie, die einlädt.
 */
export default function BookHotspot({ adventure, onActivate, delayIndex }: Props) {
  return (
    <motion.button
      type="button"
      onClick={() => onActivate(adventure)}
      className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
      style={{
        left: `${adventure.x}%`,
        top: `${adventure.y}%`,
        width: 'clamp(70px, 10vw, 130px)',
        height: 'clamp(95px, 14vw, 170px)',
      }}
      aria-label="Ein Buch öffnen"
      whileTap={{ scale: 0.92 }}
    >
      {/* Großer äußerer Glow — weicher Atmosphären-Schimmer */}
      <motion.span
        className="absolute -inset-6 rounded-full blur-2xl"
        style={{ background: adventure.glow, mixBlendMode: 'screen' }}
        animate={{
          opacity: [0.45, 0.85, 0.45],
          scale: [0.85, 1.15, 0.85],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delayIndex * 0.7,
        }}
      />
      {/* Mittlerer Glow — buchförmig */}
      <motion.span
        className="absolute inset-0 rounded-2xl blur-lg"
        style={{ background: adventure.glow, mixBlendMode: 'screen' }}
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delayIndex * 0.7,
        }}
      />
      {/* Innerer warmer Kern — gold-warm, nicht weiß, weicher */}
      <motion.span
        className="absolute inset-4 rounded-2xl blur-md"
        style={{
          background: `radial-gradient(circle, rgba(255,220,140,0.55), ${adventure.glow}88 60%, transparent 100%)`,
          mixBlendMode: 'screen',
        }}
        animate={{
          opacity: [0.35, 0.7, 0.35],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delayIndex * 0.7 + 0.3,
        }}
      />
      {/* Tap-Verstärkung */}
      <span
        className="absolute -inset-4 rounded-full blur-2xl opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300"
        style={{ background: adventure.glow, mixBlendMode: 'screen' }}
      />
    </motion.button>
  );
}
