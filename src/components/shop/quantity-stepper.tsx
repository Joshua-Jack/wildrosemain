"use client";

import { Minus, Plus } from "lucide-react";

type Props = {
  value: number;
  onDec: () => void;
  onInc: () => void;
};

export function QuantityStepper({ value, onDec, onInc }: Props) {
  return (
    <div className="inline-flex items-center rounded-full border border-border">
      <button
        type="button"
        onClick={onDec}
        aria-label="Decrease quantity"
        disabled={value <= 1}
        className="flex h-9 w-9 items-center justify-center rounded-l-full text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="min-w-7 text-center text-sm font-medium text-foreground">
        {value}
      </span>
      <button
        type="button"
        onClick={onInc}
        aria-label="Increase quantity"
        className="flex h-9 w-9 items-center justify-center rounded-r-full text-foreground transition hover:bg-muted"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
