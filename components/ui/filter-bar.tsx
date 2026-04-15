'use client';

/**
 * FilterBar — controlled filter pills.
 * Client Component.
 */

interface FilterBarProps {
  tags: string[];
  activeTag: string;
  onTagChange: (tag: string) => void;
}

export function FilterBar({ tags, activeTag, onTagChange }: FilterBarProps) {
  return (
    <div
      role="tablist"
      aria-label="Filtro por tema"
      style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' as const }}
    >
      <button
        type="button"
        role="tab"
        aria-selected={activeTag === 'all'}
        onClick={() => onTagChange('all')}
        style={{
          fontFamily: 'var(--font-sora)',
          fontSize: '0.8rem',
          fontWeight: 600,
          padding: '0.35rem 0.75rem',
          borderRadius: '9999px',
          border: activeTag === 'all' ? '1px solid var(--color-primary)' : '1px solid var(--color-neutral-200)',
          background: activeTag === 'all' ? 'rgba(8,145,178,0.1)' : 'var(--color-surface)',
          color: activeTag === 'all' ? 'var(--color-primary)' : 'var(--color-neutral-400)',
          cursor: 'pointer',
          transition: 'all 0.15s',
        }}
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
          style={{
            fontFamily: 'var(--font-sora)',
            fontSize: '0.8rem',
            fontWeight: 600,
            padding: '0.35rem 0.75rem',
            borderRadius: '9999px',
            border: activeTag === tag ? '1px solid var(--color-primary)' : '1px solid var(--color-neutral-200)',
            background: activeTag === tag ? 'rgba(8,145,178,0.1)' : 'var(--color-surface)',
            color: activeTag === tag ? 'var(--color-primary)' : 'var(--color-neutral-400)',
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
