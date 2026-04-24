import Image from "next/image";
import Link from "next/link";

type Props = {
  /** "light" = over-hero (use white logo); "dark" = on regular page (use black logo). */
  tone: "light" | "dark";
};

export function SiteLogo({ tone }: Props) {
  const src = tone === "light" ? "/logo-white.png" : "/logo-black.png";

  return (
    <Link
      href="/"
      aria-label="Wild Rose Athletics — home"
      className="flex items-center"
    >
      <Image
        src={src}
        alt="Wild Rose Athletics"
        width={1200}
        height={600}
        priority
        // Width-based sizing so the black and white logos render at the
        // same visual size despite different aspect ratios (black = 2.02,
        // white = 1.39). Height stays auto.
        className="h-auto w-[80px] md:w-[96px]"
      />
    </Link>
  );
}
