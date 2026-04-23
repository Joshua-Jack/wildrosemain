"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: string[];
  alt: string;
  highlightBadge?: string;
};

export function ProductGallery({ images, alt, highlightBadge }: Props) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];
  const hasThumbs = images.length > 1;

  const step = (dir: -1 | 1) => {
    if (!hasThumbs) return;
    setActive((i) => (i + dir + images.length) % images.length);
  };

  return (
    <div className="flex gap-3 md:gap-4">
      {/* Vertical thumbnail rail — desktop only */}
      {hasThumbs && (
        <div className="hidden w-20 shrink-0 flex-col gap-2 md:flex">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-pressed={i === active}
              className={[
                "relative aspect-square overflow-hidden rounded-lg border bg-[#f3f3f1] transition",
                i === active
                  ? "border-foreground"
                  : "border-transparent hover:border-foreground/40",
              ].join(" ")}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="80px"
                className="object-contain p-1.5"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main image card */}
      <div className="flex-1">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#f3f3f1] md:rounded-3xl">
          {current && (
            <Image
              src={current}
              alt={alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain p-6 md:p-10"
              priority
            />
          )}

          {highlightBadge && (
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-background">
              <span aria-hidden>★</span>
              {highlightBadge}
            </span>
          )}

          {hasThumbs && (
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous image"
                onClick={() => step(-1)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground shadow-sm backdrop-blur transition hover:bg-background"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={() => step(1)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground shadow-sm backdrop-blur transition hover:bg-background"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Horizontal thumbnail strip — mobile only */}
        {hasThumbs && (
          <div className="mt-3 grid grid-cols-5 gap-2 md:hidden">
            {images.slice(0, 5).map((src, i) => (
              <button
                key={`m-${src}`}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                aria-pressed={i === active}
                className={[
                  "relative aspect-square overflow-hidden rounded-lg border bg-[#f3f3f1] transition",
                  i === active
                    ? "border-foreground"
                    : "border-transparent hover:border-foreground/40",
                ].join(" ")}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-contain p-1"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
