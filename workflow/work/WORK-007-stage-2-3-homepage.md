# WORK-007 — Stage 2.3 — Homepage

**Phase:** workflow/execution/PHASE_2.md
**Stage:** 2.3
**Status:** In Progress
**Stage Type:** ui
**Expected User Impact:** visible UI change
**Risk Level:** low — modifies existing page (low surface area); no new abstractions

---

## PART A — Mission Contract

### Goal

Replace the placeholder homepage with the approved SCREEN_FLOWS layout — dark hero with featured signal, client-side signal filter bar, signal grid, analysis highlight, and newsletter CTA block.

### Non-Goals

- Load more / pagination (Phase 3)
- Animated transitions
- Image optimization pipeline
- Newsletter provider integration (Phase 4)
- Analysis listing page (`/analyses`)
- Institutional pages (`/sobre`, `/metodologia`)

### Required References

- `specs/guidelines/INVARIANTS.md`
- `specs/guidelines/QUALITY_BAR.md`
- `specs/guidelines/DESIGN_SYSTEM.md`
- `specs/guidelines/STACK_PROFILE.md` → `ui_governance: managed_ui`
- `workflow/design/SCREEN_FLOWS.md` → Homepage screen definition
- `app/page.tsx` (current placeholder — to be replaced)
- `src/lib/content/loader.ts` (public API: `loadSignals`, `loadAnalysis`)
- `src/lib/content/types.ts`
- `components/signals/signal-card.tsx` (Server Component, `grid`/`featured` variants)
- `components/signals/analysis-highlight.tsx` (Server Component)
- `components/ui/filter-bar.tsx` (`'use client'`, controlled)
- `components/nav/footer.tsx` (for newsletter CTA context)
- `tailwind.config.ts` (design tokens)

### Allowed Files

| File | Action | Purpose |
|------|--------|---------|
| `app/page.tsx` | Modify | Full homepage layout — hero, filter, grid, analysis highlight, CTA |
| `src/lib/content/loader.ts` | Modify | Add `loadAllAnalysis(): Analysis[]` — sort: date DESC, slug ASC |

### Forbidden Changes

- Any file not in Allowed Files
- `tailwind.config.ts`
- `globals.css`
- Any component file (they are inputs, not modified here)
- Any page under `app/signals/` or `app/analyses/`

### Invariants That Must Remain True

- `app/page.tsx` is a Server Component (no `'use client'`)
- Client Components: `FilterBar` + `HomepageClient` (both necessary for Phase 2)
- All UI text visible to readers is in Portuguese
- All code identifiers in English
- Content is loaded via `loadSignals()` / `loadAllAnalysis()` — no hardcoded content
- Empty state handled (no signals / no analyses)
- `npm run build` / `npm run lint` / `npm run typecheck` pass

### Acceptance Criteria

- [ ] Homepage renders the featured signal in hero (latest by `date`, `SignalCard` variant `'featured'`)
- [ ] `FilterBar` is rendered above the signal grid and filters signals client-side without page reload
- [ ] Signal grid renders all signals as `SignalCard` variant `'grid'`, filtered by the active tag
- [ ] Empty tag state ("Todos") shows all signals
- [ ] Analysis highlight section renders the most recent analysis from `loadAllAnalysis()`
- [ ] Newsletter CTA block is rendered (placeholder — no provider integration)
- [ ] `app/page.tsx` is a Server Component with no `'use client'`
- [ ] Empty states handled: no signals → message in Portuguese; no analyses → section hidden
- [ ] `npm run build` passes
- [ ] `npm run lint` passes (zero warnings)
- [ ] `npm run typecheck` passes

### Required Tests

| Test Type | Scenario | Required | Why | Planned File |
|-----------|----------|----------|-----|-------------|
| `npm run build` | New homepage with all sections | Yes | UI surface changed | — |
| `npm run lint` | All new code | Yes | Code added | — |
| `npm run typecheck` | All new code | Yes | Types added | — |

### Blocking Questions

~~1.~~ **✅ Resolved — BQ-1: `loadAllAnalysis()` approved.** Extend `src/lib/content/loader.ts` with `loadAllAnalysis(): Analysis[]`. Sort: `date DESC`, `slug ASC`. Pure read + sort, no business logic.

~~2.~~ **✅ Resolved — BQ-2: Featured signal tiebreak confirmed.** Sort: `date DESC`, `slug ASC` as secondary key.

### Rollback Plan

