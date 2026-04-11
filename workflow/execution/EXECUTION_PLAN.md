# Sinais de Imortalidade — Plan

## Objective

Construir e lançar uma publicação editorial AI-native sobre imortalidade via tecnologia,
com site signal-first, formato dual (Sinais + Análises), newsletter com captura de email,
e publicação manual de conteúdo editorial com cadência.

**Delivery target:** MVP launch — site funcional publicando conteúdo editorial com cadência,
com newsletter signup ativo e mecânica de publicação operacional.

## Upstream Sources

| Artifact | Status |
|----------|--------|
| `workflow/product/PRODUCT_FRAMING.md` | ✅ Approved (2026-04-10) |
| `workflow/product/MVP_THESIS.md` | ✅ Approved (2026-04-10) |
| `workflow/product/CORE_USER_FLOW.md` | ✅ Approved (2026-04-10) |
| `workflow/design/SCREEN_FLOWS.md` | ✅ Approved (2026-04-10) |
| `specs/guidelines/DESIGN_SYSTEM.md` | ✅ Approved (2026-04-10) |
| `specs/guidelines/STACK_PROFILE.md` | ✅ Updated (2026-04-10) |
| `workflow/product/PRODUCT_ROADMAP.md` | ⬜ Not yet created |
| `workflow/architecture/ARCHITECTURE_EXPLORATION.md` | ⬜ Not required (low structural complexity) |

> **Roadmap note:** `PRODUCT_ROADMAP.md` not yet created. Non-goals and future horizons
> may be underspecified. Run `create-product-roadmap` after launch stabilization.

## Phases

### Phase 1 — Foundation & Content Architecture [launch-critical]

**Goal:** Establish the project skeleton — Next.js app, design tokens in code, content
model definition, and deploy pipeline — so that all subsequent phases build on a working,
deployable base.

**Key deliverables:**
- Next.js App Router project initialized with TypeScript
- Tailwind CSS configured with `DESIGN_SYSTEM.md` tokens (`tailwind.config.ts`)
- Font loading (Sora + DM Sans via Google Fonts)
- Content model defined: canonical file format for Sinais and Análises (MDX or MD + frontmatter) — **this is the opening task of Phase 1; format decision is resolved during this phase**
- Sample content files (≥2 Sinais, ≥1 Análise) for development
- Vercel deployment pipeline (push-to-deploy on `main`)
- Global CSS reset and base typography applied

### Phase 2 — Signal Experience [launch-critical]

**Goal:** Deliver the core product surface — homepage and signal pages — so that a reader
can arrive, scan signals, read one, and understand the editorial identity.

**Key deliverables:**
- Global layout shell: Nav (sticky, backdrop blur, logo), Footer (dark)
- Homepage (`/`): hero signal card (dark), signal grid with filters, análise destaque section, manifesto teaser, newsletter section (full-width dark)
- Sinais listing (`/sinais`): page header with filter tabs, featured card, signal list with load more, sidebar (newsletter widget, categories, related análises)
- Sinal individual (`/sinais/[slug]`): breadcrumb, article header, body (o que aconteceu / por que importa / fonte), related content, newsletter CTA
- Responsive layouts for all screens (mobile-first)
- Subtheme filtering (client-side on homepage and `/sinais`)

### Phase 3 — Analysis Experience & Static Pages [launch-critical]

**Goal:** Complete the editorial surface with analysis pages and institutional content,
establishing the product's authority and transparency credentials.

**Key deliverables:**
- Análises listing (`/analises`): page header with filters, 2-column card grid
- Análise individual (`/analises/[slug]`): cover visual, canonical editorial blocks (Resumo → Contexto → O que mudou → Por que importa → O que ainda não sabemos → Fontes), breadcrumb, related content, newsletter CTA
- Sobre / Manifesto (`/sobre`): hero dark with manifesto quote, project description, editorial philosophy
- Metodologia (`/metodologia`): editorial process, sources, fact-check, AI role
- 404 page with editorial tone

