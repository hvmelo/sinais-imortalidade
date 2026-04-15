/**
 * AnalysisHighlight — sidebar card for analysis.
 * Server Component. Light surface — not dark.
 */

import Link from 'next/link';
import type { Analysis } from '@/lib/content/types';

interface AnalysisHighlightProps {
  analysis: Analysis;
}

export function AnalysisHighlight({ analysis }: AnalysisHighlightProps) {
  const { frontmatter } = analysis;

  return (
    <article className="bg-surface border border-neutral-200 rounded-lg p-lg">
      <p className="font-headline text-xs font-bold uppercase tracking-widest text-primary mb-md">
        Análise em destaque
      </p>

      <Link
        href={`/analyses/${frontmatter.slug}`}
        className="font-headline text-lg font-bold leading-tight text-neutral-900 no-underline block mb-md hover:text-primary transition-colors"
      >
        {frontmatter.title}
      </Link>

      {frontmatter.thesis && (
        <p className="font-body text-sm text-neutral-700 leading-normal mb-lg">
          {frontmatter.thesis}
        </p>
      )}

      <div className="flex items-center gap-xl">
        <span className="font-headline text-xs text-neutral-400">
          {frontmatter.date}
        </span>
        <Link
          href={`/analyses/${frontmatter.slug}`}
          className="font-headline text-xs font-semibold uppercase tracking-wider text-primary no-underline hover:text-primary-hover transition-colors"
        >
          Ler análise →
        </Link>
      </div>
    </article>
  );
}
