/**
 * SignalCard — follows DESIGN_SYSTEM.md tokens via Tailwind.
 * Server Component.
 *
 * Variants:
 *   'featured' — full-width dark hero with background pattern
 *   'grid'     — surface card for signal grid, with hover states
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
      <section className="relative overflow-hidden bg-dark-surface-elevated px-xl py-3xl">
        {/* Background pattern — subtle futuristic grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-accent) 1px, transparent 1px), linear-gradient(90deg, var(--color-accent) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Cyan glow top-right */}
        <div
          className="absolute -top-32 -right-32 h-64 w-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, var(--color-accent), transparent 70%)' }}
        />

        <div className="relative mx-auto max-w-container">
          <span className="font-headline text-xs font-bold uppercase tracking-widest text-dark-accent">
            {frontmatter.tags[0] ?? 'Sinal'}
          </span>

          <Link
            href={`/signals/${frontmatter.slug}`}
            className="font-headline text-3xl font-extrabold leading-tight text-dark-on-surface no-underline mt-lg block hover:text-dark-accent transition-colors max-w-3xl"
          >
            {frontmatter.title}
          </Link>

          <p className="mt-lg max-w-prose font-body text-base text-dark-on-surface/75 leading-normal font-light">
            {frontmatter.description}
          </p>

          <div className="mt-2xl flex items-center gap-xl">
            <span className="font-headline text-xs text-dark-on-surface/50 font-light">
              {frontmatter.date}
            </span>
            <Link
              href={`/signals/${frontmatter.slug}`}
              className="font-headline text-xs font-bold uppercase tracking-wider rounded-sm bg-accent px-lg py-sm text-dark-surface-elevated no-underline hover:bg-dark-accent transition-colors"
            >
              Ler sinal →
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // grid variant
  return (
    <article className="group rounded-lg border border-neutral-200 bg-surface p-lg transition-all duration-150 hover:shadow-2 hover:border-primary/30">
      <div className="mb-sm flex flex-wrap items-center gap-sm">
        {frontmatter.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="font-headline text-xs font-bold uppercase tracking-widest rounded-full bg-primary/10 px-sm py-xs text-primary"
          >
            {tag}
          </span>
        ))}
        <span className="font-headline text-xs text-neutral-400 font-light">
          {frontmatter.date}
        </span>
      </div>

      <Link
        href={`/signals/${frontmatter.slug}`}
        className="font-headline text-lg font-bold tracking-tight leading-tight text-on-surface no-underline block mb-xs group-hover:text-primary transition-colors"
      >
        {frontmatter.title}
      </Link>

      <p className="font-body text-sm text-neutral-700 leading-normal font-light">
        {frontmatter.description}
      </p>
    </article>
  );
}
