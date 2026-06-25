export function normalizeAdminEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function getAllowedAdminEmails(
  allowList = process.env.ALLOW_USER_ADMIN,
): string[] {
  return (allowList ?? '')
    .split(',')
    .map((email) => normalizeAdminEmail(email))
    .filter(Boolean);
}

export function isAllowedAdminEmail(
  email: string,
  allowList = process.env.ALLOW_USER_ADMIN,
): boolean {
  const normalizedEmail = normalizeAdminEmail(email);
  return getAllowedAdminEmails(allowList).includes(normalizedEmail);
}
