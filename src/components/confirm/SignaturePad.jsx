import { useRef, useState, useEffect, useCallback } from 'react';

export default function SignaturePad({ onSignatureChange, isSubmitting }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [mode, setMode] = useState('draw'); // 'draw' | 'type'
  const [typedName, setTypedName] = useState('');

  // Resize canvas resolution to match container bounding rect for 1:1 pixel accuracy
  const updateCanvasResolution = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#0f172a';
    }
  }, []);

  useEffect(() => {
    if (mode === 'draw') {
      updateCanvasResolution();
      window.addEventListener('resize', updateCanvasResolution);
      return () => window.removeEventListener('resize', updateCanvasResolution);
    }
  }, [mode, updateCanvasResolution]);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const clientY = e.clientY ?? (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (e.pointerId !== undefined && canvas.setPointerCapture) {
      try { canvas.setPointerCapture(e.pointerId); } catch {}
    }

    setIsDrawing(true);
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
    emitSignature();
  };

  const stopDrawing = (e) => {
    if (isDrawing) {
      setIsDrawing(false);
      const canvas = canvasRef.current;
      if (canvas && e.pointerId !== undefined && canvas.releasePointerCapture) {
        try { canvas.releasePointerCapture(e.pointerId); } catch {}
      }
      emitSignature();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    onSignatureChange(null);
  };

  const emitSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    onSignatureChange(dataUrl);
  };

  const handleTypedChange = (val) => {
    setTypedName(val);
    if (!val.trim()) {
      setHasSignature(false);
      onSignatureChange(null);
      return;
    }
    setHasSignature(true);

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 450;
    tempCanvas.height = 120;
    const ctx = tempCanvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 450, 120);
    ctx.font = 'italic 32px "Brush Script MT", cursive, sans-serif';
    ctx.fillStyle = '#0f172a';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(val, 225, 60);

    onSignatureChange(tempCanvas.toDataURL('image/png'));
  };

  return (
    <div className="bg-white border border-slate-300 p-4 space-y-3">
      <div className="flex items-center justify-between border-b border-slate-300 pb-2.5">
        <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Digital Signature Authorization *
        </span>

        {/* Mode Switcher */}
        <div className="flex items-center gap-2 text-xs font-medium">
          <button
            type="button"
            onClick={() => { setMode('draw'); clearCanvas(); }}
            className={`px-3 py-1 border border-slate-300 text-xs font-semibold cursor-pointer ${
              mode === 'draw' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            Draw Signature
          </button>
          <button
            type="button"
            onClick={() => { setMode('type'); setTypedName(''); onSignatureChange(null); }}
            className={`px-3 py-1 border border-slate-300 text-xs font-semibold cursor-pointer ${
              mode === 'type' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            Type Signature
          </button>
        </div>
      </div>

      {mode === 'draw' ? (
        <div className="relative">
          <canvas
            ref={canvasRef}
            onPointerDown={startDrawing}
            onPointerMove={draw}
            onPointerUp={stopDrawing}
            onPointerCancel={stopDrawing}
            className="w-full h-36 bg-white border border-slate-300 cursor-crosshair touch-none select-none"
          />

          {!hasSignature && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-xs text-slate-400 font-mono">
              Draw signature using mouse, trackpad, or touch
            </div>
          )}

          {hasSignature && (
            <button
              type="button"
              onClick={clearCanvas}
              disabled={isSubmitting}
              className="absolute top-2 right-2 px-3 py-1 bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 text-xs font-semibold cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <input
            type="text"
            value={typedName}
            onChange={(e) => handleTypedChange(e.target.value)}
            placeholder="Type your full legal name..."
            className="w-full bg-white border border-slate-300 px-4 py-3 text-lg font-serif italic text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-900"
          />
          <p className="text-[11px] text-slate-500 italic">This signature will be converted into a digital legal signature.</p>
        </div>
      )}

      <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1">
        <span>
          {hasSignature ? (
            <span className="text-slate-900 font-bold">Signature Recorded</span>
          ) : (
            <span className="text-slate-700 font-medium">* Digital signature required for authorization</span>
          )}
        </span>
        <span className="text-slate-500 uppercase font-mono text-[10px]">Encrypted Authorization Certificate</span>
      </div>
    </div>
  );
}
