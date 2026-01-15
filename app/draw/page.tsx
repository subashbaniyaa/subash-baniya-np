'use client';

import { useEffect, useRef } from 'react';
import SignaturePad from 'signature_pad';
import Header from '../components/header';
import PageContainer from '../components/layouts/page-container';

export default function DrawPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const signaturePadRef = useRef<SignaturePad | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      
      const updateCanvasSize = () => {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext('2d')?.scale(ratio, ratio);
        signaturePadRef.current?.clear(); // Clear on resize to avoid scaling issues
      };

      window.addEventListener('resize', updateCanvasSize);
      updateCanvasSize();

      signaturePadRef.current = new SignaturePad(canvas, {
        backgroundColor: 'rgba(0,0,0,0)',
        penColor: '#3B82F6'
      });

      return () => {
        window.removeEventListener('resize', updateCanvasSize);
        signaturePadRef.current?.off();
      };
    }
  }, []);

  const clear = () => {
    signaturePadRef.current?.clear();
  };

  const download = () => {
    if (signaturePadRef.current?.isEmpty()) {
      alert('Please provide a drawing first.');
    } else {
      const dataURL = signaturePadRef.current?.toDataURL();
      const link = document.createElement('a');
      link.download = 'drawing.png';
      link.href = dataURL || '';
      link.click();
    }
  };

  return (
    <PageContainer>
      <Header title="Draw" />
      <div className="relative h-[60vh] w-full border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-black/40 backdrop-blur-sm">
        <canvas 
          ref={canvasRef} 
          className="h-full w-full cursor-crosshair touch-none"
        />
      </div>
      
      <div className="mt-8 flex flex-wrap gap-4 items-center">
        <button 
          onClick={clear}
          className="px-6 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-full hover:opacity-80 transition-opacity font-medium"
        >
          Clear
        </button>
        <button 
          onClick={download}
          className="px-6 py-2 bg-primary-500 text-white rounded-full hover:opacity-80 transition-opacity font-medium shadow-lg shadow-primary-500/20"
        >
          Download
        </button>
      </div>

      <div className="mt-12 p-6 bg-primary-50 dark:bg-primary-900/10 rounded-2xl border border-primary-100 dark:border-primary-900/20">
        <p className="text-sm text-primary-900 dark:text-primary-100 font-medium text-center">
          Simple Drawing Pad. Draw smoothly with your cursor or touch.
        </p>
      </div>
    </PageContainer>
  );
}
