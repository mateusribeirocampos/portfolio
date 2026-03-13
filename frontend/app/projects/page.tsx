import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { buildPageMetadata } from '@/lib/seo';
import { ProjectsContent } from './components/ProjectsContent';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();

  return buildPageMetadata({
    locale: cookieStore.get('NEXT_LOCALE')?.value,
    page: 'projects',
    pathname: '/projects',
  });
}

export default function Projects() {
  return <ProjectsContent />;
}
