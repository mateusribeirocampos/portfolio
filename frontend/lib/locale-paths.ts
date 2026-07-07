export const PT_BR_PREFIX = '/pt-BR';

export const INDEXABLE_CLEAN_PATHS = ['/', '/about', '/blog', '/contact', '/projects'];

export function isPtBrPathname(pathname: string): boolean {
  return pathname === PT_BR_PREFIX || pathname.startsWith(`${PT_BR_PREFIX}/`);
}

export function stripPtBrPrefix(pathname: string): string {
  if (!isPtBrPathname(pathname)) {
    return pathname;
  }
  return pathname === PT_BR_PREFIX ? '/' : pathname.slice(PT_BR_PREFIX.length);
}

export function withPtBrPrefix(cleanPath: string): string {
  if (isPtBrPathname(cleanPath)) {
    return cleanPath;
  }
  return cleanPath === '/' ? PT_BR_PREFIX : `${PT_BR_PREFIX}${cleanPath}`;
}
