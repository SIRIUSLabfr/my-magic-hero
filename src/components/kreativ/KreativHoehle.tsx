import { useRef, useState, useEffect, useCallback } from 'react';
import { FARBEN } from '@/types/profil';
import MagicButton from '@/components/ui/MagicButton';

interface Props {
  onZurueck: () => void;
}

export default function KreativHoehle({ onZurueck }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentColor, setCurrentColor] = useState<string>(FARBEN[0].hex);
  const [isEraser, setIsEraser] = useState(false);
  const drawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'hsl(280, 40%, 12%)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  const getPos = (e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: (e as React.MouseEvent).clientX - rect.left, y: (e as React.MouseEvent).clientY - rect.top };
  };

  const startDraw = (e: React.TouchEvent | React.MouseEvent) => {
    drawing.current = true;
    lastPos.current = getPos(e);
  };

  const draw = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    if (!drawing.current || !lastPos.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = isEraser ? 'hsl(280, 40%, 12%)' : currentColor;
    ctx.lineWidth = isEraser ? 30 : 6;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    lastPos.current = pos;
  }, [currentColor, isEraser]);

  const endDraw = () => {
    drawing.current = false;
    lastPos.current = null;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx && canvas) {
      ctx.fillStyle = 'hsl(280, 40%, 12%)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ touchAction: 'none' }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={endDraw}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={endDraw}
        onMouseLeave={endDraw}
      />

      {/* Bottom toolbar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-card/90 backdrop-blur rounded-full px-5 py-3 z-10">
        {FARBEN.map(f => (
          <button
            key={f.id}
            onClick={() => { setCurrentColor(f.hex); setIsEraser(false); }}
            className={`w-10 h-10 rounded-full transition-all duration-200 ${
              currentColor === f.hex && !isEraser ? 'ring-3 ring-foreground scale-125' : ''
            }`}
            style={{ backgroundColor: f.hex, touchAction: 'manipulation' }}
          />
        ))}
        <button
          onClick={() => setIsEraser(!isEraser)}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all ${
            isEraser ? 'ring-3 ring-foreground scale-125 bg-muted' : 'bg-muted'
          }`}
          style={{ touchAction: 'manipulation' }}
        >
          🧽
        </button>
        <button
          onClick={clearCanvas}
          className="w-10 h-10 rounded-full flex items-center justify-center text-xl bg-muted"
          style={{ touchAction: 'manipulation' }}
        >
          🔄
        </button>
      </div>

      {/* Back button */}
      <div className="absolute top-6 left-6 z-10">
        <MagicButton onClick={onZurueck} variant="secondary" size="lg">
          🏠
        </MagicButton>
      </div>
    </div>
  );
}
