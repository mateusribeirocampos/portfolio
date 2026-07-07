import type { Metadata } from 'next';

import { getProjectsCopy } from '@/lib/page-copy';
import { buildPageMetadata } from '@/lib/seo';
import { ProjectsContent } from '../../projects/components/ProjectsContent';

export const metadata: Metadata = buildPageMetadata({
  locale: 'pt-BR',
  page: 'projects',
  pathname: '/pt-BR/projects',
});

export default function ProjectsPtBr() {
  return <ProjectsContent copy={getProjectsCopy('pt-BR')} locale="pt-BR" />;
}
