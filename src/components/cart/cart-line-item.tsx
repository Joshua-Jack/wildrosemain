"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { formatMoney } from "@/lib/format-money";
import type { CartLine } from "@/lib/shopify/types";

const CONFIRM_TIMEOUT_MS = 5000;

export function CartLineItem({ line }: { line: CartLine }) {
  const removeLine = useCartStore((s) => s.removeLine);
  const updateLineQuantity = useCartStore((s) => s.updateLineQuantity);

  const [confirmingRemove, setConfirmingRemove] = useState(false);

  // Auto-cancel the confirmation after a few seconds so it doesn't get stuck.
  useEffect(() => {
    if (!confirmingRemove) return;
    const timer = window.setTimeout(
      () => setConfirmingRemove(false),
      CONFIRM_TIMEOUT_MS,
    );
    return () => window.clearTimeout(timer);
  }, [confirmingRemove]);

  const variantLabel =
    line.title && line.title !== "Default Title" ? line.title : null;
  const refAttr = line.attributes.find((a) => a.key === "_ref");

  return (
    <div className="flex gap-4 border-b border-border py-5">
      <Link
        href={`/shop/${line.productHandle}`}
        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-[#f3f3f1]"
      >
        {line.image && (
          <Image
            src={line.image.url}
            alt={line.image.altText ?? line.productTitle}
            fill
            sizes="96px"
            className="object-contain p-2"
          />
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-3">
          <Link
            href={`/shop/${line.productHandle}`}
            className="text-sm font-medium leading-snug text-foreground line-clamp-2 hover:underline"
          >
            {line.productTitle}
          </Link>
          {!confirmingRemove && (
            <button
              type="button"
              onClick={() => setConfirmingRemove(true)}
              aria-label={`Remove ${line.productTitle} from cart`}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {variantLabel && (
          <p className="text-xs text-muted-foreground">{variantLabel}</p>
        )}
        {refAttr && (
          <p className="text-xs text-muted-foreground">
            via {refAttr.value.replace(/-/g, " ")}
          </p>
        )}

        {confirmingRemove ? (
          <div className="mt-2 flex items-center justify-between gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2">
            <p className="text-xs font-medium text-foreground">
              Remove from cart?
            </p>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setConfirmingRemove(false)}
                className="rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-background hover:text-foreground"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfirmingRemove(false);
                  void removeLine(line.id);
                }}
                className="rounded-full bg-foreground px-3 py-1.5 text-xs font-semibold text-background transition hover:bg-foreground/90"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-2 flex items-center justify-between">
            <div className="inline-flex items-center rounded-full border border-border">
              <button
                type="button"
                onClick={() =>
                  updateLineQuantity(line.id, Math.max(1, line.quantity - 1))
                }
                disabled={line.quantity <= 1}
                aria-label="Decrease quantity"
                className="flex h-8 w-8 items-center justify-center rounded-l-full text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="min-w-7 text-center text-xs font-medium text-foreground">
                {line.quantity}
              </span>
              <button
                type="button"
                onClick={() => updateLineQuantity(line.id, line.quantity + 1)}
                aria-label="Increase quantity"
                className="flex h-8 w-8 items-center justify-center rounded-r-full text-foreground transition hover:bg-muted"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
            <p className="text-sm font-medium text-foreground">
              {formatMoney(line.price)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
