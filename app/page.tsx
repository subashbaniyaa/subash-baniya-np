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
          src="/static/images/hero-bg.png" 
          alt="Background" 
          width={600} 
          height={400} 
          className="opacity-30 w-full max-w-[50vw] md:max-w-[30vw] h-auto object-contain"
          priority
        />
      </div>
      <Oneko />
      <Spider />
      <Hero />
    </ScrollProvider>
  );
}
