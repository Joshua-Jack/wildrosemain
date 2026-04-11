import Link from 'next/link';
import { NAV_LINKS } from './nav-links';
import { Button } from '@/components/ui/button';
import { CartIconButton } from '@/components/cart/cart-icon-button';

export function SiteHeader() {
  const agencyUrl =
    process.env.NEXT_PUBLIC_AGENCY_SITE_URL ?? 'https://wildroseathletics.com';

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Wild Rose
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <a href={agencyUrl} target="_blank" rel="noopener noreferrer">
              Need custom gear?
            </a>
          </Button>
          <CartIconButton />
        </div>
      </div>
    </header>
  );
}
