/**
 * Homepage — /
 * Server Component.
 *
 * Layout: Hero → Two-column grid (signals + sidebar) → Newsletter → Footer
 * Sidebar: Analysis highlight + "Sobre o projeto" manifesto
 */

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

  // Grid signals (excluding featured)
  const gridSignals = featuredSignal
    ? signals.filter((s) => s.frontmatter.slug !== featuredSignal.frontmatter.slug)
    : signals;

  return (
    <main>
      {/* ── Hero Sinal ─────────────────────────────────────── */}
      {featuredSignal ? (
        <SignalCard signal={featuredSignal} variant="featured" />
      ) : (
        <section className="py-3xl px-xl text-center">
          <p className="font-headline text-xl font-bold text-neutral-900 mb-sm">
            Nenhum sinal publicado ainda
          </p>
          <p className="font-body text-sm text-neutral-700">
            Volte em breve para novidades sobre longevidade e o futuro humano.
          </p>
        </section>
      )}

      {/* ── Two-column: Signals + Sidebar ──────────────────── */}
      <section className="py-2xl px-xl">
        <div className="mx-auto max-w-container grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-2xl">
          {/* Main column */}
          <div>
            <h2 className="font-headline text-xl font-bold mb-xl">
              Sinais recentes
            </h2>
            {signals.length === 0 ? (
              <p className="font-body text-sm text-neutral-700">
                Nenhum sinal publicado ainda.
              </p>
            ) : (
              <HomepageClient signals={gridSignals} />
            )}
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-2xl">
            {/* Analysis highlight */}
            {latestAnalysis && (
              <AnalysisHighlight analysis={latestAnalysis} />
            )}

            {/* Sobre o projeto */}
            <div>
              <hr className="border-none border-t border-t-neutral-200 mb-2xl" />
              <p className="font-headline text-xs font-bold uppercase tracking-widest text-primary mb-md">
                Sobre o projeto
              </p>
              <p className="font-body text-sm text-neutral-700 leading-normal">
                Sinais de Imortalidade é um editorial sobre longevidade, inteligência artificial
                e o futuro humano. Filtramos o ruído, contextualizamos os avanços e publicamos
                o que importa — para que você acompanhe os sinais do que vem por aí.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Newsletter full-width ───────────────────────────── */}
      <NewsletterCTA />
    </main>
  );
}
