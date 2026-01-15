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
import { useEffect } from 'react';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showBackground = pathname === '/' || pathname === '/draw';

  useEffect(() => {
    const savedBg = localStorage.getItem('persistent-drawing-bg');
    if (savedBg && showBackground) {
      const bgRoot = document.getElementById('drawing-bg-root');
      if (bgRoot) {
        bgRoot.innerHTML = '';
        const img = new Image();
        img.src = savedBg;
        img.className = 'w-full h-full object-cover';
        bgRoot.appendChild(img);
      }
    }
  }, [pathname, showBackground]);

  return (
    <>
      {showBackground && <div id="drawing-bg-root" className="fixed inset-0 pointer-events-none z-[-1] opacity-50" />}
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
