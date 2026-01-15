'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import ThemeProvider from 'app/components/providers/ThemeProvider';
import { SpotifyPlayerProvider } from 'app/components/contexts/spotify-player-context';
import LenisProvider from 'app/components/providers/LenisProvider';
import ThemeSwitch from 'app/components/layouts/theme-switch/theme-switch';
import SpotifyPlayer from 'app/components/spotify-player';
import Analytics from 'app/components/analytics/analytics';
import DisableContextMenu from '../disable-context-menu';
import { useEffect, useState } from 'react';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showBackground = pathname === '/' || pathname === '/draw';
  const [bgImage, setBgImage] = useState<string | null>(null);

  useEffect(() => {
    const updateBg = () => {
      if (typeof window !== 'undefined') {
        const savedBg = localStorage.getItem('persistent-drawing-bg');
        const isActive = sessionStorage.getItem('drawing-bg-active') === 'true';
        
        if (isActive && savedBg) {
          setBgImage(savedBg);
        } else {
          setBgImage(null);
        }
      }
    };

    updateBg();
    window.addEventListener('drawing-bg-updated', updateBg);
    return () => window.removeEventListener('drawing-bg-updated', updateBg);
  }, []);

  useEffect(() => {
    if (bgImage && showBackground) {
      const applyBg = () => {
        const bgRoot = document.getElementById('drawing-bg-root');
        if (bgRoot) {
          bgRoot.innerHTML = '';
          const img = new Image();
          img.src = bgImage;
          img.className = 'w-full h-full object-cover';
          bgRoot.appendChild(img);
        }
      };

      // Apply immediately
      applyBg();

      // Also apply after a short delay to ensure DOM is fully ready
      const timer = setTimeout(applyBg, 100);
      return () => clearTimeout(timer);
    }
  }, [pathname, showBackground, bgImage]);

  return (
    <>
      <div 
        id="drawing-bg-root" 
        className={`fixed inset-0 pointer-events-none z-[-1] opacity-50 transition-opacity duration-300 ${showBackground ? 'visible' : 'invisible'}`} 
      />
      <DisableContextMenu />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        themes={['dark', 'light']}
      >
        <SpotifyPlayerProvider>
          <LenisProvider>
            <ThemeSwitch />
            {children}
            <SpotifyPlayer />
          </LenisProvider>
        </SpotifyPlayerProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </ThemeProvider>
    </>
  );
}
