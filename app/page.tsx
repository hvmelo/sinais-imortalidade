/**
 * Homepage — /
 * Server Component.
 *
 * SCREEN_FLOWS layout:
 *   Nav → hero sinal → grid de sinais recentes + filtros
 *   → análises em destaque → manifesto curto → newsletter full-width → footer
 *
 * Content sections:
 *   Nav; Hero Sinal; Filtros subtema; Grid Sinais;
 *   Análises em destaque; Manifesto curto; Newsletter full-width; Footer
 */

import { Footer } from '@components/nav/footer';
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
          const d = b.frontmatter.date.localeCompare(a.frontmatter.date);
          return d !== 0 ? d : a.frontmatter.slug.localeCompare(b.frontmatter.slug);
        })[0]
      : null;

  const latestAnalysis = analyses.length > 0 ? analyses[0] : null;

  // Remaining signals (excluding featured)
  const gridSignals = featuredSignal
    ? signals.filter((s) => s.frontmatter.slug !== featuredSignal.frontmatter.slug)
    : signals;

  return (
    <>
      <div className="page-container">
        {/* ── Hero Sinal ─────────────────────────────────────── */}
        {featuredSignal ? (
          <section aria-label="Sinal em destaque" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
            <SignalCard signal={featuredSignal} variant="featured" />
          </section>
        ) : (
          <section style={{ paddingTop: '3rem', paddingBottom: '3rem', textAlign: 'center' }}>
            <p style={{
              fontFamily: 'var(--font-sora)',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--color-neutral-900)',
              marginBottom: '0.5rem',
            }}>
              Nenhum sinal publicado ainda
            </p>
            <p style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.875rem',
              color: 'var(--color-neutral-700)',
            }}>
              Volte em breve para novidades sobre longevidade e o futuro humano.
            </p>
          </section>
        )}

        {/* ── Filtros subtema + Grid Sinais ───────────────────── */}
        <section aria-label="Sinais recentes" style={{ paddingBottom: '3rem' }}>
          <h2 style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            marginBottom: '1.25rem',
          }}>
            Sinais recentes
          </h2>

          {signals.length === 0 ? (
            <p style={{
              color: 'var(--color-neutral-700)',
              fontSize: '0.9rem',
            }}>
              Nenhum sinal publicado ainda.
            </p>
          ) : (
            <HomepageClient signals={gridSignals} />
          )}
        </section>

        {/* ── Análises em destaque ────────────────────────────── */}
        {latestAnalysis && (
          <section aria-label="Análises em destaque" style={{ paddingBottom: '3rem' }}>
            <h2 style={{
              fontSize: '1.1rem',
              fontWeight: 700,
              marginBottom: '1.25rem',
            }}>
              Análises em destaque
            </h2>
            <AnalysisHighlight analysis={latestAnalysis} />
          </section>
        )}

        {/* ── Manifesto curto ─────────────────────────────────── */}
        <section aria-label="Manifesto" style={{ paddingBottom: '3rem' }}>
          <h2 style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            marginBottom: '0.75rem',
          }}>
            Sobre o projeto
          </h2>
          <p style={{
            fontSize: '0.95rem',
            color: 'var(--color-neutral-700)',
            lineHeight: 1.7,
            maxWidth: '640px',
          }}>
            Sinais de Imortalidade é um editorial sobre longevidade, inteligência artificial
            e o futuro humano. Filtramos o ruído, contextualizamos os avanços e publicamos
            o que importa — para que você acompanhe os sinais do que vem por aí.
          </p>
        </section>

        {/* ── Newsletter full-width ───────────────────────────── */}
        <section style={{ paddingBottom: '3rem' }}>
          <NewsletterCTA />
        </section>
      </div>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <Footer />
    </>
  );
}
