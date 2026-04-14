# Phase 2 — Signal Experience

## Goal

Deliver the core product surfaces — homepage and signal pages — so that a reader can arrive, scan signals, read one, and understand the editorial identity.

## Why This Phase Exists

Phase 1 built the foundation: app bootstrap, design tokens, content model, and publishing mechanics. Nothing was visible to a reader yet. Phase 2 turns that foundation into a usable product surface. Without it, the project has no reader experience — the content exists in the repo but cannot be discovered or read on the site.

## High-Level Stages

> **Replaced by detailed breakdown below.** The detailed stages are the authoritative execution plan.

### Stage 2.1 — Global Layout Shell ✅ WORK-005 — 2026-04-14

Install the global layout: sticky navigation with backdrop blur and logo, dark footer, and the shared page shell that every route wraps into.

### Stage 2.2 — Shared UI Components

Build the reusable card and filter components that the homepage and signals listing share: SignalCard, AnalysisHighlight, FilterBar, Sidebar.

### Stage 2.3 — Homepage

Build the homepage (`/`): dark hero with featured signal, signal grid with client-side filters, analysis highlight section, and a full-width dark newsletter CTA block.

### Stage 2.4 — Signals Listing & Individual Page

Build the signals listing page (`/signals`) and the individual signal page (`/signals/[slug]`) with structured body blocks, related content, and newsletter CTA.

## Expected Testable Outcomes

- A reader can visit `/` and see the homepage with the featured signal, signal grid, and newsletter CTA
- A reader can filter signals by subtheme on the homepage and on `/signals` — filtering is client-side and instant
- A reader can visit `/signals` and browse all signals in a structured listing with a sidebar
- A reader can click any signal and reach `/signals/[slug]` where the full signal is rendered with structured blocks
- All pages are responsive — readable and usable on mobile and desktop
- All pages load without errors — build, typecheck, and lint pass throughout

## Non-Goals

- Analysis listing and individual pages (`/analyses`)
- Institutional pages (`/sobre`, `/metodologia`)
- Newsletter provider integration (Stage 4)
- Search functionality (Stage 4)
- Related content automation (Stage 4)
- Launch-readiness work (Phase 5)
- Visual refinement (Phase 6)

## Dependency on Previous Phase

Phase 2 assumes Phase 1 provides:

- Next.js 15 App Router application that builds and runs
- Design tokens and typography (Sora + DM Sans) via Tailwind
- Content loader (`loadSignals()`, `loadAnalysis()`) working and tested
- Sample content files in `content/signals/` and `content/analyses/`
- `components/primitives/container.tsx` and `components/primitives/prose.tsx`
- `workflow/design/SCREEN_FLOWS.md` (approved) and `specs/guidelines/DESIGN_SYSTEM.md` (approved)

## Reference

This phase realizes the Signal Experience as described in `workflow/execution/EXECUTION_PLAN.md`.

---

## Detailed Stage Breakdown

---

### Stage 2.1 — Global Layout Shell

**Objective:** Install the global navigation and footer that wrap every page.

#### Scope

- Sticky Nav with backdrop blur, logo text ("Sinais de Imortalidade"), page links: Sinais · Análises · Sobre
- Dark Footer: project name, tagline, links (Sobre, Metodologia, Newsletter)
- Nav and Footer are Server Components — no client-side interactivity in this stage
- All pages inherit from `app/layout.tsx` (already exists) — this stage only adds Nav and Footer

#### Out of Scope

- Active link highlighting (requires client-side state — Phase 3)
- Mobile hamburger menu (add in Phase 3)
- Any page-level layout changes

#### Planned Files

| File | Action | Purpose |
|------|--------|---------|
| `components/nav/nav.tsx` | Create | Sticky Nav — Server Component |
| `components/nav/footer.tsx` | Create | Dark Footer — Server Component |

#### Steps

1. Read `app/layout.tsx` and `globals.css` to understand current structure
2. Create `components/nav/nav.tsx` — static nav with backdrop blur, logo text, page links
3. Create `components/nav/footer.tsx` — dark footer with links and tagline
4. Update `app/layout.tsx` to include Nav and Footer (wrap `children`)
5. Verify build, lint, typecheck

