'use client';

import Link from 'next/link';
import TeamCarousel from '../components/carousel/TeamCarousel';
import { BackgroundGradientAnimation } from '../components/background-gradient-animation';
import SplashCursor from '../components/splash-cursor';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ArchivePage() {
  const decorations = [
    { src: '/static/images/archive-decorations/flower-1.png', className: 'top-[10%] left-[5%] w-12 md:w-16', delay: 0 },
    { src: '/static/images/archive-decorations/flower-2.png', className: 'top-[15%] right-[10%] w-10 md:w-14', delay: 0.2 },
    { src: '/static/images/archive-decorations/flower-3.png', className: 'bottom-[20%] left-[8%] w-14 md:w-18', delay: 0.4 },
    { src: '/static/images/archive-decorations/flower-4.png', className: 'bottom-[15%] right-[5%] w-12 md:w-16', delay: 0.6 },
    { src: '/static/images/archive-decorations/shield.png', className: 'top-[5%] left-1/2 -translate-x-1/2 w-8 md:w-12', delay: 0.8 },
  ];

  return (
    <SplashCursor containerClassName="h-svh w-screen overflow-hidden" usePrimaryColors={true}>
      <div className="relative h-svh w-screen flex flex-col overflow-hidden">
        {/* Decorative Icons */}
        {decorations.map((dec, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 0.4, scale: 1, rotate: 0 }}
            whileHover={{ opacity: 0.8, scale: 1.1, rotate: 10 }}
            transition={{ duration: 0.8, delay: dec.delay }}
            className={`absolute z-10 pointer-events-auto cursor-pointer ${dec.className}`}
          >
            <Image 
              src={dec.src} 
              alt="Decoration" 
              width={150} 
              height={150}
              className="w-full h-auto object-contain dark:invert"
            />
          </motion.div>
        ))}

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <Image 
            src="/static/images/archive-bottom-middle.png" 
            alt="Archive Bottom Illustration" 
            width={80} 
            height={80}
            priority
            className="opacity-50 dark:invert transition-all hover:opacity-100"
          />
        </div>
        <div className="absolute inset-0 z-0">
          <BackgroundGradientAnimation interactive={false}>
            <div />
          </BackgroundGradientAnimation>
        </div>
        <div className="relative z-10 flex-1 overflow-hidden flex flex-col pt-12">
          <div className="flex-1">
            <TeamCarousel />
          </div>
        </div>
      </div>
    </SplashCursor>
  );
}
