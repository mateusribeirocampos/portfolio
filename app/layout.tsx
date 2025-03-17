import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { i18n, initI18n } from './i18n';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mateus R Campos - Full Stack Developer',
  description: 'Portfolio of Mateus R Campos - From Agronomy to Full Stack Development',
  keywords: ['Full Stack Developer', 'React', 'Next.js', 'Agronomy', 'Web Development'],
};

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: {lang: string}
}) {
  await initI18n(lang);

  return (
    <html lang={i18n.language} suppressHydrationWarning className="h-full">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
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
      </body>
    </html>
  );
}