#### Verification

- `npm run build` passes
- Nav and Footer visible in preview server on all pages

#### Risk Level

- **Level:** low
- **Criteria triggered:** none
- **Confidence:** high

---

### Stage 2.2 — Shared UI Components

**Objective:** Build the reusable card and filter components that the homepage and signals listing share.

#### Scope

- `SignalCard` component — renders a signal with title, description, date, tags, urgency badge. Accepts a `variant` prop: `'grid'` (compact) or `'featured'` (larger with more detail). Server Component.
- `AnalysisHighlight` component — renders a compact analysis card for the homepage featured section. Server Component.
- `FilterBar` component — client-side subtheme filter bar. Uses `useState` for active filter. Accepts `tags: string[]` prop. **Client Component (`'use client'`).**
- `Sidebar` component — composes newsletter placeholder widget + category list + related analyses. Server Component.

#### Out of Scope

- Newsletter widget with real integration (Phase 4)
- Full search functionality (Phase 4)
- Active route highlighting in nav (Phase 3)

#### Planned Files

| File | Action | Purpose |
|------|--------|---------|
| `components/signals/signal-card.tsx` | Create | Signal card with grid/featured variants |
| `components/signals/analysis-highlight.tsx` | Create | Analysis card for homepage highlight |
| `components/ui/filter-bar.tsx` | Create | Client-side filter bar with `useState` |
| `components/ui/sidebar.tsx` | Create | Composed sidebar with widgets |

#### Steps

1. Create `SignalCard` — receives a `Signal` prop, renders frontmatter fields, supports `variant` prop
2. Create `AnalysisHighlight` — receives an `Analysis` prop, renders thesis + date
3. Create `FilterBar` — **Client Component**, accepts `tags` array, outputs filter buttons, manages active state with `useState`
4. Create `Sidebar` — Server Component composing newsletter placeholder widget, category list, related analyses
5. Verify build, lint, typecheck

#### Verification

- `npm run build` passes
- `npm run lint` passes (zero warnings)
- `npm run typecheck` passes

#### Risk Level

- **Level:** high
- **Criteria triggered:** new abstraction (shared component library), crosses more than one architectural layer (Server + Client components in same stage)
- **Confidence:** high

---

### Stage 2.3 — Homepage

**Objective:** Replace the placeholder homepage with the approved SCREEN_FLOWS design — dark hero, signal grid with filters, analysis highlight, newsletter CTA.

#### Scope

- `app/page.tsx` — replace placeholder with full SCREEN_FLOWS layout:
  - Hero section (dark surface, featured `SignalCard` variant `'featured'`)
  - Signal grid (`SignalCard` variant `'grid'`, 2-3 columns responsive)
  - `FilterBar` (client-side, filters signal grid)
  - Analysis highlight section (`AnalysisHighlight` with latest analysis from `loadAnalysis`)
  - Full-width dark newsletter CTA block
- No load more pagination — all signals on one page (pagination is Phase 3)

#### Out of Scope

- Load more / pagination
- Animated transitions
- Image optimization pipeline

#### Planned Files

| File | Action | Purpose |
|------|--------|---------|
| `app/page.tsx` | Modify | Full homepage layout with all sections |

#### Steps

1. Read `app/page.tsx` and understand current placeholder structure
2. Replace homepage body with: Hero (featured signal) → FilterBar → Signal grid → Analysis highlight → Newsletter CTA
3. Integrate `FilterBar` as client island within Server Component page
4. Call `loadAnalysis()` to get the latest analysis for the highlight section
5. Apply Tailwind classes from `tailwind.config.ts` tokens — no inline styles
6. Verify build, lint, typecheck

#### Verification

- Homepage renders the featured signal in hero, a grid of signals, filter bar, analysis highlight, newsletter CTA
- Filter bar filters signals client-side without page reload
- All Tailwind classes use approved design tokens from `tailwind.config.ts`
- `npm run build`, `npm run lint`, `npm run typecheck` pass

#### Risk Level

- **Level:** low
- **Criteria triggered:** modifies existing page (low surface area)
- **Confidence:** high

---

### Stage 2.4 — Signals Listing & Individual Page

