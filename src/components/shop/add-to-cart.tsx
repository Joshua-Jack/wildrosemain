"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/lib/cart-store";
import { useCartUI } from "@/lib/cart-ui-store";
import type { ShopProduct, ShopVariant } from "@/lib/shop/types";

type Props = {
  product: ShopProduct;
  variant: ShopVariant | null;
  quantity: number;
};

export function AddToCart({ product, variant, quantity }: Props) {
  const addLine = useCartStore((s) => s.addLine);
  const openCart = useCartUI((s) => s.openCart);
  const [pending, setPending] = useState(false);

  const disabled = !variant || !variant.available || pending;

  const handleClick = async () => {
    if (!variant) {
      toast.error("Pick a size and color first.");
      return;
    }
    if (!variant.available) {
      toast.error("That option is sold out.");
      return;
    }
    setPending(true);
    try {
      await addLine({ merchandiseId: variant.id, quantity });
      toast.success(`${product.title} added to cart`);
      openCart();
    } catch (err) {
      console.error("[shop] add to cart failed:", err);
      toast.error("Couldn't add to cart. Try again?");
    } finally {
      setPending(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm font-semibold text-background transition hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
      {variant && !variant.available ? "Sold out" : "Add to cart"}
    </button>
  );
}
