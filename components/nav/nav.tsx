/**
 * Site navigation — sticky, backdrop blur, logo + links.
 * Server Component. All styling via Tailwind.
 */

import Link from 'next/link';
import Image from 'next/image';

export function Nav() {
  return (
    <nav
      className="sticky top-0 z-50 border-b border-neutral-200/60 bg-background/90 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-container items-center justify-between px-xl py-md">
        <Link href="/" className="no-underline hover:opacity-80 transition-opacity">
          <Image
            src="/logo.png"
            alt="Sinais de Imortalidade"
            width={40}
            height={40}
          />
        </Link>
        <ul className="flex items-center gap-xl list-none m-0 p-0">
          <li>
            <Link
              href="/sinais"
              className="font-body text-sm text-neutral-900 no-underline opacity-75 transition-opacity hover:opacity-100"
            >
              Sinais
            </Link>
          </li>
          <li>
            <Link
              href="/analises"
              className="font-body text-sm text-neutral-900 no-underline opacity-75 transition-opacity hover:opacity-100"
            >
              Análises
            </Link>
          </li>
          <li>
            <Link
              href="/sobre"
              className="font-body text-sm text-neutral-900 no-underline opacity-75 transition-opacity hover:opacity-100"
            >
              Sobre
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
