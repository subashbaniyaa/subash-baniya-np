import Hero from './components/hero-v2/hero';
import { ScrollProvider } from './components/providers/ScrollProvider';
import Oneko from './components/oneko';

export default function Home() {
  return (
    <ScrollProvider>
      <Oneko />
      <Hero />
    </ScrollProvider>
  );
}
