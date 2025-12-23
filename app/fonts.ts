import { Copse, DM_Mono, Merriweather, Mukta, Poppins } from 'next/font/google';
import localFont from 'next/font/local';

export const mukta = Mukta({
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-mukta',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const copse = Copse({
  weight: '400',
  variable: '--font-copse-swash',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const dmMono = DM_Mono({
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const merryWeather = Merriweather({
  weight: ['300', '400', '700', '900'],
  variable: '--font-merriweather',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const beVietnamPro = localFont({
  src: [
    {
      path: '../public/fonts/be-vietnam-pro-v2-vietnamese_latin-100.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fonts/be-vietnam-pro-v2-vietnamese_latin-200.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../public/fonts/be-vietnam-pro-v2-vietnamese_latin-300.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/be-vietnam-pro-v2-vietnamese_latin-500.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/be-vietnam-pro-v2-vietnamese_latin-600.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/be-vietnam-pro-v2-vietnamese_latin-700.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/be-vietnam-pro-v2-vietnamese_latin-700italic.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../public/fonts/be-vietnam-pro-v2-vietnamese_latin-800.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/fonts/be-vietnam-pro-v2-vietnamese_latin-800italic.woff2',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../public/fonts/be-vietnam-pro-v2-vietnamese_latin-900.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-be-vietnam-pro',
  display: 'swap',
});

export const boringSans = localFont({
  src: [
    {
      path: '../public/fonts/Boring-Sans-A-Light-trial.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Boring-Sans-A-Light-Italic-trial.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../public/fonts/Boring-Sans-A-Regular-trial.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Boring-Sans-A-Italic-trial.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/Boring-Sans-A-Medium-trial.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Boring-Sans-A-Medium-Italic-trial.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../public/fonts/Boring-Sans-A-Bold-trial.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Boring-Sans-A-Bold-Italic-trial.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../public/fonts/Boring-Sans-A-Heavy-trial.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../public/fonts/Boring-Sans-A-Heavy-Italic-trial.ttf',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-boring-sans',
  display: 'swap',
  fallback: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
});

// Alternative font for numbers when Boring Sans doesn't display them properly
export const gistesy = localFont({
  src: '../public/fonts/Gistesy.ttf',
  variable: '--font-gistesy',
  display: 'swap',
});

export const boringSansWithNumberFallback = localFont({
  src: [
    {
      path: '../public/fonts/Boring-Sans-A-Light-trial.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Boring-Sans-A-Regular-trial.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Boring-Sans-A-Medium-trial.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Boring-Sans-A-Bold-trial.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Boring-Sans-A-Heavy-trial.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-boring-sans-numbers',
  display: 'swap',
  fallback: ['JetBrains Mono', 'Consolas', 'Monaco', 'Courier New', 'monospace'],
});
