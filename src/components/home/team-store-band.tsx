import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TeamStoreBand() {
  return (
    <section className="bg-muted/30 pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-2xl border border-border bg-card px-6 py-10 md:px-12 md:py-14">
          <div className="grid items-center gap-8 md:grid-cols-[1.3fr_1fr_auto] md:gap-10">
            <h2 className="text-5xl font-bold uppercase leading-none tracking-tight md:text-7xl">
              Team Store
            </h2>

            <div className="max-w-sm">
              <p className="text-sm font-medium text-muted-foreground">
                What&apos;s a team store?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                A team store is a dedicated page where your team&apos;s gear
                lives online — members and fans can browse and buy directly.
                Take a look at one we&apos;ve built.
              </p>
            </div>

            <Button asChild size="lg" className="group md:self-auto">
              <Link
                href="/shop"
                className="inline-flex items-center gap-3"
              >
                Visit Royalty Fam team store
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
