/**
 * AnalysisCard — compact card for the analysis grid section.
 * Server Component. Light surface styling.
 */

import Link from 'next/link';
import type { Analysis } from '@/lib/content/types';

interface AnalysisCardProps {
  analysis: Analysis;
}

export function AnalysisCard({ analysis }: AnalysisCardProps) {
  const { frontmatter } = analysis;

  return (
    <article className="bg-surface border border-neutral-200 rounded-lg p-lg">
      <p className="font-headline text-xs font-bold uppercase tracking-widest text-primary mb-sm">
        Análise
      </p>

      <Link
        href={`/analyses/${frontmatter.slug}`}
        className="font-headline text-base font-bold leading-tight text-neutral-900 no-underline block mb-sm hover:text-primary transition-colors"
      >
        {frontmatter.title}
      </Link>

      {frontmatter.thesis && (
        <p className="font-body text-sm text-neutral-700 leading-normal mb-sm">
          {frontmatter.thesis.length > 120
            ? frontmatter.thesis.slice(0, 120) + '…'
            : frontmatter.thesis}
        </p>
      )}

      <span className="font-headline text-xs text-neutral-400">
        {frontmatter.date}
      </span>
    </article>
  );
}
