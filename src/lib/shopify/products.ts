// src/lib/shopify/products.ts
import { storefrontFetch } from './client';
import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_HANDLE,
  GET_PRODUCTS_BY_TAG,
} from './queries';
import { ShopifyImage, ShopifyProduct, ShopifyVariant } from './types';

type RawEdgeConnection<T> = { edges: { node: T }[] };

type RawProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  tags: string[];
  priceRange: ShopifyProduct['priceRange'];
  featuredImage: ShopifyImage | null;
  images: RawEdgeConnection<ShopifyImage>;
  variants: RawEdgeConnection<ShopifyVariant>;
};

function normalizeProduct(raw: RawProduct): ShopifyProduct {
  return {
    id: raw.id,
    handle: raw.handle,
    title: raw.title,
    description: raw.description,
    descriptionHtml: raw.descriptionHtml,
    tags: raw.tags,
    priceRange: raw.priceRange,
    featuredImage: raw.featuredImage,
    images: raw.images.edges.map((e) => e.node),
    variants: raw.variants.edges.map((e) => e.node),
  };
}

export async function getAllProducts(limit = 100): Promise<ShopifyProduct[]> {
  const data = await storefrontFetch<{
    products: RawEdgeConnection<RawProduct>;
  }>(GET_ALL_PRODUCTS, { first: limit });
  return data.products.edges.map((e) => normalizeProduct(e.node));
}

export async function getProductByHandle(
  handle: string,
): Promise<ShopifyProduct | null> {
  const data = await storefrontFetch<{ product: RawProduct | null }>(
    GET_PRODUCT_BY_HANDLE,
    { handle },
  );
  return data.product ? normalizeProduct(data.product) : null;
}

export async function getProductsByTag(
  tag: string,
  limit = 24,
): Promise<ShopifyProduct[]> {
  const data = await storefrontFetch<{
    products: RawEdgeConnection<RawProduct>;
  }>(GET_PRODUCTS_BY_TAG, { first: limit, query: `tag:${tag}` });
  return data.products.edges.map((e) => normalizeProduct(e.node));
}

export async function getFeaturedProducts(
  limit = 6,
): Promise<ShopifyProduct[]> {
  return getProductsByTag('featured', limit);
}
