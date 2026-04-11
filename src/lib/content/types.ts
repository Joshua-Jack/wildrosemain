// src/lib/content/types.ts
import { z } from 'zod';

export const TierSchema = z.enum(['athlete', 'reserve', 'recruit']);
export type Tier = z.infer<typeof TierSchema>;

export const SocialsSchema = z.object({
  instagram: z.string().url().optional(),
  twitter: z.string().url().optional(),
  youtube: z.string().url().optional(),
  website: z.string().url().optional(),
});

export const AthleteStatsSchema = z.object({
  pdgaRating: z.number().optional(),
  tourStops: z.number().optional(),
  highlights: z.array(z.string()).optional(),
});

export const AthleteFrontmatterSchema = z.object({
  name: z.string(),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'slug must be kebab-case'),
  tier: TierSchema,
  shopifyTag: z.string().min(1, 'shopifyTag is required (used to query gear)'),
  hometown: z.string().optional(),
  role: z.string().optional(),
  tagline: z.string().optional(),
  heroImage: z.object({
    src: z.string().min(1),
    alt: z.string().min(1, 'heroImage.alt is required for accessibility'),
  }),
  socials: SocialsSchema.optional(),
  stats: AthleteStatsSchema.optional(),
  gallery: z
    .array(
      z.object({
        src: z.string().min(1),
        alt: z.string().min(1),
      }),
    )
    .optional(),
});

export type AthleteFrontmatter = z.infer<typeof AthleteFrontmatterSchema>;

export type Athlete = AthleteFrontmatter & {
  bodyMdx: string;
};

export const TournamentFrontmatterSchema = z.object({
  name: z.string(),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'slug must be kebab-case'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be YYYY-MM-DD'),
  location: z.string(),
  format: z.string(),
  registrationUrl: z.string().url().optional(),
  playerPackProductHandle: z.string().optional(),
  status: z.enum(['upcoming', 'past']),
});

export type TournamentFrontmatter = z.infer<typeof TournamentFrontmatterSchema>;

export type Tournament = TournamentFrontmatter & {
  bodyMdx: string;
};