**Objective:** Deliver the `/signals` listing page and the `/signals/[slug]` individual signal page.

#### Scope

- `app/signals/page.tsx` — signals listing: page header, FilterBar, featured SignalCard at top, scrollable signal list, Sidebar
- `app/signals/[slug]/page.tsx` — individual signal: breadcrumb ("Sinais > [title]"), signal header (title, date, tags, urgency), structured body blocks, related signals, newsletter CTA
- Body block structure: `O que aconteceu` / `Por que é significativo` / `O que ainda não sabemos` / `Fontes` — derive these from markdown body headings using heading-level splitting (no full MD parser needed for MVP)
- `notFound()` for invalid slugs

#### Out of Scope

- Pagination (Phase 3)
- Image optimization
- Related content automation (Phase 4)

#### Planned Files

| File | Action | Purpose |
|------|--------|---------|
| `app/signals/page.tsx` | Create | Signals listing page |
| `app/signals/[slug]/page.tsx` | Create | Individual signal page |

#### Steps

1. Create `app/signals/page.tsx` — listing with FilterBar, featured card, list, Sidebar
2. Create `app/signals/[slug]/page.tsx` — individual signal with `params.slug`; call `loadAnalysis` to find related analysis; call `loadSignals` to find related signals by tags
3. Implement a minimal body renderer that splits the markdown body by heading levels to produce semantic blocks — no full MD parser; use string/regex splitting
4. Handle `notFound()` when `loadAnalysis` returns `null`
5. Verify build, lint, typecheck

#### Verification

- `/signals` renders listing with filters and sidebar
- `/signals/[slug]` renders the full signal with structured body blocks
- Invalid slug → `notFound()` response
- `npm run build`, `npm run lint`, `npm run typecheck` pass

#### Risk Level

- **Level:** high
- **Criteria triggered:** creates files outside existing project structure (`app/signals/` is new directory tree), crosses more than one architectural layer (pages + content loading + rendering)
- **Confidence:** high

---

## Stage Advancement Rules

- Each stage must produce a WORK packet before implementation begins
- Stages that change visible UI must update `workflow/reviews/` artifacts and record manual verification
- Internal-only stages (no UI changes) require only `npm run build`, `npm run lint`, `npm run typecheck`
- Browser E2E not required in Phase 2 (deferred to Phase 5)

## Execution Order

- **Stage 2.1 → 2.2 → 2.3 and 2.4** (sequential dependency)
  - **2.1** is first: global layout is a prerequisite for all pages
  - **2.2** is second: shared components are inputs to 2.3 and 2.4
  - **2.3** and **2.4** can run in parallel after 2.2 is complete
  - Both 2.3 and 2.4 depend on 2.2's components

## Additional Execution Rules

- **A.** All UI text visible to readers must be in Portuguese: "Sinais", "Análises", "Sobre", breadcrumbs, labels, empty states, error messages
- **B.** All component and file names in code must be in English (per INVARIANTS)
- **C.** URLs are in English: `app/signals/`, `app/signals/[slug]/`, `app/analyses/` (per DECIS-011 — overrides SCREEN_FLOWS.md URLs)
- **D.** Tailwind classes must use approved design tokens from `tailwind.config.ts` — no arbitrary values (e.g., `bg-[#xxx]`)
- **E.** Client Components (`'use client'`) are only used for interactive elements (FilterBar). All other components are Server Components
- **F.** Body block rendering uses heading-level splitting — no MD parser library in Phase 2

## Risks & Open Questions

- **R1:** `FilterBar` is the only Client Component in Phase 2. Every other component must remain Server Components. This must be enforced at review time.
- **R2:** Body block rendering via heading-level splitting is a simplification. A full MD parser (e.g., `marked`) may be needed in Phase 3 when content complexity increases. Flag this in Decisions if it becomes necessary.
- **R3:** `loadAnalysis` is called on the individual signal page to find related analyses. This is acceptable for MVP scale (< 50 analyses). Revisit in Phase 4 if performance degrades.
- **R4:** DECIS-011 overrides URLs in SCREEN_FLOWS.md (`/sinais` → `/signals`, `/analises` → `/analyses`). All route files must use English URLs.
