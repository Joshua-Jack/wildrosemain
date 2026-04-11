// src/lib/shopify/customer.ts
import { ShopifyError } from './client';

const STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;

type AdminCustomerResponse = {
  customer?: { id: number; email: string };
  errors?: Record<string, string[]> | string;
};

export async function createShopifyCustomer(email: string): Promise<void> {
  if (!STORE_DOMAIN || !ADMIN_TOKEN) {
    throw new ShopifyError(
      'SHOPIFY_STORE_DOMAIN and SHOPIFY_ADMIN_TOKEN must be set',
    );
  }

  const url = `https://${STORE_DOMAIN}/admin/api/2024-10/customers.json`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': ADMIN_TOKEN,
    },
    body: JSON.stringify({
      customer: {
        email,
        accepts_marketing: true,
        email_marketing_consent: {
          state: 'subscribed',
          opt_in_level: 'single_opt_in',
        },
      },
    }),
  });

  const body = (await res.json()) as AdminCustomerResponse;

  // 422 with "email has already been taken" — treat as success
  if (res.status === 422) {
    const errors = body.errors;
    const asString = typeof errors === 'string' ? errors : JSON.stringify(errors);
    if (/already been taken/i.test(asString)) {
      return;
    }
    throw new ShopifyError(`Admin API validation error: ${asString}`);
  }

  if (!res.ok) {
    throw new ShopifyError(
      `Admin API error ${res.status}: ${JSON.stringify(body.errors)}`,
    );
  }
}
