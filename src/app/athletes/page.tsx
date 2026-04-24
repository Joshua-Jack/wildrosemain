// src/app/athletes/page.tsx
import type { Metadata } from 'next';
import { loadAllAthletes } from '@/lib/content/athletes';
import { AthleteCard } from '@/components/athlete/athlete-card';
import type { Athlete, Tier } from '@/lib/content/types';

export const metadata: Metadata = {
  title: 'Athletes',
  description: 'Meet the athletes of the Wild Rose Collective.',
};

const TIER_ORDER: Tier[] = ['all-star', 'athlete', 'reserve', 'recruit'];

const TIER_LABEL: Record<Tier, string> = {
  'all-star': 'All Star',
  athlete: 'Athlete',
  reserve: 'Reserve',
  recruit: 'Recruit',
};

const TIER_BLURB: Record<Tier, string> = {
  'all-star': 'Pro tour — the sharpest end of the collective.',
  athlete: 'Year-round sponsored athletes repping the brand.',
  reserve: 'Regional competitors on deck for the next call-up.',
  recruit: 'Up-and-comers we have an eye on.',
};

function groupByTier(athletes: Athlete[]): Record<Tier, Athlete[]> {
  const out: Record<Tier, Athlete[]> = {
    'all-star': [],
    athlete: [],
    reserve: [],
    recruit: [],
  };
  for (const a of athletes) out[a.tier].push(a);
  return out;
}

export default async function AthletesPage() {
  const athletes = await loadAllAthletes();
  const groups = groupByTier(athletes);

  return (
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-16 md:pt-32 md:pb-24">
      <header className="mb-12 md:mb-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          The Team
        </p>
        <h1 className="mt-3 text-4xl font-bold uppercase tracking-tight md:text-5xl">
          Athletes of the collective
        </h1>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
          All-stars, athletes, reserves, and recruits — the people building
          Wild Rose with us.
        </p>
      </header>

      {athletes.length === 0 ? (
        <p className="text-muted-foreground">Team page coming soon.</p>
      ) : (
        <div className="space-y-16 md:space-y-20">
          {TIER_ORDER.map((tier) => {
            const list = groups[tier];
            if (list.length === 0) return null;
            return (
              <section key={tier}>
                <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-border pb-3 md:mb-8">
                  <div>
                    <h2 className="text-xl font-bold uppercase tracking-tight md:text-2xl">
                      {TIER_LABEL[tier]}
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground md:text-sm">
                      {TIER_BLURB[tier]}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {list.length}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((a) => (
                    <AthleteCard key={a.slug} athlete={a} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
