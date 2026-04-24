"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ArrowUpRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_LINKS } from "./nav-links";

type Props = {
  tone: "light" | "dark";
  agencyUrl: string;
};

export function MobileMenu({ tone, agencyUrl }: Props) {
  const [open, setOpen] = useState(false);
  const triggerColor =
    tone === "light" ? "text-white hover:text-white" : "text-foreground";

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open menu"
        className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition md:hidden ${triggerColor}`}
      >
        <Menu className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex !w-full flex-col gap-0 bg-background p-0 sm:!w-3/4 sm:max-w-sm"
      >
        <SheetHeader className="border-b border-border px-6 py-4">
          <SheetTitle className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Menu
          </SheetTitle>
        </SheetHeader>

        <nav className="flex-1 overflow-y-auto px-6 py-8">
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3 py-4 text-2xl font-bold uppercase tracking-tight text-foreground transition hover:bg-muted"
                >
                  {link.label}
                  <span
                    aria-hidden
                    className="text-sm font-medium text-muted-foreground"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 border-t border-border pt-6">
            <p className="px-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              More
            </p>
            <ul className="mt-3 space-y-1">
              <li>
                <a
                  href={agencyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-foreground transition hover:bg-muted"
                >
                  Custom gear
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
