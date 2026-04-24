"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FullScreenScrollFX } from "@/components/ui/full-screen-scroll-fx";
import {
  getSiteImageList,
  getSiteImageOne,
} from "@/lib/images/get-site-image";

const shopImages = getSiteImageList("heroShop");
const teamImages = getSiteImageList("heroTeam");
const collectiveBg = getSiteImageOne("heroCollective").src;

const pickImage = (list: typeof shopImages, i: number) =>
  list[i]?.src ?? list[0]?.src ?? "";

const SHOP_TILES = [
  {
    image: pickImage(shopImages, 0),
    label: "Headwear",
    tone: "accent" as const,
    area: "feature" as const,
    href: "/shop?category=headwear",
  },
  {
    image: pickImage(shopImages, 1),
    label: "Tops",
    tone: "light" as const,
    area: "smallA" as const,
    href: "/shop?category=tops",
  },
  {
    image: pickImage(shopImages, 2),
    label: "Outerwear",
    tone: "dark" as const,
    area: "tall" as const,
    href: "/shop?category=outerwear",
  },
  {
    image: pickImage(shopImages, 3),
    label: "Bottoms & Accessories",
    tone: "light" as const,
    area: "smallB" as const,
    href: "/shop?category=bottoms-accessories",
  },
];

const TEAM_TILES = [
  {
    image: pickImage(teamImages, 0),
    area: "feature" as const,
    href: "/athletes",
  },
  {
    image: pickImage(teamImages, 1),
    area: "smallA" as const,
    href: "/athletes",
  },
  {
    image: pickImage(teamImages, 2),
    area: "smallC" as const,
    href: "/athletes",
  },
  {
    image: pickImage(teamImages, 3),
    area: "smallB" as const,
    href: "/athletes",
  },
  {
    image: pickImage(teamImages, 4),
    area: "smallD" as const,
    href: "/athletes",
  },
];

type Tile = {
  image: string;
  label?: string;
  name?: string;
  role?: string;
  tone?: "accent" | "dark" | "light";
  area: "feature" | "smallA" | "smallB" | "smallC" | "smallD" | "tall";
  href: string;
};

