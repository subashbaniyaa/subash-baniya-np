import { Metadata } from 'next';
import DrawContent from './draw-content';
import { BackgroundGradientAnimation } from '../components/background-gradient-animation';

export const metadata: Metadata = {
  title: 'Draw',
  description: 'A minimal drawing tool for your creative ideas.',
};

export default function DrawPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="fixed inset-0 z-0">
        <BackgroundGradientAnimation interactive={false}>
          <div />
        </BackgroundGradientAnimation>
      </div>
      <div className="relative z-10">
        <DrawContent />
      </div>
    </div>
  );
}
