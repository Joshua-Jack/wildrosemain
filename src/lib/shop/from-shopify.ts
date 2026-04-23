import type { ShopifyProduct, ShopifyVariant } from "@/lib/shopify/types";
import type { ShopCategory, ShopProduct, ShopVariant } from "./types";
import { isShopCategory } from "./types";

/**
 * Adapter: Shopify Storefront API product → our local `ShopProduct` shape.
 *
 * Shopify-side conventions used:
 * - **Category**: tag like `category:headwear` / `category:tops` / etc.
 *   Falls back to `productType` lowercased if no tag matches.
 * - **Sizes / Colors**: variant `selectedOptions` with name `Size` / `Color`.
 * - **Features**: tags prefixed `feature:` (e.g. `feature:Recycled cotton`).
 *   Falls back to bullet-style lines parsed from the description.
 * - **isNew**: presence of `new` tag.
 * - **isFeatured**: presence of `featured` tag.
 */
export function fromShopify(p: ShopifyProduct): ShopProduct {
  const category = pickCategory(p);
  const sizes = uniqueOptions(p, "Size");
  const colors = uniqueOptions(p, "Color");
  const features = pickFeatures(p);
  const inStock = p.variants.some((v) => v.availableForSale);

  return {
    id: p.id,
    slug: p.handle,
    title: p.title,
    subtitle: deriveSubtitle(p),
    description: p.description,
    features,
    priceCents: toCents(p.priceRange.minVariantPrice.amount),
    image: p.featuredImage?.url ?? p.images[0]?.url ?? "",
    images:
      p.images.length > 0
        ? p.images.map((i) => i.url)
        : p.featuredImage
          ? [p.featuredImage.url]
          : [],
    category,
    sizes,
    colors,
    variants: p.variants.map(toShopVariant),
    inStock,
    isNew: hasTag(p, "new"),
    isFeatured: hasTag(p, "featured"),
    createdAt: p.publishedAt,
  };
}

function toShopVariant(v: ShopifyVariant): ShopVariant {
  const optionByName = (name: string) =>
    v.selectedOptions.find(
      (o) => o.name.toLowerCase() === name.toLowerCase(),
    )?.value;
  return {
    id: v.id,
    size: optionByName("Size"),
    color: optionByName("Color"),
    priceCents: toCents(v.price.amount),
    available: v.availableForSale,
  };
}

function hasTag(p: ShopifyProduct, tag: string): boolean {
  const t = tag.toLowerCase();
  return p.tags.some((x) => x.toLowerCase() === t);
}

function uniqueOptions(p: ShopifyProduct, name: string): string[] {
  const set = new Set<string>();
  for (const v of p.variants) {
    for (const o of v.selectedOptions) {
      if (o.name.toLowerCase() === name.toLowerCase() && o.value) {
        set.add(o.value);
      }
    }
  }
  return Array.from(set);
}

function pickCategory(p: ShopifyProduct): Exclude<ShopCategory, "all"> {
  const fromTag = p.tags
    .map((t) => t.toLowerCase())
    .find((t) => t.startsWith("category:"));
  if (fromTag) {
    const value = fromTag.slice("category:".length);
    if (isShopCategory(value) && value !== "all") return value;
  }
  const pt = p.productType.toLowerCase();
  if (isShopCategory(pt) && pt !== "all") return pt;
  return "tops";
}

function pickFeatures(p: ShopifyProduct): string[] {
  const fromTags = p.tags
    .filter((t) => t.toLowerCase().startsWith("feature:"))
    .map((t) => t.slice("feature:".length).trim())
    .filter(Boolean);
  if (fromTags.length > 0) return fromTags;

  // Fall back to bullet-style lines in the description.
  return p.description
    .split(/\r?\n/)
    .map((line) => line.replace(/^[-*•]\s*/, "").trim())
    .filter((line) => line.length > 0 && line.length < 160)
    .slice(0, 6);
}

function deriveSubtitle(p: ShopifyProduct): string {
  if (p.productType) return p.productType;
  const subtitleTag = p.tags.find((t) =>
    t.toLowerCase().startsWith("subtitle:"),
  );
  if (subtitleTag) return subtitleTag.slice("subtitle:".length).trim();
  return "";
}

function toCents(amount: string): number {
  const num = Number.parseFloat(amount);
  if (Number.isNaN(num)) return 0;
  return Math.round(num * 100);
}
