"use client";

import { SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SizeFilter } from "./size-filter";

type Props = {
  sizes: string[];
  onToggleSize: (s: string) => void;
  activeCount: number;
  onClear: () => void;
};

export function FilterDrawer({
  sizes,
  onToggleSize,
  activeCount,
  onClear,
}: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:border-foreground/30"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filter
          {activeCount > 0 && (
            <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1.5 text-[10px] font-semibold text-background">
              {activeCount}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex flex-col gap-8 px-4">
          <SizeFilter selected={sizes} onToggle={onToggleSize} />
        </div>

        {activeCount > 0 && (
          <div className="mt-8 flex justify-end px-4">
            <button
              type="button"
              onClick={onClear}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Clear all filters
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
