import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getRelatedProducts,
  getShopProductBySlug,
  getShopProducts,
} from "@/lib/shop/get-products";
import { ProductGallery } from "@/components/shop/product-gallery";
import { ProductSummary } from "@/components/shop/product-summary";
import { ProductPurchasePanel } from "@/components/shop/product-purchase-panel";
import { ProductDescription } from "@/components/shop/product-description";
import { RelatedProducts } from "@/components/shop/related-products";

type RouteParams = { handle: string };

export async function generateStaticParams() {
  const products = await getShopProducts();
  return products.map((p) => ({ handle: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = await getShopProductBySlug(handle);
  if (!product) return { title: "Not found" };
  return {
    title: product.title,
    description: product.description.slice(0, 200),
    openGraph: {
      title: product.title,
      description: product.description.slice(0, 200),
      images: product.image ? [product.image] : [],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { handle } = await params;
  const product = await getShopProductBySlug(handle);
  if (!product) notFound();

  const related = await getRelatedProducts(product, 4);

  return (
    <div className="mx-auto w-full max-w-[1400px] px-6 pt-24 pb-16 md:px-10 md:pt-28 md:pb-24">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/shop" className="hover:text-foreground">
              Shop
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-foreground">{product.title}</li>
        </ol>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} alt={product.title} />

        <div className="flex flex-col gap-10">
          <ProductSummary product={product} />
          <ProductPurchasePanel product={product} />
          <ProductDescription
            description={product.description}
            features={product.features}
          />
        </div>
      </div>

      <RelatedProducts products={related} />
    </div>
  );
}
