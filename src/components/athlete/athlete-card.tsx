// src/components/athlete/athlete-card.tsx
import Image from 'next/image';
import Link from 'next/link';
import type { Athlete } from '@/lib/content/types';
import { Badge } from '@/components/ui/badge';

export function AthleteCard({ athlete }: { athlete: Athlete }) {
  return (
    <Link
      href={`/athletes/${athlete.slug}`}
      className="group block overflow-hidden rounded-lg border bg-card"
    >
      <div className="aspect-[3/4] overflow-hidden bg-muted">
        <Image
          src={athlete.heroImage.src}
          alt={athlete.heroImage.alt}
          width={600}
          height={800}
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold">{athlete.name}</h3>
          <Badge variant="outline" className="capitalize">
            {athlete.tier}
          </Badge>
        </div>
        {athlete.role && (
          <p className="text-sm text-muted-foreground mt-1">{athlete.role}</p>
        )}
        {athlete.tagline && (
          <p className="text-sm mt-2 line-clamp-2">{athlete.tagline}</p>
        )}
      </div>
    </Link>
  );
}
