/**
 * SignalCard — hero featured variant.
 * Server Component.
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
      <section className="relative overflow-hidden bg-dark-surface-elevated py-[9rem] pb-[6rem]">
        {/* Background pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(34, 211, 238, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative mx-auto max-w-container px-xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-sm mb-lg">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_12px_#22d3ee]" />
            <span className="font-headline text-xs font-semibold uppercase tracking-widest text-accent">
              Sinal em destaque
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-xl">
            <div className="flex-1 max-w-[700px]">
              <h1 className="font-headline font-extrabold text-[clamp(1.5rem,4vw,2.5rem)] leading-[1.15] text-white mb-md -tracking-[0.02em]">
                {frontmatter.title}
              </h1>
              <p className="font-body text-[1.1rem] text-white/70 leading-[1.6] mb-xl">
                {frontmatter.description}
              </p>
              <Link
                href={`/signals/${frontmatter.slug}`}
                className="inline-flex items-center gap-xs font-headline text-xs font-semibold uppercase tracking-wider text-white no-underline border-b-2 border-accent pb-xs hover:text-accent transition-colors"
              >
                Ler sinal
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Meta */}
            <div className="text-right shrink-0">
              <span className="font-headline text-xs text-neutral-400 uppercase tracking-widest leading-[1.8]">
                {frontmatter.date}<br />
                TRANSMISSÃO #001
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // grid variant
  return (
    <article className="group border-b border-neutral-200 py-lg last:border-b-0 hover:bg-neutral-50 transition-colors">
      <div className="flex items-center gap-md mb-sm">
        <span className="font-headline text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-sm py-xs">
          {frontmatter.tags[0] ?? ''}
        </span>
        <span className="font-headline text-xs text-neutral-400 font-medium">
          {frontmatter.date}
        </span>
      </div>
      <Link
        href={`/signals/${frontmatter.slug}`}
        className="font-headline text-base font-semibold text-neutral-900 no-underline leading-[1.45] hover:text-primary transition-colors block"
      >
        {frontmatter.title}
      </Link>
    </article>
  );
}
