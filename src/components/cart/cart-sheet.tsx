// src/components/cart/cart-sheet.tsx
'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/cart-store';
import { CartLineItem } from './cart-line-item';

export function CartSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const cart = useCartStore((s) => s.cart);
  const hasItems = (cart?.lines.length ?? 0) > 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {!hasItems && (
            <p className="text-sm text-muted-foreground mt-8 text-center">
              Your cart is empty.
            </p>
          )}
          {cart?.lines.map((line) => (
            <CartLineItem key={line.id} line={line} />
          ))}
        </div>

        {hasItems && cart && (
          <SheetFooter className="flex-col gap-3 border-t pt-4">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span className="font-medium">
                ${cart.cost.subtotalAmount.amount}
              </span>
            </div>
            <Button
              asChild
              className="w-full"
              size="lg"
              disabled={!hasItems}
            >
              <a href={cart.checkoutUrl}>Checkout</a>
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
