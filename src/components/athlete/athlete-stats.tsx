// src/components/athlete/athlete-stats.tsx
import type { Athlete } from '@/lib/content/types';

export function AthleteStats({ athlete }: { athlete: Athlete }) {
  const stats = athlete.stats;
  if (!stats) return null;
  const hasAny =
    stats.pdgaRating !== undefined ||
    stats.tourStops !== undefined ||
    (stats.highlights && stats.highlights.length > 0);
  if (!hasAny) return null;

  return (
    <section className="container px-4 py-8 max-w-3xl">
      <h2 className="text-2xl font-bold mb-4">Stats & Highlights</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.pdgaRating !== undefined && (
          <div className="rounded-lg border p-4">
            <div className="text-sm text-muted-foreground">PDGA rating</div>
            <div className="text-2xl font-bold">{stats.pdgaRating}</div>
          </div>
        )}
        {stats.tourStops !== undefined && (
          <div className="rounded-lg border p-4">
            <div className="text-sm text-muted-foreground">Tour stops</div>
            <div className="text-2xl font-bold">{stats.tourStops}</div>
          </div>
        )}
      </div>
      {stats.highlights && stats.highlights.length > 0 && (
        <ul className="mt-6 space-y-2">
          {stats.highlights.map((h) => (
            <li key={h} className="text-sm">• {h}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
