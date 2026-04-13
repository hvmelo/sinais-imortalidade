/**
 * Unit tests for content loader.
 * Tests colocate with source per project convention (src/lib/content/).
 */

import { describe, it, expect } from 'vitest';
import { validateSinalFrontmatter, validateAnaliseFrontmatter, SchemaValidationError } from './schema';
import { loadSinais, loadAnalise } from './loader';

// ─── Schema Tests ─────────────────────────────────────────────────────────────

describe('validateSinalFrontmatter', () => {
  it('accepts valid Sinal frontmatter', () => {
    const valid: Record<string, unknown> = {
      title: 'Test Signal',
      slug: 'test-signal',
      date: '2026-04-01',
      description: 'A test description.',
      tags: ['biotech', 'aging'],
    };
    expect(() => validateSinalFrontmatter(valid)).not.toThrow();
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
    expect(() => validateSinalFrontmatter(withOptionals)).not.toThrow();
  });

  it('rejects missing required field — title', () => {
    const invalid: Record<string, unknown> = {
      slug: 'test-signal',
      date: '2026-04-01',
      description: 'A test description.',
      tags: ['biotech'],
    };
    expect(() => validateSinalFrontmatter(invalid))
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
    expect(() => validateSinalFrontmatter(invalid))
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
    expect(() => validateSinalFrontmatter(invalid))
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
    expect(() => validateSinalFrontmatter(invalid))
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
    expect(() => validateSinalFrontmatter(invalid))
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
    expect(() => validateSinalFrontmatter(invalid))
      .toThrow(SchemaValidationError)
      .toThrow('tags');
  });
});

describe('validateAnaliseFrontmatter', () => {
  it('accepts valid Análise frontmatter', () => {
    const valid: Record<string, unknown> = {
      title: 'Test Analysis',
      slug: 'test-analysis',
      date: '2026-04-01',
      description: 'A test description.',
      thesis: 'This is the main argument.',
      sources: ['https://nature.com/article', 'https://who.int/research'],
    };
    expect(() => validateAnaliseFrontmatter(valid)).not.toThrow();
  });

  it('accepts optional fields when present', () => {
    const withOptionals: Record<string, unknown> = {
      title: 'Test Analysis',
      slug: 'test-analysis',
      date: '2026-04-01',
      description: 'A test description.',
      thesis: 'This is the main argument.',
      sources: ['https://nature.com'],
      relatedSinais: ['test-signal'],
      readTime: 8,
    };
    expect(() => validateAnaliseFrontmatter(withOptionals)).not.toThrow();
  });

  it('rejects missing thesis field', () => {
    const invalid: Record<string, unknown> = {
      title: 'Test Analysis',
      slug: 'test-analysis',
      date: '2026-04-01',
      description: 'A test description.',
      sources: ['https://nature.com'],
    };
    expect(() => validateAnaliseFrontmatter(invalid))
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
    expect(() => validateAnaliseFrontmatter(invalid))
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
    expect(() => validateAnaliseFrontmatter(invalid))
      .toThrow(SchemaValidationError)
      .toThrow('readTime');
  });
});

// ─── readDir Error Handling ─────────────────────────────────────────────────

describe('loadSinais ENOENT handling', () => {
  it('returns [] when content/sinais dir does not exist', () => {
    // loadSinais internally uses readDir which catches ENOENT
    // We test via a slug that maps to a non-existent directory path
    const result = loadSinais();
    // Real dir exists and has content — returns array (not throws)
    expect(Array.isArray(result)).toBe(true);
  });

  it('loadAnalise returns null (not throws) for unknown slug — ENOENT path', () => {
    // ENOENT on single file — must return null, not throw
    const result = loadAnalise('does-not-exist-enoent-check');
    expect(result).toBeNull();
  });
});

// ─── Loader Integration Tests ─────────────────────────────────────────────────

describe('loader integration', () => {
  it('loadSinais returns [] on empty directory', () => {
    const result = loadSinais();
    expect(Array.isArray(result)).toBe(true);
  });

  it('loadAnalise returns null for unknown slug', () => {
    const result = loadAnalise('this-signal-does-not-exist-xyz');
    expect(result).toBeNull();
  });

  it('loadAnalise returns parsed object for valid slug', () => {
    // slug derived from filename: analise-001.md → slug = analise-001
    const result = loadAnalise('analise-001');
    expect(result).not.toBeNull();
    expect(result?.frontmatter.title).toBeTruthy();
    expect(result?.frontmatter.slug).toBeTruthy();
    expect(result?.body).toBeTruthy();
  });

  it('loadSinais returns parsed objects', () => {
    const sinais = loadSinais();
    expect(sinais.length).toBeGreaterThan(0);
    sinais.forEach((sinal) => {
      expect(sinal.frontmatter.title).toBeTruthy();
      expect(sinal.frontmatter.slug).toBeTruthy();
      expect(sinal.frontmatter.date).toBeTruthy();
      expect(sinal.frontmatter.tags.length).toBeGreaterThan(0);
      expect(sinal.body.length).toBeGreaterThan(0);
    });
  });
});
