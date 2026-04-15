/**
 * NewsletterCTA — full-width newsletter signup CTA block.
 * Placeholder — no provider integration in Phase 2.
 * Server Component.
 */

export function NewsletterCTA() {
  return (
    <section
      style={{
        background: '#0c1222',
        borderRadius: '0.75rem',
        padding: '3rem 2rem',
        textAlign: 'center',
        marginTop: '4rem',
      }}
    >
      <style>{`
        .newsletter-cta__eyebrow {
          font-family: var(--font-dm-sans);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #22d3ee;
          margin-bottom: 0.75rem;
        }
        .newsletter-cta__title {
          font-family: var(--font-sora);
          font-size: 1.5rem;
          font-weight: 700;
          color: #f8fafc;
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }
        .newsletter-cta__subtitle {
          font-family: var(--font-dm-sans);
          font-size: 0.9rem;
          color: rgba(248, 250, 252, 0.65);
          margin-bottom: 1.5rem;
          max-width: 480px;
          margin-left: auto;
          margin-right: auto;
        }
        .newsletter-cta__form {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 440px;
          margin: 0 auto;
        }
        .newsletter-cta__input {
          flex: 1;
          min-width: 200px;
          font-family: var(--font-dm-sans);
          font-size: 0.875rem;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 0.5rem;
          padding: 0.6rem 1rem;
          color: #f8fafc;
          outline: none;
          transition: border-color 0.15s;
        }
        .newsletter-cta__input::placeholder {
          color: rgba(248, 250, 252, 0.35);
        }
        .newsletter-cta__input:focus {
          border-color: rgba(34, 211, 238, 0.5);
        }
        .newsletter-cta__button {
          font-family: var(--font-dm-sans);
          font-size: 0.875rem;
          font-weight: 600;
          background: #0891b2;
          color: #ffffff;
          border: none;
          border-radius: 0.5rem;
          padding: 0.6rem 1.25rem;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s;
          white-space: nowrap;
        }
        .newsletter-cta__button:hover {
          background: #0e7490;
        }
        .newsletter-cta__button:active {
          transform: scale(0.98);
        }
        .newsletter-cta__note {
          font-family: var(--font-dm-sans);
          font-size: 0.7rem;
          color: rgba(248, 250, 252, 0.3);
          margin-top: 0.75rem;
        }
      `}</style>

      <p className="newsletter-cta__eyebrow">Newsletter</p>
      <h2 className="newsletter-cta__title">
        Receba os sinais no seu email
      </h2>
      <p className="newsletter-cta__subtitle">
        Um resumo semanal com os sinais mais relevantes sobre longevidade,
        imortalidade e o futuro humano. Sem spam.
      </p>

      <form className="newsletter-cta__form">
        <input
          type="email"
          className="newsletter-cta__input"
          placeholder="seu@email.com"
          aria-label="Endereço de email"
        />
        <button type="submit" className="newsletter-cta__button">
          Assinar
        </button>
      </form>

      <p className="newsletter-cta__note">
        Integração com provider em breve — Phase 4
      </p>
    </section>
  );
}