function BentoGrid({
  active,
  tiles,
  layout = "bento",
}: {
  active: boolean;
  tiles: Tile[];
  layout?: "bento" | "uniform";
}) {
  const isUniform = layout === "uniform";
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-700 ${active ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    >
      <div className="absolute inset-0 bg-black" />
      {/* Top scrim — keeps the floating nav readable over light bento imagery */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-32 bg-gradient-to-b from-black/70 via-black/30 to-transparent"
      />
      <div
        className="absolute inset-0 grid gap-2 p-4 md:gap-3 md:p-10"
        style={
          isUniform
            ? {
                gridTemplateColumns: `repeat(${tiles.length}, 1fr)`,
                gridTemplateRows: "1fr",
              }
            : {
                gridTemplateColumns: "repeat(12, 1fr)",
                gridTemplateRows: "repeat(2, 1fr)",
              }
        }
      >
        {tiles.map((t, i) => {
          const col = isUniform
            ? ""
            : t.area === "feature"
              ? "col-span-12 row-span-2 md:col-span-6"
              : t.area === "tall"
                ? "col-span-6 row-span-2 md:col-span-3 md:col-start-10"
                : t.area === "smallA"
                  ? "col-span-6 md:col-span-3 md:col-start-7"
                  : t.area === "smallB"
                    ? "col-span-6 md:col-span-3 md:col-start-7"
                    : t.area === "smallC"
                      ? "col-span-6 md:col-span-3 md:col-start-10"
                      : "col-span-6 md:col-span-3 md:col-start-10";
          const overlay =
            t.tone === "accent"
              ? "bg-gradient-to-br from-[#6c7a3a]/80 via-[#6c7a3a]/40 to-transparent"
              : t.tone === "dark"
                ? "bg-gradient-to-tr from-black/80 via-black/40 to-transparent"
                : "bg-gradient-to-t from-black/65 via-black/20 to-transparent";
          return (
            <a
              key={i}
              href={t.href}
              className={`relative block overflow-hidden rounded-xl md:rounded-2xl ${col}`}
              style={{
                backgroundImage: `url(${t.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className={`absolute inset-0 ${overlay}`} />
              {(t.name || t.role || t.label) && (
                <div className="relative flex h-full flex-col justify-end p-3 md:p-5">
                  {t.name && (
                    <p className="font-bold text-white leading-tight text-sm md:text-lg">
                      {t.name}
                    </p>
                  )}
                  {(t.role ?? t.label) && (
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/85 md:text-xs">
                      {t.role ?? t.label}
                    </p>
                  )}
                </div>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}

const SECTIONS = [
  {
    id: "collective",
    background: collectiveBg,
    leftLabel: "01 / The Collective",
    title: <></>,
  },
  {
    id: "shop",
    background: "",
    leftLabel: "02 / The Shop",
    title: <></>,
    renderBackground: (active: boolean) => (
      <BentoGrid active={active} tiles={SHOP_TILES} />
    ),
  },
  {
    id: "team",
    background: "",
    leftLabel: "03 / The Team",
    title: <></>,
    renderBackground: (active: boolean) => (
      <BentoGrid active={active} tiles={TEAM_TILES} layout="uniform" />
    ),
  },
];

function MobileHero() {
  return (
    <section className="relative h-[88svh] min-h-[560px] w-full overflow-hidden bg-neutral-950 text-white">
      <Image
        src={collectiveBg}
        alt="Wild Rose Collective"
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />
      <div className="relative flex h-full flex-col justify-end px-6 pb-12 pt-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
          Wild Rose Collective
        </p>
        <h1 className="mt-3 text-[40px] font-black uppercase leading-[0.95] tracking-tight">
          Athletes.
          <br />
          Built for.
          <br />
          Together.
        </h1>
        <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/75">
          Apparel, headwear, and gear made with the collective. New drops
          every season.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link
            href="/shop"
            className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition active:scale-[0.98]"
          >
            Shop the drops →
          </Link>
          <Link
            href="/athletes"
            className="inline-flex items-center rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white/90 transition active:scale-[0.98]"
          >
            Meet the team
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Hero() {
  const [index, setIndex] = useState(0);
  const hideFrame = index === 1 || index === 2;

  return (
    <>
      {/* Mobile: simple, single-screen hero with CTAs. */}
      <div className="md:hidden">
        <MobileHero />
      </div>

      {/* Desktop / tablet: full scroll-snap narrative hero. */}
      <div className={`hidden md:block ${hideFrame ? "hero-hide-frame" : ""}`}>
        <FullScreenScrollFX
          sections={SECTIONS}
          header={<span className="block">Wild Rose</span>}
          footer={<span className="block">Athletics</span>}
          showProgress={false}
          durations={{ change: 0.7, snap: 800 }}
          pinDurationVh={40}
          onIndexChange={setIndex}
        />
      </div>
      <style jsx global>{`
        .fx-end {
          display: none !important;
        }
        .fx-right {
          display: none !important;
        }
        /* Push the hero header text below the fixed site nav (~72px) */
        .fx-header {
          padding-top: clamp(96px, 12vh, 160px) !important;
        }
        .fx-footer {
          padding-bottom: clamp(48px, 6vh, 96px) !important;
        }
        .fx-content {
          grid-template-columns: 1fr 1.3fr !important;
        }
        @media (max-width: 900px) {
          .fx-content {
            grid-template-columns: 1fr !important;
          }
        }
        .fx-header,
        .fx-footer-title {
          transition: opacity 0.5s ease;
        }
        .hero-hide-frame .fx-header,
        .hero-hide-frame .fx-footer-title,
        .hero-hide-frame .fx-progress {
          opacity: 0;
          pointer-events: none;
        }
        .fx-progress {
          transition: opacity 0.5s ease;
        }
      `}</style>
    </>
  );
}
