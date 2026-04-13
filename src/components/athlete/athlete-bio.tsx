// src/components/athlete/athlete-bio.tsx
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { Athlete } from '@/lib/content/types';

export function AthleteBio({ athlete }: { athlete: Athlete }) {
  return (
    <section className="container px-4 py-8 max-w-3xl">
      <div className="prose prose-lg">
        <MDXRemote source={athlete.bodyMdx} />
      </div>
    </section>
  );
}
