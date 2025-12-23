'use client';

import Link from 'next/link';
import TeamCarousel from '../components/carousel/TeamCarousel';
import { BackgroundGradientAnimation } from '../components/background-gradient-animation';
import SplashCursor from '../components/splash-cursor';

export default function GalleryPage() {
  return (
    <SplashCursor containerClassName="min-h-svh w-screen" usePrimaryColors={true}>
      <div className="relative min-h-svh w-screen">
        <div className="absolute inset-0 z-0">
          <BackgroundGradientAnimation interactive={false}>
            <div />
          </BackgroundGradientAnimation>
        </div>
        <div className="relative z-10">
          <div className="p-8">
            <Link href="/" className="underline-magical">
              ← Return to homepage
            </Link>
          </div>
          <TeamCarousel />
        </div>
      </div>
    </SplashCursor>
  );
}
