'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Providers } from '@/providers';
import MatrixRain from './matrixRain';
import { PageTracker } from './page-tracker';
import { MachineReadablePortfolio } from './machine-readable-portfolio';

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
      <MachineReadablePortfolio lang={lang} />
      <div className="flex-1 flex flex-col">
        <Navigation />
        <main id="main-content" className="flex-1 flex flex-col" tabIndex={-1}>
          <div className="flex-1 w-full">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </Providers>
  );
}
