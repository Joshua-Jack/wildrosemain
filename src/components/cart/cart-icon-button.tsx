// src/components/cart/cart-icon-button.tsx
'use client';

import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/cart-store';
import { useCartUI } from '@/lib/cart-ui-store';
import { CartSheet } from './cart-sheet';

export function CartIconButton() {
  const totalQuantity = useCartStore((s) => s.cart?.totalQuantity ?? 0);
  const { open, setOpen, openCart } = useCartUI();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        aria-label={`Cart, ${totalQuantity} items`}
        onClick={openCart}
        className="relative"
      >
        <ShoppingBag className="h-5 w-5" />
        {totalQuantity > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
            {totalQuantity}
          </span>
        )}
      </Button>
      <CartSheet open={open} onOpenChange={setOpen} />
    </>
  );
}
