'use client';

/**
 * FilterBar — controlled filter pills.
 * Client Component. All styling via Tailwind.
 */

interface FilterBarProps {
  tags: string[];
  activeTag: string;
  onTagChange: (tag: string) => void;
}

export function FilterBar({ tags, activeTag, onTagChange }: FilterBarProps) {
  return (
    <div role="tablist" aria-label="Filtro por tema" className="flex flex-wrap gap-sm">
      <button
        type="button"
        role="tab"
        aria-selected={activeTag === 'all'}
        onClick={() => onTagChange('all')}
        className={`font-headline text-sm font-semibold rounded-full px-lg py-sm cursor-pointer border transition-all ${
          activeTag === 'all'
            ? 'border-primary bg-primary/10 text-primary'
            : 'border-neutral-200 bg-surface text-neutral-400 hover:border-primary/40 hover:text-primary/70'
        }`}
      >
        Todos
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          role="tab"
          aria-selected={activeTag === tag}
          onClick={() => onTagChange(tag)}
          className={`font-headline text-sm font-semibold rounded-full px-lg py-sm cursor-pointer border transition-all ${
            activeTag === tag
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-neutral-200 bg-surface text-neutral-400 hover:border-primary/40 hover:text-primary/70'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
