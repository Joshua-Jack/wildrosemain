import type { ShopProduct } from "@/lib/shop/types";
import { ShopProductCard } from "./shop-product-card";

type Props = {
  products: ShopProduct[];
  title?: string;
};

export function RelatedProducts({ products, title = "You might also like" }: Props) {
  if (products.length === 0) return null;
  return (
    <section className="mt-20 md:mt-28">
      <h2 className="mb-8 text-2xl font-bold tracking-tight md:text-3xl">
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {products.map((p) => (
          <ShopProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
