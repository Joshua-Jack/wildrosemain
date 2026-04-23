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
        className="h-10 w-auto md:h-12"
      />
    </Link>
  );
}
