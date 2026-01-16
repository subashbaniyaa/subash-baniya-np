import Link from 'next/link';
import TeamCarousel from '../components/carousel/TeamCarousel';
import { BackgroundGradientAnimation } from '../components/background-gradient-animation';
import SplashCursor from '../components/splash-cursor';
import Image from 'next/image';

export const metadata = {
  title: 'Archive',
  description: 'Archive - Subash',
};

export default function ArchivePage() {
  return (
    <SplashCursor containerClassName="h-svh w-screen overflow-hidden" usePrimaryColors={true}>
      <div className="relative h-svh w-screen flex flex-col overflow-hidden">
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <Image 
            src="/assets/archive-bottom-middle.png" 
            alt="Archive Bottom Illustration" 
            width={120} 
            height={120}
            className="opacity-50 dark:invert transition-all hover:opacity-100"
          />
        </div>
        <div className="absolute inset-0 z-0">
          <BackgroundGradientAnimation interactive={false}>
            <div />
          </BackgroundGradientAnimation>
        </div>
        <div className="relative z-10 flex-1 overflow-hidden">
          <TeamCarousel />
        </div>
      </div>
    </SplashCursor>
  );
}
