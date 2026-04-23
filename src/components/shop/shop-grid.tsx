import { Fragment } from "react";
import type { ShopProduct } from "@/lib/shop/types";
import { ShopProductCard } from "./shop-product-card";
import { EditorialBreak } from "./editorial-break";

type Props = {
  products: ShopProduct[];
  /** Insert an editorial break every N products. Set to 0 to disable. */
  breakEvery?: number;
};

export function ShopGrid({ products, breakEvery = 6 }: Props) {
  // Pick the most "feature-worthy" product to spotlight in editorial breaks.
  const spotlight = pickSpotlight(products);

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-2 md:grid-cols-3 md:gap-x-6 md:gap-y-12 lg:grid-cols-4 lg:gap-x-6">
      {products.map((p, i) => {
        const showBreak =
          breakEvery > 0 &&
          spotlight !== null &&
          i > 0 &&
          (i + 1) % breakEvery === 0 &&
          i < products.length - 1;

        return (
          <Fragment key={p.id}>
            <ShopProductCard product={p} />
            {showBreak && spotlight && p.id !== spotlight.id && (
              <EditorialBreak product={spotlight} />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

function pickSpotlight(products: ShopProduct[]): ShopProduct | null {
  return (
    products.find((p) => p.isFeatured && p.inStock) ??
    products.find((p) => p.inStock) ??
    products[0] ??
    null
  );
}
