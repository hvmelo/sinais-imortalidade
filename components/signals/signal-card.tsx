/**
 * SignalCard — renders a signal with title, description, date, tags, urgency badge.
 * Server Component. Two variants: 'grid' (compact) and 'featured' (larger).
 */

import Link from 'next/link';
import type { Signal } from '@/lib/content/types';

interface SignalCardProps {
  signal: Signal;
  variant?: 'grid' | 'featured';
}

export function SignalCard({ signal, variant = 'grid' }: SignalCardProps) {
  const { frontmatter } = signal;

  return (
    <article className={`signal-card signal-card--${variant}`}>
      <style>{`
        .signal-card {
          position: relative;
          border-radius: 0.75rem;
          overflow: hidden;
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .signal-card:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(12, 18, 34, 0.08);
        }
        .signal-card--grid {
          background: #ffffff;
          padding: 1.25rem;
          border: 1px solid rgba(12, 18, 34, 0.06);
        }
        .signal-card--featured {
          background: #0c1222;
          color: #f8fafc;
          padding: 2rem;
        }
        .signal-card--featured:hover {
          box-shadow: 0 8px 24px rgba(12, 18, 34, 0.2);
        }
        .signal-card__date {
          font-family: var(--font-dm-sans);
          font-size: 0.75rem;
          opacity: 0.6;
          margin-bottom: 0.5rem;
        }
        .signal-card__title {
          font-family: var(--font-sora);
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 0.5rem;
          color: inherit;
        }
        .signal-card--grid .signal-card__title {
          font-size: 1rem;
          color: #0c1222;
        }
        .signal-card--featured .signal-card__title {
          font-size: 1.5rem;
          color: #f8fafc;
        }
        .signal-card__description {
          font-family: var(--font-dm-sans);
          font-size: 0.875rem;
          line-height: 1.5;
          margin-bottom: 0.75rem;
        }
        .signal-card--grid .signal-card__description {
          color: rgba(12, 18, 34, 0.7);
        }
        .signal-card--featured .signal-card__description {
          color: rgba(248, 250, 252, 0.75);
        }
        .signal-card__meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .signal-card__tag {
          font-family: var(--font-dm-sans);
          font-size: 0.7rem;
          padding: 0.15rem 0.5rem;
          border-radius: 9999px;
          background: rgba(8, 145, 178, 0.1);
          color: #0891b2;
        }
        .signal-card--featured .signal-card__tag {
          background: rgba(34, 211, 238, 0.15);
          color: #22d3ee;
        }
        .signal-card__urgency {
          font-family: var(--font-dm-sans);
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.15rem 0.5rem;
          border-radius: 9999px;
        }
        .signal-card__urgency--high {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }
        .signal-card__urgency--medium {
          background: rgba(210, 153, 34, 0.1);
          color: #d29922;
        }
        .signal-card__urgency--low {
          background: rgba(63, 185, 80, 0.1);
          color: #3fb950;
        }
      `}</style>

      <p className="signal-card__date">{frontmatter.date}</p>

      <h3 className="signal-card__title">
        <Link
          href={`/signals/${frontmatter.slug}`}
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          {frontmatter.title}
        </Link>
      </h3>

      <p className="signal-card__description">{frontmatter.description}</p>

      <div className="signal-card__meta">
        {frontmatter.urgency && (
          <span className={`signal-card__urgency signal-card__urgency--${frontmatter.urgency}`}>
            {frontmatter.urgency === 'high' ? 'Alta' : frontmatter.urgency === 'medium' ? 'Média' : 'Baixa'}
          </span>
        )}
        {frontmatter.tags.map((tag) => (
          <span key={tag} className="signal-card__tag">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
