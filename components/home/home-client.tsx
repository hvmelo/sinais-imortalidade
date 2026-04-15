'use client';

/**
 * HomepageClient — client island for filter + grid.
 * Manages activeTag state; renders FilterBar and filtered SignalCard grid.
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
      <div style={{ marginBottom: '1.5rem' }}>
        <FilterBar tags={allTags} activeTag={activeTag} onTagChange={setActiveTag} />
      </div>

      {filtered.length === 0 ? (
        <p style={{
          color: 'var(--color-neutral-700)',
          fontFamily: 'var(--font-dm-sans)',
          fontSize: '0.9rem',
        }}>
          Nenhum sinal encontrado para este tema.
        </p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem',
        }}>
          {filtered.map((signal) => (
            <SignalCard key={signal.frontmatter.slug} signal={signal} variant="grid" />
          ))}
        </div>
      )}
    </div>
  );
}
