import Hero from './components/hero-v2/hero';
import { ScrollProvider } from './components/providers/ScrollProvider';

export default function Home() {
  return (
    <ScrollProvider>
      <Hero />
    </ScrollProvider>
  );
}
