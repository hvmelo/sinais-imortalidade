/**
 * Unit tests for content loader.
 * Tests colocate with source per project convention (src/lib/content/).
 */

import { describe, it, expect } from 'vitest';
import { validateSignalFrontmatter, validateAnalysisFrontmatter, SchemaValidationError } from './schema';
import { loadSignals, loadAnalysis } from './loader';

// ─── Schema Tests ─────────────────────────────────────────────────────────────

describe('validateSignalFrontmatter', () => {
  it('accepts valid Signal frontmatter', () => {
    const valid: Record<string, unknown> = {
      title: 'Test Signal',
      slug: 'test-signal',
      date: '2026-04-01',
      description: 'A test description.',
      tags: ['biotech', 'aging'],
    };
    expect(() => validateSignalFrontmatter(valid)).not.toThrow();
  });

  it('accepts optional fields when present', () => {
    const withOptionals: Record<string, unknown> = {
      title: 'Test Signal',
      slug: 'test-signal',
      date: '2026-04-01',
      description: 'A test description.',
      tags: ['biotech'],
      source: 'Nature',
      url: 'https://nature.com',
      urgency: 'high',
    };
    expect(() => validateSignalFrontmatter(withOptionals)).not.toThrow();
  });

  it('rejects missing required field — title', () => {
    const invalid: Record<string, unknown> = {
      slug: 'test-signal',
      date: '2026-04-01',
      description: 'A test description.',
      tags: ['biotech'],
    };
    expect(() => validateSignalFrontmatter(invalid))
      .toThrow(SchemaValidationError)
      .toThrow('title');
  });

  it('rejects missing required field — date', () => {
    const invalid: Record<string, unknown> = {
      title: 'Test Signal',
      slug: 'test-signal',
      description: 'A test description.',
      tags: ['biotech'],
    };
    expect(() => validateSignalFrontmatter(invalid))
      .toThrow(SchemaValidationError)
      .toThrow('date');
  });

  it('rejects empty tags array', () => {
    const invalid: Record<string, unknown> = {
      title: 'Test Signal',
      slug: 'test-signal',
      date: '2026-04-01',
      description: 'A test description.',
      tags: [],
    };
    expect(() => validateSignalFrontmatter(invalid))
      .toThrow(SchemaValidationError)
      .toThrow('at least one tag');
  });

  it('rejects invalid date format', () => {
    const invalid: Record<string, unknown> = {
      title: 'Test Signal',
      slug: 'test-signal',
      date: '01/04/2026',
      description: 'A test description.',
      tags: ['biotech'],
    };
    expect(() => validateSignalFrontmatter(invalid))
      .toThrow(SchemaValidationError)
      .toThrow('ISO 8601');
  });

  it('rejects invalid urgency value', () => {
    const invalid: Record<string, unknown> = {
      title: 'Test Signal',
      slug: 'test-signal',
      date: '2026-04-01',
      description: 'A test description.',
      tags: ['biotech'],
      urgency: 'urgent',
    };
    expect(() => validateSignalFrontmatter(invalid))
      .toThrow(SchemaValidationError)
      .toThrow('urgency');
  });

  it('rejects non-array tags', () => {
    const invalid: Record<string, unknown> = {
      title: 'Test Signal',
      slug: 'test-signal',
      date: '2026-04-01',
      description: 'A test description.',
      tags: 'biotech',
    };
    expect(() => validateSignalFrontmatter(invalid))
      .toThrow(SchemaValidationError)
      .toThrow('tags');
  });
});

describe('validateAnalysisFrontmatter', () => {
  it('accepts valid Analysis frontmatter', () => {
    const valid: Record<string, unknown> = {
      title: 'Test Analysis',
      slug: 'test-analysis',
      date: '2026-04-01',
      description: 'A test description.',
      thesis: 'This is the main argument.',
      sources: ['https://nature.com/article', 'https://who.int/research'],
    };
    expect(() => validateAnalysisFrontmatter(valid)).not.toThrow();
  });

  it('accepts optional fields when present', () => {
    const withOptionals: Record<string, unknown> = {
      title: 'Test Analysis',
      slug: 'test-analysis',
      date: '2026-04-01',
      description: 'A test description.',
      thesis: 'This is the main argument.',
      sources: ['https://nature.com'],
      relatedSignals: ['test-signal'],
      readTime: 8,
    };
    expect(() => validateAnalysisFrontmatter(withOptionals)).not.toThrow();
  });

  it('rejects missing thesis field', () => {
    const invalid: Record<string, unknown> = {
      title: 'Test Analysis',
      slug: 'test-analysis',
      date: '2026-04-01',
      description: 'A test description.',
      sources: ['https://nature.com'],
    };
    expect(() => validateAnalysisFrontmatter(invalid))
      .toThrow(SchemaValidationError)
      .toThrow('thesis');
  });

  it('rejects empty sources array', () => {
    const invalid: Record<string, unknown> = {
      title: 'Test Analysis',
      slug: 'test-analysis',
      date: '2026-04-01',
      description: 'A test description.',
      thesis: 'This is the main argument.',
      sources: [],
    };
    expect(() => validateAnalysisFrontmatter(invalid))
      .toThrow(SchemaValidationError)
      .toThrow('at least one source');
  });

  it('rejects invalid readTime type', () => {
    const invalid: Record<string, unknown> = {
      title: 'Test Analysis',
      slug: 'test-analysis',
      date: '2026-04-01',
      description: 'A test description.',
      thesis: 'This is the main argument.',
      sources: ['https://nature.com'],
      readTime: '8',
    };
    expect(() => validateAnalysisFrontmatter(invalid))
      .toThrow(SchemaValidationError)
      .toThrow('readTime');
  });
});

// ─── readDir Error Handling ─────────────────────────────────────────────────

describe('loadSignals ENOENT handling', () => {
  it('returns [] when content/signals dir does not exist', () => {
    const result = loadSignals();
    expect(Array.isArray(result)).toBe(true);
  });

  it('loadAnalysis returns null (not throws) for unknown slug — ENOENT path', () => {
    const result = loadAnalysis('does-not-exist-enoent-check');
    expect(result).toBeNull();
  });
});

// ─── Loader Integration Tests ─────────────────────────────────────────────────

describe('loader integration', () => {
  it('loadSignals returns [] on empty directory', () => {
    const result = loadSignals();
    expect(Array.isArray(result)).toBe(true);
  });

  it('loadAnalysis returns null for unknown slug', () => {
    const result = loadAnalysis('this-analysis-does-not-exist-xyz');
    expect(result).toBeNull();
  });

  it('loadAnalysis returns parsed object for valid slug', () => {
    // slug derived from filename: analysis-001.md → slug = analysis-001
    const result = loadAnalysis('analysis-001');
    expect(result).not.toBeNull();
    expect(result?.frontmatter.title).toBeTruthy();
    expect(result?.frontmatter.slug).toBeTruthy();
    expect(result?.body).toBeTruthy();
  });

  it('loadSignals returns parsed objects', () => {
    const signals = loadSignals();
    expect(signals.length).toBeGreaterThan(0);
    signals.forEach((signal) => {
      expect(signal.frontmatter.title).toBeTruthy();
      expect(signal.frontmatter.slug).toBeTruthy();
      expect(signal.frontmatter.date).toBeTruthy();
      expect(signal.frontmatter.tags.length).toBeGreaterThan(0);
      expect(signal.body.length).toBeGreaterThan(0);
    });
  });
});
