/**
 * AnalysisHighlight — sidebar card for analysis.
 * Server Component. Light surface.
 */

import Link from 'next/link';
import type { Analysis } from '@/lib/content/types';

interface AnalysisHighlightProps {
  analysis: Analysis;
}

export function AnalysisHighlight({ analysis }: AnalysisHighlightProps) {
  const { frontmatter } = analysis;

  return (
    <article className="bg-surface border border-neutral-200 p-xl sticky top-[100px]">
      <p className="font-headline text-xs font-bold uppercase tracking-widest text-primary mb-xl">
        Análise em destaque
      </p>

      <Link
        href={`/analyses/${frontmatter.slug}`}
        className="font-headline text-base font-bold text-neutral-900 no-underline leading-[1.4] hover:text-primary transition-colors block mb-sm"
      >
        {frontmatter.title}
      </Link>

      {frontmatter.thesis && (
        <p className="font-body text-sm text-neutral-700 leading-[1.6] mb-lg">
          {frontmatter.thesis}
        </p>
      )}

      <Link
        href={`/analyses/${frontmatter.slug}`}
        className="inline-flex items-center gap-xs font-headline text-xs font-bold uppercase tracking-widest text-primary no-underline hover:gap-sm transition-all"
      >
        Ler análise
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </article>
  );
}
