/**
 * NewsletterCTA — full-width dark section.
 * Server Component. All styling via Tailwind.
 */

export function NewsletterCTA() {
  return (
    <section id="newsletter" className="bg-dark-surface-base py-3xl px-xl">
      <div className="mx-auto max-w-container">
        <p className="font-headline text-xs font-bold uppercase tracking-widest text-dark-on-surface/30 mb-lg">
          Newsletter
        </p>
        <h2 className="font-headline text-2xl lg:text-3xl font-extrabold text-dark-on-surface mb-lg max-w-lg">
          Receba os sinais no seu email
        </h2>
        <p className="font-body text-base text-dark-on-surface/60 max-w-md mb-2xl leading-normal font-light">
          Um resumo semanal com os sinais mais relevantes sobre longevidade,
          imortalidade e o futuro humano. Sem spam.
        </p>
        <div className="flex flex-wrap gap-sm max-w-md">
          <input
            type="email"
            placeholder="seu@email.com"
            aria-label="Endereço de email"
            className="flex-1 min-w-[200px] font-body text-sm bg-dark-on-surface/[0.06] border border-dark-on-surface/10 rounded-md px-lg py-sm text-dark-on-surface placeholder:text-dark-on-surface/30 focus:border-primary focus:outline-none"
          />
          <button
            type="button"
            className="font-headline text-sm font-semibold bg-primary text-on-primary border-none rounded-md px-xl py-sm cursor-pointer whitespace-nowrap hover:bg-primary-hover transition-colors"
          >
            Assinar
          </button>
        </div>
      </div>
    </section>
  );
}
