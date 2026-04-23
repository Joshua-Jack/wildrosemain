"use client";

import { ChevronDown } from "lucide-react";
import { SORT_LABELS, type ShopSort } from "@/lib/shop/types";

const ORDER: ShopSort[] = ["featured", "newest", "price-asc", "price-desc"];

type Props = {
  value: ShopSort;
  onChange: (sort: ShopSort) => void;
};

export function SortSelect({ value, onChange }: Props) {
  return (
    <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
      <span className="hidden sm:inline">Sort</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as ShopSort)}
          className="appearance-none rounded-full border border-border bg-background py-1.5 pl-4 pr-9 text-sm font-medium text-foreground transition hover:border-foreground/30 focus:border-foreground focus:outline-none"
        >
          {ORDER.map((s) => (
            <option key={s} value={s}>
              {SORT_LABELS[s]}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
        />
      </div>
    </label>
  );
}
