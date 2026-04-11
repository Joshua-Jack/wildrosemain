// src/lib/format.ts
import type { Money } from './shopify/types';

export function formatMoney(m: Money): string {
  const amount = Number.parseFloat(m.amount);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: m.currencyCode,
  }).format(amount);
}
