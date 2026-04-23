"use client";

import { CATEGORY_LABELS, type ShopCategory } from "@/lib/shop/types";

const ORDER: ShopCategory[] = [
  "all",
  "headwear",
  "tops",
  "outerwear",
  "bottoms-accessories",
];

type Props = {
  value: ShopCategory;
  onChange: (category: ShopCategory) => void;
};

export function CategoryTabs({ value, onChange }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Product category"
      className="flex flex-wrap items-center gap-2"
    >
      {ORDER.map((c) => {
        const active = c === value;
        return (
          <button
            key={c}
            role="tab"
            aria-selected={active}
            type="button"
            onClick={() => onChange(c)}
            className={[
              "rounded-full border px-4 py-1.5 text-sm font-medium transition",
              active
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-transparent text-foreground hover:border-foreground/30",
            ].join(" ")}
          >
            {CATEGORY_LABELS[c]}
          </button>
        );
      })}
    </div>
  );
}
