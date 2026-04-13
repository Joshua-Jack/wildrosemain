// src/app/athletes/page.tsx
import type { Metadata } from 'next';
import { loadAllAthletes } from '@/lib/content/athletes';
import { AthleteCard } from '@/components/athlete/athlete-card';

export const metadata: Metadata = {
  title: 'Athletes',
  description: 'Meet the athletes of the Wild Rose Collective.',
};

export default async function AthletesPage() {
  const athletes = await loadAllAthletes();

  return (
    <div className="container px-4 py-12">
      <h1 className="text-4xl font-bold mb-2">The Team</h1>
      <p className="text-muted-foreground mb-8">
        Athletes, reserves, and recruits building the Wild Rose collective.
      </p>

      {athletes.length === 0 ? (
        <p className="text-muted-foreground">Team page coming soon.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {athletes.map((a) => (
            <AthleteCard key={a.slug} athlete={a} />
          ))}
        </div>
      )}
    </div>
  );
}
