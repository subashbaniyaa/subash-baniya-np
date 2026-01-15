'use client';

import dynamic from 'next/dynamic';
import Header from '../components/header';
import PageContainer from '../components/layouts/page-container';

const Excalidraw = dynamic(
  () => import('@excalidraw/excalidraw').then((mod) => mod.Excalidraw),
  { ssr: false }
);

export default function DrawPage() {
  return (
    <PageContainer>
      <Header title="Draw" />
      <div className="h-[70vh] w-full border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-gray-900">
        <Excalidraw 
          theme="dark"
          initialData={{
            appState: { viewBackgroundColor: "transparent", currentItemFontFamily: 1 },
            elements: [],
            scrollToContent: true,
          }}
        />
      </div>
      <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
        <p>Simple drawing canvas powered by Excalidraw. Your drawings are not saved automatically.</p>
      </div>
    </PageContainer>
  );
}
