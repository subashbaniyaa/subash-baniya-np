import { Metadata } from 'next';
import DrawContent from './draw-content';

export const metadata: Metadata = {
  title: 'Draw',
  description: 'A minimal drawing tool for your creative ideas.',
};

export default function DrawPage() {
  return <DrawContent />;
}
