import { useRef, useState, useEffect, useCallback } from 'react';
import { Eraser, PenTool, Type, CheckCircle2 } from 'lucide-react';

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

  // Compute exact coordinates taking scale into account
  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    // Pointer or touch or mouse coordinates relative to rect
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

    // Capture pointer so trackpad/mouse moves stay tracked even outside canvas
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

  // Generate typed signature on hidden canvas
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
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3 shadow-inner">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <PenTool size={16} className="text-blue-600" />
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Digital Signature Authorization *
          </span>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs">
          <button
            type="button"
            onClick={() => { setMode('draw'); clearCanvas(); }}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1 font-semibold transition-all ${
              mode === 'draw' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PenTool size={12} />
            <span>Draw</span>
          </button>
          <button
            type="button"
            onClick={() => { setMode('type'); setTypedName(''); onSignatureChange(null); }}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1 font-semibold transition-all ${
              mode === 'type' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Type size={12} />
            <span>Type</span>
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
            className="w-full h-36 bg-white border border-dashed border-slate-300 rounded-xl cursor-crosshair touch-none shadow-sm select-none"
          />

          {!hasSignature && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-xs text-slate-400 font-mono">
              Sign with your mouse, trackpad, or finger here
            </div>
          )}

          {hasSignature && (
            <button
              type="button"
              onClick={clearCanvas}
              disabled={isSubmitting}
              className="absolute top-2 right-2 px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
            >
              <Eraser size={12} />
              <span>Clear</span>
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
            className="w-full bg-white border border-dashed border-slate-300 rounded-xl px-4 py-3 text-lg font-serif italic text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 shadow-sm"
          />
          <p className="text-[10px] text-slate-500 italic">This signature will be converted into a digital legal signature image.</p>
        </div>
      )}

      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
        <span className="flex items-center gap-1">
          {hasSignature ? (
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 size={13} />
              Signature Recorded
            </span>
          ) : (
            <span className="text-amber-700 font-medium">* Signature required before approval</span>
          )}
        </span>
        <span className="text-slate-400">Encrypted Digital Authorization</span>
      </div>
    </div>
  );
}
