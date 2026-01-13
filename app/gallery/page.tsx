'use client';

import Link from 'next/link';
import TeamCarousel from '../components/carousel/TeamCarousel';
import { BackgroundGradientAnimation } from '../components/background-gradient-animation';
import SplashCursor from '../components/splash-cursor';

export default function GalleryPage() {
  return (
    <SplashCursor containerClassName="h-svh w-screen overflow-hidden" usePrimaryColors={true}>
      <div className="relative h-svh w-screen flex flex-col overflow-hidden">
        <div className="absolute inset-0 z-0">
          <BackgroundGradientAnimation interactive={false}>
            <div />
          </BackgroundGradientAnimation>
        </div>
        <div className="relative z-10 flex-1 overflow-hidden">
          <TeamCarousel />
        </div>
        <div className="relative z-10 p-8 flex-shrink-0">
          <Link href="/" className="underline-magical bg-black/10 dark:bg-white/10 px-1 rounded">
            Return to homepage
          </Link>
        </div>
      </div>
    </SplashCursor>
  );
}
