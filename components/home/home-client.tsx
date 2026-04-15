'use client';

/**
 * HomepageClient — client island for signal filtering on the homepage.
 * Receives all signals and manages active tag filter state.
 * Renders FilterBar and the filtered signal list (VAR A style).
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

  const filteredSignals =
    activeTag === 'all'
      ? signals
      : signals.filter((s) => s.frontmatter.tags.includes(activeTag));

  if (filteredSignals.length === 0) {
    return (
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
    );
  }

  return (
    <div>
      <FilterBar tags={allTags} activeTag={activeTag} onTagChange={setActiveTag} />
      <div className="sinais-list" role="list" aria-label="Lista de sinais">
        {filteredSignals.map((signal) => (
          <div key={signal.frontmatter.slug} className="card-wrap" role="listitem">
            <SignalCard signal={signal} variant="list" />
          </div>
        ))}
      </div>
    </div>
  );
}
