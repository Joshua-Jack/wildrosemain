// src/components/athlete/athlete-card.tsx
import Image from 'next/image';
import Link from 'next/link';
import type { Athlete } from '@/lib/content/types';
import { Badge } from '@/components/ui/badge';

export function AthleteCard({ athlete }: { athlete: Athlete }) {
  const hasImage = !!athlete.heroImage?.src;
  const initials = athlete.name
    .split(' ')
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <Link
      href={`/athletes/${athlete.slug}`}
      className="group block overflow-hidden rounded-lg border bg-card transition hover:border-foreground/30"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        {hasImage ? (
          <Image
            src={athlete.heroImage!.src}
            alt={athlete.heroImage!.alt}
            width={600}
            height={800}
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-muted/50">
            <span className="text-3xl font-bold tracking-tight text-muted-foreground/60">
              {initials}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="truncate font-bold">{athlete.name}</h3>
          <Badge variant="outline" className="shrink-0 capitalize">
            {athlete.tier.replace('-', ' ')}
          </Badge>
        </div>
        {athlete.role && (
          <p className="mt-1 text-sm text-muted-foreground">{athlete.role}</p>
        )}
        {athlete.tagline && (
          <p className="mt-2 line-clamp-2 text-sm">{athlete.tagline}</p>
        )}
      </div>
    </Link>
  );
}
