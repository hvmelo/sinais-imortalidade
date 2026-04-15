/**
 * NewsletterCTA — VAR A full-width newsletter section.
 * Placeholder — provider integration in Phase 4.
 * Server Component.
 */

export function NewsletterCTA() {
  return (
    <section className="newsletter-full" id="newsletter">
      <h2 className="newsletter-full__title">
        Mantenha o sinal limpo.
      </h2>
      <p className="newsletter-full__subtitle">
        Receba semanalmente nossas análises mais densas sobre longevidade,
        IA e futuro humano. Sem ruído, sem spam.
      </p>
      <form className="newsletter-full__form">
        <input
          type="email"
          className="newsletter-full__input"
          placeholder="seu@email.com"
          aria-label="Endereço de email"
        />
        <button type="button" className="newsletter-full__btn">
          Assinar
        </button>
      </form>
      <p className="newsletter-full__note">
        Integração com provider em breve — Phase 4
      </p>
    </section>
  );
}
