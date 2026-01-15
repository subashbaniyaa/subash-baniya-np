'use client';

import { useEffect, useRef, useState } from 'react';
import SignaturePad from 'signature_pad';
import Header from '../components/header';
import PageContainer from '../components/layouts/page-container';
import { IoArrowBack, IoArrowForward, IoTrash, IoDownload, IoImage, IoBrush, IoHomeOutline } from 'react-icons/io5';
import Link from 'next/link';

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
        <div className="flex flex-col gap-6">
          {/* Minimal Toolbar */}
          <div className="relative group">
            {/* Top Blue Decorative Line for Toolbar */}
            <div className="w-full border-b border-primary-500 mb-6" />
            
            <div className="flex flex-wrap gap-6 p-2 bg-transparent items-center justify-between pb-6 text-poppins">
              <div className="flex items-center gap-1">
                <button onClick={undo} disabled={undoStack.length === 0} className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full disabled:opacity-20 transition-all" title="Undo"><IoArrowBack size={18}/></button>
                <button onClick={redo} disabled={redoStack.length === 0} className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full disabled:opacity-20 transition-all" title="Redo"><IoArrowForward size={18}/></button>
                <div className="w-px h-4 bg-gray-200 dark:bg-white/10 mx-2" />
                <button onClick={clear} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/10 text-red-400 rounded-full transition-all" title="Clear"><IoTrash size={18}/></button>
              </div>

              <div className="flex flex-wrap gap-6 items-center">
                {/* Color Picker */}
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Color</span>
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
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Canvas</span>
                  <div className="flex gap-2">
                    {[
                      { label: 'T', value: 'rgba(0,0,0,0)', title: 'Transparent' },
                      { label: 'W', value: '#ffffff', title: 'White' },
                      { label: 'G', value: '#f8fafc', title: 'Soft Gray' },
                      { label: 'N', value: '#0f172a', title: 'Deep Navy' },
                      { label: 'B', value: '#000000', title: 'True Black' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setBgColor(option.value)}
                        className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold transition-all border ${
                          bgColor === option.value 
                            ? 'bg-primary-500 border-primary-500 text-white shadow-sm' 
                            : 'bg-transparent border-gray-200 dark:border-white/10 text-gray-400 hover:border-gray-300 dark:hover:border-white/20'
                        }`}
                        title={option.title}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => save('png')} className="px-4 py-1.5 text-[10px] font-bold border border-gray-200 dark:border-white/10 rounded-full hover:bg-gray-50 dark:hover:bg-white/5 transition-all">PNG</button>
                <button onClick={() => save('jpg')} className="px-4 py-1.5 text-[10px] font-bold bg-black dark:bg-white text-white dark:text-black rounded-full hover:opacity-90 transition-all">JPG</button>
              </div>
            </div>
            {/* Bottom Blue Decorative Line for Toolbar */}
            <div className="w-full border-b border-primary-500" />
          </div>

          {/* Canvas Area */}
          <div className="relative">
            <div className="relative h-[65vh] w-full rounded-2xl overflow-hidden bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 transition-colors duration-500 mt-6" style={{ backgroundColor: bgColor }}>
              <canvas ref={canvasRef} className="h-full w-full cursor-crosshair touch-none" />
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="mt-12 pt-8 border-t border-primary-500">
            <Link href="/" className="underline-magical bg-black/10 dark:bg-white/10 px-1 rounded-none text-poppins">Return to homepage</Link>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
