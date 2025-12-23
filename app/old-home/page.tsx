import Hero from '../components/hero/hero';
import Footer from '../components/layouts/footer';
import Header from '../components/layouts/header';
import { ScrollProvider } from '../components/providers/ScrollProvider';

export default function OldHomePage() {
  return (
    <ScrollProvider>
      <Header />
      <Hero />
      <Footer />
    </ScrollProvider>
  );
}