import aboutEn from '@/public/locales/en/about.json';
import aboutPtBr from '@/public/locales/pt-BR/about.json';
import { projects } from '@/data/projects';
import { buildPortfolioMarkdown } from '@/lib/portfolio-machine-content';
import { getSiteUrl } from '@/lib/seo';

function resolveRequestLocale(request: Request) {
  const url = new URL(request.url);
  if (url.searchParams.get('lang') === 'pt-BR') return 'pt-BR';

  return request.headers.get('accept-language')?.toLowerCase().startsWith('pt')
    ? 'pt-BR'
    : 'en';
}

export function GET(request: Request) {
  const locale = resolveRequestLocale(request);
  const url = new URL(request.url);
  const markdown = buildPortfolioMarkdown({
    locale,
    siteUrl: getSiteUrl(),
    about: locale === 'pt-BR' ? aboutPtBr.about : aboutEn.about,
    projects,
  });
  const disposition = url.searchParams.get('download') === '1' ? 'attachment' : 'inline';

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Content-Disposition': disposition + '; filename="mateus-r-campos-portfolio-' + locale + '.md"',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      'X-Robots-Tag': 'index, follow',
    },
  });
}
