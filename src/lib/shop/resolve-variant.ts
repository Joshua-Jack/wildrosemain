import type { ShopProduct, ShopVariant } from "./types";

/**
 * Find the variant that matches the selected size + color.
 *
 * If the product has only one option (e.g. only sizes, no colors), the missing
 * dimension is ignored. If no exact match, returns null.
 */
export function resolveVariant(
  product: ShopProduct,
  size: string | null,
  color: string | null,
): ShopVariant | null {
  return (
    product.variants.find((v) => {
      const sizeOk = !v.size || !size || v.size === size;
      const colorOk = !v.color || !color || v.color === color;
      const sizeRequired = product.sizes.length > 0 ? v.size === size : true;
      const colorRequired = product.colors.length > 0 ? v.color === color : true;
      return sizeOk && colorOk && sizeRequired && colorRequired;
    }) ?? null
  );
}
