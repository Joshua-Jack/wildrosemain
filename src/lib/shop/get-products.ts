import {
  getAllProducts,
  getProductByHandle,
  getProductsByTag,
} from "@/lib/shopify/products";
import { fromShopify } from "./from-shopify";
import { MOCK_PRODUCTS } from "./mock-products";
import type { ShopProduct } from "./types";

const USE_SHOPIFY = Boolean(
  (process.env.SHOPIFY_STORE_DOMAIN ||
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN) &&
    (process.env.SHOPIFY_STOREFRONT_TOKEN ||
      process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN),
);

/**
 * Returns the list of products to display in the shop.
 *
 * Pulls from Shopify when credentials are configured. Falls back to mock data
 * if Shopify isn't configured OR if the request fails (so the UI never blanks
 * out during preview/dev).
 */
export async function getShopProducts(): Promise<ShopProduct[]> {
  if (!USE_SHOPIFY) return MOCK_PRODUCTS;
  try {
    const raw = await getAllProducts(100);
    if (raw.length === 0) return MOCK_PRODUCTS;
    return raw.map(fromShopify);
  } catch (err) {
    console.error("[shop] Shopify fetch failed, falling back to mocks:", err);
    return MOCK_PRODUCTS;
  }
}

export async function getShopProductBySlug(
  slug: string,
): Promise<ShopProduct | null> {
  if (!USE_SHOPIFY) {
    return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;
  }
  try {
    const raw = await getProductByHandle(slug);
    if (!raw) return null;
    return fromShopify(raw);
  } catch (err) {
    console.error("[shop] Shopify product fetch failed:", err);
    return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;
  }
}

export async function getNewArrivals(limit = 8): Promise<ShopProduct[]> {
  if (!USE_SHOPIFY) {
    return MOCK_PRODUCTS.filter((p) => p.isNew).slice(0, limit);
  }
  try {
    // Prefer products tagged `new`; fall back to most-recently-published.
    const tagged = await getProductsByTag("new", limit);
    if (tagged.length > 0) return tagged.map(fromShopify);
    const all = await getAllProducts(limit);
    return all
      .map(fromShopify)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, limit);
  } catch (err) {
    console.error("[shop] Shopify new arrivals fetch failed:", err);
    return MOCK_PRODUCTS.filter((p) => p.isNew).slice(0, limit);
  }
}

export async function getRelatedProducts(
  product: ShopProduct,
  limit = 4,
): Promise<ShopProduct[]> {
  if (!USE_SHOPIFY) {
    return MOCK_PRODUCTS.filter(
      (p) => p.id !== product.id && p.category === product.category,
    ).slice(0, limit);
  }
  try {
    const raw = await getProductsByTag(`category:${product.category}`, limit + 1);
    return raw
      .map(fromShopify)
      .filter((p) => p.id !== product.id)
      .slice(0, limit);
  } catch (err) {
    console.error("[shop] Shopify related fetch failed:", err);
    return [];
  }
}
