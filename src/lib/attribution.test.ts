import { describe, it, expect, beforeEach } from 'vitest';
import {
  buildBuyHref,
  readRefFromCookie,
  writeRefToCookie,
  extractRefFromSearchParams,
  REF_COOKIE_NAME,
} from './attribution';

function clearCookies() {
  document.cookie.split(';').forEach((c) => {
    document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/');
  });
}

beforeEach(() => {
  clearCookies();
});

describe('buildBuyHref', () => {
  it('appends ?ref= when athlete slug provided', () => {
    expect(buildBuyHref('/shop/light-speeded', 'dallas-garber')).toBe(
      '/shop/light-speeded?ref=dallas-garber',
    );
  });

  it('returns base href unchanged when no slug', () => {
    expect(buildBuyHref('/shop/light-speeded')).toBe('/shop/light-speeded');
  });

  it('appends to existing query string', () => {
    expect(buildBuyHref('/shop/light-speeded?variant=red', 'arturo')).toBe(
      '/shop/light-speeded?variant=red&ref=arturo',
    );
  });
});

describe('extractRefFromSearchParams', () => {
  it('reads ref from URLSearchParams', () => {
    const p = new URLSearchParams('variant=red&ref=dallas-garber');
    expect(extractRefFromSearchParams(p)).toBe('dallas-garber');
  });

  it('returns null when missing', () => {
    expect(extractRefFromSearchParams(new URLSearchParams())).toBeNull();
  });

  it('rejects non-kebab-case slugs as a safety check', () => {
    const p = new URLSearchParams('ref=<script>');
    expect(extractRefFromSearchParams(p)).toBeNull();
  });
});

describe('cookie persistence', () => {
  it('writes and reads the ref cookie', () => {
    writeRefToCookie('dallas-garber');
    expect(readRefFromCookie()).toBe('dallas-garber');
    expect(document.cookie).toContain(REF_COOKIE_NAME);
  });

  it('first-athlete-wins: second write does not overwrite', () => {
    writeRefToCookie('dallas-garber');
    writeRefToCookie('arturo');
    expect(readRefFromCookie()).toBe('dallas-garber');
  });

  it('returns null when no cookie set', () => {
    expect(readRefFromCookie()).toBeNull();
  });
});
