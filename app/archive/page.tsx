import Link from 'next/link';
import TeamCarousel from '../components/carousel/TeamCarousel';
import { BackgroundGradientAnimation } from '../components/background-gradient-animation';
import SplashCursor from '../components/splash-cursor';

export const metadata = {
  title: 'Archive',
  description: 'Archive - Subash',
};

export default function ArchivePage() {
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
      </div>
    </SplashCursor>
  );
}
