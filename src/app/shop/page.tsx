// src/app/shop/page.tsx
import type { Metadata } from 'next';
import { getAllProducts } from '@/lib/shopify/products';
import { ProductCard } from '@/components/shop/product-card';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Shop Wild Rose athlete gear, drops, and tournament merch.',
};

export default async function ShopPage() {
  let products;
  try {
    products = await getAllProducts(100);
  } catch (err) {
    console.error('[shop] failed to load products', err);
    return (
      <div className="container px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Shop</h1>
        <p className="text-muted-foreground">
          Store is temporarily unavailable. Try again in a moment.
        </p>
      </div>
    );
  }

  return (
    <div className="container px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Shop</h1>
      {products.length === 0 ? (
        <p className="text-muted-foreground">New drops coming soon.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
