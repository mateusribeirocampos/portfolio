import "./globals.css";
import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Script from 'next/script';
import { LayoutClient } from '@/components/layout-client';
import { cookies, headers } from 'next/headers';
import { JsonLd } from '@/components/json-ld';
import {
  buildPageMetadata,
  buildPersonJsonLd,
  buildWebSiteJsonLd,
  getSiteUrl,
  resolveLocale,
} from '@/lib/seo';

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

// The proxy stamps x-app-locale from the URL (/pt-BR/*) or the NEXT_LOCALE
// cookie, so crawlers without cookies still get pt-BR on /pt-BR routes.
async function resolveRequestLocale(): Promise<string> {
  const headerStore = await headers();
  const headerLocale = headerStore.get('x-app-locale');
  if (headerLocale) {
    return headerLocale;
  }
  const cookieStore = await cookies();
  return cookieStore.get('NEXT_LOCALE')?.value || 'en';
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveLocale(await resolveRequestLocale());

  return {
    metadataBase: new URL(getSiteUrl()),
    keywords: [
      "Backend Developer",
      "Java",
      "Spring Boot",
      "Node.js",
      "React",
      "Next.js",
      "Web Development",
    ],
    verification: {
      google: "Wf-4O8RsQVfHJBbJF_d1-g5oypYCRD3T__7DkQ20I1c",
    },
    ...buildPageMetadata({
      locale,
      page: 'home',
      pathname: '/',
    }),
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Locale resolved from the proxy header (URL-aware) with cookie fallback
  const locale = await resolveRequestLocale();
  const skipLinkLabel = locale === 'pt-BR' ? 'Pular para o conteúdo principal' : 'Skip to main content';
  const machinePortfolioHref = '/portfolio.md?lang=' + (locale === 'pt-BR' ? 'pt-BR' : 'en');
  const llmsHref = '/llms.txt?lang=' + (locale === 'pt-BR' ? 'pt-BR' : 'en');

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
        <JsonLd data={buildPersonJsonLd()} />
        <JsonLd data={buildWebSiteJsonLd()} />
        <link rel="alternate" type="text/markdown" href={machinePortfolioHref} title="Machine-readable portfolio" />
        <link rel="alternate" type="text/plain" href={llmsHref} title="LLM content index" />
      </head>
      <body className={plexSans.variable + " " + plexMono.variable + " flex min-h-screen flex-col font-sans"}>
        <a href="#main-content" className="skip-link">
          {skipLinkLabel}
        </a>
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
