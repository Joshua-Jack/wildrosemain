// src/components/cart/cart-icon-button.tsx
'use client';

import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/cart-store';
import { useCartUI } from '@/lib/cart-ui-store';
import { CartSheet } from './cart-sheet';

type Props = {
  tone?: 'light' | 'dark';
};

export function CartIconButton({ tone = 'dark' }: Props) {
  const totalQuantity = useCartStore((s) => s.cart?.totalQuantity ?? 0);
  const { open, setOpen, openCart } = useCartUI();

  const colorClass =
    tone === 'light'
      ? 'text-white hover:bg-white/10 hover:text-white'
      : 'text-foreground';

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        aria-label={`Cart, ${totalQuantity} items`}
        onClick={openCart}
        className={`relative ${colorClass}`}
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
