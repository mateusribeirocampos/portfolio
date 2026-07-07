import type { Metadata } from 'next';

import { buildPageMetadata } from '@/lib/seo';
import Home from '../page';

export const metadata: Metadata = buildPageMetadata({
  locale: 'pt-BR',
  page: 'home',
  pathname: '/pt-BR',
});

export default function HomePtBr() {
  return <Home />;
}
