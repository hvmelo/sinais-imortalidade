'use client';

/**
 * HomepageClient — client island for filter + signal grid.
 * Manages activeTag state. All styling via Tailwind.
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
      <div className="mb-xl">
        <FilterBar tags={allTags} activeTag={activeTag} onTagChange={setActiveTag} />
      </div>

      {filtered.length === 0 ? (
        <p className="font-body text-sm text-neutral-700">
          Nenhum sinal encontrado para este tema.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
          {filtered.map((signal) => (
            <SignalCard key={signal.frontmatter.slug} signal={signal} variant="grid" />
          ))}
        </div>
      )}
    </div>
  );
}
