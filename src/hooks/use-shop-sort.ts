"use client";

import { useState } from "react";
import type { ShopSort } from "@/lib/shop/types";

export function useShopSort(initial: ShopSort = "featured") {
  const [sort, setSort] = useState<ShopSort>(initial);
  return { sort, setSort };
}
