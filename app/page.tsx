import Hero from './components/hero-v2/hero';
import { ScrollProvider } from './components/providers/ScrollProvider';
import Oneko from './components/oneko';
import Spider from './components/spider';

export default function Home() {
  return (
    <ScrollProvider>
      <Oneko />
      <Spider />
      <Hero />
    </ScrollProvider>
  );
}
