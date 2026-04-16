/**
 * AnalysisCard — card for the analysis grid section.
 * Server Component. Bold variant with cyan border-top.
 */

import Link from 'next/link';
import type { Analysis } from '@/lib/content/types';

interface AnalysisCardProps {
  analysis: Analysis;
}

export function AnalysisCard({ analysis }: AnalysisCardProps) {
  const { frontmatter } = analysis;

  return (
    <article className="bg-background border border-neutral-200 border-t-4 border-t-primary p-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer h-full">
      <p className="font-headline text-xs text-neutral-400 uppercase tracking-widest mb-sm">
        {frontmatter.date}
      </p>

      <Link
        href={`/analyses/${frontmatter.slug}`}
        className="font-headline text-base font-bold leading-[1.35] text-neutral-900 no-underline block mb-sm hover:text-primary transition-colors"
      >
        {frontmatter.title}
      </Link>

      {frontmatter.thesis && (
        <p className="font-body text-sm text-neutral-700 leading-[1.6] line-clamp-3 mb-lg">
          {frontmatter.thesis}
        </p>
      )}

      <div className="flex justify-between items-center mt-auto">
        <span className="font-headline text-xs text-neutral-400">
          {frontmatter.readTime ?? '10'} min
        </span>
        <Link
          href={`/analyses/${frontmatter.slug}`}
          className="inline-flex items-center gap-xs font-headline text-xs font-bold uppercase tracking-widest text-primary no-underline hover:text-primary-hover transition-colors"
        >
          Ler
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
