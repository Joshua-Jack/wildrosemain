import type { Metadata } from "next";
import { getShopProducts } from "@/lib/shop/get-products";
import { isShopCategory } from "@/lib/shop/types";
import { ShopHero } from "@/components/shop/shop-hero";
import { ShopBrowser } from "@/components/shop/shop-browser";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop Wild Rose Collective gear — apparel, headwear, and accessories built for athletes.",
};

type SearchParams = { category?: string };

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const initialCategory = isShopCategory(sp.category) ? sp.category : "all";
  const products = await getShopProducts();

  return (
    <>
      <ShopHero
        activeCategory={initialCategory}
        totalCount={products.length}
      />
      <div className="mx-auto w-full max-w-[1400px] px-6 pt-10 pb-16 md:px-10 md:pt-14 md:pb-24">
        <ShopBrowser products={products} initialCategory={initialCategory} />
      </div>
    </>
  );
}
