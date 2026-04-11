// src/app/cart/page.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/cart-store';
import { CartLineItem } from '@/components/cart/cart-line-item';

export default function CartPage() {
  const cart = useCartStore((s) => s.cart);
  const hasItems = (cart?.lines.length ?? 0) > 0;

  return (
    <div className="container max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Cart</h1>

      {!hasItems && (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-4">Your cart is empty.</p>
          <Button asChild>
            <Link href="/shop">Browse shop</Link>
          </Button>
        </div>
      )}

      {hasItems && cart && (
        <>
          <div className="border-t">
            {cart.lines.map((line) => (
              <CartLineItem key={line.id} line={line} />
            ))}
          </div>
          <div className="mt-8 flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Subtotal</div>
              <div className="text-2xl font-bold">
                ${cart.cost.subtotalAmount.amount}
              </div>
            </div>
            <Button asChild size="lg">
              <a href={cart.checkoutUrl}>Checkout</a>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
