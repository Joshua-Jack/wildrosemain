import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getNewArrivals } from "@/lib/shop/get-products";
import { formatPrice } from "@/lib/shop/format";

export async function FeaturedProducts() {
  const products = await getNewArrivals(8);
  if (products.length === 0) return null;

  return (
    <section className="bg-neutral-950 py-14 md:py-20 text-white">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-6 flex items-end justify-between gap-4 md:mb-8">
          <div>
            <p className="text-sm font-medium text-white/60">New Arrivals</p>
            <h2 className="mt-2 text-2xl font-medium tracking-tight text-white md:text-3xl">
              A new pace for a smooth start.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/shop"
              className="hidden text-sm font-medium text-white hover:underline underline-offset-4 sm:inline"
            >
              See all
            </Link>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex snap-x snap-mandatory gap-4 px-6 pb-4 md:gap-5 md:px-10 lg:px-[max(2.5rem,calc((100vw-1400px)/2+2.5rem))]">
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/shop/${p.slug}`}
              className="group flex w-[78%] flex-none snap-start flex-col sm:w-[42%] md:w-[32%] lg:w-[27%]"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl bg-neutral-900 md:rounded-2xl">
                {p.image && (
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(min-width: 1024px) 27vw, (min-width: 640px) 42vw, 78vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                )}
              </div>
              <div className="mt-4 flex flex-col gap-0.5">
                <p className="text-base font-medium text-white line-clamp-1">
                  {p.title}
                </p>
                {p.subtitle && (
                  <p className="text-sm text-white/60 line-clamp-1">
                    {p.subtitle}
                  </p>
                )}
                <p className="mt-1 text-base font-medium text-white">
                  {formatPrice(p.priceCents)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
