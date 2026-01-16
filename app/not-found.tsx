import Link from 'next/link';
import { BackgroundGradientAnimation } from './components/background-gradient-animation';
import SplashCursor from './components/splash-cursor';
import { gistesy, pinkSunset } from './fonts';

export const dynamic = 'force-dynamic';

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
          <div className="flex flex-col items-center justify-center space-y-2 text-center px-8 pointer-events-auto">
            <h1 className={`text-6xl md:text-7xl font-extrabold tracking-[0.05em] text-gray-900 dark:text-gray-100 ${pinkSunset.className}`}>
              404
            </h1>
            <p className={`text-3xl md:text-4xl leading-7 text-gray-500 dark:text-gray-400 mt-1 ${gistesy.className}`}>
              The page you&apos;re looking for doesn&apos;t exist.
            </p>
          </div>
        </div>
      </div>
    </SplashCursor>
  );
}