### Phase 4 — Discovery & Newsletter Integration [launch-critical]

**Goal:** Enable content discovery beyond chronological browsing and activate the primary
audience-building mechanism (newsletter signup).

**Key deliverables:**
- Search page (`/busca`): search input, results with type badge and highlighted terms, empty state
- Related content system: automated or tag-based linking between Sinais and Análises
- Newsletter signup integration with chosen provider
- Inline confirmation behavior ("Obrigado! Confirme no seu email.")
- Newsletter CTA consistency across all touchpoints (homepage, sidebar, article footer, full-width section)

### Phase 5 — Publishing Mechanics & Launch Readiness [launch-critical]

**Goal:** Establish the mechanical publishing workflow (commit → deploy) and complete
launch-readiness checks so the product can go live with content.

**Key deliverables:**
- Content publishing mechanics: editor creates/reviews content files → commit to repo → Vercel rebuild
- Editorial guardrails checklist for human editor (vault-based manual review, not automated pipeline)
- SEO fundamentals: meta tags, Open Graph, structured data for articles
- Analytics setup (basic pageview + newsletter conversion tracking)
- RSS feed generation
- Sitemap generation
- Performance audit and optimization (Core Web Vitals)
- Launch checklist verification

### Phase 6 — Visual Refinement [deferrable]

**Goal:** Formalize visual identity application and explore visual alternatives using
Stitch screen generation, ensuring pixel-level consistency across all surfaces.

**Key deliverables:**
- `generate-all-screens` via Stitch for visual exploration
- Visual diff analysis: approved screens vs. implemented code
- Token refinement based on real content rendering
- Mobile UX polish (touch targets, reading comfort, CTA positioning)
- Micro-interaction refinements (hover states, transitions, loading animations)

> **Note:** Recommended for visual consistency. Design system is already approved and
> tokens are scaffolded in `tailwind.config.ts`. This phase applies polish, not
> structural change. Omission requires waiver.

## Out of Scope

- Distribution channels beyond the website (Telegram, X, YouTube, Spotify, Instagram, TikTok)
- Direct monetization (subscriptions, ads, sponsorships)
- SaaS / Blog Engine platform
- CMS / headless CMS / admin panel
- User authentication, accounts, comments, favorites
- Automated end-to-end newsletter sending (MVP uses semi-manual workflow)
- Automated editorial pipeline (fact-check automation, agent-driven publishing without human review)
- Internal dashboards or analytics beyond basic tracking
- Dark mode as global product theme (deferred; only contextual dark surfaces in MVP)
- Dedicated subtheme pages (`/temas`)
- Multi-language support
- Image generation or external image licensing system

## Open Questions

| Question | Owner | Target resolution | Blocking? |
|----------|-------|-------------------|-----------|
| Qual provider de newsletter será usado no MVP? | Henrique | Before Phase 4 scaffold | Yes — blocks newsletter integration |
| Qual formato exato dos arquivos canônicos de conteúdo publicado? (MDX vs MD + frontmatter, schema de campos) | Architecture | Resolved during Phase 1 | Yes — blocks Phase 1 completion |
| Como formalizar o manual editorial do agente no fluxo do projeto? | Henrique / Product | Before Phase 5 scaffold | No — editorial can begin with Vault-based manual |
| Comportamento dos "relacionados" — curado manualmente ou gerado por sistema (tags)? | Architecture | Before Phase 4 scaffold | No — can default to tag-based |
| Mobile vs. desktop UX variations beyond responsive layout? | Design Track | Before Phase 2 scaffold | No — responsive-first is sufficient baseline |

## Amendment Log

— sem entradas —

## Approval

**Approved by:** Henrique
**Date:** 2026-04-10
**Notes:** Approved after PO External review adjustments: objective aligned to MVP manual publishing scope, Phase 5 clarified as publishing mechanics, Phase 1 content format question recategorized.
