'use client';

import { useEffect, useRef, useState } from 'react';
import SignaturePad from 'signature_pad';
import Header from '../components/header';
import PageContainer from '../components/layouts/page-container';
import { IoHomeOutline, IoTrash } from 'react-icons/io5';
import { FaEraser, FaRotateLeft, FaRotateRight, FaBrush, FaPencil } from "react-icons/fa6";
import Image from 'next/image';

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
  const [eraserWidth, setEraserWidth] = useState(10);
  const [brushType, setBrushType] = useState<'marker'>('marker');

  const colors = [
    '#000000', '#7f7f7f', '#880015', '#ed1c24', '#ff7f27', '#fff200', '#22b14c', '#00a2e8', '#3f48cc', '#a349a4',
    '#ffffff', '#c3c3c3', '#b97a57', '#ffaec9', '#ffc90e', '#efe4b0', '#b5e61d', '#99d9ea', '#7092be', '#c8bfe7'
  ];

  const [isEmpty, setIsEmpty] = useState(true);

  const [isBgApplied, setIsBgApplied] = useState(false);

  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (toolId: string) => {
    setImageErrors(prev => ({ ...prev, [toolId]: true }));
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsBgApplied(sessionStorage.getItem('drawing-bg-active') === 'true');
    }
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      
      const updateCanvasSize = () => {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        const parent = canvas.parentElement;
        if (parent) {
          const width = parent.offsetWidth;
          const height = parent.offsetHeight;
          
          const data = signaturePadRef.current?.toData();
          
          canvas.width = width * ratio;
          canvas.height = height * ratio;
          canvas.getContext('2d')?.scale(ratio, ratio);
          
          setCanvasSize({ width, height });
          
          if (data) signaturePadRef.current?.fromData(data);
        }
      };

      window.addEventListener('resize', updateCanvasSize);
      updateCanvasSize();

      const signaturePad = new (SignaturePad as any)(canvas, {
        backgroundColor: bgColor,
        penColor: penColor,
        minWidth: minWidth,
        maxWidth: maxWidth
      });
      signaturePadRef.current = signaturePad;

      signaturePad.addEventListener('endStroke', () => {
        setIsEmpty(false);
        const data = signaturePadRef.current?.toData();
        if (data) {
          localStorage.setItem('persistent-canvas-data', JSON.stringify(data));
          setUndoStack(prev => [...prev, JSON.stringify(data)]);
          setRedoStack([]);
        }
      });

      // Restore drawing if exists
      const savedCanvasData = localStorage.getItem('persistent-canvas-data');
      if (savedCanvasData) {
        try {
          const parsedData = JSON.parse(savedCanvasData);
          signaturePadRef.current.fromData(parsedData);
          setIsEmpty(false);
          setUndoStack([savedCanvasData]);
        } catch (e) {
          console.error('Error restoring canvas data', e);
        }
      }

      return () => {
        window.removeEventListener('resize', updateCanvasSize);
        signaturePadRef.current?.off();
      };
    }
  }, []);

  useEffect(() => {
    if (signaturePadRef.current) {
      if (isEraser) {
        signaturePadRef.current.penColor = bgColor === 'transparent' ? '#ffffff' : bgColor;
        signaturePadRef.current.compositeOperation = 'destination-out';
        signaturePadRef.current.minWidth = eraserWidth / 3;
        signaturePadRef.current.maxWidth = eraserWidth;
      } else if (activeTool === 'pencil') {
        signaturePadRef.current.penColor = penColor;
        signaturePadRef.current.compositeOperation = 'source-over';
        signaturePadRef.current.minWidth = 0.5;
        signaturePadRef.current.maxWidth = 1.5;
      } else {
        // Marker Brush (default)
        signaturePadRef.current.penColor = penColor;
        signaturePadRef.current.compositeOperation = 'source-over';
        signaturePadRef.current.minWidth = maxWidth * 0.9;
        signaturePadRef.current.maxWidth = maxWidth;
      }
    }
  }, [penColor, isEraser, activeTool, bgColor, eraserWidth, minWidth, maxWidth, brushType]);

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
        const lastData = newUndo[newUndo.length - 1];
        signaturePadRef.current?.fromData(JSON.parse(lastData));
        localStorage.setItem('persistent-canvas-data', lastData);
      } else {
        signaturePadRef.current?.clear();
        localStorage.removeItem('persistent-canvas-data');
      }
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const next = redoStack[redoStack.length - 1];
      setRedoStack(prev => prev.slice(0, -1));
      setUndoStack(prev => [...prev, next]);
      signaturePadRef.current?.fromData(JSON.parse(next));
      localStorage.setItem('persistent-canvas-data', next);
    }
  };

  const clear = () => {
    signaturePadRef.current?.clear();
    setUndoStack([]);
    setRedoStack([]);
    setIsEmpty(true);
    localStorage.removeItem('persistent-canvas-data');
  };

  const applyToBackground = () => {
    if (signaturePadRef.current?.isEmpty()) return alert('Canvas is empty');
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/png');
    localStorage.setItem('persistent-drawing-bg', dataUrl);
    sessionStorage.setItem('drawing-bg-active', 'true');
    setIsBgApplied(true);
    
    // Dispatch a custom event to notify the layout to update immediately
    window.dispatchEvent(new Event('drawing-bg-updated'));
    
    const bgRoot = document.getElementById('drawing-bg-root');
    if (bgRoot) {
      bgRoot.innerHTML = '';
      const img = new Image();
      img.src = dataUrl;
      img.className = 'w-full h-full object-cover';
      bgRoot.appendChild(img);
    }
  };

  const resetBackground = () => {
    localStorage.removeItem('persistent-drawing-bg');
    sessionStorage.removeItem('drawing-bg-active');
    setIsBgApplied(false);
    window.dispatchEvent(new Event('drawing-bg-updated'));
    const bgRoot = document.getElementById('drawing-bg-root');
    if (bgRoot) {
      bgRoot.innerHTML = '';
    }
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
      <div className="relative">
        {/* Smiley Icon - Positioned absolute relative to the page container */}
        <div className="absolute -top-4 right-0 z-50 pointer-events-none">
          <Image 
            src="/assets/smiley-icon.png" 
            alt="Smiley" 
            width={45} 
            height={45} 
            className="rounded-full opacity-80"
          />
        </div>
        <Header title="" />
      </div>
      <div className="font-poppins select-none">
        <div className="flex flex-col gap-4">
          {/* MS Paint Style Toolbar */}
          <div className="bg-[#f3f3f3] dark:bg-[#1e1e1e] border border-gray-200 dark:border-white/10 rounded-xl p-2 flex flex-wrap items-center justify-center sm:justify-start gap-0 shadow-sm">
            
            {/* Tools & Size Container */}
            <div className="flex flex-col sm:flex-row items-center justify-center sm:min-h-[56px] min-w-fit">
              {/* Tools Group */}
              <div className="flex flex-col items-center gap-1 px-3 sm:border-r border-gray-300 dark:border-white/10 sm:min-h-[56px] justify-center">
                <div className="flex flex-row sm:flex-col gap-1">
                  <div className="flex items-center justify-center gap-1">
                    <button 
                      onClick={() => { setIsEraser(false); setActiveTool('pencil'); }} 
                      className={`p-1 w-[26px] h-[26px] flex items-center justify-center rounded-full ${activeTool === 'pencil' ? 'bg-white dark:bg-white/10 shadow-sm' : 'hover:bg-white/50'}`} 
                      title="Pencil"
                    >
                      {!imageErrors.pencil ? (
                        <Image 
                          src="/assets/pencil-icon.png" 
                          alt="Pencil" 
                          width={16} 
                          height={16} 
                          className="object-contain" 
                          onError={() => handleImageError('pencil')}
                        />
                      ) : (
                        <FaPencil size={14} />
                      )}
                    </button>
                    <button 
                      onClick={() => { setIsEraser(false); setActiveTool('brush'); }} 
                      className={`p-1 w-[26px] h-[26px] flex items-center justify-center rounded-full ${activeTool === 'brush' ? 'bg-white dark:bg-white/10 shadow-sm' : 'hover:bg-white/50'}`} 
                      title="Brush"
                    >
                      {!imageErrors.brush ? (
                        <Image 
                          src="/assets/brush-icon.png" 
                          alt="Brush" 
                          width={16} 
                          height={16} 
                          className="object-contain" 
                          onError={() => handleImageError('brush')}
                        />
                      ) : (
                        <FaBrush size={14} />
                      )}
                    </button>
                    <button 
                      onClick={() => { setIsEraser(true); setActiveTool('eraser'); }} 
                      className={`p-1 w-[26px] h-[26px] flex items-center justify-center rounded-full ${activeTool === 'eraser' ? 'bg-white dark:bg-white/10 shadow-sm' : 'hover:bg-white/50'}`} 
                      title="Eraser"
                    >
                      {!imageErrors.eraser ? (
                        <Image 
                          src="/assets/eraser-icon.png" 
                          alt="Eraser" 
                          width={16} 
                          height={16} 
                          className="object-contain" 
                          onError={() => handleImageError('eraser')}
                        />
                      ) : (
                        <FaEraser size={14} />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <button onClick={undo} disabled={undoStack.length === 0} className="p-1.5 hover:bg-white dark:hover:bg-white/5 rounded-full disabled:opacity-30" title="Undo"><FaRotateLeft size={14}/></button>
                    <button onClick={redo} disabled={redoStack.length === 0} className="p-1.5 hover:bg-white dark:hover:bg-white/5 rounded-full disabled:opacity-30" title="Redo"><FaRotateRight size={14}/></button>
                    <button onClick={() => clear()} className="p-1.5 hover:bg-white dark:hover:bg-white/5 rounded-full text-red-500 transition-all" title="Reset"><IoTrash size={14}/></button>
                  </div>
                </div>
              </div>

              {/* Horizontal Separator for Mobile, Hidden for Desktop */}
              <div className="w-full h-px bg-gray-300 dark:bg-white/10 my-1 sm:hidden" />

              {/* Size Group */}
              <div className="flex flex-col items-center justify-center px-4 sm:border-r border-gray-300 dark:border-white/10 sm:min-h-[56px] py-1 sm:py-0">
                <div className="flex flex-row sm:flex-col items-center justify-center gap-1">
                  <input 
                    type="range" 
                    min="0.5" 
                    max={isEraser ? "100" : "50"}
                    step="0.5"
                    disabled={activeTool === 'pencil' && !isEraser}
                    value={isEraser ? eraserWidth : maxWidth} 
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      if (isEraser) {
                        setEraserWidth(val);
                      } else {
                        setMaxWidth(val);
                        setMinWidth(val / 3);
                      }
                    }}
                    className={`w-20 sm:w-24 accent-primary-500 appearance-none cursor-pointer bg-gray-200 dark:bg-white/10 rounded-full h-1 ${activeTool === 'pencil' && !isEraser ? 'opacity-30 cursor-not-allowed' : ''}`}
                  />
                  <span className="text-[9px] sm:text-[10px] font-bold leading-none">{Math.round(isEraser ? eraserWidth : maxWidth)}px</span>
                </div>
              </div>
            </div>

            {/* Horizontal Separator for Mobile between Size and Background groups */}
            <div className="w-full h-px bg-gray-300 dark:bg-white/10 my-1 sm:hidden" />

            {/* Colors & Background Container */}
            <div className="flex flex-col sm:flex-row items-center justify-center flex-1 sm:min-h-[56px] min-w-fit">
              {/* Colors Group */}
              <div className="flex flex-col items-center justify-center px-4 py-1 sm:py-0">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white shadow-sm shrink-0" style={{ backgroundColor: penColor }} />
                  <div className="grid grid-cols-10 gap-0.5 sm:gap-1">
                    {colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setPenColor(color)}
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border border-gray-300 dark:border-white/10 transition-transform hover:scale-125"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Horizontal Separator for Mobile, Vertical for Desktop */}
              <div className="w-full h-px sm:w-px sm:h-8 bg-gray-300 dark:bg-white/10 my-1 sm:my-0 sm:mx-2" />

              {/* Background Group */}
              <div className="flex flex-col items-center justify-center px-4 py-1 sm:py-0">
                <div className="flex items-center gap-1">
                  <div className="grid grid-cols-5 gap-0.5 sm:gap-1">
                    {[
                      { label: 'T', value: 'transparent', title: 'Transparent' },
                      { label: 'W', value: '#ffffff', title: 'White' },
                      { label: 'B', value: '#000000', title: 'True Black' },
                      { label: 'R', value: '#ef4444', title: 'Red' },
                      { label: 'G', value: '#22c55e', title: 'Green' },
                      { label: 'B', value: '#3b82f6', title: 'Blue' },
                      { label: 'Y', value: '#eab308', title: 'Yellow' },
                      { label: 'P', value: '#a855f7', title: 'Purple' },
                      { label: 'O', value: '#f97316', title: 'Orange' },
                      { label: 'P', value: '#ec4899', title: 'Pink' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setBgColor(option.value)}
                        className={`w-4 h-4 sm:w-5 sm:h-5 rounded flex items-center justify-center text-[8px] sm:text-[9px] font-bold transition-all border shadow-sm ${
                          bgColor === option.value 
                            ? 'ring-2 ring-primary-500 border-white' 
                            : 'border-gray-200 dark:border-white/10'
                        }`}
                        style={{ 
                          backgroundColor: option.value === 'transparent' ? 'white' : option.value,
                          backgroundImage: option.value === 'transparent' 
                            ? 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)' 
                            : 'none',
                          backgroundSize: '4px 4px',
                          backgroundPosition: '0 0, 0 2px, 2px -2px, -2px 0px',
                          color: ['transparent', '#ffffff', '#eab308', '#fef08a'].includes(option.value) ? '#000' : '#fff'
                        }}
                        title={option.title}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-5 gap-0.5 sm:gap-1">
                    {[
                      { label: 'S', value: '#f8fafc', title: 'Soft Gray' },
                      { label: 'D', value: '#1e293b', title: 'Deep Slate' },
                      { label: 'I', value: '#4c1d95', title: 'Indigo' },
                      { label: 'F', value: '#064e3b', title: 'Forest' },
                      { label: 'M', value: '#701a75', title: 'Magenta' },
                      { label: 'T', value: '#0d9488', title: 'Teal' },
                      { label: 'C', value: '#fff7ed', title: 'Cream' },
                      { label: 'S', value: '#fecaca', title: 'Soft Red' },
                      { label: 'V', value: '#f5f3ff', title: 'Soft Violet' },
                      { label: 'K', value: '#f0f9ff', title: 'Soft Sky' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setBgColor(option.value)}
                        className={`w-4 h-4 sm:w-5 sm:h-5 rounded flex items-center justify-center text-[8px] sm:text-[9px] font-bold transition-all border shadow-sm ${
                          bgColor === option.value 
                            ? 'ring-2 ring-primary-500 border-white' 
                            : 'border-gray-200 dark:border-white/10'
                        }`}
                        style={{ 
                          backgroundColor: option.value,
                          color: ['#f8fafc', '#fff7ed', '#fecaca', '#f5f3ff', '#f0f9ff'].includes(option.value) ? '#000' : '#fff'
                        }}
                        title={option.title}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Canvas Area */}
          <div className="relative group/canvas w-full">
            <div className="w-full h-[75vh] flex items-center justify-center py-4">
               <div className="w-full h-full relative border-2 border-dashed border-gray-300 dark:border-white/20 rounded-lg overflow-hidden" style={{ backgroundColor: bgColor }}>
                  <canvas 
                    ref={canvasRef} 
                    className="w-full h-full touch-none" 
                    style={{ 
                      cursor: isEraser 
                        ? `url('data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="${eraserWidth}" height="${eraserWidth}" viewBox="0 0 ${eraserWidth} ${eraserWidth}"><rect x="0" y="0" width="${eraserWidth}" height="${eraserWidth}" fill="rgba(255,255,255,0.5)" stroke="black" stroke-width="1"/></svg>`)}') ${eraserWidth/2} ${eraserWidth/2}, auto`
                        : activeTool === 'brush'
                        ? `url('data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><line x1="7.5" y1="0" x2="7.5" y2="15" stroke="black" stroke-width="1"/><line x1="0" y1="7.5" x2="15" y2="7.5" stroke="black" stroke-width="1"/></svg>`)}') 7.5 7.5, crosshair`
                        : `url('data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>`)}') 1 15, auto`
                    }}
                  />
               </div>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="mt-8 pt-4 border-t border-primary-500 flex justify-between items-center">
            <div className="flex gap-4">
              <button onClick={() => save('png')} className="underline-magical bg-black/5 dark:bg-white/5 px-1 rounded-none text-poppins text-[10px] font-bold uppercase transition-all">PNG</button>
              <button onClick={() => save('jpg')} className="underline-magical bg-black/5 dark:bg-white/5 px-1 rounded-none text-poppins text-[10px] font-bold uppercase transition-all">JPG</button>
              <button onClick={() => alert('SVG export coming soon!')} className="underline-magical bg-black/5 dark:bg-white/5 px-1 rounded-none text-poppins text-[10px] font-bold uppercase transition-all">SVG</button>
              {!isEmpty && (
                <button onClick={applyToBackground} className="underline-magical bg-black/5 dark:bg-white/5 px-1 rounded-none text-poppins text-[10px] font-bold uppercase transition-all">Apply to background</button>
              )}
              {isBgApplied && (
                <button onClick={resetBackground} className="underline-magical bg-black/5 dark:bg-white/5 px-1 rounded-none text-poppins text-[10px] font-bold uppercase transition-all">Reset BG</button>
              )}
            </div>
            <div className="flex items-center gap-4 text-[10px] text-gray-400">
              <div className="flex items-center gap-1">
                <IoHomeOutline />
                <span>{canvasSize.width} x {canvasSize.height}px</span>
              </div>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
