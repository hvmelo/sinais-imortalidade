/**
 * Shared content types for Sinais de Imortalidade.
 *
 * Canonical format: MD + frontmatter (gray-matter).
 * MDX migration path: format-agnostic — only loader.ts changes.
 */

export interface SignalFrontmatter {
  title: string;
  slug: string;
  date: string; // ISO 8601: YYYY-MM-DD
  description: string;
  tags: string[];
  source?: string; // optional: primary source for this signal
  url?: string; // optional: link to source
  urgency?: 'low' | 'medium' | 'high'; // optional: editorial urgency signal
}

export interface AnalysisFrontmatter {
  title: string;
  slug: string;
  date: string; // ISO 8601: YYYY-MM-DD
  description: string;
  tags: string[];
  thesis: string; // one-sentence summary argument
  sources: string[]; // primary source URLs or references
  relatedSignals?: string[]; // optional: slugs of related signals
  readTime?: number; // optional: estimated read time in minutes
}

export interface Signal {
  frontmatter: SignalFrontmatter;
  body: string; // raw markdown body
}

export interface Analysis {
  frontmatter: AnalysisFrontmatter;
  body: string; // raw markdown body
}
