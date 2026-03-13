'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Providers } from '@/providers';
import MatrixRain from './matrixRain';
import { PageTracker } from './page-tracker';

function ScrollToTop() {
  const pathname = usePathname();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export function LayoutClient({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: string;
}) {
  return (
    <Providers lang={lang}>
      <ScrollToTop />
      <PageTracker />
      <MatrixRain />
      <div className="flex-1 flex flex-col">
        <Navigation />
        <main id="main-content" className="flex-1 flex flex-col" tabIndex={-1}>
          <div className="container flex-1 mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </Providers>
  );
}
