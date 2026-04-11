import { describe, it, expect } from 'vitest';
import path from 'node:path';
import {
  loadAthleteFromFile,
  loadAllAthletesFromDir,
} from './athletes';

const FIXTURE_DIR = path.resolve(__dirname, '__fixtures__/athletes');

describe('loadAthleteFromFile', () => {
  it('parses valid frontmatter and body', async () => {
    const athlete = await loadAthleteFromFile(
      path.join(FIXTURE_DIR, 'valid.mdx'),
    );
    expect(athlete.name).toBe('Test Athlete');
    expect(athlete.slug).toBe('test-athlete');
    expect(athlete.tier).toBe('athlete');
    expect(athlete.shopifyTag).toBe('athlete:test-athlete');
    expect(athlete.heroImage.alt).toBe('Test Athlete portrait');
    expect(athlete.bodyMdx).toContain('This is the **bio** content in MDX.');
  });

  it('throws a clear error when required fields are missing', async () => {
    await expect(
      loadAthleteFromFile(path.join(FIXTURE_DIR, 'invalid-missing-tag.mdx')),
    ).rejects.toThrow(/shopifyTag/);
  });
});

describe('loadAllAthletesFromDir', () => {
  it('loads only valid files and returns them sorted by name', async () => {
    // Only the "valid" file should successfully load; the invalid one should throw.
    await expect(loadAllAthletesFromDir(FIXTURE_DIR)).rejects.toThrow(/shopifyTag/);
  });
});
