"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "./nav-links";

type Props = {
  tone: "light" | "dark";
};

export function MainNav({ tone }: Props) {
  const pathname = usePathname();

  const base =
    tone === "light" ? "text-white/85 hover:text-white" : "text-foreground/75 hover:text-foreground";
  const activeColor = tone === "light" ? "text-white" : "text-foreground";
  const underline = tone === "light" ? "bg-white" : "bg-foreground";

  return (
    <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
      {NAV_LINKS.map((link) => {
        const isRoute =
          link.href.startsWith("/") && !link.href.includes("#");
        const active =
          isRoute &&
          (link.href === "/"
            ? pathname === "/"
            : pathname.startsWith(link.href));
        return (
          <Link
            key={link.href}
            href={link.href}
            className={[
              "group relative text-sm font-medium transition-colors",
              active ? activeColor : base,
            ].join(" ")}
          >
            {link.label}
            <span
              aria-hidden
              className={[
                "absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
                underline,
                active ? "scale-x-100" : "",
              ].join(" ")}
            />
          </Link>
        );
      })}
    </nav>
  );
}
