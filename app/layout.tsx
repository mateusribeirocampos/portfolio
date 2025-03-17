import './globals.css'; 
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mateus R Campos - Full Stack Developer',
  description: 'Portfolio of Mateus R Campos - From Agronomy to Full Stack Development',
  keywords: ['Full Stack Developer', 'React', 'Next.js', 'Agronomy', 'Web Development'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className="h-full">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        {children}
      </body>
    </html>
  );
}