// src/components/cart/cart-line-item.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/cart-store';
import type { CartLine } from '@/lib/shopify/types';

export function CartLineItem({ line }: { line: CartLine }) {
  const removeLine = useCartStore((s) => s.removeLine);
  const updateLineQuantity = useCartStore((s) => s.updateLineQuantity);

  const refAttr = line.attributes.find((a) => a.key === '_ref');

  return (
    <div className="flex gap-3 py-4 border-b">
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded bg-muted">
        {line.image && (
          <Image
            src={line.image.url}
            alt={line.image.altText ?? line.title}
            width={line.image.width}
            height={line.image.height}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <Link
          href={`/shop/${line.productHandle}`}
          className="text-sm font-medium hover:underline line-clamp-2"
        >
          {line.title}
        </Link>
        {refAttr && (
          <p className="text-xs text-muted-foreground mt-1">
            via {refAttr.value.replace(/-/g, ' ')}
          </p>
        )}
        <div className="mt-2 flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateLineQuantity(line.id, Math.max(1, line.quantity - 1))}
          >
            −
          </Button>
          <span className="text-sm w-6 text-center">{line.quantity}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateLineQuantity(line.id, line.quantity + 1)}
          >
            +
          </Button>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm font-medium">
          ${line.price.amount}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeLine(line.id)}
          aria-label="Remove item"
          className="mt-2"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
