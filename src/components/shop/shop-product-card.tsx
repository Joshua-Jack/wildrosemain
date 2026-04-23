import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/shop/format";
import type { ShopProduct } from "@/lib/shop/types";
import { HeartToggle } from "./heart-toggle";

type Props = {
  product: ShopProduct;
};

export function ShopProductCard({ product }: Props) {
  const primary = product.image;
  const hover = product.images.find((src) => src && src !== primary);
  const colorCount = product.colors.length;
  const onSale =
    product.compareAtPriceCents !== undefined &&
    product.compareAtPriceCents > product.priceCents;
  const percentOff = onSale
    ? Math.round(
        100 -
          (product.priceCents / (product.compareAtPriceCents as number)) * 100,
      )
    : 0;

  return (
    <Link href={`/shop/${product.slug}`} className="group flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-muted">
        {primary && (
          <Image
            src={primary}
            alt={product.title}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        )}
        {hover && (
          <Image
            src={hover}
            alt=""
            aria-hidden
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
        <HeartToggle productId={product.id} overlay />
      </div>

      <div className="mt-4 flex flex-col gap-0.5">
        {product.isNew && !onSale && (
          <p className="text-xs font-bold uppercase tracking-wider text-red-600">
            New Arrival
          </p>
        )}
        {onSale && (
          <p className="text-xs font-bold uppercase tracking-wider text-red-600">
            Sale · -{percentOff}%
          </p>
        )}

        <p className="text-base font-bold text-foreground line-clamp-1">
          {product.title}
        </p>
        {product.subtitle && (
          <p className="text-base text-muted-foreground line-clamp-1">
            {product.subtitle}
          </p>
        )}

        {colorCount > 1 && (
          <p className="text-sm text-muted-foreground">{colorCount} Colors</p>
        )}

        <div className="mt-1 flex items-baseline gap-2">
          {onSale ? (
            <>
              <p className="text-base font-bold text-red-600">
                {formatPrice(product.priceCents)}
              </p>
              <p className="text-sm text-muted-foreground line-through">
                {formatPrice(product.compareAtPriceCents as number)}
              </p>
            </>
          ) : (
            <p className="text-base font-medium text-foreground">
              {formatPrice(product.priceCents)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
