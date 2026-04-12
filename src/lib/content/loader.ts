/**
 * Minimal content loader — parses MD + frontmatter files from disk.
 *
 * Format: MD + frontmatter via gray-matter.
 *
 * MDX migration path:
 * ─────────────────────
 * To migrate from MD to MDX, only this file changes:
 *   1. Replace gray-matter with @mdx-js/mdx or next-mdx-remote
 *   2. Update parseSinal() and parseAnalise() signatures if MDX provides
 *      a different output shape
 *   3. Content types (types.ts) and schemas (schema.ts) remain unchanged —
 *      they operate on frontmatter only
 *   4. The public API (loadSinais, loadAnalise) stays identical
 *
 * The only coupling point is this module. All downstream code is format-agnostic.
 */

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

import type { Sinal, Analise, SinalFrontmatter, AnaliseFrontmatter } from './types';
import {
  validateSinalFrontmatter,
  validateAnaliseFrontmatter,
  SchemaValidationError,
} from './schema';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function readDir(dir: string): string[] {
  try {
    return readdirSync(dir);
  } catch {
    return [];
  }
}

// ─── Sinal Loader ─────────────────────────────────────────────────────────────

/**
 * Loads all sinais from content/sinais/.
 * Returns an empty array if the directory does not exist or is empty.
 * Does not throw on parse errors — collects and re-throws aggregate.
 */
export function loadSinais(): Sinal[] {
  const dir = join(process.cwd(), 'content', 'sinais');
  const files = readDir(dir).filter((f) => f.endsWith('.md'));

  if (files.length === 0) return [];

  const sinais: Sinal[] = [];
  const errors: Error[] = [];

  for (const file of files) {
    try {
      const raw = readFileSync(join(dir, file), 'utf-8');
      const { data, content } = matter(raw);

      // Cast to Record for schema validation — gray-matter returns { [key: string]: any }
      validateSinalFrontmatter(data as Record<string, unknown>);
      const frontmatter = data as SinalFrontmatter;

      sinais.push({ frontmatter, body: content.trim() });
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
    throw new Error(`Sinal loading failed:\n${msgs}`);
  }

  return sinais;
}

// ─── Análise Loader ────────────────────────────────────────────────────────────

/**
 * Loads a single análise by slug.
 * Returns null if the file does not exist.
 * Throws SchemaValidationError if frontmatter is invalid.
 */
export function loadAnalise(slug: string): Analise | null {
  const dir = join(process.cwd(), 'content', 'analises');
  const fileName = `${slug}.md`;
  const filePath = join(dir, fileName);

  let raw: string;
  try {
    raw = readFileSync(filePath, 'utf-8');
  } catch {
    return null;
  }

  const { data, content } = matter(raw);
  validateAnaliseFrontmatter(data as Record<string, unknown>);
  const frontmatter = data as AnaliseFrontmatter;

  return { frontmatter, body: content.trim() };
}
