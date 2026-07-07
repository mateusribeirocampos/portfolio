import type { Metadata } from 'next';

import { getContactCopy } from '@/lib/page-copy';
import { buildPageMetadata } from '@/lib/seo';
import { ContactContent } from '../../contact/components/ContactContent';

export const metadata: Metadata = buildPageMetadata({
  locale: 'pt-BR',
  page: 'contact',
  pathname: '/pt-BR/contact',
});

export default function ContactPtBr() {
  return <ContactContent copy={getContactCopy('pt-BR')} />;
}
