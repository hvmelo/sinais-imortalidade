/**
 * Homepage — /
 * Server Component.
 *
 * Layout: Hero → Two-col (signals + sidebar) → Analyses → Newsletter → Footer
 *
 * Editorial hierarchy:
 *   Section labels: eyebrow (xs, uppercase, muted)
 *   Section titles: text-2xl Sora bold
 *   Content titles: text-base (signal list) / text-lg (analysis cards)
 */

import Link from 'next/link';
import { SignalCard } from '@components/signals/signal-card';
import { AnalysisHighlight } from '@components/signals/analysis-highlight';
import { AnalysisCard } from '@components/signals/analysis-card';
import { HomepageClient } from '@components/home/home-client';
import { NewsletterCTA } from '@components/home/newsletter-cta';
import { loadSignals, loadAllAnalysis } from '@/lib/content/loader';

export default function HomePage() {
  const signals = loadSignals();
  const analyses = loadAllAnalysis();

  const featuredSignal =
    signals.length > 0
      ? [...signals].sort((a, b) => {
          const d = b.frontmatter.date.localeCompare(a.frontmatter.date);
          return d !== 0 ? d : a.frontmatter.slug.localeCompare(b.frontmatter.slug);
        })[0]
      : null;

  const latestAnalysis = analyses.length > 0 ? analyses[0] : null;

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
            <p className="font-headline text-xs font-bold uppercase tracking-widest text-neutral-400 mb-sm">
              Sinais recentes
            </p>
            <h2 className="font-headline text-2xl font-extrabold text-neutral-900 mb-2xl">
              O que mudou esta semana
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
            {latestAnalysis && (
              <AnalysisHighlight analysis={latestAnalysis} />
            )}
          </aside>
        </div>
      </section>

      {/* ── Analyses ───────────────────────────────────────── */}
      {analyses.length > 0 && (
        <section className="pb-2xl px-xl">
          <div className="mx-auto max-w-container">
            <p className="font-headline text-xs font-bold uppercase tracking-widest text-neutral-400 mb-sm">
              Análises
            </p>
            <h2 className="font-headline text-2xl font-extrabold text-neutral-900 mb-2xl">
              Contexto e interpretação
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
              {analyses.slice(0, 3).map((analysis) => (
                <AnalysisCard key={analysis.frontmatter.slug} analysis={analysis} />
              ))}
            </div>

            <p className="mt-xl font-headline text-sm font-semibold">
              <Link
                href="/analyses"
                className="text-primary no-underline hover:text-primary-hover transition-colors"
              >
                Ver todas as análises →
              </Link>
            </p>
          </div>
        </section>
      )}

      {/* ── Newsletter ─────────────────────────────────────── */}
      <NewsletterCTA />
    </main>
  );
}
