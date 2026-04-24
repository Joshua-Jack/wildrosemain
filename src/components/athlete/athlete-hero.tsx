// src/components/athlete/athlete-hero.tsx
import Image from 'next/image';
import type { Athlete } from '@/lib/content/types';
import { Badge } from '@/components/ui/badge';

export function AthleteHero({ athlete }: { athlete: Athlete }) {
  const hasImage = !!athlete.heroImage?.src;

  return (
    <section className="relative">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
        {hasImage ? (
          <Image
            src={athlete.heroImage!.src}
            alt={athlete.heroImage!.alt}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted to-muted/60" />
        )}
      </div>
      <div className="container px-4 py-8">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <Badge variant="outline" className="capitalize">
            {athlete.tier.replace('-', ' ')}
          </Badge>
          {athlete.role && (
            <span className="text-sm text-muted-foreground">{athlete.role}</span>
          )}
          {athlete.hometown && (
            <span className="text-sm text-muted-foreground">
              {athlete.hometown}
            </span>
          )}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {athlete.name}
        </h1>
        {athlete.tagline && (
          <p className="text-lg text-muted-foreground mt-3 max-w-2xl">
            {athlete.tagline}
          </p>
        )}
      </div>
    </section>
  );
}
