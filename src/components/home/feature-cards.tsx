import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getSiteImageOne } from "@/lib/images/get-site-image";

const team = getSiteImageOne("featureTeam");
const tournaments = getSiteImageOne("featureTournaments");

const CARDS = [
  {
    label: "The Team",
    description: "Athletes built on grit and good company.",
    href: "/athletes",
    image: team.src,
    alt: team.alt,
  },
  {
    label: "Tournaments",
    description: "Where the collective shows up and shows out.",
    href: "/#tournaments",
    image: tournaments.src,
    alt: tournaments.alt,
  },
];

export function FeatureCards() {
  return (
    <section className="bg-background py-14 md:py-20">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {CARDS.map((c) => (
            <Link
              key={c.label}
              href={c.href}
              className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-900 md:aspect-[4/3]"
            >
              <Image
                src={c.image}
                alt={c.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
                <div className="text-white">
                  <p className="text-3xl font-bold uppercase tracking-tight md:text-5xl">
                    {c.label}
                  </p>
                  <p className="mt-2 max-w-xs text-sm text-white/80 md:text-base">
                    {c.description}
                  </p>
                </div>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-neutral-950 transition group-hover:translate-x-1 md:h-14 md:w-14">
                  <ArrowRight className="h-5 w-5 md:h-6 md:w-6" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
