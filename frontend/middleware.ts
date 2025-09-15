import { NextRequest, NextResponse } from 'next/server';

const defaultLocale = 'en';
const locales = ['en', 'pt-BR'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for static files, API routes, and Next.js internals
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

  // Get locale from cookie first, then from URL
  let locale = request.cookies.get('NEXT_LOCALE')?.value || defaultLocale;

  // Check if we're trying to access the old /pt-BR URL structure
  if (pathname.startsWith('/pt-BR')) {
    locale = 'pt-BR';
    // Remove /pt-BR prefix and redirect to clean URL
    const newPath = pathname.replace('/pt-BR', '') || '/';
    const url = new URL(newPath, request.url);

    // Set locale cookie and redirect
    const response = NextResponse.redirect(url);
    response.cookies.set('NEXT_LOCALE', locale, {
      path: '/',
      maxAge: 31536000, // 1 year
      sameSite: 'lax'
    });
    return response;
  }

  // Ensure locale is valid
  if (!locales.includes(locale)) {
    locale = defaultLocale;
  }

  // Set locale cookie for client-side components
  const response = NextResponse.next();
  response.cookies.set('NEXT_LOCALE', locale, {
    path: '/',
    maxAge: 31536000, // 1 year
    sameSite: 'lax'
  });

  return response;
}

// Specify which paths the middleware applies to
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|.*\\.png$).*)'],
};