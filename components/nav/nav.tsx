/**
 * Site navigation — sticky, backdrop blur, logo + links + CTA.
 * Server Component.
 */

import Link from 'next/link';
import Image from 'next/image';

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-container items-center justify-between pr-xl py-md pl-xl">
        <Link href="/" className="flex items-center gap-sm no-underline hover:opacity-80 transition-opacity">
          <Image
            src="/logo.png"
            alt="Sinais de Imortalidade"
            width={140}
            height={54}
            className="h-auto w-[140px]"
          />
        </Link>
        <ul className="flex items-center gap-xl list-none m-0 p-0">
          <li>
            <Link
              href="/signals"
              className="font-headline text-xs font-semibold uppercase tracking-widest text-neutral-700 no-underline hover:text-primary transition-colors"
            >
              Sinais
            </Link>
          </li>
          <li>
            <Link
              href="/analyses"
              className="font-headline text-xs font-semibold uppercase tracking-widest text-neutral-700 no-underline hover:text-primary transition-colors"
            >
              Análises
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="font-headline text-xs font-semibold uppercase tracking-widest text-neutral-700 no-underline hover:text-primary transition-colors"
            >
              Sobre
            </Link>
          </li>
          <li>
            <Link
              href="/#newsletter"
              className="font-headline text-xs font-semibold uppercase tracking-widest border-2 border-accent text-primary px-lg py-xs no-underline hover:bg-primary hover:text-white transition-colors"
            >
              Assinar
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
