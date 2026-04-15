/**
 * AnalysisHighlight — VAR A style widget for homepage sidebar.
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
    <div className="widget analysis-highlight-var-a">
      <style>{`
        .analysis-highlight-var-a {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.25rem;
        }
        .analysis-highlight-var-a__title-label {
          font-family: var(--font-sora);
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--cyan);
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .analysis-highlight-var-a__title-label::before {
          content: '';
          width: 14px;
          height: 1px;
          background: var(--cyan);
        }
        .analysis-highlight-var-a__link {
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
        .analysis-highlight-var-a__link:hover { color: var(--cyan); }
        .analysis-highlight-var-a__thesis {
          font-size: 0.8rem;
          color: var(--muted);
          line-height: 1.6;
          margin-bottom: 0.75rem;
          font-weight: 300;
        }
        .analysis-highlight-var-a__meta {
          font-size: 0.68rem;
          color: var(--faint);
          font-family: var(--font-sora);
          font-weight: 300;
        }
      `}</style>

      <div className="analysis-highlight-var-a__title-label">
        Análise em destaque
      </div>

      <Link
        href={`/analyses/${frontmatter.slug}`}
        className="analysis-highlight-var-a__link"
      >
        {frontmatter.title}
      </Link>

      {frontmatter.thesis && (
        <p className="analysis-highlight-var-a__thesis">{frontmatter.thesis}</p>
      )}

      <p className="analysis-highlight-var-a__meta">
        Análise · {frontmatter.date}
      </p>
    </div>
  );
}
