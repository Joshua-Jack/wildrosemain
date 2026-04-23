"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Marquee } from "@/components/ui/marquee";
import { getSiteImageList } from "@/lib/images/get-site-image";

const ROW_A = getSiteImageList("contactRowA");
const ROW_B = getSiteImageList("contactRowB");

const SCRAMBLE_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

function ScrambleButton({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  const [text, setText] = useState(label);
  const [scrambling, setScrambling] = useState(false);

  const scramble = () => {
    if (scrambling) return;
    setScrambling(true);
    let iteration = 0;
    const max = label.length;
    const interval = setInterval(() => {
      setText(
        label
          .split("")
          .map((ch, i) =>
            i < iteration
              ? label[i]
              : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)],
          )
          .join(""),
      );
      if (iteration >= max) {
        clearInterval(interval);
        setText(label);
        setScrambling(false);
      }
      iteration += 1 / 3;
    }, 30);
  };

  return (
    <Link
      href={href}
      onMouseEnter={scramble}
      className="inline-flex items-center justify-center rounded-full bg-foreground px-8 py-3 font-semibold text-background transition hover:bg-foreground/90"
    >
      {text}
    </Link>
  );
}

export function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="text-sm font-medium text-muted-foreground">
              Get in touch
            </p>
            <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Want to be part of the collective?
            </h2>
            <p className="max-w-md text-base text-muted-foreground md:text-lg">
              Athletes, partners, anyone with a question — drop us a line and
              we&apos;ll get back to you.
            </p>
            <div className="pt-2">
              <ScrambleButton label="Contact Us" href="/#contact" />
            </div>
          </div>

          <div className="space-y-4 overflow-hidden">
            <Marquee speed={35} reverse className="[--gap:1rem]">
              {ROW_A.map((img, i) => (
                <div
                  key={i}
                  className="relative h-44 w-44 shrink-0 overflow-hidden rounded-2xl md:h-52 md:w-52"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="208px"
                    className="object-cover"
                  />
                </div>
              ))}
            </Marquee>
            <Marquee speed={35} className="[--gap:1rem]">
              {ROW_B.map((img, i) => (
                <div
                  key={i}
                  className="relative h-44 w-44 shrink-0 overflow-hidden rounded-2xl md:h-52 md:w-52"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="208px"
                    className="object-cover"
                  />
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}
