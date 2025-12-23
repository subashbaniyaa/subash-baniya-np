'use client';

import Link from 'next/link';
import { BackgroundGradientAnimation } from './components/background-gradient-animation';
import SplashCursor from './components/splash-cursor';
import { gistesy } from './fonts';

export default function FourZeroFour() {
  return (
    <SplashCursor
      containerClassName="min-h-svh w-screen"
      usePrimaryColors={true}
    >
      <div className="relative min-h-svh w-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <BackgroundGradientAnimation interactive={false}>
            <div />
          </BackgroundGradientAnimation>
        </div>
        <div className="relative z-10 min-h-svh flex items-center justify-center">
          <div className="flex flex-col items-center justify-center space-y-4 text-center px-8 pointer-events-auto">
            <h1 className="text-4xl font-extrabold leading-10 tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl font-be-vietnam-pro">
              404
            </h1>
            <p className={`text-3xl md:text-4xl leading-7 text-gray-500 dark:text-gray-400 ${gistesy.className}`}>
              The page you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link href="/" prefetch={true} className="underline-magical">
              Return to homepage
            </Link>
          </div>
        </div>
      </div>
    </SplashCursor>
  );
}
