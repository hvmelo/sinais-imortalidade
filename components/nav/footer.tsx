/**
 * Site footer — dark surface, brand info, links.
 * Server Component. All styling via Tailwind.
 *
 * Only links to routes that exist. Dead links removed per DECIS-012.
 */

import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-dark-surface-base mt-3xl px-xl py-3xl">
      <div className="mx-auto grid max-w-container grid-cols-1 gap-2xl sm:grid-cols-2">
        {/* Brand */}
        <div className="flex flex-col gap-sm">
          <Link
            href="/"
            className="flex items-center gap-sm no-underline"
          >
            <Image
              src="/logo.png"
              alt=""
              width={24}
              height={24}
              className="shrink-0"
            />
            <span className="font-headline text-sm font-bold text-dark-on-surface">
              Sinais de Imortalidade
            </span>
          </Link>
          <p className="font-body text-sm leading-normal text-dark-on-surface/60">
            Editorial sobre imortalidade, longevidade e futuro humano.
          </p>
        </div>

        {/* Nav */}
        <nav
          className="flex flex-col gap-sm items-start sm:items-end"
          aria-label="Footer navigation"
        >
          <Link
            href="/sinais"
            className="font-body text-sm text-dark-on-surface/70 no-underline transition-colors hover:text-dark-accent"
          >
            Sinais
          </Link>
          <Link
            href="/analises"
            className="font-body text-sm text-dark-on-surface/70 no-underline transition-colors hover:text-dark-accent"
          >
            Análises
          </Link>
          <Link
            href="/sobre"
            className="font-body text-sm text-dark-on-surface/70 no-underline transition-colors hover:text-dark-accent"
          >
            Sobre
          </Link>
        </nav>
      </div>

      <hr className="mx-auto mt-xl max-w-container border-none border-t border-t-dark-on-surface/10" />
      <p className="mx-auto mt-lg max-w-container font-body text-xs text-dark-on-surface/40">
        © {new Date().getFullYear()} Sinais de Imortalidade
      </p>
    </footer>
  );
}
