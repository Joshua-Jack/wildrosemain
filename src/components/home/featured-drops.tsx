import { getFeaturedProducts } from "@/lib/shopify/products";
import { ProductCard } from "@/components/shop/product-card";

export async function FeaturedDrops() {
  try {
    const products = await getFeaturedProducts(6);
    if (products.length === 0) return null;
    return (
      <section className="py-14 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">Featured drops</h2>
            <a href="/shop" className="text-sm underline underline-offset-4">
              Shop all
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    );
  } catch {
    return null;
  }
}
