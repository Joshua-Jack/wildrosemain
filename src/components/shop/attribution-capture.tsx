// src/components/shop/attribution-capture.tsx
'use client';

import { useEffect } from 'react';
import { extractRefFromSearchParams, writeRefToCookie } from '@/lib/attribution';

/**
 * Reads ?ref= from the URL on mount and writes to the attribution cookie.
 * First-athlete-wins handled inside writeRefToCookie.
 */
export function AttributionCapture() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = extractRefFromSearchParams(params);
    if (ref) writeRefToCookie(ref);
  }, []);
  return null;
}
