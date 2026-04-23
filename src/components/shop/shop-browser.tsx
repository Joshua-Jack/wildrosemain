"use client";

import { useTransition } from "react";
import { useShopFilters } from "@/hooks/use-shop-filters";
import { useShopSort } from "@/hooks/use-shop-sort";
import { useFilteredProducts } from "@/hooks/use-filtered-products";
import type {
  ShopCategory,
  ShopProduct,
  ShopSort,
} from "@/lib/shop/types";
import { ShopToolbar } from "./shop-toolbar";
import { ShopGrid } from "./shop-grid";
import { ShopEmpty } from "./shop-empty";

type Props = {
  products: ShopProduct[];
  initialCategory?: ShopCategory;
};

export function ShopBrowser({ products, initialCategory }: Props) {
  const filters = useShopFilters({ initialCategory });
  const { sort, setSort } = useShopSort("featured");
  const [isPending, startTransition] = useTransition();

  const visible = useFilteredProducts({
    products,
    category: filters.category,
    sizes: filters.sizes,
    sort,
  });

  // Wrap user-driven filter/sort changes in a transition so the grid can fade
  // out → in instead of slamming. Helps a lot once we wire async Shopify
  // queries here.
  const wrap = (fn: () => void) => () => startTransition(fn);

  return (
    <div className="flex flex-col gap-10">
      <ShopToolbar
        category={filters.category}
        sizes={filters.sizes}
        sort={sort}
        activeCount={filters.activeCount}
        visibleCount={visible.length}
        totalCount={products.length}
        onCategoryChange={(c) => startTransition(() => filters.setCategory(c))}
        onToggleSize={(s) => startTransition(() => filters.toggleSize(s))}
        onSortChange={(s: ShopSort) => startTransition(() => setSort(s))}
        onClear={wrap(filters.clear)}
      />
      <div
        aria-busy={isPending}
        className={[
          "transition-opacity duration-200",
          isPending ? "opacity-60" : "opacity-100",
        ].join(" ")}
      >
        {visible.length === 0 ? (
          <ShopEmpty onClear={filters.clear} />
        ) : (
          <ShopGrid products={visible} />
        )}
      </div>
    </div>
  );
}
