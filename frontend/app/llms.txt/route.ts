import aboutEn from '@/public/locales/en/about.json';
import aboutPtBr from '@/public/locales/pt-BR/about.json';
import { buildLlmsText } from '@/lib/portfolio-machine-content';
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
  const content = buildLlmsText({
    locale,
    siteUrl: getSiteUrl(),
    about: locale === 'pt-BR' ? aboutPtBr.about : aboutEn.about,
  });

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      'X-Robots-Tag': 'index, follow',
    },
  });
}
