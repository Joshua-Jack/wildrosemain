import Link from 'next/link';
import { NewsletterForm } from './newsletter-form';

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30 mt-24">
      <div className="container px-4 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="font-bold text-lg">Wild Rose Collective</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Portland, OR. Built by athletes.
          </p>
        </div>

        <div>
          <h3 className="font-bold">Newsletter</h3>
          <p className="text-sm text-muted-foreground mt-2 mb-3">
            Drops, tournament dates, athlete news.
          </p>
          <NewsletterForm />
        </div>

        <div>
          <h3 className="font-bold">Navigate</h3>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            <li><Link href="/athletes">Athletes</Link></li>
            <li><Link href="/shop">Shop</Link></li>
            <li><Link href="/#tournaments">Tournaments</Link></li>
            <li><Link href="/#story">Story</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="container px-4 py-4 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Wild Rose Collective.
        </div>
      </div>
    </footer>
  );
}
