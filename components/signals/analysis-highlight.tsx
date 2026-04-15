/**
 * AnalysisHighlight — compact card for analysis section.
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
    <article style={{
      background: 'var(--color-dark-surface-elevated)',
      borderRadius: '12px',
      padding: '1.5rem',
    }}>
      <p style={{
        fontFamily: 'var(--font-sora)',
        fontSize: '0.7rem',
        fontWeight: 700,
        letterSpacing: '0.06em',
        textTransform: 'uppercase' as const,
        color: 'var(--color-dark-accent)',
        marginBottom: '0.5rem',
      }}>
        Análise em destaque
      </p>

      <Link
        href={`/analyses/${frontmatter.slug}`}
        style={{
          fontFamily: 'var(--font-sora)',
          fontSize: '1.1rem',
          fontWeight: 700,
          lineHeight: 1.3,
          color: 'var(--color-dark-on-surface)',
          textDecoration: 'none',
          display: 'block',
          marginBottom: '0.5rem',
        }}
      >
        {frontmatter.title}
      </Link>

      {frontmatter.thesis && (
        <p style={{
          fontSize: '0.9rem',
          color: 'rgba(248,250,252,0.8)',
          lineHeight: 1.5,
          marginBottom: '0.75rem',
          fontWeight: 300,
        }}>
          {frontmatter.thesis}
        </p>
      )}

      <p style={{
        fontSize: '0.75rem',
        color: 'rgba(248,250,252,0.55)',
        fontFamily: 'var(--font-sora)',
      }}>
        {frontmatter.date}
      </p>
    </article>
  );
}
