/**
 * AnalysisCard — editorial card for analysis grid.
 * Server Component. Minimal chrome, typographic focus.
 */

import Link from 'next/link';
import type { Analysis } from '@/lib/content/types';

interface AnalysisCardProps {
  analysis: Analysis;
}

export function AnalysisCard({ analysis }: AnalysisCardProps) {
  const { frontmatter } = analysis;

  return (
    <article className="border-t border-neutral-200 pt-lg">
      <Link
        href={`/analyses/${frontmatter.slug}`}
        className="font-headline text-base font-bold leading-tight text-neutral-900 no-underline block mb-xs hover:text-primary transition-colors"
      >
        {frontmatter.title}
      </Link>

      {frontmatter.thesis && (
        <p className="font-body text-sm text-neutral-700 leading-normal mb-sm">
          {frontmatter.thesis.length > 140
            ? frontmatter.thesis.slice(0, 140) + '…'
            : frontmatter.thesis}
        </p>
      )}

      <span className="font-headline text-xs text-neutral-400">
        {frontmatter.date}
      </span>
    </article>
  );
}
