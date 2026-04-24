// src/app/athletes/[slug]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  loadAthleteBySlug,
  loadAthleteSlugs,
} from '@/lib/content/athletes';
import { AthleteHero } from '@/components/athlete/athlete-hero';
import { AthleteBio } from '@/components/athlete/athlete-bio';
import { AthleteStats } from '@/components/athlete/athlete-stats';
import { AthleteGallery } from '@/components/athlete/athlete-gallery';

export async function generateStaticParams() {
  const slugs = await loadAthleteSlugs();
  return slugs.map((slug) => ({ slug }));
}

type RouteParams = { slug: string };

export async function generateMetadata(
  { params }: { params: Promise<RouteParams> },
): Promise<Metadata> {
  const { slug } = await params;
  const athlete = await loadAthleteBySlug(slug);
  if (!athlete) return { title: 'Not found' };
  return {
    title: athlete.name,
    description: athlete.tagline ?? `${athlete.name} — Wild Rose Collective`,
    openGraph: {
      title: athlete.name,
      description: athlete.tagline ?? `${athlete.name} — Wild Rose Collective`,
      images: athlete.heroImage?.src ? [athlete.heroImage.src] : undefined,
    },
  };
}

export default async function AthleteProfilePage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const athlete = await loadAthleteBySlug(slug);
  if (!athlete) notFound();

  return (
    <>
      <AthleteHero athlete={athlete} />
      <AthleteBio athlete={athlete} />
      <AthleteStats athlete={athlete} />
      <AthleteGallery athlete={athlete} />
    </>
  );
}
