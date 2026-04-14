/**
 * AnalysisHighlight — compact analysis card for homepage highlight section.
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
    <article className="analysis-highlight">
      <style>{`
        .analysis-highlight {
          background: #132d40;
          color: #f8fafc;
          border-radius: 0.75rem;
          padding: 1.5rem;
        }
        .analysis-highlight__label {
          font-family: var(--font-dm-sans);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #22d3ee;
          margin-bottom: 0.5rem;
        }
        .analysis-highlight__title {
          font-family: var(--font-sora);
          font-size: 1.1rem;
          line-height: 1.3;
          margin-bottom: 0.5rem;
        }
        .analysis-highlight__title a {
          color: inherit;
          text-decoration: none;
        }
        .analysis-highlight__title a:hover {
          color: #22d3ee;
        }
        .analysis-highlight__thesis {
          font-family: var(--font-dm-sans);
          font-size: 0.9rem;
          color: rgba(248, 250, 252, 0.8);
          line-height: 1.5;
          margin-bottom: 0.75rem;
        }
        .analysis-highlight__date {
          font-family: var(--font-dm-sans);
          font-size: 0.75rem;
          color: rgba(248, 250, 252, 0.55);
        }
      `}</style>

      <p className="analysis-highlight__label">Análise em destaque</p>
      <h3 className="analysis-highlight__title">
        <Link href={`/analyses/${frontmatter.slug}`}>{frontmatter.title}</Link>
      </h3>
      <p className="analysis-highlight__thesis">{frontmatter.thesis}</p>
      <p className="analysis-highlight__date">{frontmatter.date}</p>
    </article>
  );
}
