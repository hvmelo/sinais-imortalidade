'use client';

/**
 * FilterBar — controlled client component for subtheme filtering.
 */

interface FilterBarProps {
  tags: string[];
  activeTag: string;
  onTagChange: (tag: string) => void;
}

export function FilterBar({ tags, activeTag, onTagChange }: FilterBarProps) {
  return (
    <div className="filter-bar" role="tablist" aria-label="Filtro por tema">
      <style>{`
        .filter-bar {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .filter-btn {
          font-family: var(--font-dm-sans);
          font-size: 0.8rem;
          border: 1px solid rgba(12, 18, 34, 0.12);
          background: #ffffff;
          color: #0c1222;
          border-radius: 9999px;
          padding: 0.35rem 0.75rem;
          cursor: pointer;
          transition: all 0.15s;
        }
        .filter-btn:hover {
          border-color: rgba(8, 145, 178, 0.4);
          color: #0891b2;
        }
        .filter-btn[aria-selected='true'] {
          border-color: #0891b2;
          background: rgba(8, 145, 178, 0.1);
          color: #0891b2;
          font-weight: 600;
        }
      `}</style>

      <button
        type="button"
        className="filter-btn"
        aria-selected={activeTag === 'all'}
        onClick={() => onTagChange('all')}
      >
        Todos
      </button>

      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          className="filter-btn"
          aria-selected={activeTag === tag}
          onClick={() => onTagChange(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
