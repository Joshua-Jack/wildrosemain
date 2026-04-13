// src/components/athlete/athlete-gear.tsx
import { getProductsByTag } from '@/lib/shopify/products';
import { ProductCard } from '@/components/shop/product-card';
import type { Athlete } from '@/lib/content/types';

export async function AthleteGear({ athlete }: { athlete: Athlete }) {
  let products;
  try {
    products = await getProductsByTag(athlete.shopifyTag, 12);
  } catch (err) {
    console.error('[athlete-gear] shopify query failed', err);
    return (
      <section className="container px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">{athlete.name}&apos;s Gear</h2>
        <p className="text-muted-foreground">Gear coming soon.</p>
      </section>
    );
  }

  return (
    <section className="container px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">{athlete.name}&apos;s Gear</h2>
      {products.length === 0 ? (
        <p className="text-muted-foreground">New drops coming soon.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} athleteSlug={athlete.slug} />
          ))}
        </div>
      )}
    </section>
  );
}
