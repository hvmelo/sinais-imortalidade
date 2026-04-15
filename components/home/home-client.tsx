'use client';

/**
 * HomepageClient — client island for filter tabs + signal list.
 * Receives all signals; manages activeTag state.
 */

import { useState } from 'react';
import { FilterBar } from '@components/ui/filter-bar';
import { SignalCard } from '@components/signals/signal-card';
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

  return (
    <div>
      <FilterBar tags={allTags} activeTag={activeTag} onTagChange={setActiveTag} />

      {filtered.length === 0 ? (
        <p
          style={{
            color: 'var(--muted)',
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '0.9rem',
            padding: '2rem 0',
          }}
        >
          Nenhum sinal encontrado para este tema.
        </p>
      ) : (
        <div className="card-list" role="list" aria-label="Lista de sinais">
          {filtered.map((signal) => (
            <div key={signal.frontmatter.slug} className="card-anim">
              <SignalCard signal={signal} variant="list" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
