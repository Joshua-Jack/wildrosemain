"use client";

import { useMemo } from "react";
import { useProductVariant } from "@/hooks/use-product-variant";
import { resolveVariant } from "@/lib/shop/resolve-variant";
import type { ShopProduct } from "@/lib/shop/types";
import { SizePicker } from "./size-picker";
import { ColorPicker } from "./color-picker";
import { AddToCart } from "./add-to-cart";
import { FavoritesButton } from "./favorites-button";

type Props = {
  product: ShopProduct;
};

export function ProductPurchasePanel({ product }: Props) {
  const { size, setSize, color, setColor, quantity } = useProductVariant({
    sizes: product.sizes,
    colors: product.colors,
  });

  const variant = useMemo(
    () => resolveVariant(product, size, color),
    [product, size, color],
  );

  return (
    <div className="flex flex-col gap-6">
      <ColorPicker
        colors={product.colors}
        selected={color}
        onSelect={setColor}
      />
      <SizePicker sizes={product.sizes} selected={size} onSelect={setSize} />

      <div className="flex flex-col gap-3 pt-2">
        <AddToCart product={product} variant={variant} quantity={quantity} />
        <FavoritesButton productId={product.id} />
      </div>
    </div>
  );
}
