'use client';

/**
 * NewsletterCTA — full-width dark section.
 * Client Component for form handling.
 */

export function NewsletterCTA() {
  return (
    <section id="newsletter" className="bg-dark-surface-elevated py-[4.5rem] px-xl">
      <div className="mx-auto max-w-container text-center">
        <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-accent/60 mb-lg">
          O Fluxo do Futuro
        </p>
        
        <h2 className="font-headline text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-white mb-lg max-w-[800px] mx-auto leading-[1.15]">
          Assine a Transmissão Semanal
        </h2>
        
        <p className="font-body text-[1.1rem] text-white/70 max-w-[600px] mx-auto leading-[1.6] mb-xl">
          Sinais curados sobre longevidade radical e biologia emergente, entregues diretamente em sua interface de preferência.
        </p>
        
        <form className="flex w-full max-w-[520px] mx-auto mt-lg" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="seu@email.com"
            aria-label="Endereço de email"
            className="flex-1 bg-white/10 border-2 border-white/20 px-xl py-md text-white font-body text-base placeholder:text-neutral-400 focus:border-accent focus:outline-none transition-colors"
          />
          <button
            type="submit"
            className="font-headline text-xs font-extrabold uppercase tracking-widest bg-accent text-dark-surface-elevated px-xl py-md border-none cursor-pointer hover:bg-white transition-colors shrink-0"
          >
            Assinar
          </button>
        </form>
      </div>
    </section>
  );
}
