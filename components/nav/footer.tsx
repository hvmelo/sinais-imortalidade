/**
 * Site footer — dark surface, project info and links.
 * Server Component: no client-side JavaScript.
 */

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="site-footer">
      <style>{`
        .site-footer {
          background-color: #0c1222;
          color: #f8fafc;
          padding: 3rem 1.5rem;
          margin-top: 4rem;
        }
        .site-footer-inner {
          max-width: 62rem;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        @media (max-width: 640px) {
          .site-footer-inner {
            grid-template-columns: 1fr;
          }
        }
        .site-footer-brand {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .site-footer-name {
          font-family: var(--font-sora);
          font-weight: 700;
          font-size: 0.9rem;
          color: #f8fafc;
          text-decoration: none;
        }
        .site-footer-tagline {
          font-family: var(--font-dm-sans);
          font-size: 0.8rem;
          color: rgba(248, 250, 252, 0.6);
          line-height: 1.5;
        }
        .site-footer-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          align-items: flex-end;
        }
        @media (max-width: 640px) {
          .site-footer-nav {
            align-items: flex-start;
          }
        }
        .site-footer-link {
          font-family: var(--font-dm-sans);
          font-size: 0.8rem;
          color: rgba(248, 250, 252, 0.7);
          text-decoration: none;
          transition: color 0.15s;
        }
        .site-footer-link:hover {
          color: #22d3ee;
        }
        .site-footer-divider {
          border: none;
          border-top: 1px solid rgba(248, 250, 252, 0.1);
          margin-top: 1.5rem;
          max-width: 62rem;
          margin-left: auto;
          margin-right: auto;
        }
        .site-footer-copy {
          max-width: 62rem;
          margin: 1rem auto 0;
          font-family: var(--font-dm-sans);
          font-size: 0.7rem;
          color: rgba(248, 250, 252, 0.4);
        }
      `}</style>
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <Link href="/" className="site-footer-name">
            Sinais de Imortalidade
          </Link>
          <p className="site-footer-tagline">
            Editorial sobre imortalidade, longevidade e futuro humano.
          </p>
        </div>
        <nav className="site-footer-nav" aria-label="Footer navigation">
          <Link href="/about" className="site-footer-link">
            Sobre
          </Link>
          <Link href="/methodology" className="site-footer-link">
            Metodologia
          </Link>
          <Link href="/newsletter" className="site-footer-link">
            Newsletter
          </Link>
        </nav>
      </div>
      <hr className="site-footer-divider" />
      <p className="site-footer-copy">
        © {new Date().getFullYear()} Sinais de Imortalidade
      </p>
    </footer>
  );
}
