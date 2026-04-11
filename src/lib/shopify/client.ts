// src/lib/shopify/client.ts
const STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN;

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

export class ShopifyError extends Error {
  constructor(message: string, public override readonly cause?: unknown) {
    super(message);
    this.name = 'ShopifyError';
  }
}

export async function storefrontFetch<T>(
  query: string,
  variables: Record<string, unknown> = {},
  options: { revalidate?: number; tags?: string[] } = {},
): Promise<T> {
  if (!STORE_DOMAIN || !STOREFRONT_TOKEN) {
    throw new ShopifyError(
      'SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_TOKEN must be set',
    );
  }

  const url = `https://${STORE_DOMAIN}/api/2024-10/graphql.json`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      next: {
        revalidate: options.revalidate ?? 60,
        tags: options.tags,
      },
    });
  } catch (err) {
    throw new ShopifyError('Storefront network error', err);
  }

  if (!res.ok) {
    throw new ShopifyError(
      `Storefront HTTP error: ${res.status} ${res.statusText}`,
    );
  }

  const body = (await res.json()) as GraphQLResponse<T>;
  if (body.errors && body.errors.length > 0) {
    throw new ShopifyError(
      `Storefront GraphQL error: ${body.errors.map((e) => e.message).join('; ')}`,
    );
  }
  if (!body.data) {
    throw new ShopifyError('Storefront response missing data');
  }
  return body.data;
}
