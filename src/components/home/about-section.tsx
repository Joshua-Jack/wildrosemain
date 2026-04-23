import Image from "next/image";
import { getSiteImageOne } from "@/lib/images/get-site-image";

export function AboutSection() {
  const main = getSiteImageOne("aboutMain");
  const accentA = getSiteImageOne("aboutAccentA");
  const accentB = getSiteImageOne("aboutAccentB");

  return (
    <section className="bg-background py-14 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1fr_1.1fr] md:gap-14">
        <div className="flex flex-col">
          <p className="text-sm font-medium text-muted-foreground">About Us</p>
          <h2 className="mt-4 text-2xl font-bold uppercase leading-tight tracking-tight md:text-3xl">
            Sport — driving excellence in sports with innovation,{" "}
            <span className="text-muted-foreground">passion,</span> and
            unmatched dedication.
          </h2>
          <p className="mt-6 max-w-prose text-sm leading-relaxed text-muted-foreground md:text-base">
            At Wild Rose Collective, we believe sport is more than a game — it
            connects, creates, and carries people forward. Our collective is
            built by athletes, for athletes, delivering considered gear and a
            real community alongside it. From weekend warriors to seasoned
            competitors, we stand alongside you in pursuit of better.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted md:rounded-2xl">
              <Image
                src={accentA.src}
                alt={accentA.alt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted md:rounded-2xl">
              <Image
                src={accentB.src}
                alt={accentB.alt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted md:aspect-auto md:min-h-[520px]">
          <Image
            src={main.src}
            alt={main.alt}
            fill
            sizes="(min-width: 768px) 55vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
