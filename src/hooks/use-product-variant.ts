"use client";

import { useState, useCallback } from "react";

type Options = {
  sizes: string[];
  colors: string[];
};

export function useProductVariant({ sizes, colors }: Options) {
  const [size, setSize] = useState<string | null>(sizes[0] ?? null);
  const [color, setColor] = useState<string | null>(colors[0] ?? null);
  const [quantity, setQuantity] = useState(1);

  const inc = useCallback(() => setQuantity((q) => Math.min(q + 1, 99)), []);
  const dec = useCallback(() => setQuantity((q) => Math.max(q - 1, 1)), []);

  return {
    size,
    setSize,
    color,
    setColor,
    quantity,
    setQuantity,
    inc,
    dec,
  };
}
