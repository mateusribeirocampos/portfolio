import { NextRequest, NextResponse } from 'next/server';

// List of supported locales
const locales = ['en', 'pt-BR'];
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
  
  // Check if the pathname already includes a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  // Get locale from cookie or use default
  const locale = request.cookies.get('NEXT_LOCALE')?.value || defaultLocale;
  
  // If no locale in pathname, redirect to add locale
  if (!pathnameHasLocale) {
    // Special case for root path
    const localePath = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;
    const newUrl = new URL(localePath, request.url);
    
    // Preserve the search params
    newUrl.search = request.nextUrl.search;
    
    const response = NextResponse.redirect(newUrl);
    response.cookies.set('NEXT_LOCALE', locale);
    return response;
  }
  
  return NextResponse.next();
}

// Specify which paths the middleware applies to
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|.*\\.png$).*)'],
};