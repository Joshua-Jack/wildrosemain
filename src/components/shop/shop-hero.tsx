import Image from "next/image";
import Link from "next/link";
import { getSiteImageList } from "@/lib/images/get-site-image";
import {
  CATEGORY_LABELS,
  type ShopCategory,
} from "@/lib/shop/types";

const CATEGORY_TILES: Array<{
  category: Exclude<ShopCategory, "all">;
  imageIndex: number;
}> = [
  { category: "headwear", imageIndex: 0 },
  { category: "tops", imageIndex: 1 },
  { category: "outerwear", imageIndex: 2 },
  { category: "bottoms-accessories", imageIndex: 3 },
];

type Props = {
  activeCategory?: ShopCategory;
  totalCount?: number;
};

export function ShopHero({ activeCategory = "all", totalCount }: Props) {
  if (activeCategory !== "all") {
    return <SlimHero activeCategory={activeCategory} totalCount={totalCount} />;
  }
  return <FullHero totalCount={totalCount} />;
}

function SlimHero({
  activeCategory,
  totalCount,
}: {
  activeCategory: Exclude<ShopCategory, "all">;
  totalCount?: number;
}) {
  return (
    <section className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-[1400px] px-6 pt-28 pb-8 md:px-10 md:pt-32 md:pb-10">
        <Breadcrumbs activeCategory={activeCategory} />
        <h1 className="mt-3 text-3xl font-bold uppercase leading-[0.95] tracking-tight md:text-5xl">
          {CATEGORY_LABELS[activeCategory]}
          {typeof totalCount === "number" && (
            <span className="ml-3 align-baseline text-base font-medium text-white/60 md:text-xl">
              ({totalCount})
            </span>
          )}
        </h1>
      </div>
    </section>
  );
}

function FullHero({ totalCount }: { totalCount?: number }) {
  const tiles = getSiteImageList("heroShop");

  return (
    <section className="relative overflow-hidden bg-neutral-950 text-white">
      <div className="mx-auto max-w-[1400px] px-6 pt-28 pb-10 md:px-10 md:pt-32 md:pb-12">
        <h1 className="text-3xl font-bold uppercase leading-[0.95] tracking-tight md:text-5xl">
          The Shop
          {typeof totalCount === "number" && (
            <span className="ml-3 align-baseline text-base font-medium text-white/60 md:text-xl">
              ({totalCount})
            </span>
          )}
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
          Apparel, headwear, and accessories made with the collective. New
          drops every season — they don&apos;t sit in a warehouse long.
        </p>
      </div>

      {/* Adidas-style category tile strip */}
      <CategoryTileStrip tiles={tiles} />
    </section>
  );
}

function CategoryTileStrip({
  tiles,
}: {
  tiles: ReturnType<typeof getSiteImageList>;
}) {
  return (
    <div className="mx-auto max-w-[1400px] px-6 pb-12 md:px-10 md:pb-16">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
        {CATEGORY_TILES.map(({ category, imageIndex }) => {
          const tile = tiles[imageIndex];
          return (
            <Link
              key={category}
              href={`/shop?category=${category}`}
              className="group relative aspect-[4/5] overflow-hidden bg-neutral-900 transition md:aspect-[3/4]"
            >
              {tile && (
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  sizes="(min-width: 768px) 22vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition group-hover:from-black/95" />
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                <p className="text-base font-bold uppercase leading-tight tracking-tight text-white md:text-2xl">
                  {CATEGORY_LABELS[category]}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/70 transition group-hover:text-white">
                  Shop now →
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function Breadcrumbs({
  activeCategory,
}: {
  activeCategory: Exclude<ShopCategory, "all">;
}) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs">
      <Link
        href="/shop"
        className="font-mono uppercase tracking-[0.18em] text-white/60 transition hover:text-white"
      >
        Shop
      </Link>
      <span aria-hidden className="text-white/30">
        /
      </span>
      <span className="font-mono uppercase tracking-[0.18em] text-white">
        {CATEGORY_LABELS[activeCategory]}
      </span>
    </nav>
  );
}
