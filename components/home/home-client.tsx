'use client';

/**
 * HomepageClient — client island for signal filtering on the homepage.
 * Receives all signals and manages active tag filter state.
 * Renders FilterBar and the filtered signal grid.
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

  // Extract unique tags preserving insertion order, then sort alphabetically
  const allTags = Array.from(new Set(signals.flatMap((s) => s.frontmatter.tags))).sort();

  const filteredSignals =
    activeTag === 'all'
      ? signals
      : signals.filter((s) => s.frontmatter.tags.includes(activeTag));

  return (
    <section aria-label="Sinais recentes">
      {/* Filter bar */}
      <div style={{ marginBottom: '1.5rem' }}>
        <FilterBar
          tags={allTags}
          activeTag={activeTag}
          onTagChange={setActiveTag}
        />
      </div>

      {/* Signal grid */}
      {filteredSignals.length === 0 ? (
        <p style={{ color: 'rgba(248,250,252,0.5)', fontFamily: 'var(--font-dm-sans)', fontSize: '0.9rem' }}>
          Nenhum sinal encontrado para este tema.
        </p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem',
          }}
        >
          {filteredSignals.map((signal) => (
            <SignalCard key={signal.frontmatter.slug} signal={signal} variant="grid" />
          ))}
        </div>
      )}
    </section>
  );
}
