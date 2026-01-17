import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Archive',
  description: 'Archive - Subash',
};

export default function ArchiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
