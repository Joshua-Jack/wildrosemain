// src/lib/content/athletes.ts
import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { getSupabaseImageUrl } from '@/lib/images/get-supabase-url';
import {
  Athlete,
  AthleteFrontmatter,
  AthleteFrontmatterSchema,
} from './types';

const CONTENT_DIR = path.resolve(process.cwd(), 'content/athletes');

/**
 * Resolve the hero image and gallery for an athlete. Uses whatever is
 * explicitly set in the frontmatter first, then falls back to Supabase-hosted
 * files under `athletes/<slug>/…` when the corresponding "uploaded" flags are
 * flipped on. That way a content manager only has to
 *   1. drop a file in Supabase, and
 *   2. flip a boolean in the MDX,
 * to get athlete images live on the site.
 */
function hydrateImages(frontmatter: AthleteFrontmatter): AthleteFrontmatter {
  const out: AthleteFrontmatter = { ...frontmatter };

  if (!out.heroImage && out.heroUploaded) {
    out.heroImage = {
      src: getSupabaseImageUrl(`athletes/${out.slug}/hero.jpg`),
      alt: `${out.name} — Wild Rose Collective`,
    };
  }

  if (!out.gallery && out.galleryCount && out.galleryCount > 0) {
    out.gallery = Array.from({ length: out.galleryCount }, (_, i) => {
      const n = String(i + 1).padStart(2, '0');
      return {
        src: getSupabaseImageUrl(`athletes/${out.slug}/gallery-${n}.jpg`),
        alt: `${out.name} — photo ${i + 1}`,
      };
    });
  }

  return out;
}

export async function loadAthleteFromFile(filePath: string): Promise<Athlete> {
  const raw = await fs.readFile(filePath, 'utf8');
  const { data, content } = matter(raw);
  const parsed = AthleteFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `${i.path.join('.')}: ${i.message}`)
      .join('; ');
    throw new Error(
      `Invalid athlete frontmatter in ${path.basename(filePath)}: ${issues}`,
    );
  }
  return { ...hydrateImages(parsed.data), bodyMdx: content };
}

export async function loadAllAthletesFromDir(dir: string): Promise<Athlete[]> {
  const entries = await fs.readdir(dir);
  const mdxFiles = entries.filter((f) => f.endsWith('.mdx'));
  const athletes = await Promise.all(
    mdxFiles.map((f) => loadAthleteFromFile(path.join(dir, f))),
  );
  return athletes.sort((a, b) => a.name.localeCompare(b.name));
}

export async function loadAllAthletes(): Promise<Athlete[]> {
  return loadAllAthletesFromDir(CONTENT_DIR);
}

export async function loadAthleteBySlug(slug: string): Promise<Athlete | null> {
  const all = await loadAllAthletes();
  return all.find((a) => a.slug === slug) ?? null;
}

export async function loadAthleteSlugs(): Promise<string[]> {
  const all = await loadAllAthletes();
  return all.map((a) => a.slug);
}
