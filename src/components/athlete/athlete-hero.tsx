// src/components/athlete/athlete-hero.tsx
import Image from 'next/image';
import type { Athlete } from '@/lib/content/types';
import { Badge } from '@/components/ui/badge';

export function AthleteHero({ athlete }: { athlete: Athlete }) {
  const hasImage = !!athlete.heroImage?.src;

  return (
    <section className="pt-24 pb-10 md:pt-32 md:pb-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-12">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted md:aspect-[3/4]">
            {hasImage ? (
              <Image
                src={athlete.heroImage!.src}
                alt={athlete.heroImage!.alt}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted to-muted/60" />
            )}
          </div>

          <div>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <Badge variant="outline" className="capitalize">
                {athlete.tier.replace('-', ' ')}
              </Badge>
              {athlete.role && (
                <span className="text-sm text-muted-foreground">
                  {athlete.role}
                </span>
              )}
              {athlete.hometown && (
                <span className="text-sm text-muted-foreground">
                  {athlete.hometown}
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              {athlete.name}
            </h1>
            {athlete.tagline && (
              <p className="mt-4 max-w-prose text-base text-muted-foreground md:text-lg">
                {athlete.tagline}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