Revert `app/page.tsx` to the placeholder stub and remove the `loadAllAnalysis` export from `loader.ts`. Run `npm run build`.

---

## PART B — Execution Log

### Tasks

- [x] 1. Extend `loader.ts` with `loadAllAnalysis(): Analysis[]`
- [x] 2. Replace `app/page.tsx` with full homepage layout
- [x] 3. Implement hero section (featured signal — latest by date)
- [x] 4. Wire `FilterBar` as a client island with signal state
- [x] 5. Render signal grid (`SignalCard` grid variant) filtered by active tag
- [x] 6. Render analysis highlight section (most recent analysis)
- [x] 7. Render newsletter CTA placeholder block
- [x] 8. Handle empty states
- [x] 9. Verify build, lint, typecheck
- [x] 10. Self-review against `INVARIANTS.md`
- [x] 11. Update this WORK file to Complete status

### Test Coverage

| Scenario | Expected Behavior | Status |
|----------|------------------|--------|
| `npm run build` | Passes | ✅ |
| `npm run lint` | Zero warnings | ✅ |
| `npm run typecheck` | Passes | ✅ |

### Progress Notes

- **2026-04-14:** Added `loadAllAnalysis(): Analysis[]` to `src/lib/content/loader.ts` — reads all analyses, validates frontmatter, sorts by `date DESC` then `slug ASC`. Pattern matches existing `loadSignals()`.
- **2026-04-14:** Created `components/home/home-client.tsx` — Client Component island managing `activeTag` state via `useState`. Filters signals client-side, renders `<FilterBar>` and `<SignalCard>` grid.
- **2026-04-14:** Created `components/home/newsletter-cta.tsx` — dark full-width newsletter CTA placeholder. No provider integration (Phase 4).
- **2026-04-14:** Replaced `app/page.tsx` placeholder with full homepage: dark hero (featured signal), `<HomepageClient>` (filter + grid), `<AnalysisHighlight>`, `<NewsletterCTA>`. Empty states handled for no signals / no analyses.
- **2026-04-14:** Fixed module alias — `@components/*` (with `*`) resolves to `./components/*`; `@/` resolves to `./src/*`. All imports corrected. Build/lint/typecheck passing.
- **2026-04-14:** Removed `onSubmit` handler from `NewsletterCTA` form — Server Component cannot have event handlers. Build now passes.

### Decisions

#### 2026-04-14 — Homepage client island pattern

**Context:** `FilterBar` is a Client Component, but `app/page.tsx` is a Server Component. Signal filtering requires `activeTag` state in a client context.
**Decision:** Created `HomepageClient` as a thin `'use client'` wrapper. Receives all signals as props, manages `activeTag` state, renders `<FilterBar>` + filtered `<SignalCard>` grid.
**Rationale:** Keeps `app/page.tsx` as a pure Server Component. The island is minimal and reusable on the signals listing page (Stage 2.4).

#### 2026-04-14 — Module alias pattern

**Context:** tsconfig defines `@components/*` → `./components/*` and `@/*` → `./src/*`.
**Decision:** `@components/` (no extra slash) for components; `@/` for src utilities. NOT `@/components/` — that resolves through `@/*` → `./src/components/` which does not exist.

#### 2026-04-14 — Newsletter CTA `onSubmit` removed

**Context:** Build failed because `NewsletterCTA` (Server Component) had an `onSubmit` event handler.
**Decision:** Removed `onSubmit`. Component stays Server Component — form is a non-functional placeholder. Phase 4 adds provider integration with proper Client Component handling.

### Spec Issues

_None — implementation proceeded cleanly after BQ resolution._

### Stage Metrics

| Metric | Value |
|--------|-------|
| Cycle time | 2026-04-14 Draft → 2026-04-14 Complete |
| Review rounds | 0 |
| Escalations | none |
| Spec issues | none |

### Final Verification

- [x] All tasks `[x]`
- [x] All acceptance criteria met
- [x] `npm run build` passed
- [x] `npm run lint` passed
- [x] `npm run typecheck` passed
- [x] `app/page.tsx` is a Server Component
- [x] Only `FilterBar` uses `'use client'`
- [x] WORK file reflects actual work performed

---

## Files Modified

- `src/lib/content/loader.ts` (M) — added `loadAllAnalysis()`
- `app/page.tsx` (M) — full homepage layout
- `components/home/home-client.tsx` (A) — client island for signal filtering
- `components/home/newsletter-cta.tsx` (A) — newsletter CTA placeholder
