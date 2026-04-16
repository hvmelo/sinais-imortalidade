'use client';

/**
 * HomepageClient — editorial list of signals with filter bar.
 * Client Component.
 */

import { useState } from 'react';
import Link from 'next/link';
import type { Signal } from '@/lib/content/types';

interface HomepageClientProps {
  signals: Signal[];
}

const FILTER_TAGS = ['Todos', 'Longevidade', 'IA & Ciência', 'Genômica', 'Transhumanismo'];

export function HomepageClient({ signals }: HomepageClientProps) {
  const [activeTag, setActiveTag] = useState<string>('Todos');

  const filtered =
    activeTag === 'Todos'
      ? signals
      : signals.filter((s) => s.frontmatter.tags.includes(activeTag));

  const displaySignals = filtered.slice(0, 4);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-sm mb-xl">
        {FILTER_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`font-headline text-xs font-semibold uppercase tracking-widest py-xs border-b-2 transition-colors ${
              activeTag === tag
                ? 'text-primary border-primary'
                : 'text-neutral-400 border-transparent hover:text-primary'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Signals list */}
      {displaySignals.length === 0 ? (
        <p className="font-body text-sm text-neutral-700">
          Nenhum sinal encontrado para este tema.
        </p>
      ) : (
        <div className="border-t border-neutral-200">
          {displaySignals.map((signal) => (
            <div key={signal.frontmatter.slug} className="border-b border-neutral-200 py-lg last:border-b-0">
              <div className="flex items-center gap-md mb-sm">
                <span className="font-headline text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-sm py-xs">
                  {signal.frontmatter.tags[0] ?? ''}
                </span>
                <span className="font-headline text-xs text-neutral-400 font-medium">
                  {signal.frontmatter.date}
                </span>
              </div>
              <Link
                href={`/signals/${signal.frontmatter.slug}`}
                className="font-headline text-base font-semibold text-neutral-900 no-underline leading-[1.45] hover:text-primary transition-colors block"
              >
                {signal.frontmatter.title}
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* View all link */}
      <Link
        href="/signals"
        className="inline-flex items-center gap-xs font-headline text-xs font-bold uppercase tracking-widest text-primary no-underline mt-xl hover:gap-sm transition-all"
      >
        Ver todos os sinais
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </div>
  );
}
