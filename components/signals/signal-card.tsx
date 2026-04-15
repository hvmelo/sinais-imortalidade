/**
 * SignalCard — renders a signal card following VAR A design.
 * Server Component. Two variants: 'featured' (dark card with pulse) and 'list' (white card).
 */

import Link from 'next/link';
import type { Signal } from '@/lib/content/types';

interface SignalCardProps {
  signal: Signal;
  variant?: 'featured' | 'list';
}

export function SignalCard({ signal, variant = 'list' }: SignalCardProps) {
  const { frontmatter } = signal;

  if (variant === 'featured') {
    return (
      <article className="card-featured" aria-label="Sinal em destaque">
        <style>{`
          .card-featured {
            background: #132d40;
            border-radius: 12px;
            padding: 1.75rem;
            position: relative;
            overflow: hidden;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
          }
          .card-featured:hover {
            transform: translateY(-2px);
            box-shadow: 0 16px 48px rgba(15,28,46,0.3);
          }
          .card-featured::before {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(ellipse 60% 60% at 100% 0%, rgba(8,145,178,0.2) 0%, transparent 60%);
            pointer-events: none;
          }
          .feat-pulse {
            margin-bottom: 1.25rem;
          }
          .feat-tag {
            font-family: var(--font-sora);
            font-size: 0.6rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #22d3ee;
            margin-bottom: 0.75rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          .feat-tag::before {
            content: '';
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #22d3ee;
            box-shadow: 0 0 8px #22d3ee;
            animation: pulse-dot 2s ease-in-out infinite;
            flex-shrink: 0;
          }
          @keyframes pulse-dot {
            0%, 100% { opacity: 1; box-shadow: 0 0 8px #22d3ee; }
            50% { opacity: 0.4; box-shadow: 0 0 3px #22d3ee; }
          }
          .feat-title {
            font-family: var(--font-sora);
            font-size: 1.5rem;
            font-weight: 800;
            letter-spacing: -0.02em;
            line-height: 1.2;
            color: #fff;
            margin-bottom: 0.75rem;
          }
          .feat-title a { color: inherit; text-decoration: none; }
          .feat-desc {
            font-size: 0.88rem;
            color: rgba(255,255,255,0.55);
            line-height: 1.6;
            margin-bottom: 1.25rem;
            font-weight: 300;
          }
          .feat-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .feat-date {
            font-size: 0.72rem;
            color: rgba(255,255,255,0.3);
            font-family: var(--font-sora);
            font-weight: 300;
          }
          .feat-cta {
            font-family: var(--font-sora);
            font-size: 0.65rem;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: #132d40;
            background: #22d3ee;
            padding: 0.45rem 1rem;
            border-radius: 3px;
            text-decoration: none;
            transition: opacity 0.15s;
            display: inline-block;
          }
          .feat-cta:hover { opacity: 0.85; }
        `}</style>

        {/* Pulse SVG */}
        <div className="feat-pulse">
          <svg width="120" height="28" viewBox="0 0 120 28" fill="none">
            <polyline
              points="0,14 8,14 12,14 16,14 20,12 24,16 28,10 32,18 36,8 40,20 44,6 48,16 52,10 56,14 60,14 68,14 76,14 84,14 92,14 100,14 108,14 120,14"
              stroke="#0891b2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"
            />
            <polyline
              points="0,14 8,14 12,14 16,14 20,12 24,16 28,10 32,18 36,8 40,20 44,6 48,16 52,10 56,14 60,14 68,14 76,14 84,14 92,14 100,14 108,14 120,14"
              stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              strokeDasharray="200" strokeDashoffset="200"
            >
              <animate attributeName="stroke-dashoffset" from="200" to="0" dur="2s" fill="freeze" />
            </polyline>
          </svg>
        </div>

        <div className="feat-tag">{frontmatter.tags[0] ?? 'Sinal'}</div>

        <h2 className="feat-title">
          <Link href={`/signals/${frontmatter.slug}`}>{frontmatter.title}</Link>
        </h2>

        <p className="feat-desc">{frontmatter.description}</p>

        <div className="feat-footer">
          <span className="feat-date">{frontmatter.date}</span>
          <Link href={`/signals/${frontmatter.slug}`} className="feat-cta">
            Ler sinal →
          </Link>
        </div>
      </article>
    );
  }

  // list variant — white card with left border hover
  return (
    <article className="card-var-a" aria-label={frontmatter.title}>
      <style>{`
        .card-var-a {
          background: var(--surface);
          border-top: 1px solid var(--border);
          padding: 1.4rem 1.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }
        .card-var-a::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 2px;
          background: var(--cyan);
          transform: scaleY(0);
          transform-origin: top;
          transition: transform 0.2s ease;
        }
        .card-var-a:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(8,145,178,0.08);
          background: var(--surface);
        }
        .card-var-a:hover::before { transform: scaleY(1); }
        .card-var-a:hover .card-var-a__title { color: var(--cyan); }
        .card-var-a__meta {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 0.5rem;
          flex-wrap: wrap;
        }
        .card-var-a__tag {
          font-family: var(--font-sora);
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.18rem 0.55rem;
          border-radius: 99px;
          background: #f0f9ff;
          color: var(--cyan);
          border: 1px solid rgba(8,145,178,0.15);
        }
        .card-var-a__date {
          font-size: 0.7rem;
          color: var(--faint);
          font-family: var(--font-sora);
          font-weight: 300;
        }
        .card-var-a__title {
          font-family: var(--font-sora);
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.35;
          color: var(--ink);
          margin-bottom: 0.4rem;
          transition: color 0.15s;
          text-decoration: none;
        }
        .card-var-a__title a { color: inherit; text-decoration: none; }
        .card-var-a__desc {
          font-size: 0.82rem;
          color: var(--muted);
          line-height: 1.6;
          font-weight: 300;
        }
      `}</style>

      <div className="card-var-a__meta">
        {frontmatter.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="card-var-a__tag">{tag}</span>
        ))}
        <span className="card-var-a__date">{frontmatter.date}</span>
        {frontmatter.urgency && (
          <span
            style={{
              fontFamily: 'var(--font-sora)',
              fontSize: '0.58rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '0.18rem 0.55rem',
              borderRadius: '99px',
              background: frontmatter.urgency === 'high' ? '#fef2f2' : frontmatter.urgency === 'medium' ? '#fefce8' : '#f0fdf4',
              color: frontmatter.urgency === 'high' ? '#ef4444' : frontmatter.urgency === 'medium' ? '#d29922' : '#3fb950',
              border: `1px solid ${frontmatter.urgency === 'high' ? 'rgba(239,68,68,0.15)' : frontmatter.urgency === 'medium' ? 'rgba(210,153,34,0.15)' : 'rgba(63,185,80,0.15)'}`,
            }}
          >
            {frontmatter.urgency === 'high' ? 'Alta' : frontmatter.urgency === 'medium' ? 'Média' : 'Baixa'}
          </span>
        )}
      </div>

      <h3 className="card-var-a__title">
        <Link href={`/signals/${frontmatter.slug}`}>{frontmatter.title}</Link>
      </h3>

      <p className="card-var-a__desc">{frontmatter.description}</p>
    </article>
  );
}
