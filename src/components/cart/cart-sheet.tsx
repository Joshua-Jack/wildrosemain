"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCartStore } from "@/lib/cart-store";
import { useCartUI } from "@/lib/cart-ui-store";
import { formatMoney } from "@/lib/format-money";
import { CartLineItem } from "./cart-line-item";

export function CartSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const cart = useCartStore((s) => s.cart);
  const status = useCartStore((s) => s.status);
  const closeCart = useCartUI((s) => s.closeCart);

  const lines = cart?.lines ?? [];
  const hasItems = lines.length > 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-border px-6 py-4">
          <SheetTitle className="flex items-center gap-2 text-lg font-semibold">
            <ShoppingBag className="h-4 w-4" />
            Your cart
            {hasItems && (
              <span className="ml-1 text-sm font-normal text-muted-foreground">
                ({cart?.totalQuantity})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6">
          {!hasItems ? (
            <EmptyCart onClose={closeCart} />
          ) : (
            <div className="flex flex-col">
              {lines.map((line) => (
                <CartLineItem key={line.id} line={line} />
              ))}
            </div>
          )}
        </div>

        {hasItems && cart && (
          <div className="border-t border-border bg-muted/40 px-6 py-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-base font-semibold text-foreground">
                {formatMoney(cart.cost.subtotalAmount)}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Shipping and taxes calculated at checkout.
            </p>
            <a
              href={cart.checkoutUrl}
              className="group mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm font-semibold text-background transition hover:bg-foreground/90 disabled:opacity-50"
              aria-disabled={status === "loading"}
            >
              Checkout
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <button
              type="button"
              onClick={closeCart}
              className="mt-2 w-full text-xs text-muted-foreground hover:text-foreground"
            >
              Continue shopping
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
        <ShoppingBag className="h-6 w-6 text-muted-foreground" />
      </div>
      <div>
        <p className="text-base font-medium text-foreground">
          Your cart is empty
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Drops, drops, drops — go pick something out.
        </p>
      </div>
      <Link
        href="/shop"
        onClick={onClose}
        className="mt-2 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition hover:bg-foreground/90"
      >
        Browse the shop
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
