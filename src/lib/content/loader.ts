/**
 * Minimal content loader — parses MD + frontmatter files from disk.
 *
 * Format: MD + frontmatter via gray-matter.
 *
 * MDX migration path:
 * ─────────────────────
 * To migrate from MD to MDX, only this file changes:
 *   1. Replace gray-matter with @mdx-js/mdx or next-mdx-remote
 *   2. Update parseSignals() and parseAnalysis() signatures if MDX provides
 *      a different output shape
 *   3. Content types (types.ts) and schemas (schema.ts) remain unchanged —
 *      they operate on frontmatter only
 *   4. The public API (loadSignals, loadAnalysis) stays identical
 *
 * The only coupling point is this module. All downstream code is format-agnostic.
 */

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

import type { Signal, Analysis, SignalFrontmatter, AnalysisFrontmatter } from './types';
import {
  validateSignalFrontmatter,
  validateAnalysisFrontmatter,
  SchemaValidationError,
} from './schema';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function readDir(dir: string): string[] {
  try {
    return readdirSync(dir);
  } catch (err) {
    // Only swallow "directory not found" — surface all other filesystem errors
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return [];
    throw err;
  }
}

// ─── Signal Loader ─────────────────────────────────────────────────────────────

/**
 * Loads all signals from content/signals/.
 * Returns an empty array if the directory does not exist or is empty.
 * Does not throw on parse errors — collects and re-throws aggregate.
 */
export function loadSignals(): Signal[] {
  const dir = join(process.cwd(), 'content', 'signals');
  const files = readDir(dir).filter((f) => f.endsWith('.md'));

  if (files.length === 0) return [];

  const signals: Signal[] = [];
  const errors: Error[] = [];

  for (const file of files) {
    try {
      const raw = readFileSync(join(dir, file), 'utf-8');
      const { data, content } = matter(raw);

      // Cast to Record for schema validation — gray-matter returns { [key: string]: any }
      validateSignalFrontmatter(data as Record<string, unknown>);
      const frontmatter = data as SignalFrontmatter;

      signals.push({ frontmatter, body: content.trim() });
    } catch (err) {
      if (err instanceof SchemaValidationError) {
        errors.push(err);
      } else {
        errors.push(new Error(`Failed to parse ${file}: ${(err as Error).message}`));
      }
    }
  }

  if (errors.length > 0) {
    const msgs = errors.map((e) => `  - ${e.message}`).join('\n');
    throw new Error(`Signal loading failed:\n${msgs}`);
  }

  return signals;
}

// ─── Analysis Loader ────────────────────────────────────────────────────────────

/**
 * Loads a single analysis by slug.
 * Returns null if the file does not exist.
 * Throws SchemaValidationError if frontmatter is invalid.
 */
export function loadAnalysis(slug: string): Analysis | null {
  const dir = join(process.cwd(), 'content', 'analyses');
  const fileName = `${slug}.md`;
  const filePath = join(dir, fileName);

  let raw: string;
  try {
    raw = readFileSync(filePath, 'utf-8');
  } catch {
    return null;
  }

  const { data, content } = matter(raw);
  validateAnalysisFrontmatter(data as Record<string, unknown>);
  const frontmatter = data as AnalysisFrontmatter;

  return { frontmatter, body: content.trim() };
}

/**
 * Loads all analyses from content/analyses/.
 * Returns an empty array if the directory does not exist or is empty.
 * Sort: date DESC, slug ASC (tiebreak).
 * Pure read + sort — no business logic.
 */
export function loadAllAnalysis(): Analysis[] {
  const dir = join(process.cwd(), 'content', 'analyses');
  const files = readDir(dir).filter((f) => f.endsWith('.md'));

  if (files.length === 0) return [];

  const analyses: Analysis[] = [];
  const errors: Error[] = [];

  for (const file of files) {
    try {
      const raw = readFileSync(join(dir, file), 'utf-8');
      const { data, content } = matter(raw);

      validateAnalysisFrontmatter(data as Record<string, unknown>);
      const frontmatter = data as AnalysisFrontmatter;

      analyses.push({ frontmatter, body: content.trim() });
    } catch (err) {
      if (err instanceof SchemaValidationError) {
        errors.push(err);
      } else {
        errors.push(new Error(`Failed to parse ${file}: ${(err as Error).message}`));
      }
    }
  }

  if (errors.length > 0) {
    const msgs = errors.map((e) => `  - ${e.message}`).join('\n');
    throw new Error(`Analysis loading failed:\n${msgs}`);
  }

  // Sort: date DESC, slug ASC (tiebreak)
  analyses.sort((a, b) => {
    const dateCmp = b.frontmatter.date.localeCompare(a.frontmatter.date);
    if (dateCmp !== 0) return dateCmp;
    return a.frontmatter.slug.localeCompare(b.frontmatter.slug);
  });

  return analyses;
}
