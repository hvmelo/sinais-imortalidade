/**
 * AnalysisHighlight — VAR A sidebar widget.
 * Server Component.
 */

import Link from 'next/link';
import type { Analysis } from '@/lib/content/types';

interface AnalysisHighlightProps {
  analysis: Analysis;
}

export function AnalysisHighlight({ analysis }: AnalysisHighlightProps) {
  const { frontmatter } = analysis;

  return (
    <div className="widget analysis-widget">
      <style>{`
        .analysis-widget__link {
          display: block;
          font-family: var(--font-sora);
          font-size: 0.875rem;
          font-weight: 600;
          line-height: 1.4;
          color: var(--ink);
          text-decoration: none;
          margin-bottom: 0.5rem;
          transition: color 0.15s;
        }
        .analysis-widget__link:hover {
          color: var(--cyan);
        }
      `}</style>

      <div className="widget__title">Análises recentes</div>

      <Link
        href={`/analyses/${frontmatter.slug}`}
        className="analysis-widget__link"
      >
        {frontmatter.title}
      </Link>

      {frontmatter.thesis && (
        <p
          style={{
            fontSize: '0.8rem',
            color: 'var(--muted)',
            lineHeight: 1.6,
            marginBottom: '0.75rem',
            fontWeight: 300,
          }}
        >
          {frontmatter.thesis}
        </p>
      )}

      <p
        style={{
          fontSize: '0.68rem',
          color: 'var(--faint)',
          fontFamily: 'var(--font-sora)',
          fontWeight: 300,
        }}
      >
        Análise · {frontmatter.date}
      </p>
    </div>
  );
}
