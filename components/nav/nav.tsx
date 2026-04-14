/**
 * Site navigation — sticky, backdrop blur, logo + links.
 * Server Component: no client-side JavaScript.
 * Hover effects via CSS :hover in <style> tag.
 */

import Link from 'next/link';

export function Nav() {
  return (
    <nav className="site-nav">
      <style>{`
        .site-nav {
          position: sticky;
          top: 0;
          z-index: 50;
          border-bottom: 1px solid rgba(12, 18, 34, 0.08);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          background-color: rgba(244, 247, 251, 0.9);
        }
        .site-nav-inner {
          max-width: 62rem;
          margin: 0 auto;
          padding: 0.75rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .site-nav-logo {
          font-family: var(--font-sora);
          font-weight: 700;
          font-size: 1rem;
          color: #0c1222;
          text-decoration: none;
          letter-spacing: -0.01em;
        }
        .site-nav-logo:hover {
          opacity: 0.8;
        }
        .site-nav-links {
          display: flex;
          gap: 1.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
          align-items: center;
        }
        .site-nav-link {
          font-family: var(--font-dm-sans);
          font-size: 0.875rem;
          color: #0c1222;
          text-decoration: none;
          opacity: 0.75;
          transition: opacity 0.15s;
        }
        .site-nav-link:hover {
          opacity: 1;
        }
      `}</style>
      <div className="site-nav-inner">
        <Link href="/" className="site-nav-logo">
          Sinais de Imortalidade
        </Link>
        <ul className="site-nav-links">
          <li>
            <Link href="/signals" className="site-nav-link">
              Sinais
            </Link>
          </li>
          <li>
            <Link href="/analyses" className="site-nav-link">
              Análises
            </Link>
          </li>
          <li>
            <Link href="/about" className="site-nav-link">
              Sobre
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
