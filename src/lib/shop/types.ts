export type ShopCategory =
  | "all"
  | "headwear"
  | "tops"
  | "outerwear"
  | "bottoms-accessories";

export function isShopCategory(value: unknown): value is ShopCategory {
  return (
    typeof value === "string" &&
    ["all", "headwear", "tops", "outerwear", "bottoms-accessories"].includes(
      value,
    )
  );
}

export type ShopSort =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc";

export type ShopVariant = {
  id: string; // Shopify variant gid (or stable mock id)
  size?: string;
  color?: string;
  priceCents: number;
  available: boolean;
};

export type ShopProduct = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  priceCents: number;
  /** Pre-sale price (Shopify "compareAtPrice"). When > priceCents, render
   *  the strikethrough + sale treatment on cards/PDP. */
  compareAtPriceCents?: number;
  image: string;
  images: string[];
  category: Exclude<ShopCategory, "all">;
  sizes: string[];
  colors: string[];
  variants: ShopVariant[];
  inStock: boolean;
  isNew: boolean;
  isFeatured: boolean;
  createdAt: string; // ISO
};

export const CATEGORY_LABELS: Record<ShopCategory, string> = {
  all: "All",
  headwear: "Headwear",
  tops: "Tops",
  outerwear: "Outerwear",
  "bottoms-accessories": "Bottoms & Accessories",
};

export const SORT_LABELS: Record<ShopSort, string> = {
  featured: "Featured",
  newest: "Newest",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
};
