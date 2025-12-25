import Analytics from 'app/components/analytics/analytics';
import LenisProvider from 'app/components/providers/LenisProvider';
import ThemeProvider from 'app/components/providers/ThemeProvider';
import SpotifyPlayer from 'app/components/spotify-player';
import { SpotifyPlayerProvider } from 'app/components/contexts/spotify-player-context';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import ThemeSwitch from './components/layouts/theme-switch/theme-switch';
import { mukta, beVietnamPro, boringSans, boringSansWithNumberFallback } from './fonts';
import './tailwind.css';

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'Subash',
  },
  description: 'I build things for the web.',
  metadataBase: new URL('https://subash-baniya.com.np'),
  openGraph: {
    title: 'Subash',
    description: 'I build things for the web.',
    images: ['https://subash-baniya.com.np/opengraph-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Subash',
    description: 'I build things for the web.',
    images: ['https://subash-baniya.com.np/opengraph-image.png'],
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className={`${mukta.className} ${beVietnamPro.variable} ${boringSans.variable} ${boringSansWithNumberFallback.variable}`}>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/static/favicons/favicon.ico"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/static/favicons/favicon.ico"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/static/favicons/favicon.ico"
        />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body className="bg-white text-black antialiased dark:bg-black dark:text-white selection:bg-primary-500 selection:text-white">
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
      </body>
    </html>
  );
}
