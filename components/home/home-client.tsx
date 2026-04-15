'use client';

/**
 * HomepageClient — editorial list of signals with filter bar.
 * Client Component. Max 4 items, divider between rows, link to /signals.
 */

import { useState } from 'react';
import Link from 'next/link';
import { FilterBar } from '@components/ui/filter-bar';
import type { Signal } from '@/lib/content/types';

interface HomepageClientProps {
  signals: Signal[];
}

export function HomepageClient({ signals }: HomepageClientProps) {
  const [activeTag, setActiveTag] = useState<string>('all');

  const allTags = Array.from(
    new Set(signals.flatMap((s) => s.frontmatter.tags))
  ).sort();

  const filtered =
    activeTag === 'all'
      ? signals
      : signals.filter((s) => s.frontmatter.tags.includes(activeTag));

  const displaySignals = filtered.slice(0, 4);

  return (
    <div>
      <div className="mb-xl">
        <FilterBar tags={allTags} activeTag={activeTag} onTagChange={setActiveTag} />
      </div>

      {displaySignals.length === 0 ? (
        <p className="font-body text-sm text-neutral-700">
          Nenhum sinal encontrado para este tema.
        </p>
      ) : (
        <div>
          {displaySignals.map((signal, i) => (
            <div key={signal.frontmatter.slug}>
              {i > 0 && (
                <hr className="border-none border-t border-t-neutral-200 my-lg" />
              )}
              <article className="flex flex-wrap items-baseline gap-sm">
                {/* tag */}
                <div className="shrink-0">
                  {signal.frontmatter.tags[0] && (
                    <span className="font-headline text-xs font-bold uppercase tracking-widest text-primary">
                      {signal.frontmatter.tags[0]}
                    </span>
                  )}
                </div>

                {/* title */}
                <Link
                  href={`/signals/${signal.frontmatter.slug}`}
                  className="font-headline text-base font-bold text-on-surface no-underline hover:text-primary transition-colors flex-1 min-w-0"
                >
                  {signal.frontmatter.title}
                </Link>

                {/* date */}
                <span className="font-headline text-xs text-neutral-400 font-light shrink-0">
                  {signal.frontmatter.date}
                </span>
              </article>
            </div>
          ))}
        </div>
      )}

      <p className="mt-xl font-headline text-sm font-semibold">
        <Link
          href="/signals"
          className="text-primary no-underline hover:text-primary-hover transition-colors"
        >
          Ver todos os sinais →
        </Link>
      </p>
    </div>
  );
}
