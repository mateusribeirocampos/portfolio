'use client';

import { ThemeProvider } from '@/components/theme-provider';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { Providers } from '@/providers';

export function LayoutClient({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: string;
}) {
  return (
    <Providers lang={lang}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="flex-1 flex flex-col">
          <Navigation />
          <main className="flex-1 flex flex-col">
            <div className="container flex-1 mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
          <Footer />
        </div>
        <Toaster />
      </ThemeProvider>
    </Providers>
  );
}