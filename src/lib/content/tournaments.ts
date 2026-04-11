// src/lib/content/tournaments.ts
import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import {
  Tournament,
  TournamentFrontmatterSchema,
} from './types';

const CONTENT_DIR = path.resolve(process.cwd(), 'content/tournaments');

export async function loadTournamentFromFile(
  filePath: string,
): Promise<Tournament> {
  const raw = await fs.readFile(filePath, 'utf8');
  const { data, content } = matter(raw);
  // gray-matter's default YAML loader parses unquoted `YYYY-MM-DD` into a
  // JS Date; our schema expects a string. Normalize before validation so
  // that authors can write `date: 2026-06-15` without quotes.
  if (data.date instanceof Date) {
    data.date = data.date.toISOString().slice(0, 10);
  }
  const parsed = TournamentFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `${i.path.join('.')}: ${i.message}`)
      .join('; ');
    throw new Error(
      `Invalid tournament frontmatter in ${path.basename(filePath)}: ${issues}`,
    );
  }
  return { ...parsed.data, bodyMdx: content };
}

export async function loadAllTournamentsFromDir(
  dir: string,
): Promise<Tournament[]> {
  const entries = await fs.readdir(dir);
  const mdxFiles = entries.filter((f) => f.endsWith('.mdx'));
  const all = await Promise.all(
    mdxFiles.map((f) => loadTournamentFromFile(path.join(dir, f))),
  );
  return all.sort((a, b) => a.date.localeCompare(b.date));
}

export async function loadAllTournaments(): Promise<Tournament[]> {
  return loadAllTournamentsFromDir(CONTENT_DIR);
}

export function filterUpcoming(tournaments: Tournament[]): Tournament[] {
  return tournaments.filter((t) => t.status === 'upcoming');
}

export async function loadUpcomingTournaments(): Promise<Tournament[]> {
  return filterUpcoming(await loadAllTournaments());
}
