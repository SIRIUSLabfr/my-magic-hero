import { useState } from 'react';
import { motion } from 'framer-motion';
import Hero from './Hero';
import BookHotspot from './BookHotspot';
import AdventurePortal from './AdventurePortal';
import Sparkles from './Sparkles';
import { ADVENTURES, type Adventure } from '../data/adventures';

/**
 * Die Bibliothek — der Startbildschirm der App.
 *
 * Aufbau in Schichten (von hinten nach vorn):
 *   1. Hintergrundbild (Library)
 *   2. Sparkles (CSS-Partikel über die ganze Szene)
 *   3. Heldin (sitzt am Tisch in der Mitte, atmet)
 *   4. Buch-Hotspots (pulsierende Glow-Bereiche auf den Regalen)
 *   5. Adventure-Portal (öffnet sich on-tap, blendet alles drüber)
 *
 * Das Layout nutzt ein 16:9-Container, damit die Hotspot-Positionen
 * (in % vom BG) immer richtig auf dem Bild liegen, egal welche Bildschirmgröße.
 */
export default function Library() {
  const [activeAdventure, setActiveAdventure] = useState<Adventure | null>(null);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#1a0e2a]">
      {/* 16:9 Container — passt sich responsive an, behält aber Aspect Ratio */}
      <div
        className="relative overflow-hidden shadow-[0_0_120px_rgba(245,200,130,0.15)]"
        style={{
          width: 'min(100vw, calc(100vh * 16 / 9))',
          height: 'min(100vh, calc(100vw * 9 / 16))',
        }}
      >
        {/* Hintergrund mit langsamem Atmen */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img
            src="/assets/scenes/library/library-bg.jpg"
            alt=""
            className="w-full h-full object-cover"
            draggable={false}
          />
        </motion.div>

        {/* Sanfte warme Vignette für Tiefe */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 45%, transparent 40%, rgba(30, 15, 50, 0.45) 100%)',
          }}
        />

        {/* Schwebende Sparkles über die ganze Szene */}
        <Sparkles count={36} />

        {/* Hotspots — die Bücher in den Regalen */}
        {ADVENTURES.map((a, i) => (
          <BookHotspot
            key={a.id}
            adventure={a}
            delayIndex={i}
            onActivate={setActiveAdventure}
          />
        ))}

        {/* Heldin auf dem Tisch */}
        <Hero />

        {/* Adventure-Portal: erscheint nur wenn ein Buch angetippt wurde */}
        <AdventurePortal
          adventure={activeAdventure}
          onClose={() => setActiveAdventure(null)}
        />
      </div>
    </div>
  );
}
