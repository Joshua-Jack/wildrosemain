"use client";

import { useHeaderState } from "@/hooks/use-header-state";
import { SiteLogo } from "./site-logo";
import { MainNav } from "./main-nav";
import { HeaderActions } from "./header-actions";
import { MobileMenu } from "./mobile-menu";

export function SiteHeader() {
  const { solid } = useHeaderState();
  const tone = solid ? "dark" : "light";
  const agencyUrl =
    process.env.NEXT_PUBLIC_AGENCY_SITE_URL ?? "https://wildroseathletics.com";

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex h-20 w-full max-w-[1400px] items-center justify-between gap-4 px-5 md:h-[84px] md:px-10">
        <SiteLogo tone={tone} />
        <div className="flex items-center gap-4 md:gap-8">
          <MainNav tone={tone} />
          <HeaderActions tone={tone} agencyUrl={agencyUrl} />
          <MobileMenu tone={tone} agencyUrl={agencyUrl} />
        </div>
      </div>
    </header>
  );
}
