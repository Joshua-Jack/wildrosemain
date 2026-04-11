// src/lib/attribution.ts
export const REF_COOKIE_NAME = 'wr_ref';
const REF_COOKIE_MAX_AGE_SECONDS = 30 * 24 * 60 * 60; // 30 days
const SLUG_PATTERN = /^[a-z0-9-]+$/;

export function buildBuyHref(baseHref: string, athleteSlug?: string): string {
  if (!athleteSlug) return baseHref;
  const separator = baseHref.includes('?') ? '&' : '?';
  return `${baseHref}${separator}ref=${encodeURIComponent(athleteSlug)}`;
}

export function extractRefFromSearchParams(
  params: URLSearchParams,
): string | null {
  const raw = params.get('ref');
  if (!raw) return null;
  if (!SLUG_PATTERN.test(raw)) return null;
  return raw;
}

export function readRefFromCookie(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${REF_COOKIE_NAME}=`));
  if (!match) return null;
  const value = decodeURIComponent(match.slice(REF_COOKIE_NAME.length + 1));
  return SLUG_PATTERN.test(value) ? value : null;
}

export function writeRefToCookie(athleteSlug: string): void {
  if (typeof document === 'undefined') return;
  if (!SLUG_PATTERN.test(athleteSlug)) return;

  // First-athlete-wins: don't overwrite an existing ref cookie.
  if (readRefFromCookie() !== null) return;

  document.cookie = [
    `${REF_COOKIE_NAME}=${encodeURIComponent(athleteSlug)}`,
    `Max-Age=${REF_COOKIE_MAX_AGE_SECONDS}`,
    'Path=/',
    'SameSite=Lax',
  ].join('; ');
}

export function clearRefCookie(): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${REF_COOKIE_NAME}=; Max-Age=0; Path=/`;
}
