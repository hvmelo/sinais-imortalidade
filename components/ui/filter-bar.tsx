'use client';

/**
 * FilterBar — VAR A style filter tabs.
 * Client Component. Controlled: receives activeTag + onTagChange from parent.
 */

interface FilterBarProps {
  tags: string[];
  activeTag: string;
  onTagChange: (tag: string) => void;
}

export function FilterBar({ tags, activeTag, onTagChange }: FilterBarProps) {
  return (
    <div className="filter-row" role="tablist" aria-label="Filtro por tema">
      <style>{`
        .filter-row {
          display: flex;
          gap: 0;
          overflow-x: auto;
          border-top: 1px solid var(--border);
          margin-top: 0.5rem;
          scrollbar-width: none;
        }
        .filter-row::-webkit-scrollbar { display: none; }
        .filter-tab {
          font-family: var(--font-sora);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.75rem 1.25rem;
          color: var(--faint);
          cursor: pointer;
          border-bottom: 2px solid transparent;
          white-space: nowrap;
          transition: all 0.15s;
          user-select: none;
          background: transparent;
          border-left: none;
          border-right: none;
          border-top: none;
        }
        .filter-tab:hover { color: var(--ink); }
        .filter-tab.active {
          color: var(--ink);
          border-bottom-color: var(--cyan);
        }
      `}</style>

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
