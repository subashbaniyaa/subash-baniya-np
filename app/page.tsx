import Hero from './components/hero-v2/hero';
import { ScrollProvider } from './components/providers/ScrollProvider';
import Oneko from './components/oneko';
import Spider from './components/spider';
import Image from 'next/image';

export default function Home() {
  return (
    <ScrollProvider>
      <div className="fixed inset-0 z-[-1] pointer-events-none flex items-center justify-center overflow-hidden h-svh w-screen">
        <div className="relative flex items-center justify-center w-full h-full">
          <Image 
            src="/hero-bg.png" 
            alt="Background" 
            width={800} 
            height={800} 
            className="opacity-20 w-auto h-auto max-w-[80vw] max-h-[80vh] object-contain select-none"
            priority
          />
        </div>
      </div>
      <Oneko />
      <Spider />
      <Hero />
    </ScrollProvider>
  );
}
