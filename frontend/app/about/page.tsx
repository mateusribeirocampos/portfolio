import type { Metadata } from 'next';
import { cookies } from 'next/headers';

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

export default function About() {
  return <AboutContent />;
}
