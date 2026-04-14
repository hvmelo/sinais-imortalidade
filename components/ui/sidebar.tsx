/**
 * Sidebar — newsletter placeholder + categories + related analyses placeholder.
 * Server Component.
 */

interface SidebarProps {
  categories: string[];
}

export function Sidebar({ categories }: SidebarProps) {
  return (
    <aside className="sidebar">
      <style>{`
        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .sidebar-card {
          background: #ffffff;
          border: 1px solid rgba(12, 18, 34, 0.08);
          border-radius: 0.75rem;
          padding: 1rem;
        }
        .sidebar-card--dark {
          background: #132d40;
          color: #f8fafc;
          border-color: rgba(34, 211, 238, 0.2);
        }
        .sidebar-title {
          font-family: var(--font-sora);
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }
        .sidebar-text {
          font-family: var(--font-dm-sans);
          font-size: 0.8rem;
          line-height: 1.5;
          color: rgba(12, 18, 34, 0.7);
        }
        .sidebar-card--dark .sidebar-text {
          color: rgba(248, 250, 252, 0.75);
        }
        .sidebar-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .sidebar-item {
          font-family: var(--font-dm-sans);
          font-size: 0.8rem;
          color: #0c1222;
          opacity: 0.8;
        }
      `}</style>

      <section className="sidebar-card sidebar-card--dark">
        <h3 className="sidebar-title">Newsletter</h3>
        <p className="sidebar-text">
          Receba novos sinais e análises no seu email. Integração completa entra na Fase 4.
        </p>
      </section>

      <section className="sidebar-card">
        <h3 className="sidebar-title">Categorias</h3>
        <ul className="sidebar-list">
          {categories.map((category) => (
            <li key={category} className="sidebar-item">
              {category}
            </li>
          ))}
        </ul>
      </section>

      <section className="sidebar-card">
        <h3 className="sidebar-title">Análises relacionadas</h3>
        <p className="sidebar-text">
          Esta seção será conectada na Stage 2.4 com base em tags e contexto editorial.
        </p>
      </section>
    </aside>
  );
}
