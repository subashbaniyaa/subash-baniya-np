'use client';

import { useEffect, useRef, useState } from 'react';
import SignaturePad from 'signature_pad';
import Header from '../components/header';
import PageContainer from '../components/layouts/page-container';
import { IoArrowBack, IoArrowForward, IoTrash, IoDownload, IoImage, IoBrush } from 'react-icons/io5';

export default function DrawContent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const signaturePadRef = useRef<SignaturePad | null>(null);
  const [penColor, setPenColor] = useState('#3B82F6');
  const [bgColor, setBgColor] = useState('rgba(0,0,0,0)');
  const [minWidth, setMinWidth] = useState(0.5);
  const [maxWidth, setMaxWidth] = useState(2.5);
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      
      const updateCanvasSize = () => {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        const data = signaturePadRef.current?.toData();
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext('2d')?.scale(ratio, ratio);
        if (data) signaturePadRef.current?.fromData(data);
      };

      window.addEventListener('resize', updateCanvasSize);
      updateCanvasSize();

      signaturePadRef.current = new SignaturePad(canvas, {
        backgroundColor: bgColor,
        penColor: penColor,
        minWidth: minWidth,
        maxWidth: maxWidth
      });

      signaturePadRef.current.addEventListener('endStroke', () => {
        const data = signaturePadRef.current?.toData();
        if (data) {
          setUndoStack(prev => [...prev, JSON.stringify(data)]);
          setRedoStack([]);
        }
      });

      return () => {
        window.removeEventListener('resize', updateCanvasSize);
        signaturePadRef.current?.off();
      };
    }
  }, []);

  useEffect(() => {
    if (signaturePadRef.current) {
      signaturePadRef.current.penColor = penColor;
    }
  }, [penColor]);

  useEffect(() => {
    if (signaturePadRef.current) {
      signaturePadRef.current.minWidth = minWidth;
      signaturePadRef.current.maxWidth = maxWidth;
    }
  }, [minWidth, maxWidth]);

  useEffect(() => {
    if (signaturePadRef.current) {
      signaturePadRef.current.backgroundColor = bgColor;
      const data = signaturePadRef.current.toData();
      signaturePadRef.current.clear();
      signaturePadRef.current.fromData(data);
    }
  }, [bgColor]);

  const undo = () => {
    if (undoStack.length > 0) {
      const current = undoStack[undoStack.length - 1];
      const newUndo = undoStack.slice(0, -1);
      setUndoStack(newUndo);
      setRedoStack(prev => [...prev, current]);
      
      if (newUndo.length > 0) {
        signaturePadRef.current?.fromData(JSON.parse(newUndo[newUndo.length - 1]));
      } else {
        signaturePadRef.current?.clear();
      }
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const next = redoStack[redoStack.length - 1];
      setRedoStack(prev => prev.slice(0, -1));
      setUndoStack(prev => [...prev, next]);
      signaturePadRef.current?.fromData(JSON.parse(next));
    }
  };

  const clear = () => {
    signaturePadRef.current?.clear();
    setUndoStack([]);
    setRedoStack([]);
  };

  const save = (format: 'png' | 'jpg') => {
    if (signaturePadRef.current?.isEmpty()) return alert('Canvas is empty');
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const ctx = tempCanvas.getContext('2d');
    if (!ctx) return;

    if (format === 'jpg' || bgColor === 'rgba(0,0,0,0)') {
      ctx.fillStyle = format === 'jpg' ? '#ffffff' : bgColor;
      ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    }
    ctx.drawImage(canvas, 0, 0);

    const link = document.createElement('a');
    link.download = `drawing.${format}`;
    link.href = tempCanvas.toDataURL(`image/${format === 'png' ? 'png' : 'jpeg'}`);
    link.click();
  };

  return (
    <PageContainer>
      <div className="font-poppins">
        <Header title="Draw" />
        
        <div className="flex flex-col gap-6">
          {/* Minimal Toolbar */}
          <div className="relative group">
            <div className="flex flex-wrap gap-6 p-2 bg-transparent items-center justify-between pb-6">
              <div className="flex items-center gap-1">
                <button onClick={undo} disabled={undoStack.length === 0} className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full disabled:opacity-20 transition-all" title="Undo"><IoArrowBack size={18}/></button>
                <button onClick={redo} disabled={redoStack.length === 0} className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full disabled:opacity-20 transition-all" title="Redo"><IoArrowForward size={18}/></button>
                <div className="w-px h-4 bg-gray-200 dark:bg-white/10 mx-2" />
                <button onClick={clear} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/10 text-red-400 rounded-full transition-all" title="Clear"><IoTrash size={18}/></button>
              </div>

              <div className="flex flex-wrap gap-6 items-center">
                {/* Color Picker */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Color</span>
                  <div className="relative group/picker">
                    <div className="w-6 h-6 rounded-full border border-gray-200 dark:border-white/10 overflow-hidden" style={{ backgroundColor: penColor }}>
                      <input type="color" value={penColor} onChange={(e) => setPenColor(e.target.value)} className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                  </div>
                </div>

                {/* Stroke Width */}
                <div className="flex items-center gap-3">
                  <IoBrush size={14} className="text-gray-400" />
                  <input 
                    type="range" 
                    min="0.5" 
                    max="10" 
                    step="0.5"
                    value={maxWidth} 
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      setMaxWidth(val);
                      setMinWidth(val / 3);
                    }}
                    className="w-24 accent-primary-500 h-1 bg-gray-200 dark:bg-white/10 rounded-full appearance-none cursor-pointer"
                  />
                </div>

                {/* Background Selection */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Canvas</span>
                  <select value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="bg-transparent text-xs font-semibold outline-none appearance-none cursor-pointer hover:text-primary-500 transition-colors">
                    <option value="rgba(0,0,0,0)">Transparent</option>
                    <option value="#ffffff">White</option>
                    <option value="#f8fafc">Soft Gray</option>
                    <option value="#0f172a">Deep Navy</option>
                    <option value="#000000">True Black</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => save('png')} className="px-4 py-1.5 text-xs font-bold border border-gray-200 dark:border-white/10 rounded-full hover:bg-gray-50 dark:hover:bg-white/5 transition-all">PNG</button>
                <button onClick={() => save('jpg')} className="px-4 py-1.5 text-xs font-bold bg-black dark:bg-white text-white dark:text-black rounded-full hover:opacity-90 transition-all">JPG</button>
              </div>
            </div>
            {/* Top Blue Decorative Line */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
          </div>

          {/* Canvas Area */}
          <div className="relative">
            <div className="relative h-[65vh] w-full rounded-2xl overflow-hidden bg-white dark:bg-black/20 transition-colors duration-500" style={{ backgroundColor: bgColor }}>
              <canvas ref={canvasRef} className="h-full w-full cursor-crosshair touch-none" />
            </div>
            {/* Bottom Blue Decorative Line */}
            <div className="absolute -bottom-6 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
