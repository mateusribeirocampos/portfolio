import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { getContactCopy } from '@/lib/page-copy';
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

export default async function Contact() {
  const cookieStore = await cookies();

  return <ContactContent copy={getContactCopy(cookieStore.get('NEXT_LOCALE')?.value)} />;
}
