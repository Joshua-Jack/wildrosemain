import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NewsletterForm } from "./newsletter-form";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" />
    </svg>
  );
}

const NAV = [
  { label: "Shop", href: "/shop" },
];

const RESOURCES = [
  { label: "Custom gear", href: "https://wildroseathletics.com" },
  { label: "Newsletter", href: "/#contact" },
  { label: "Contact", href: "/#contact" },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-neutral-950 text-white">
      <div className="mx-auto max-w-[1400px] px-6 pt-20 pb-10 md:px-10 md:pt-28">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <p className="text-sm font-medium text-white/60">
              Wild Rose Collective
            </p>
            <h3 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              A collective for athletes
              <br />
              and the people behind them.
            </h3>
            <div className="mt-8 max-w-sm">
              <p className="text-sm text-white/60">
                Get drops, tournament dates, and athlete news.
              </p>
              <div className="mt-3">
                <NewsletterForm />
              </div>
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              Navigate
            </p>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="text-base text-white/85 transition hover:text-white"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              More
            </p>
            <ul className="mt-4 space-y-2.5">
              {RESOURCES.map((r) => (
                <li key={r.label}>
                  <Link
                    href={r.href}
                    className="inline-flex items-center gap-1.5 text-base text-white/85 transition hover:text-white"
                  >
                    {r.label}
                    {r.href.startsWith("http") && (
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-white hover:text-white"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 flex items-end justify-between gap-6 border-t border-white/10 pt-8 md:mt-28">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Wild Rose Collective. Portland, OR.
          </p>
          <p className="text-xs text-white/50">Built by athletes.</p>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none select-none px-2 pb-4 md:px-6"
      >
        <p className="text-center font-bold uppercase leading-none tracking-tight text-white/[0.06] [font-size:clamp(4rem,18vw,18rem)]">
          Wild Rose
        </p>
      </div>
    </footer>
  );
}
