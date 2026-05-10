import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import type { Adventure } from '../data/adventures';

type Props = {
  adventure: Adventure | null;
  onClose: () => void;
};

/**
 * Wenn ein Buch angetippt wird:
 *   1. Buch fliegt aus dem Regal in die Bildmitte (von Hotspot-Position aus).
 *   2. Das Buch öffnet sich — ein magisches Licht strömt heraus.
 *   3. Aus dem Licht erscheint die Adventure-Welt (Vorschau-Bild).
 *   4. Nach kurzer Zeit schließt sich das Buch wieder, fliegt zurück.
 *
 * KEIN Lerninhalt, keine Aufgabe. Reine Atmosphäre — Henrietta soll spüren:
 * "Bücher sind Türen. Ich kann hier rein." Mehr braucht's für Tag 1 nicht.
 */
export default function AdventurePortal({ adventure, onClose }: Props) {
  // Auto-Close nach 5 Sekunden, falls sie nicht selbst tippt
  useEffect(() => {
    if (!adventure) return;
    const timer = setTimeout(onClose, 5500);
    return () => clearTimeout(timer);
  }, [adventure, onClose]);

  return (
    <AnimatePresence>
      {adventure && (
        <motion.div
          className="absolute inset-0 z-30 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onClose}
        >
          {/* Abdunkler Hintergrund-Layer (sehr dezent — wir wollen die Library noch sehen) */}
          <motion.div
            className="absolute inset-0"
            style={{ background: 'rgba(20, 10, 35, 0.55)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Zentrales Lichtportal */}
          <motion.div
            className="absolute pointer-events-none"
            style={{ width: '70vw', height: '70vw', maxWidth: '700px', maxHeight: '700px' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.2, 1],
              opacity: [0, 1, 0.85],
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <div className="portal-glow w-full h-full rounded-full" />
          </motion.div>

          {/* Das Buch fliegt aus dem Regal in die Mitte und schwebt */}
          <motion.img
            src="/assets/books/book-magic.png"
            alt=""
            draggable={false}
            className="absolute pointer-events-none"
            style={{ width: 'min(36vw, 360px)', height: 'auto' }}
            initial={{
              left: `${adventure.x}%`,
              top: `${adventure.y}%`,
              x: '-50%',
              y: '-50%',
              scale: 0.3,
              rotate: -20,
              opacity: 0,
            }}
            animate={{
              left: '50%',
              top: '50%',
              x: '-50%',
              y: '-50%',
              scale: [0.3, 1.1, 0.05],
              rotate: [-20, 8, 0],
              opacity: [0, 1, 0],
            }}
            exit={{ opacity: 0, scale: 0.3 }}
            transition={{
              duration: 1.6,
              times: [0, 0.6, 1],
              ease: 'easeInOut',
            }}
          />

          {/* Adventure-Vorschau erscheint aus dem Licht heraus */}
          <motion.div
            className="absolute rounded-3xl overflow-hidden"
            style={{
              width: 'min(70vw, 720px)',
              aspectRatio: '16 / 9',
              boxShadow: `0 0 80px 20px ${adventure.glow}66, 0 30px 80px rgba(0,0,0,0.5)`,
              border: '4px solid rgba(255, 240, 180, 0.6)',
            }}
            initial={{ scale: 0.1, opacity: 0, filter: 'blur(20px)' }}
            animate={{
              scale: [0.1, 1.05, 1],
              opacity: [0, 1, 1],
              filter: ['blur(20px)', 'blur(0px)', 'blur(0px)'],
            }}
            exit={{ scale: 0.7, opacity: 0, filter: 'blur(12px)' }}
            transition={{
              duration: 1.4,
              delay: 1.2,
              times: [0, 0.7, 1],
              ease: 'easeOut',
            }}
          >
            <img
              src={adventure.preview}
              alt=""
              className="w-full h-full object-cover"
              draggable={false}
            />
            {/* Sanfte Vignette, damit das Bild magisch wirkt, nicht wie ein Foto */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at center, transparent 50%, rgba(20,10,35,0.5) 100%)',
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
