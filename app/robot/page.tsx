import { Metadata } from 'next';
import RobotContent from './robot-content';

export const metadata: Metadata = {
  title: 'Robot Experiment',
  description: 'Woodkid Volcano Robot Experiment by Bruno Simon',
};

export default function RobotPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <RobotContent />
    </main>
  );
}
