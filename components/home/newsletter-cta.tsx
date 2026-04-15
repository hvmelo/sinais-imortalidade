/**
 * NewsletterCTA — VAR A full-width newsletter section.
 * Placeholder — no provider integration in Phase 2.
 * Server Component.
 */

export function NewsletterCTA() {
  return (
    <section className="newsletter-section" id="newsletter">
      <style>{`
        .newsletter-section {
          width: 100vw;
          margin-left: calc(50% - 50vw);
          background: #132d40;
          padding: 5rem 2.5rem;
          text-align: center;
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .newsletter-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(34,211,238,0.1) 0%, transparent 60%);
          pointer-events: none;
        }
        .newsletter-section h2 {
          font-family: var(--font-sora);
          font-size: 2.75rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
          color: #fff;
          position: relative;
          z-index: 1;
        }
        .newsletter-section__subtitle {
          font-size: 1.05rem;
          color: rgba(255,255,255,0.7);
          margin-bottom: 2.5rem;
          line-height: 1.7;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          font-weight: 300;
          position: relative;
          z-index: 1;
        }
        .newsletter-form {
          display: flex;
          gap: 0.75rem;
          max-width: 540px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          flex-wrap: wrap;
          justify-content: center;
        }
        .newsletter-form input {
          flex: 1;
          min-width: 200px;
          padding: 1rem 1.75rem;
          font-family: var(--font-dm-sans);
          font-size: 0.95rem;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          outline: none;
          color: #fff;
          border-radius: 8px;
          transition: all 0.2s;
        }
        .newsletter-form input::placeholder {
          color: rgba(255,255,255,0.3);
        }
        .newsletter-form input:focus {
          border-color: #22d3ee;
          background: rgba(255,255,255,0.15);
        }
        .newsletter-form button {
          font-family: var(--font-sora);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 1rem 2.5rem;
          background: #22d3ee;
          color: #132d40;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .newsletter-form button:hover {
          background: #0891b2;
        }
        .newsletter-section__note {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.2);
          margin-top: 1rem;
          position: relative;
          z-index: 1;
          font-family: var(--font-dm-sans);
        }
      `}</style>

      <h2>Mantenha o sinal limpo.</h2>
      <p className="newsletter-section__subtitle">
        Receba semanalmente nossas análises mais densas sobre longevidade,
        IA e futuro humano. Sem ruído, sem spam.
      </p>

      <form className="newsletter-form">
        <input
          type="email"
          placeholder="seu@email.com"
          aria-label="Endereço de email"
        />
        <button type="button">Assinar</button>
      </form>

      <p className="newsletter-section__note">
        Integração com provider em breve — Phase 4
      </p>
    </section>
  );
}
