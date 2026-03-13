import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { getAboutCopy, resolvePageCopyLocale } from '@/lib/page-copy';
import { buildPageMetadata } from '@/lib/seo';
import { AboutContent } from './components/AboutContent';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();

  return buildPageMetadata({
    locale: cookieStore.get('NEXT_LOCALE')?.value,
    page: 'about',
    pathname: '/about',
  });
}

export default async function About() {
  const cookieStore = await cookies();
  const locale = resolvePageCopyLocale(cookieStore.get('NEXT_LOCALE')?.value);

  return <AboutContent copy={getAboutCopy(locale)} lang={locale} />;
}
