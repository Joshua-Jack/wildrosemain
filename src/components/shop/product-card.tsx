// src/components/shop/product-card.tsx
import Image from 'next/image';
import Link from 'next/link';
import type { ShopifyProduct } from '@/lib/shopify/types';
import { formatMoney } from '@/lib/format';
import { buildBuyHref } from '@/lib/attribution';

type Props = {
  product: ShopifyProduct;
  /** When rendered on an athlete profile page, pass the slug to attach attribution */
  athleteSlug?: string;
};

export function ProductCard({ product, athleteSlug }: Props) {
  const href = buildBuyHref(`/shop/${product.handle}`, athleteSlug);
  const image = product.featuredImage;

  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-lg border bg-card transition hover:shadow-md"
    >
      <div className="aspect-square overflow-hidden bg-muted">
        {image && (
          <Image
            src={image.url}
            alt={image.altText ?? product.title}
            width={image.width}
            height={image.height}
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium line-clamp-2">{product.title}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {formatMoney(product.priceRange.minVariantPrice)}
        </p>
      </div>
    </Link>
  );
}
