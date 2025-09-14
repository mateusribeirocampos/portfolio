import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Script from 'next/script';
import { LayoutClient } from '@/components/layout-client';
import { cookies } from 'next/headers';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mateus R Campos - Full Stack Developer",
  description:
    "Portfolio of Mateus R Campos - From Agronomy to Full Stack Development",
  keywords: [
    "Full Stack Developer",
    "React",
    "Next.js",
    "Agronomy",
    "Web Development",
  ],
  verification: {
    google: "Wf-4O8RsQVfHJBbJF_d1-g5oypYCRD3T__7DkQ20I1c",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get locale from cookie (set by middleware)
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'en';

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="Wf-4O8RsQVfHJBbJF_d1-g5oypYCRD3T__7DkQ20I1c"
        />
        <meta
          name="google-adsense-account"
          content="ca-pub-9569251321798167"
        ></meta>
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ThemeProvider defaultTheme="system" enableSystem>
          <Script
            id="adsense-script"
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9569251321798167"
            crossOrigin="anonymous"
          />
          <LayoutClient lang={locale}>
            {children}
          </LayoutClient>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}