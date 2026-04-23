"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Tracks whether the header should render in "solid" (dark text on light bg)
 * or "translucent" (light text floating over hero) state.
 *
 * Behavior:
 * - On pages that render a `[data-hero-end]` sentinel (the homepage), the
 *   header starts translucent and flips solid the moment the sentinel crosses
 *   the top of the viewport — so the nav floats over the full pinned hero.
 * - On all other pages (shop, athletes, detail pages, etc.), the header is
 *   solid from first paint so nav text stays visible against white content.
 */
export function useHeaderState(): { solid: boolean } {
  const pathname = usePathname();
  const [solid, setSolid] = useState(true);

  useEffect(() => {
    // Re-query the sentinel whenever the route changes — the SiteHeader
    // lives in the layout and doesn't remount, so without this the hook
    // would latch onto its first-mount state across navigations.
    const sentinel = document.querySelector<HTMLElement>("[data-hero-end]");
    if (!sentinel) {
      setSolid(true);
      return;
    }

    const update = () => {
      setSolid(sentinel.getBoundingClientRect().top <= 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  return { solid };
}
