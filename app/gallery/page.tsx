'use client';

import TeamCarousel from '../components/carousel/TeamCarousel';
import { BackgroundGradientAnimation } from '../components/background-gradient-animation';
import SplashCursor from '../components/splash-cursor';

export default function GalleryPage() {
  return (
    <SplashCursor containerClassName="min-h-svh w-screen" usePrimaryColors={true}>
      <div className="relative min-h-svh w-screen">
        <div className="absolute inset-0 z-0">
          <BackgroundGradientAnimation interactive={false} opacity={50}>
            <div />
          </BackgroundGradientAnimation>
        </div>
        <div className="relative z-10">
          <TeamCarousel />
        </div>
      </div>
    </SplashCursor>
  );
}
