/**
 * Homepage — /
 * Server Component.
 *
 * Layout: Nav → hero (featured signal) → filter + signal grid →
 *         analysis highlight → newsletter CTA → Footer
 *
 * Content is loaded server-side via loadSignals() / loadAllAnalysis().
 * Filter interactivity is delegated to HomepageClient (Client Component island).
 */

import { Container } from '@components/primitives/container';
import { SignalCard } from '@components/signals/signal-card';
import { AnalysisHighlight } from '@components/signals/analysis-highlight';
import { HomepageClient } from '@components/home/home-client';
import { NewsletterCTA } from '@components/home/newsletter-cta';
import { loadSignals, loadAllAnalysis } from '@/lib/content/loader';

export default function HomePage() {
  const signals = loadSignals();
  const analyses = loadAllAnalysis();

  // Featured signal: latest by date DESC, slug ASC (tiebreak)
  const featuredSignal =
    signals.length > 0
      ? [...signals].sort((a, b) => {
          const dateCmp = b.frontmatter.date.localeCompare(a.frontmatter.date);
          if (dateCmp !== 0) return dateCmp;
          return a.frontmatter.slug.localeCompare(b.frontmatter.slug);
        })[0]
      : null;

  const latestAnalysis = analyses.length > 0 ? analyses[0] : null;

  return (
    <main
      style={{
        background: '#0c1222',
        minHeight: '100vh',
        paddingTop: '1.5rem',
        paddingBottom: '4rem',
      }}
    >
      <Container size="default">
        {/* ── Hero: featured signal ─────────────────────────────── */}
        {featuredSignal ? (
          <section
            aria-label="Sinal em destaque"
            style={{ marginBottom: '4rem' }}
          >
            <div
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#22d3ee',
                marginBottom: '1rem',
              }}
            >
              Sinal em destaque
            </div>
            <SignalCard signal={featuredSignal} variant="featured" />
          </section>
        ) : (
          <section
            aria-label="Nenhum sinal disponível"
            style={{
              background: '#132d40',
              borderRadius: '0.75rem',
              padding: '3rem 2rem',
              textAlign: 'center',
              marginBottom: '4rem',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-sora)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#f8fafc',
                marginBottom: '0.5rem',
              }}
            >
              Nenhum sinal publicado ainda
            </p>
            <p
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.875rem',
                color: 'rgba(248,250,252,0.55)',
              }}
            >
              Volte em breve para novidades sobre longevidade e o futuro humano.
            </p>
          </section>
        )}

        {/* ── Signals grid with filter ──────────────────────────── */}
        <section aria-label="Sinais recentes" style={{ marginBottom: '4rem' }}>
          <div
            style={{
              fontFamily: 'var(--font-sora)',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: '#f8fafc',
              marginBottom: '1.25rem',
            }}
          >
            Sinais recentes
          </div>

          {signals.length === 0 ? (
            <p
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.9rem',
                color: 'rgba(248,250,252,0.5)',
              }}
            >
              Nenhum sinal publicado ainda.
            </p>
          ) : (
            <HomepageClient signals={signals} />
          )}
        </section>

        {/* ── Analysis highlight ─────────────────────────────────── */}
        {latestAnalysis ? (
          <section
            aria-label="Análise em destaque"
            style={{ marginBottom: '2rem' }}
          >
            <AnalysisHighlight analysis={latestAnalysis} />
          </section>
        ) : null}

        {/* ── Newsletter CTA ─────────────────────────────────────── */}
        <NewsletterCTA />
      </Container>
    </main>
  );
}
