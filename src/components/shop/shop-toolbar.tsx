"use client";

import { CategoryTabs } from "./category-tabs";
import { SortSelect } from "./sort-select";
import { FilterDrawer } from "./filter-drawer";
import type { ShopCategory, ShopSort } from "@/lib/shop/types";

type Props = {
  category: ShopCategory;
  sizes: string[];
  sort: ShopSort;
  activeCount: number;
  visibleCount: number;
  totalCount: number;
  onCategoryChange: (c: ShopCategory) => void;
  onToggleSize: (s: string) => void;
  onSortChange: (s: ShopSort) => void;
  onClear: () => void;
};

export function ShopToolbar({
  category,
  sizes,
  sort,
  activeCount,
  visibleCount,
  totalCount,
  onCategoryChange,
  onToggleSize,
  onSortChange,
  onClear,
}: Props) {
  return (
    <div className="sticky top-[72px] z-30 -mx-6 border-y border-border bg-background/85 px-6 py-4 backdrop-blur-md md:-mx-10 md:px-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <CategoryTabs value={category} onChange={onCategoryChange} />

        <div className="flex items-center gap-3">
          {visibleCount !== totalCount && (
            <p className="hidden text-sm text-muted-foreground md:block">
              <span className="font-medium text-foreground">
                {visibleCount}
              </span>{" "}
              of {totalCount}
            </p>
          )}
          <SortSelect value={sort} onChange={onSortChange} />
          <FilterDrawer
            sizes={sizes}
            onToggleSize={onToggleSize}
            activeCount={activeCount}
            onClear={onClear}
          />
        </div>
      </div>
    </div>
  );
}
