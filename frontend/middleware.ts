import { NextRequest, NextResponse } from 'next/server';

import { INDEXABLE_CLEAN_PATHS, isPtBrPathname, stripPtBrPrefix } from '@/lib/locale-paths';

const defaultLocale = 'en';
const locales = ['en', 'pt-BR'];

const LOCALE_COOKIE_OPTIONS = {
  path: '/',
  maxAge: 31536000, // 1 year
  sameSite: 'lax',
} as const;

function passThroughWithLocale(request: NextRequest, locale: string) {
  // Forward the locale to server components via request header so the root
  // layout can resolve it from the URL, not only from the cookie.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-app-locale', locale);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.cookies.set('NEXT_LOCALE', locale, LOCALE_COOKIE_OPTIONS);
  return response;
}

// Next.js 15 requires this file to be middleware.ts exporting `middleware`.
// The previous proxy.ts name (a Next 16 convention) was silently ignored
// after the downgrade to 15.x, leaving admin gating and locale handling
// disabled in production.
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip proxy for static files, API routes, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next();
  }

  // Admin routes protection
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    // Check for admin token in cookies (this is basic protection)
    // In production, you might want to validate the JWT token here
    const adminToken = request.cookies.get('admin_token');

    if (!adminToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  if (isPtBrPathname(pathname)) {
    const cleanPath = stripPtBrPrefix(pathname);

    // Public pages have real /pt-BR routes so search engines can index the
    // Portuguese content at its own URL (linked via hreflang).
    if (INDEXABLE_CLEAN_PATHS.includes(cleanPath)) {
      return passThroughWithLocale(request, 'pt-BR');
    }

    // Any other /pt-BR path keeps the legacy behavior: redirect to the clean
    // URL and persist the locale in the cookie.
    const response = NextResponse.redirect(new URL(cleanPath, request.url));
    response.cookies.set('NEXT_LOCALE', 'pt-BR', LOCALE_COOKIE_OPTIONS);
    return response;
  }

  // Get locale from cookie, falling back to the default
  let locale = request.cookies.get('NEXT_LOCALE')?.value || defaultLocale;

  // Ensure locale is valid
  if (!locales.includes(locale)) {
    locale = defaultLocale;
  }

  return passThroughWithLocale(request, locale);
}

// Specify which paths the proxy applies to
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|.*\\.png$).*)'],
};
