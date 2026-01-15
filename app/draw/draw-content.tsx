'use client';

import { useEffect, useRef, useState } from 'react';
import SignaturePad from 'signature_pad';
import Header from '../components/header';
import PageContainer from '../components/layouts/page-container';
import { IoArrowBack, IoArrowForward, IoTrash, IoDownload, IoImage, IoBrush, IoHomeOutline, IoPencil, IoColorFill, IoText, IoSearch, IoShapesOutline } from 'react-icons/io5';
import { LuEraser, LuLayers } from "react-icons/lu";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import Link from 'next/link';

export default function DrawContent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const signaturePadRef = useRef<SignaturePad | null>(null);
  const [penColor, setPenColor] = useState('#000000');
  const [isEraser, setIsEraser] = useState(false);
  const [activeTool, setActiveTool] = useState('pencil');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [minWidth, setMinWidth] = useState(0.5);
  const [maxWidth, setMaxWidth] = useState(2.5);
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);

  const colors = [
    '#000000', '#7f7f7f', '#880015', '#ed1c24', '#ff7f27', '#fff200', '#22b14c', '#00a2e8', '#3f48cc', '#a349a4',
    '#ffffff', '#c3c3c3', '#b97a57', '#ffaec9', '#ffc90e', '#efe4b0', '#b5e61d', '#99d9ea', '#7092be', '#c8bfe7'
  ];

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      
      const updateCanvasSize = () => {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        const data = signaturePadRef.current?.toData();
        const parent = canvas.parentElement;
        if (parent) {
          canvas.width = parent.offsetWidth * ratio;
          canvas.height = parent.offsetHeight * ratio;
          canvas.getContext('2d')?.scale(ratio, ratio);
          if (data) signaturePadRef.current?.fromData(data);
        }
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
      signaturePadRef.current.penColor = isEraser ? (bgColor === 'transparent' ? '#ffffff' : bgColor) : penColor;
      signaturePadRef.current.compositeOperation = isEraser ? 'destination-out' : 'source-over';
    }
  }, [penColor, isEraser, bgColor]);

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

    if (format === 'jpg' || bgColor === 'transparent') {
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
      <div className="font-poppins select-none">
        <div className="flex flex-col gap-4">
          {/* MS Paint Style Toolbar */}
          <div className="bg-[#f3f3f3] dark:bg-[#1e1e1e] border border-gray-200 dark:border-white/10 rounded-xl p-2 flex flex-wrap items-stretch gap-4 shadow-sm">
            
            {/* Tools Group */}
            <div className="flex flex-col items-center gap-1 px-2 border-r border-gray-300 dark:border-white/10">
              <div className="flex gap-2">
                <div className="flex flex-col gap-1">
                  <button onClick={undo} disabled={undoStack.length === 0} className="p-1 hover:bg-white dark:hover:bg-white/5 rounded disabled:opacity-30"><IoArrowBack size={14}/></button>
                  <button onClick={redo} disabled={redoStack.length === 0} className="p-1 hover:bg-white dark:hover:bg-white/5 rounded disabled:opacity-30"><IoArrowForward size={14}/></button>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <button onClick={() => { setIsEraser(false); setActiveTool('pencil'); }} className={`p-1.5 rounded ${activeTool === 'pencil' ? 'bg-white dark:bg-white/10 shadow-sm' : 'hover:bg-white/50'}`}><IoPencil size={16}/></button>
                  <button className="p-1.5 rounded hover:bg-white/50"><IoColorFill size={16}/></button>
                  <button className="p-1.5 rounded hover:bg-white/50"><IoText size={16}/></button>
                  <button onClick={() => { setIsEraser(true); setActiveTool('eraser'); }} className={`p-1.5 rounded ${activeTool === 'eraser' ? 'bg-white dark:bg-white/10 shadow-sm' : 'hover:bg-white/50'}`}><LuEraser size={16}/></button>
                  <button className="p-1.5 rounded hover:bg-white/50"><IoImage size={16}/></button>
                  <button className="p-1.5 rounded hover:bg-white/50"><IoSearch size={16}/></button>
                </div>
              </div>
              <span className="text-[9px] text-gray-500 font-medium">Tools</span>
            </div>

            {/* Brushes Group */}
            <div className="flex flex-col items-center gap-1 px-2 border-r border-gray-300 dark:border-white/10">
              <button className="p-2 hover:bg-white dark:hover:bg-white/5 rounded-md transition-all flex flex-col items-center gap-1">
                <IoBrush size={24} className="text-primary-500" />
                <span className="text-[10px]">Brushes</span>
              </button>
              <span className="text-[9px] text-gray-500 font-medium">Brushes</span>
            </div>

            {/* Colors Group */}
            <div className="flex flex-col items-center gap-1 px-2 flex-1">
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded border-2 border-white shadow-sm" style={{ backgroundColor: penColor }} />
                  <span className="text-[8px]">Color 1</span>
                </div>
                <div className="grid grid-cols-10 gap-1">
                  {colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setPenColor(color)}
                      className="w-4 h-4 rounded-full border border-gray-300 dark:border-white/10 transition-transform hover:scale-125"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <button className="flex flex-col items-center gap-1 p-1 hover:bg-white dark:hover:bg-white/5 rounded">
                  <BsStars size={20} className="text-orange-400" />
                  <span className="text-[10px]">Edit</span>
                </button>
              </div>
              <span className="text-[9px] text-gray-500 font-medium">Colors</span>
            </div>
          </div>

          {/* Canvas Area */}
          <div className="relative group/canvas">
            {/* Sidebar Controls (Size) */}
            <div className="absolute left-[-50px] top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 opacity-0 group-hover/canvas:opacity-100 transition-opacity">
              <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-white/10 p-2 rounded-full shadow-lg flex flex-col items-center gap-2">
                <span className="text-[8px] font-bold">SIZE</span>
                <input 
                  type="range" 
                  min="0.5" 
                  max="20" 
                  step="0.5"
                  value={maxWidth} 
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setMaxWidth(val);
                    setMinWidth(val / 3);
                  }}
                  className="h-32 accent-primary-500 appearance-none cursor-pointer bg-gray-200 dark:bg-white/10 rounded-full w-1"
                  style={{ writingMode: 'bt-lr' as any, appearance: 'slider-vertical' as any }}
                />
              </div>
            </div>

            <div className="relative h-[70vh] w-full bg-[#f0f0f0] dark:bg-black/40 rounded-lg p-4 overflow-hidden border border-gray-200 dark:border-white/10 shadow-inner">
               <div className="w-full h-full bg-white shadow-lg relative mx-auto" style={{ backgroundColor: bgColor }}>
                  <canvas ref={canvasRef} className="w-full h-full cursor-crosshair touch-none" />
               </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex justify-between items-center px-4 py-2 bg-[#f3f3f3] dark:bg-[#1e1e1e] border border-gray-200 dark:border-white/10 rounded-lg text-[10px] text-gray-500">
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <IoHomeOutline />
                <span>1727 x 648px</span>
              </div>
              <div className="flex items-center gap-1 text-primary-500">
                <button onClick={() => clear()} className="hover:underline">Reset Canvas</button>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex gap-2">
                <button onClick={() => save('png')} className="hover:text-black dark:hover:text-white transition-colors uppercase font-bold tracking-tighter">Save PNG</button>
                <button onClick={() => save('jpg')} className="hover:text-black dark:hover:text-white transition-colors uppercase font-bold tracking-tighter">Save JPG</button>
              </div>
              <div className="w-px h-3 bg-gray-300" />
              <span>100%</span>
              <Link href="/" className="text-primary-500 hover:underline">Return Home</Link>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
