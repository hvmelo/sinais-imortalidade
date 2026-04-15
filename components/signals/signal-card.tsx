/**
 * SignalCard — VAR A design using CSS classes from globals.css.
 * Server Component.
 * Variants: 'featured' (dark card with pulse dot) and 'list' (white card).
 */

import Link from 'next/link';
import type { Signal } from '@/lib/content/types';

interface SignalCardProps {
  signal: Signal;
  variant?: 'featured' | 'list';
}

export function SignalCard({ signal, variant = 'list' }: SignalCardProps) {
  const { frontmatter } = signal;

  if (variant === 'featured') {
    return (
      <article className="card-featured" aria-label="Sinal em destaque">
        {/* Pulse dot */}
        <div style={{ marginBottom: '1.25rem' }}>
          <span
            style={{
              display: 'inline-block',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#22d3ee',
              boxShadow: '0 0 8px #22d3ee',
              animation: 'pulse-dot 2s ease-in-out infinite',
              verticalAlign: 'middle',
              marginRight: '0.5rem',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-sora)',
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#22d3ee',
            }}
          >
            {frontmatter.tags[0] ?? 'Sinal'}
          </span>
        </div>

        <Link href={`/signals/${frontmatter.slug}`} className="card-featured__title">
          {frontmatter.title}
        </Link>

        <p className="card-featured__desc">{frontmatter.description}</p>

        <div className="card-featured__footer">
          <span className="card-featured__date">{frontmatter.date}</span>
          <Link href={`/signals/${frontmatter.slug}`} className="card-featured__cta">
            Ler sinal →
          </Link>
        </div>

        <style>{`
          @keyframes pulse-dot {
            0%, 100% { opacity: 1; box-shadow: 0 0 8px #22d3ee; }
            50%       { opacity: 0.4; box-shadow: 0 0 3px #22d3ee; }
          }
        `}</style>
      </article>
    );
  }

  // list variant
  return (
    <article className="card-list__item">
      <div className="card-list__meta">
        {frontmatter.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="card-list__tag">{tag}</span>
        ))}
        <span className="card-list__date">{frontmatter.date}</span>
        {frontmatter.urgency && (
          <span
            style={{
              fontFamily: 'var(--font-sora)',
              fontSize: '0.58rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '0.18rem 0.55rem',
              borderRadius: '99px',
              background:
                frontmatter.urgency === 'high' ? '#fef2f2' :
                frontmatter.urgency === 'medium' ? '#fefce8' : '#f0fdf4',
              color:
                frontmatter.urgency === 'high' ? '#ef4444' :
                frontmatter.urgency === 'medium' ? '#d29922' : '#3fb950',
              border:
                frontmatter.urgency === 'high' ? '1px solid rgba(239,68,68,0.15)' :
                frontmatter.urgency === 'medium' ? '1px solid rgba(210,153,34,0.15)' :
                '1px solid rgba(63,185,80,0.15)',
            }}
          >
            {frontmatter.urgency === 'high' ? 'Alta' :
             frontmatter.urgency === 'medium' ? 'Média' : 'Baixa'}
          </span>
        )}
      </div>

      <Link href={`/signals/${frontmatter.slug}`} className="card-list__title">
        {frontmatter.title}
      </Link>

      <p className="card-list__desc">{frontmatter.description}</p>
    </article>
  );
}
