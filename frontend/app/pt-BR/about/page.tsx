import type { Metadata } from 'next';

import { getAboutCopy } from '@/lib/page-copy';
import { buildPageMetadata } from '@/lib/seo';
import { AboutContent } from '../../about/components/AboutContent';

export const metadata: Metadata = buildPageMetadata({
  locale: 'pt-BR',
  page: 'about',
  pathname: '/pt-BR/about',
});

export default function AboutPtBr() {
  return <AboutContent copy={getAboutCopy('pt-BR')} lang="pt-BR" />;
}
