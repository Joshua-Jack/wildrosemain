import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/shop/format";
import type { ShopProduct } from "@/lib/shop/types";

type Props = {
  product: ShopProduct;
  headline?: string;
};

export function EditorialBreak({ product, headline }: Props) {
  return (
    <section className="col-span-full my-6 overflow-hidden rounded-2xl bg-neutral-950 text-white md:my-10">
      <div className="grid items-stretch md:grid-cols-2">
        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[460px]">
          {product.image && (
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          )}
        </div>
        <div className="flex flex-col justify-between gap-10 p-8 md:p-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">
              Drop Spotlight
            </p>
            <h3 className="mt-4 text-3xl font-bold uppercase leading-tight tracking-tight md:text-5xl">
              {headline ?? "Built for cold mornings."}
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
              {product.description ||
                "A small-batch piece from the latest drop. Built with the people who actually wear it."}
            </p>
          </div>
          <Link
            href={`/shop/${product.slug}`}
            className="group inline-flex items-center justify-between gap-6 rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-white/90 md:w-fit"
          >
            <span>
              Shop {product.title} ·{" "}
              <span className="font-normal opacity-70">
                {formatPrice(product.priceCents)}
              </span>
            </span>
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
