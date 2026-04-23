"use client";

import { useState, useCallback, useMemo } from "react";
import type { ShopCategory } from "@/lib/shop/types";

type UseShopFiltersOptions = {
  initialCategory?: ShopCategory;
  initialSizes?: string[];
};

export function useShopFilters(options: UseShopFiltersOptions = {}) {
  const [category, setCategory] = useState<ShopCategory>(
    options.initialCategory ?? "all",
  );
  const [sizes, setSizes] = useState<string[]>(options.initialSizes ?? []);

  const toggleSize = useCallback((size: string) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  }, []);

  const clear = useCallback(() => {
    setCategory("all");
    setSizes([]);
  }, []);

  const activeCount = useMemo(() => {
    return (category !== "all" ? 1 : 0) + sizes.length;
  }, [category, sizes.length]);

  return {
    category,
    setCategory,
    sizes,
    toggleSize,
    setSizes,
    clear,
    activeCount,
  };
}
