'use client';

/**
 * FilterBar — VAR A filter tabs.
 * Client Component. Controlled: activeTag + onTagChange from parent.
 */

interface FilterBarProps {
  tags: string[];
  activeTag: string;
  onTagChange: (tag: string) => void;
}

export function FilterBar({ tags, activeTag, onTagChange }: FilterBarProps) {
  return (
    <div className="filter-row" role="tablist" aria-label="Filtro por tema">
      <button
        type="button"
        className={`filter-tab${activeTag === 'all' ? ' active' : ''}`}
        onClick={() => onTagChange('all')}
        role="tab"
        aria-selected={activeTag === 'all'}
      >
        Todos
      </button>

      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          className={`filter-tab${activeTag === tag ? ' active' : ''}`}
          onClick={() => onTagChange(tag)}
          role="tab"
          aria-selected={activeTag === tag}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
