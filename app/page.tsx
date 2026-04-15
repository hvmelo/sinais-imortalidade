/**
 * Homepage — /
 * Server Component.
 * VAR A layout: page header → 2-col grid (featured+list / sidebar) → newsletter CTA → footer.
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

  // Featured: latest signal by date DESC, slug ASC
  const featuredSignal =
    signals.length > 0
      ? [...signals].sort((a, b) => {
          const d = b.frontmatter.date.localeCompare(a.frontmatter.date);
          return d !== 0 ? d : a.frontmatter.slug.localeCompare(b.frontmatter.slug);
        })[0]
      : null;

  const latestAnalysis = analyses.length > 0 ? analyses[0] : null;

  return (
    <>
      {/* ── Page header ─────────────────────────────────────── */}
      <div className="page-header">
        <div className="page-header-inner">
          <div
            style={{
              fontFamily: 'var(--font-sora)',
              fontSize: '0.6rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--cyan)',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '16px',
                height: '1px',
                background: 'var(--cyan)',
              }}
            />
            Sinais Ativos
          </div>

          <h1>O que está acontecendo agora</h1>
          <p className="page-header__subtitle">
            Longevidade, IA e o futuro humano — filtrado, contextualizado, publicado.
          </p>

          {signals.length > 0 && <HomepageClient signals={signals} />}
        </div>
      </div>

      {/* ── 2-col layout ────────────────────────────────────── */}
      <div className="layout-grid">

        {/* Main: featured + list */}
        <div>
          {featuredSignal ? (
            <SignalCard signal={featuredSignal} variant="featured" />
          ) : (
            <div
              style={{
                background: '#132d40',
                borderRadius: '12px',
                padding: '3rem 2rem',
                textAlign: 'center',
                marginBottom: '2rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-sora)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '0.5rem',
                }}
              >
                Nenhum sinal publicado ainda
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.875rem',
                  color: 'rgba(255,255,255,0.55)',
                }}
              >
                Volte em breve para novidades sobre longevidade e o futuro humano.
              </p>
            </div>
          )}

          {signals.length > 1 && (
            <div className="card-list" role="list" aria-label="Sinais recentes">
              {signals
                .filter((s) => s.frontmatter.slug !== featuredSignal?.frontmatter.slug)
                .sort((a, b) =>
                  b.frontmatter.date.localeCompare(a.frontmatter.date)
                )
                .map((signal) => (
                  <div key={signal.frontmatter.slug} className="card-anim">
                    <SignalCard signal={signal} variant="list" />
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="sidebar" aria-label="Sidebar">
          <div className="widget widget--dark">
            <div className="widget__title">Receba os sinais</div>
            <p className="widget__text">
              Quando um sinal novo entra no radar, você é o primeiro a saber.
              Sem spam, sem ruído.
            </p>
            <input
              type="email"
              className="nl-input"
              placeholder="seu@email.com"
              aria-label="Endereço de email"
            />
            <button type="button" className="nl-btn">
              Assinar grátis
            </button>
          </div>

          {latestAnalysis && (
            <AnalysisHighlight analysis={latestAnalysis} />
          )}
        </aside>
      </div>

      {/* ── Newsletter CTA ─────────────────────────────────── */}
      <NewsletterCTA />

      {/* ── Footer ─────────────────────────────────────────── */}
      <Footer />
    </>
  );
}
