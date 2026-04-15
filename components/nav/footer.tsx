/**
 * Site footer — dark surface, brand, manifesto, links.
 * Server Component. All styling via Tailwind.
 */

import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-dark-surface-base px-xl py-3xl">
      <div className="mx-auto max-w-container">
        <div className="grid grid-cols-1 gap-2xl sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand + manifesto */}
          <div className="flex flex-col gap-lg">
            <Link href="/" className="flex items-center gap-sm no-underline">
              <Image
                src="/logo.png"
                alt=""
                width={28}
                height={11}
                className="shrink-0"
              />
              <span className="font-headline text-sm font-bold text-dark-on-surface">
                Sinais de Imortalidade
              </span>
            </Link>
            <p className="font-body text-sm text-dark-on-surface/60 leading-normal max-w-sm">
              Editorial sobre imortalidade, longevidade e futuro humano.
              Filtramos o ruído, contextualizamos os avanços e publicamos
              o que importa — para que você acompanhe os sinais do que vem por aí.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-sm" aria-label="Footer navigation">
            <span className="font-headline text-xs font-bold uppercase tracking-widest text-dark-on-surface/40 mb-xs">
              Navegação
            </span>
            <Link
              href="/signals"
              className="font-body text-sm text-dark-on-surface/70 no-underline transition-colors hover:text-dark-accent"
            >
              Sinais
            </Link>
            <Link
              href="/analyses"
              className="font-body text-sm text-dark-on-surface/70 no-underline transition-colors hover:text-dark-accent"
            >
              Análises
            </Link>
            <Link
              href="/about"
              className="font-body text-sm text-dark-on-surface/70 no-underline transition-colors hover:text-dark-accent"
            >
              Sobre
            </Link>
          </nav>

          {/* Newsletter mini */}
          <div className="flex flex-col gap-sm">
            <span className="font-headline text-xs font-bold uppercase tracking-widest text-dark-on-surface/40 mb-xs">
              Newsletter
            </span>
            <p className="font-body text-sm text-dark-on-surface/50 leading-normal">
              Um resumo semanal com os sinais mais relevantes. Sem spam.
            </p>
            <Link
              href="/#newsletter"
              className="font-headline text-xs font-semibold text-primary no-underline hover:text-primary-hover transition-colors"
            >
              Assinar newsletter →
            </Link>
          </div>
        </div>

        <hr className="mt-2xl border-none border-t border-t-dark-on-surface/10" />
        <p className="mt-lg font-body text-xs text-dark-on-surface/30">
          © {new Date().getFullYear()} Sinais de Imortalidade
        </p>
      </div>
    </footer>
  );
}
