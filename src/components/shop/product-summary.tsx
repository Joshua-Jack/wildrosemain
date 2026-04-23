import { formatPrice } from "@/lib/shop/format";
import type { ShopProduct } from "@/lib/shop/types";

type Props = {
  product: ShopProduct;
};

export function ProductSummary({ product }: Props) {
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
    <div className="flex flex-col gap-1.5">
      <h1 className="text-2xl font-medium leading-tight text-foreground md:text-3xl">
        {product.title}
      </h1>
      {product.subtitle && (
        <p className="text-base text-muted-foreground">{product.subtitle}</p>
      )}

      <div className="mt-3 flex items-baseline gap-3">
        {onSale ? (
          <>
            <p className="text-base font-bold text-red-600">
              {formatPrice(product.priceCents)}
            </p>
            <p className="text-sm text-muted-foreground line-through">
              {formatPrice(product.compareAtPriceCents as number)}
            </p>
            <span className="rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
              -{percentOff}%
            </span>
          </>
        ) : (
          <p className="text-base font-medium text-foreground">
            {formatPrice(product.priceCents)}
          </p>
        )}
      </div>
    </div>
  );
}
