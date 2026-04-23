"use client";

import { useMemo } from "react";
import {
  filterByCategory,
  filterBySizes,
  sortProducts,
} from "@/lib/shop/filter-utils";
import type { ShopCategory, ShopProduct, ShopSort } from "@/lib/shop/types";

type Args = {
  products: ShopProduct[];
  category: ShopCategory;
  sizes: string[];
  sort: ShopSort;
};

export function useFilteredProducts({
  products,
  category,
  sizes,
  sort,
}: Args): ShopProduct[] {
  return useMemo(() => {
    const byCat = filterByCategory(products, category);
    const bySize = filterBySizes(byCat, sizes);
    return sortProducts(bySize, sort);
  }, [products, category, sizes, sort]);
}
