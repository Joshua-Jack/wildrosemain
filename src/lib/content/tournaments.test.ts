import { describe, it, expect } from 'vitest';
import path from 'node:path';
import {
  loadTournamentFromFile,
  loadAllTournamentsFromDir,
  filterUpcoming,
} from './tournaments';

const FIXTURE_DIR = path.resolve(__dirname, '__fixtures__/tournaments');

describe('loadTournamentFromFile', () => {
  it('parses a valid upcoming tournament', async () => {
    const t = await loadTournamentFromFile(
      path.join(FIXTURE_DIR, 'upcoming.mdx'),
    );
    expect(t.name).toBe('Blue Lake Open');
    expect(t.status).toBe('upcoming');
    expect(t.date).toBe('2026-06-15');
  });
});

describe('loadAllTournamentsFromDir', () => {
  it('returns all tournaments sorted by date ascending', async () => {
    const all = await loadAllTournamentsFromDir(FIXTURE_DIR);
    expect(all).toHaveLength(2);
    expect(all[0]?.date).toBe('2025-09-10');
    expect(all[1]?.date).toBe('2026-06-15');
  });
});

describe('filterUpcoming', () => {
  it('returns only upcoming-status tournaments', async () => {
    const all = await loadAllTournamentsFromDir(FIXTURE_DIR);
    const upcoming = filterUpcoming(all);
    expect(upcoming.map((t) => t.slug)).toEqual(['2026-blue-lake-open']);
  });
});
