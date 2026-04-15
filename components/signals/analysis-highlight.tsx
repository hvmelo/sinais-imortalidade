/**
 * AnalysisHighlight — sidebar editorial widget.
 * Server Component. Typographic, no card chrome.
 */

import Link from 'next/link';
import type { Analysis } from '@/lib/content/types';

interface AnalysisHighlightProps {
  analysis: Analysis;
}

export function AnalysisHighlight({ analysis }: AnalysisHighlightProps) {
  const { frontmatter } = analysis;

  return (
    <div>
      <p className="font-headline text-xs font-bold uppercase tracking-widest text-neutral-400 mb-sm">
        Análise em destaque
      </p>

      <Link
        href={`/analyses/${frontmatter.slug}`}
        className="font-headline text-lg font-bold leading-tight text-neutral-900 no-underline block mb-sm hover:text-primary transition-colors"
      >
        {frontmatter.title}
      </Link>

      {frontmatter.thesis && (
        <p className="font-body text-sm text-neutral-700 leading-normal mb-lg">
          {frontmatter.thesis}
        </p>
      )}

      <div className="flex items-center gap-lg">
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
    </div>
  );
}
