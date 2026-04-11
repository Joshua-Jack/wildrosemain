// src/components/shop/add-to-cart-button.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/cart-store';
import { readRefFromCookie } from '@/lib/attribution';
import { toast } from 'sonner';

type Props = {
  variantId: string;
  disabled?: boolean;
};

export function AddToCartButton({ variantId, disabled }: Props) {
  const addLine = useCartStore((s) => s.addLine);
  const [adding, setAdding] = useState(false);

  async function handleClick() {
    if (adding) return;
    setAdding(true);
    try {
      const ref = readRefFromCookie();
      await addLine({
        merchandiseId: variantId,
        quantity: 1,
        refAthlete: ref ?? undefined,
      });
      toast.success('Added to cart');
    } catch {
      toast.error("Couldn't add to cart. Try again.");
    } finally {
      setAdding(false);
    }
  }

  return (
    <Button
      size="lg"
      onClick={handleClick}
      disabled={disabled || adding}
      className="w-full"
    >
      {disabled ? 'Sold out' : adding ? 'Adding…' : 'Add to cart'}
    </Button>
  );
}
