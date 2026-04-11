// src/lib/content/athletes.ts
import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import {
  Athlete,
  AthleteFrontmatterSchema,
} from './types';

const CONTENT_DIR = path.resolve(process.cwd(), 'content/athletes');

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
  return { ...parsed.data, bodyMdx: content };
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
