/**
 * SignalCard — follows DESIGN_SYSTEM.md tokens and SCREEN_FLOWS conventions.
 * Server Component.
 *
 * Variants:
 *   'featured' — dark surface, for hero section
 *   'grid'     — surface card, for signal grid
 */

import Link from 'next/link';
import type { Signal } from '@/lib/content/types';

interface SignalCardProps {
  signal: Signal;
  variant?: 'featured' | 'grid';
}

export function SignalCard({ signal, variant = 'grid' }: SignalCardProps) {
  const { frontmatter } = signal;

  if (variant === 'featured') {
    return (
      <article
        style={{
          background: 'var(--color-dark-surface-elevated)',
          borderRadius: '12px',
          padding: '2rem',
          position: 'relative',
          overflow: 'hidden',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
      >
        <div style={{ marginBottom: '1rem' }}>
          <span style={{
            fontFamily: 'var(--font-sora)',
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
            color: 'var(--color-dark-accent)',
          }}>
            {frontmatter.tags[0] ?? 'Sinal'}
          </span>
        </div>

        <Link
          href={`/signals/${frontmatter.slug}`}
          style={{
            fontFamily: 'var(--font-sora)',
            fontSize: '1.5rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            color: 'var(--color-dark-on-surface)',
            textDecoration: 'none',
            display: 'block',
            marginBottom: '0.75rem',
          }}
        >
          {frontmatter.title}
        </Link>

        <p style={{
          fontSize: '0.88rem',
          color: 'rgba(248,250,252,0.55)',
          lineHeight: 1.6,
          marginBottom: '1.25rem',
          fontWeight: 300,
        }}>
          {frontmatter.description}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{
            fontSize: '0.72rem',
            color: 'rgba(248,250,252,0.3)',
            fontFamily: 'var(--font-sora)',
            fontWeight: 300,
          }}>
            {frontmatter.date}
          </span>
          <Link
            href={`/signals/${frontmatter.slug}`}
            style={{
              fontFamily: 'var(--font-sora)',
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              color: 'var(--color-dark-surface-elevated)',
              background: 'var(--color-accent)',
              padding: '0.45rem 1rem',
              borderRadius: '3px',
              textDecoration: 'none',
            }}
          >
            Ler sinal →
          </Link>
        </div>
      </article>
    );
  }

  // grid variant — surface card
  return (
    <article style={{
      background: 'var(--color-surface)',
      borderRadius: '12px',
      padding: '1.25rem',
      border: '1px solid var(--color-neutral-200)',
      transition: 'transform 0.15s, box-shadow 0.15s',
    }}>
      {/* meta: tags + date */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '0.5rem',
        flexWrap: 'wrap' as const,
      }}>
        {frontmatter.tags.slice(0, 2).map((tag) => (
          <span key={tag} style={{
            fontFamily: 'var(--font-sora)',
            fontSize: '0.58rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
            padding: '0.18rem 0.55rem',
            borderRadius: '9999px',
            background: 'rgba(8,145,178,0.08)',
            color: 'var(--color-primary)',
          }}>
            {tag}
          </span>
        ))}
        <span style={{
          fontSize: '0.7rem',
          color: 'var(--color-neutral-400)',
          fontFamily: 'var(--font-sora)',
          fontWeight: 300,
        }}>
          {frontmatter.date}
        </span>
      </div>

      {/* title */}
      <Link
        href={`/signals/${frontmatter.slug}`}
        style={{
          fontFamily: 'var(--font-sora)',
          fontSize: '1rem',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1.35,
          color: 'var(--color-on-surface)',
          textDecoration: 'none',
          display: 'block',
          marginBottom: '0.4rem',
        }}
      >
        {frontmatter.title}
      </Link>

      {/* description */}
      <p style={{
        fontSize: '0.82rem',
        color: 'var(--color-neutral-700)',
        lineHeight: 1.6,
        fontWeight: 300,
      }}>
        {frontmatter.description}
      </p>
    </article>
  );
}
