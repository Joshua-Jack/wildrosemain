import type { ShopCategory, ShopProduct, ShopSort } from "./types";

export function filterByCategory(
  products: ShopProduct[],
  category: ShopCategory,
): ShopProduct[] {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}

export function filterBySizes(
  products: ShopProduct[],
  sizes: string[],
): ShopProduct[] {
  if (sizes.length === 0) return products;
  return products.filter((p) => sizes.some((s) => p.sizes.includes(s)));
}

export function sortProducts(
  products: ShopProduct[],
  sort: ShopSort,
): ShopProduct[] {
  const copy = [...products];
  switch (sort) {
    case "featured":
      return copy.sort(
        (a, b) => Number(b.isFeatured) - Number(a.isFeatured),
      );
    case "newest":
      return copy.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    case "price-asc":
      return copy.sort((a, b) => a.priceCents - b.priceCents);
    case "price-desc":
      return copy.sort((a, b) => b.priceCents - a.priceCents);
    default:
      return copy;
  }
}
