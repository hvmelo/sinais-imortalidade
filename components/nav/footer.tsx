/**
 * Site footer — dark surface, centered.
 * Server Component.
 */

import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-dark-surface-base px-xl py-[4.5rem] text-center">
      <div className="mx-auto max-w-container">
        {/* Logo */}
        <div className="flex items-center justify-center gap-sm mb-md">
          <Image
            src="/logo.png"
            alt="Sinais de Imortalidade"
            width={140}
            height={54}
            className="h-auto w-[140px]"
          />
        </div>

        {/* Manifesto */}
        <p className="font-body text-xs uppercase tracking-widest text-neutral-400 max-w-[600px] mx-auto leading-[1.8] mb-[2.5rem]">
          Estamos em meio à maior transição biológica da história. Nosso papel é decodificar o ruído e identificar o sinal da vida eterna.
        </p>

        {/* Nav */}
        <nav className="flex justify-center gap-xl mb-[2rem]" aria-label="Footer navigation">
          <Link
            href="/about"
            className="font-headline text-xs font-semibold uppercase tracking-widest text-neutral-400 no-underline hover:text-accent transition-colors"
          >
            Manifesto
          </Link>
          <Link
            href="/privacy"
            className="font-headline text-xs font-semibold uppercase tracking-widest text-neutral-400 no-underline hover:text-accent transition-colors"
          >
            Privacidade
          </Link>
          <Link
            href="/terms"
            className="font-headline text-xs font-semibold uppercase tracking-widest text-neutral-400 no-underline hover:text-accent transition-colors"
          >
            Termos
          </Link>
          <Link
            href="/about#expediente"
            className="font-headline text-xs font-semibold uppercase tracking-widest text-neutral-400 no-underline hover:text-accent transition-colors"
          >
            Expediente
          </Link>
        </nav>

        {/* Copyright */}
        <p className="font-headline text-xs uppercase tracking-widest text-white/30 pt-xl border-t border-white/5">
          © {new Date().getFullYear()} Sinais de Imortalidade. A transmissão é contínua.
        </p>
      </div>
    </footer>
  );
}
