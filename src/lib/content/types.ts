/**
 * Shared content types for Sinais de Imortalidade.
 *
 * Canonical format: MD + frontmatter (gray-matter).
 * MDX migration path: format-agnostic — only loader.ts changes.
 */

export interface SinalFrontmatter {
  title: string;
  slug: string;
  date: string; // ISO 8601: YYYY-MM-DD
  description: string;
  tags: string[];
  source?: string; // optional: primary source for this signal
  url?: string; // optional: link to source
  urgency?: 'low' | 'medium' | 'high'; // optional: editorial urgency signal
}

export interface AnaliseFrontmatter {
  title: string;
  slug: string;
  date: string; // ISO 8601: YYYY-MM-DD
  description: string;
  tags: string[];
  thesis: string; // one-sentence summary argument
  sources: string[]; // primary source URLs or references
  relatedSinais?: string[]; // optional: slugs of related signals
  readTime?: number; // optional: estimated read time in minutes
}

export interface Sinal {
  frontmatter: SinalFrontmatter;
  body: string; // raw markdown body
}

export interface Analise {
  frontmatter: AnaliseFrontmatter;
  body: string; // raw markdown body
}
