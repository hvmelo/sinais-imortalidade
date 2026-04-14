# WORK-006 — Stage 2.2 — Shared UI Components

**Phase:** workflow/execution/PHASE_2.md
**Stage:** 2.2
**Status:** Complete
**Stage Type:** ui
**Expected User Impact:** none (components are not yet wired into pages)
**Risk Level:** high — criteria triggered: new abstraction (shared component library), crosses more than one architectural layer (Server + Client components)
**Confidence:** high

---

## PART A — Mission Contract

### Goal

Build the reusable card and filter components that the homepage and signals listing share, so Stages 2.3 and 2.4 can compose pages from these building blocks.

### Key Decisions

- **SignalCard:** Server Component. Two variants: `'grid'` (compact, for listings) and `'featured'` (larger, for hero/featured section). Receives a `Signal` prop.
- **AnalysisHighlight:** Server Component. Compact card for the homepage analysis section. Receives an `Analysis` prop.
- **FilterBar:** **Client Component** (`'use client'`). The only Client Component in Phase 2. Accepts `tags: string[]` and `activeTag` + `onTagChange` props. Manages no state itself — state is lifted to the parent island.
- **Sidebar:** Server Component. Composes newsletter placeholder + category list.

### Non-Goals

- Newsletter widget with real provider integration (Phase 4)
- Full search functionality (Phase 4)
- Active route highlighting in nav (Phase 3)
- Pagination / load more buttons (Phase 3)

### Required References

- `specs/guidelines/INVARIANTS.md`
- `specs/guidelines/QUALITY_BAR.md`
- `specs/guidelines/DESIGN_SYSTEM.md`
- `src/lib/content/types.ts`
- `tailwind.config.ts`

### Allowed Files

| File | Action | Purpose |
|------|--------|---------|
| `components/signals/signal-card.tsx` | Create | Signal card with grid/featured variants |
| `components/signals/analysis-highlight.tsx` | Create | Analysis card for homepage highlight |
| `components/ui/filter-bar.tsx` | Create | Client-side filter bar |
| `components/ui/sidebar.tsx` | Create | Composed sidebar with widgets |

### Forbidden Changes

- Any page file (`app/page.tsx`, `app/signals/`)
- `tailwind.config.ts`
- `globals.css`
- Any file in `src/lib/content/`
- `components/nav/`

### Invariants That Must Remain True

- Only `FilterBar` uses `'use client'`. All other components are Server Components.
- All UI text in Portuguese
- All component names and props in English
- Components receive data as props — they do not fetch or transform
- `npm run build` / `npm run lint` / `npm run typecheck` must pass

### Acceptance Criteria

- [ ] `SignalCard` renders a signal with title, description, date, tags, urgency badge
- [ ] `SignalCard` supports `variant: 'grid' | 'featured'`
- [ ] `AnalysisHighlight` renders an analysis with thesis + date
- [ ] `FilterBar` renders filter buttons from a `tags` array
- [ ] `FilterBar` is the only Client Component
- [ ] `Sidebar` renders newsletter placeholder + category list
- [ ] `npm run build` passes
- [ ] `npm run lint` passes (zero warnings)
- [ ] `npm run typecheck` passes

### Blocking Questions

None.

### Rollback Plan

Delete all files in Allowed Files. Run `npm run build`.

---

## PART B — Execution Log

### Tasks

- [x] 1. Create `SignalCard` component
- [x] 2. Create `AnalysisHighlight` component
- [x] 3. Create `FilterBar` component (Client Component)
- [x] 4. Create `Sidebar` component
- [x] 5. Verify build, lint, typecheck

### Test Coverage

| Scenario | Expected Behavior | Status |
|----------|------------------|--------|
| `npm run build` | Passes | ✅ |
| `npm run lint` | Zero warnings | ✅ |
| `npm run typecheck` | Passes | ✅ |

### Progress Notes

- **2026-04-14:** Stage implemented. Created shared components: `SignalCard`, `AnalysisHighlight`, `FilterBar`, `Sidebar`. `FilterBar` is the only Client Component. Lint/build/typecheck passing.

### Decisions

#### 2026-04-14 — FilterBar state ownership

**Context:** FilterBar needs to manage which tag is active. Where does state live?
**Options:** A) FilterBar owns state internally. B) Parent passes activeTag + onTagChange.
**Decision:** B — state lifted to parent. FilterBar is a controlled component.
**Rationale:** Allows the parent page to control filtering logic. FilterBar is purely presentational + event-emitting. This keeps the Client Component boundary minimal.

### Spec Issues

_None_

---

## Stage Metrics

| Metric | Value |
|--------|-------|
| Cycle time | 2026-04-14 Draft → 2026-04-14 Complete |
| Review rounds | 0 |
| Escalations | none |
| Spec issues | none |

### Final Verification

- [ ] All tasks `[x]`
- [ ] All acceptance criteria met
- [ ] `npm run build` passed
- [ ] `npm run lint` passed
- [ ] `npm run typecheck` passed
- [ ] Only FilterBar has `'use client'`
- [ ] WORK file reflects actual work performed

---

## Files Modified

- `components/signals/signal-card.tsx` (A)
- `components/signals/analysis-highlight.tsx` (A)
- `components/ui/filter-bar.tsx` (A)
- `components/ui/sidebar.tsx` (A)
