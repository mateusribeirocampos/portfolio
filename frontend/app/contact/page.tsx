import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { buildPageMetadata } from '@/lib/seo';
import { ContactContent } from './components/ContactContent';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();

  return buildPageMetadata({
    locale: cookieStore.get('NEXT_LOCALE')?.value,
    page: 'contact',
    pathname: '/contact',
  });
}

export default function Contact() {
  return <ContactContent />;
}
