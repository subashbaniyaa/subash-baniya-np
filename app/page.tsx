import Hero from './components/hero-v2/hero';
import { ScrollProvider } from './components/providers/ScrollProvider';
import Oneko from './components/oneko';
import Spider from './components/spider';
import Image from 'next/image';

export default function Home() {
  return (
    <ScrollProvider>
      <div className="fixed inset-0 z-[-1] pointer-events-none flex items-center justify-center overflow-hidden">
        <Image 
          src="/hero-bg.png" 
          alt="Background" 
          width={1200} 
          height={800} 
          className="opacity-30 w-full max-w-[90vw] h-auto object-contain"
          priority
        />
      </div>
      <Oneko />
      <Spider />
      <Hero />
    </ScrollProvider>
  );
}
