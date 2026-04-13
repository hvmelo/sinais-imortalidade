import { loadSignals } from '@/lib/content/loader';
import type { Signal } from '@/lib/content/types';

export default function HomePage() {
  const signals = loadSignals();

  return (
    <main style={{ padding: '2rem', fontFamily: 'inherit' }}>
      <h1>Sinais de Imortalidade</h1>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        Editorial sobre imortalidade, longevidade e futuro humano.
      </p>

      {signals.length === 0 ? (
        <p>Nenhum sinal publicado ainda.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {signals.map((signal: Signal) => (
            <li key={signal.frontmatter.slug} style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                {signal.frontmatter.title}
              </h2>
              <p style={{ color: '#555', fontSize: '0.9rem' }}>
                {signal.frontmatter.description}
              </p>
              <small style={{ color: '#999' }}>
                {signal.frontmatter.date} · {signal.frontmatter.tags.join(', ')}
              </small>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
