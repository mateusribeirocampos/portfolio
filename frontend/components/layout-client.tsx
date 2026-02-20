'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Providers } from '@/providers';
import MatrixRain from './matrixRain';
import { PageTracker } from './page-tracker';

export function LayoutClient({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: string;
}) {
  return (
    <Providers lang={lang}>
      <PageTracker />
      <MatrixRain />
      <div className="flex-1 flex flex-col">
        <Navigation />
        <main className="flex-1 flex flex-col">
          <div className="container flex-1 mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </Providers>
  );
}