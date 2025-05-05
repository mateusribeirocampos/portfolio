import './globals.css'; 
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mateus R Campos - Full Stack Developer',
  description: 'Portfolio of Mateus R Campos - From Agronomy to Full Stack Development',
  keywords: ['Full Stack Developer', 'React', 'Next.js', 'Agronomy', 'Web Development'],
  verification: {
    google: 'Wf-4O8RsQVfHJBbJF_d1-g5oypYCRD3T__7DkQ20I1c',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="Wf-4O8RsQVfHJBbJF_d1-g5oypYCRD3T__7DkQ20I1c" />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ThemeProvider defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}