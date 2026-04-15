/**
 * NewsletterCTA — full-width newsletter block. Placeholder for Phase 4.
 * Server Component.
 */

export function NewsletterCTA() {
  return (
    <section style={{
      background: 'var(--color-dark-surface-elevated)',
      borderRadius: '12px',
      padding: '3rem 2rem',
      textAlign: 'center' as const,
    }}>
      <h2 style={{
        fontFamily: 'var(--font-sora)',
        fontSize: '1.5rem',
        fontWeight: 800,
        color: 'var(--color-dark-on-surface)',
        marginBottom: '0.75rem',
      }}>
        Receba os sinais no seu email
      </h2>
      <p style={{
        fontSize: '0.9rem',
        color: 'rgba(248,250,252,0.65)',
        maxWidth: '480px',
        margin: '0 auto 1.5rem',
        lineHeight: 1.6,
        fontWeight: 300,
      }}>
        Um resumo semanal com os sinais mais relevantes sobre longevidade,
        imortalidade e o futuro humano. Sem spam.
      </p>
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        maxWidth: '440px',
        margin: '0 auto',
        flexWrap: 'wrap' as const,
        justifyContent: 'center' as const,
      }}>
        <input
          type="email"
          placeholder="seu@email.com"
          aria-label="Endereço de email"
          style={{
            flex: 1,
            minWidth: '200px',
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '0.875rem',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '8px',
            padding: '0.6rem 1rem',
            color: '#f8fafc',
            outline: 'none',
          }}
        />
        <button
          type="button"
          style={{
            fontFamily: 'var(--font-sora)',
            fontSize: '0.875rem',
            fontWeight: 600,
            background: 'var(--color-primary)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            padding: '0.6rem 1.25rem',
            cursor: 'pointer',
            whiteSpace: 'nowrap' as const,
          }}
        >
          Assinar
        </button>
      </div>
      <p style={{
        fontSize: '0.7rem',
        color: 'rgba(248,250,252,0.3)',
        marginTop: '0.75rem',
        fontFamily: 'var(--font-dm-sans)',
      }}>
        Integração com provider em breve — Phase 4
      </p>
    </section>
  );
}
