# Heldenschule — Bibliothek (Phase 0)

Neustart der App. Die Bibliothek ist der zentrale Hub: jedes Buch im Regal ist ein Tor zu einem eigenen Abenteuer. Dieser erste Wurf zeigt **nur Atmosphäre und das Versprechen**, kein Lerninhalt.

## Was Henrietta sieht

- Eine warme, schimmernde Bibliothek mit hohen Regalen
- Ihre Heldin sitzt mitten im Raum auf einem Tisch und atmet sanft
- 4 Bücher im Regal pulsieren in unterschiedlichen Farben — sie laden ein, ohne zu drängen
- Beim Tippen: Das Buch fliegt in die Mitte, öffnet sich in einem Lichtschein, eine Welt erscheint kurz, dann schließt sich das Buch wieder und fliegt zurück

Keine Frage. Keine Aufgabe. Keine Punkte. Sie kann nichts falsch machen.

## Lokal starten

```bash
npm install
npm run dev
```

Dann öffnen unter `http://localhost:5173`. Auf dem iPad: Im selben WLAN aufrufen mit der IP, die Vite anzeigt.

## Bauen für Netlify

```bash
npm run build
```

Output liegt in `dist/`. Auf Netlify als Build-Befehl `npm run build`, Publish-Verzeichnis `dist`.

## Projektstruktur

```
src/
├── App.tsx                          # Root
├── main.tsx                         # React Bootstrap
├── index.css                        # Tailwind + Custom-Magic-CSS
├── components/
│   ├── Library.tsx                  # Hauptszene, alles zusammengesetzt
│   ├── Hero.tsx                     # Heldin (atmend)
│   ├── BookHotspot.tsx              # Pulsierender Tap-Bereich auf einem Buch
│   ├── AdventurePortal.tsx          # Buch-Öffnen-Animation + Vorschau
│   └── Sparkles.tsx                 # CSS-only Funken
└── data/
    └── adventures.ts                # Hotspot-Positionen + Vorschau-Bilder

public/assets/
├── characters/jetti.png             # Heldin freigestellt (transparent)
├── scenes/library/library-bg.jpg    # Hintergrund (ohne Heldin)
├── scenes/adventures/               # 4 Welten als Vorschau
│   ├── meadow.jpg
│   ├── river.jpg
│   ├── town.jpg
│   └── forest.jpg
└── books/book-magic.png             # Schwebendes Buch (transparent)
```

## Hotspot-Positionen anpassen

Die 4 Buch-Tap-Bereiche sind als Prozent-Werte vom Library-Hintergrund definiert in `src/data/adventures.ts`. Wenn ein Hotspot nicht auf einem Buch sitzt, einfach `x` und `y` (in %) anpassen.

## Was als Nächstes kommt

Phase 0 (jetzt): Atmosphäre + 4 Tore zum Anschauen.

Phase 1: **Eines** der Bücher bekommt ein echtes Mini-Erlebnis (z.B. Buchstaben sammeln, ein einzelnes Wort entschlüsseln). Welches das wird, hängt davon ab, was Henrietta zuerst antippt.

Phase 2+: Weitere Welten, Adaptivität, etc.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS 3 (mit Custom-Theme: Macondo + Quicksand Fonts, Magic-Farbpalette)
- Framer Motion für Animationen
- Keine localStorage-Schreibweise nötig — alles state-lokal
