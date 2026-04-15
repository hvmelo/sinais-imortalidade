/**
 * AnalysisHighlight — editorial card for analysis section.
 * Server Component. All styling via Tailwind.
 *
 * Visual differentiation from signal cards: wider, dark surface,
 * prominent label, larger typography.
 */

import Link from 'next/link';
import type { Analysis } from '@/lib/content/types';

interface AnalysisHighlightProps {
  analysis: Analysis;
}

export function AnalysisHighlight({ analysis }: AnalysisHighlightProps) {
  const { frontmatter } = analysis;

  return (
    <article className="bg-dark-surface-elevated rounded-lg p-2xl">
      <p className="font-headline text-xs font-bold uppercase tracking-widest text-dark-accent mb-md">
        Análise em destaque
      </p>

      <Link
        href={`/analyses/${frontmatter.slug}`}
        className="font-headline text-xl font-bold leading-tight text-dark-on-surface no-underline block mb-md hover:text-dark-accent transition-colors"
      >
        {frontmatter.title}
      </Link>

      {frontmatter.thesis && (
        <p className="font-body text-base text-dark-on-surface/80 leading-normal mb-lg font-light">
          {frontmatter.thesis}
        </p>
      )}

      <div className="flex items-center gap-xl">
        <span className="font-headline text-xs text-dark-on-surface/50 font-light">
          {frontmatter.date}
        </span>
        <Link
          href={`/analyses/${frontmatter.slug}`}
          className="font-headline text-xs font-bold uppercase tracking-wider rounded-sm bg-accent px-lg py-sm text-dark-surface-elevated no-underline hover:bg-dark-accent transition-colors"
        >
          Ler análise →
        </Link>
      </div>
    </article>
  );
}
