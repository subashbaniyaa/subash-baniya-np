"use client";

import Hero from './components/hero-v2/hero';
import { ScrollProvider } from './components/providers/ScrollProvider';
import Oneko from './components/oneko';
import Spider from './components/spider';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Reset animation on page load, tab switch, and navigation
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setKey(prev => prev + 1);
      }
    };

    // Trigger animation on component mount (navigation/initial load)
    setKey(prev => prev + 1);

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleVisibilityChange);
    };
  }, []);

  return (
    <ScrollProvider>
      <div className="fixed inset-0 z-[-1] pointer-events-none flex items-center justify-center overflow-hidden">
        <Image 
          key={key}
          src="/static/images/hero-bg.png" 
          alt="Background" 
          width={600} 
          height={400} 
          className="opacity-0 animate-[fadeIn_2s_ease-in-out_forwards] w-full max-w-[50vw] md:max-w-[30vw] h-auto object-contain"
          priority
        />
      </div>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 0.3; }
        }
      `}</style>
      <Oneko />
      <Spider />
      <Hero />
    </ScrollProvider>
  );
}
