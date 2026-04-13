import { loadSinais } from '@/lib/content/loader';
import type { Sinal } from '@/lib/content/types';

export default function HomePage() {
  const sinais = loadSinais();

  return (
    <main style={{ padding: '2rem', fontFamily: 'inherit' }}>
      <h1>Sinais de Imortalidade</h1>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        Editorial sobre imortalidade, longevidade e futuro humano.
      </p>

      {sinais.length === 0 ? (
        <p>Nenhum sinal publicado ainda.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {sinais.map((sinal: Sinal) => (
            <li key={sinal.frontmatter.slug} style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                {sinal.frontmatter.title}
              </h2>
              <p style={{ color: '#555', fontSize: '0.9rem' }}>
                {sinal.frontmatter.description}
              </p>
              <small style={{ color: '#999' }}>
                {sinal.frontmatter.date} · {sinal.frontmatter.tags.join(', ')}
              </small>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
