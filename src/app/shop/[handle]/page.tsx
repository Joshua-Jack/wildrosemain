// src/app/shop/[handle]/page.tsx
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProductByHandle, getProductsByTag } from '@/lib/shopify/products';
import { formatMoney } from '@/lib/format';
import { AddToCartButton } from '@/components/shop/add-to-cart-button';
import { AttributionCapture } from '@/components/shop/attribution-capture';
import { ProductCard } from '@/components/shop/product-card';

export const revalidate = 60;

type RouteParams = { handle: string };

export async function generateMetadata(
  { params }: { params: Promise<RouteParams> },
): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) return { title: 'Not found' };
  return {
    title: product.title,
    description: product.description.slice(0, 200),
    openGraph: {
      title: product.title,
      description: product.description.slice(0, 200),
      images: product.featuredImage ? [product.featuredImage.url] : [],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) notFound();

  const athleteTag = product.tags.find((t) => t.startsWith('athlete:'));
  const athleteSlug = athleteTag?.slice('athlete:'.length);
  const defaultVariant = product.variants[0];
  const inStock = defaultVariant?.availableForSale ?? false;

  const related = athleteTag
    ? (await getProductsByTag(athleteTag, 8)).filter((p) => p.id !== product.id).slice(0, 4)
    : [];

  return (
    <div className="container px-4 py-12">
      <AttributionCapture />
      <div className="grid gap-8 md:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-lg bg-muted">
          {product.featuredImage && (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText ?? product.title}
              width={product.featuredImage.width}
              height={product.featuredImage.height}
              className="h-full w-full object-cover"
              priority
            />
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-2xl mt-2">
            {formatMoney(product.priceRange.minVariantPrice)}
          </p>
          {athleteSlug && (
            <p className="text-sm text-muted-foreground mt-2">
              Tied to athlete:{' '}
              <a href={`/athletes/${athleteSlug}`} className="underline">
                {athleteSlug.replace(/-/g, ' ')}
              </a>
            </p>
          )}
          <div className="mt-6">
            {defaultVariant && (
              <AddToCartButton variantId={defaultVariant.id} disabled={!inStock} />
            )}
          </div>
          <div
            className="prose prose-sm mt-8"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">More from this drop</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} athleteSlug={athleteSlug} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
