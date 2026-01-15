'use client';

import { useEffect, useRef, useState } from 'react';
import SignaturePad from 'signature_pad';
import Header from '../components/header';
import PageContainer from '../components/layouts/page-container';
import { IoArrowBack, IoArrowForward, IoTrash, IoDownload, IoColorPalette, IoImage } from 'react-icons/io5';

export default function DrawPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const signaturePadRef = useRef<SignaturePad | null>(null);
  const [penColor, setPenColor] = useState('#3B82F6');
  const [bgColor, setBgColor] = useState('rgba(0,0,0,0)');
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
        penColor: penColor
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

    // For JPG we need a white background if transparent
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
      <Header title="Draw" />
      
      <div className="flex flex-col gap-6">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 items-center justify-between">
          <div className="flex gap-2">
            <button onClick={undo} disabled={undoStack.length === 0} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg disabled:opacity-30 transition-all" title="Undo"><IoArrowBack size={20}/></button>
            <button onClick={redo} disabled={redoStack.length === 0} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg disabled:opacity-30 transition-all" title="Redo"><IoArrowForward size={20}/></button>
            <div className="w-px h-6 bg-gray-300 dark:bg-white/20 mx-1" />
            <button onClick={clear} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 rounded-lg transition-all" title="Clear"><IoTrash size={20}/></button>
          </div>

          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2">
              <IoColorPalette className="text-gray-500" />
              <input type="color" value={penColor} onChange={(e) => setPenColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer bg-transparent" title="Pen Color" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border border-gray-400" style={{ backgroundColor: bgColor === 'rgba(0,0,0,0)' ? 'white' : bgColor }} />
              <select value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="bg-transparent text-sm font-medium outline-none">
                <option value="rgba(0,0,0,0)">Transparent</option>
                <option value="#ffffff">White</option>
                <option value="#f3f4f6">Light Gray</option>
                <option value="#1f2937">Dark Gray</option>
                <option value="#000000">Black</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={() => save('png')} className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-xl hover:opacity-90 transition-all text-sm font-bold shadow-lg shadow-primary-500/20"><IoImage /> PNG</button>
            <button onClick={() => save('jpg')} className="flex items-center gap-2 px-4 py-2 bg-gray-800 dark:bg-white text-white dark:text-black rounded-xl hover:opacity-90 transition-all text-sm font-bold"><IoDownload /> JPG</button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="relative h-[65vh] w-full border-2 border-dashed border-gray-300 dark:border-white/20 rounded-3xl overflow-hidden bg-white dark:bg-black/40 shadow-inner">
          <canvas ref={canvasRef} className="h-full w-full cursor-crosshair touch-none" style={{ backgroundColor: bgColor }} />
        </div>

        <p className="text-center text-sm text-gray-500 font-medium">
          Create, edit, and export your drawings in high quality.
        </p>
      </div>
    </PageContainer>
  );
}
