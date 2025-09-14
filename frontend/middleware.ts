import { NextRequest, NextResponse } from 'next/server';

const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if pathname starts with /pt-BR (only non-default locale in URL)
  const isPortuguese = pathname.startsWith('/pt-BR');

  // Get locale from URL or use default (English)
  const locale = isPortuguese ? 'pt-BR' : defaultLocale;

  // Set locale cookie for client-side components
  const response = NextResponse.next();
  response.cookies.set('NEXT_LOCALE', locale);

  return response;
}

// Specify which paths the middleware applies to
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|.*\\.png$).*)'],
};