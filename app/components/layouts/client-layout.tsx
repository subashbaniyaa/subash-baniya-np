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

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showBackground = pathname === '/' || pathname === '/draw';

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
