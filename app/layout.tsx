import { Metadata } from 'next';
import { ReactNode } from 'react';
import { mukta, beVietnamPro, boringSans, boringSansWithNumberFallback, poppins, gistesy, merryWeather, copse, dmMono, pinkSunset } from './fonts';
import DisableContextMenu from './components/disable-context-menu';
import './tailwind.css';
import ClientLayout from './components/layouts/client-layout';

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
    <html lang="en" suppressHydrationWarning className={`${mukta.variable} ${beVietnamPro.variable} ${boringSans.variable} ${boringSansWithNumberFallback.variable} ${poppins.variable} ${gistesy.variable} ${merryWeather.variable} ${copse.variable} ${dmMono.variable} ${pinkSunset.variable}`}>
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
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
