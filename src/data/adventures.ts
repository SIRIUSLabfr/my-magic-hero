// Adventures: jedes Buch im Regal ist ein Tor zu einer Welt.
// Position (x/y) ist in % vom Library-Hintergrundbild — responsive, egal welche Bildschirmgröße.
// Reine Atmosphäre für jetzt: Vorschau-Bild + dezente Stimmungs-Note. Kein Lerninhalt.

export type Adventure = {
  id: string;
  // Hotspot-Position auf dem Library-BG (Prozent)
  x: number;
  y: number;
  // Tönung des Glühens, passt zur Welt
  glow: string;
  // Pfad zum Vorschau-Bild (relativ zu /public)
  preview: string;
};

export const ADVENTURES: Adventure[] = [
  {
    id: 'meadow',
    x: 12,
    y: 38,
    glow: '#a8e29c',
    preview: '/assets/scenes/adventures/meadow.jpg',
  },
  {
    id: 'river',
    x: 9,
    y: 60,
    glow: '#7fd6ee',
    preview: '/assets/scenes/adventures/river.jpg',
  },
  {
    id: 'town',
    x: 90,
    y: 42,
    glow: '#f5c97c',
    preview: '/assets/scenes/adventures/town.jpg',
  },
  {
    id: 'forest',
    x: 92,
    y: 64,
    glow: '#c19cff',
    preview: '/assets/scenes/adventures/forest.jpg',
  },
];
