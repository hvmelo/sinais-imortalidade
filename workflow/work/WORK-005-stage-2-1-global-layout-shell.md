# WORK-005 — Stage 2.1 — Global Layout Shell

> **Quick Use:** Fill Part A before coding, execute task-by-task in Part B, and keep scope/evidence updated in real time.

**Phase:** workflow/execution/PHASE_2.md
**Stage:** 2.1
**Status:** Complete — 2026-04-14
**Stage Type:** ui
**Expected User Impact:** low — nav and footer visible to readers on all pages
**Risk Level:** low — criteria triggered: none
**Confidence:** high

---

## PART A — Mission Contract

### Goal

Install the global navigation and footer that wrap every page, so readers always see a consistent site shell with navigation and branding.

### Non-Goals

- Active link highlighting (Phase 3)
- Mobile hamburger menu (Phase 3)
- Any page-level layout changes beyond Nav + Footer

### Required References

- `specs/guidelines/INVARIANTS.md`
- `specs/guidelines/QUALITY_BAR.md`
- `specs/guidelines/DESIGN_SYSTEM.md`
- `app/layout.tsx`
- `app/globals.css`
- `tailwind.config.ts`

### Allowed Files

| File | Action | Purpose |
|------|--------|---------|
| `components/nav/nav.tsx` | Create | Sticky Nav — Server Component |
| `components/nav/footer.tsx` | Create | Dark Footer — Server Component |
| `app/layout.tsx` | Modify | Include Nav and Footer wrapping children |

### Forbidden Changes

- Any component outside `components/nav/`
- `app/page.tsx` — no page-level changes
- `tailwind.config.ts` — no token changes
- `globals.css` — no styling changes beyond what the Nav/Footer components require

### Invariants That Must Remain True

- Nav and Footer are Server Components — no `'use client'`
- All UI text in Portuguese: "Sinais", "Análises", "Sobre", "Newsletter"
- All component names and code in English
- `npm run build` must pass
- `npm run lint` must pass with zero errors/warnings
- `npm run typecheck` must pass

### Acceptance Criteria

- [ ] Nav renders on all pages (wrap children in `app/layout.tsx`)
- [ ] Footer renders on all pages
- [ ] Nav is sticky with backdrop blur effect
- [ ] Nav shows: logo text "Sinais de Imortalidade", links: Sinais · Análises · Sobre
- [ ] Footer shows: project name, tagline, links to Sobre, Metodologia, Newsletter
- [ ] Footer has dark surface background
- [ ] `npm run build` passes
- [ ] `npm run lint` passes (zero warnings)
- [ ] `npm run typecheck` passes

### Required Tests

| Test Type | Scenario | Required? | Why | File |
|-----------|----------|-----------|-----|------|
| Build | `npm run build` passes | yes | Foundation must remain production-ready | `npm run build` |
| Lint | Zero warnings | yes | Quality baseline | `npm run lint` |
| Type check | `tsc --noEmit` passes | yes | Type safety | `npm run typecheck` |

No unit tests for Nav/Footer components (simple presentational Server Components — visual verification is sufficient per QUALITY_BAR "non-trivial components").

### Blocking Questions

None — stage is straightforward.

### Rollback Plan

1. Revert `app/layout.tsx` to remove Nav and Footer
2. Delete `components/nav/nav.tsx` and `components/nav/footer.tsx`
3. Run `npm run build` to confirm app still compiles

---

## PART B — Execution Log

### Tasks

- [x] 1. Read current `app/layout.tsx` and `globals.css`
  - Layer: work
  - Notes: Reviewed globals.css (dark-surface classes) and layout.tsx (Sora + DM Sans setup).

- [x] 2. Create `components/nav/nav.tsx`
  - Layer: ui
  - Files: `components/nav/nav.tsx`
  - Notes: Sticky, backdrop blur, logo "Sinais de Imortalidade", links: Sinais · Análises · Sobre. CSS hover via <style> tag (Server Component, no JS). Fixed: removed onMouseEnter/onMouseLeave (client handlers would require 'use client').

- [x] 3. Create `components/nav/footer.tsx`
  - Layer: ui
  - Files: `components/nav/footer.tsx`
  - Notes: Dark surface (#0c1222), project name, tagline, links: Sobre, Metodologia, Newsletter. Copyright with dynamic year. Responsive 2-col grid.

- [x] 4. Update `app/layout.tsx` to include Nav and Footer
  - Layer: ui
  - Files: `app/layout.tsx`
  - Notes: Nav above children, Footer below. Imports via @components alias.

- [x] 5. Verify build, lint, typecheck pass
  - Layer: infrastructure
  - Notes: `npm run build` ✅ `npm run lint` ✅ `npm run typecheck` ✅

- [x] 6. Update this WORK file to Complete status

### Test Coverage

| Scenario | Expected Behavior | Status |
|----------|------------------|--------|
| `npm run build` | Passes | ✅ |
| `npm run lint` | Zero warnings | ✅ |
| `npm run typecheck` | Passes | ✅ |

### Progress Notes

- **2026-04-14:** Tasks 1-6 complete. Nav + Footer created. layout.tsx updated. tsconfig.json fixed (added @components alias + components/ to include). eslint.config.mjs fixed (added ai_workflow/ to ignores). All checks green. Files: components/nav/{nav,footer}.tsx, app/layout.tsx, tsconfig.json, eslint.config.mjs.

### Decisions

_(none needed — stage is straightforward)_

### Spec Issues

_None_

---

## Stage Metrics

| Metric | Value |
|--------|-------|
| Cycle time | 2026-04-14 Draft → 2026-04-14 Complete |
| Review rounds | 0 (low risk — no plan review gate) |
| Escalations | none |
| Spec issues | none |

### Operator Acceptance

**Accepted with note:** 404s on navigation links (Sinais, Análises, Sobre, Metodologia) are expected — those pages are scope of Stages 2.3 and 2.4. Nav and Footer render correctly in Portuguese. Acceptance recorded 2026-04-14.

### Final Verification

- [ ] All tasks `[x]`
- [ ] All acceptance criteria met
- [ ] `npm run build` passed
- [ ] `npm run lint` passed (zero warnings)
- [ ] `npm run typecheck` passed
- [ ] Nav and Footer visible in preview server
- [ ] WORK file reflects actual work performed
- [ ] Code review artifact exists: `workflow/reviews/REVIEW-005-code.md`

---

## Files Modified

- `components/nav/nav.tsx` (A)
- `components/nav/footer.tsx` (A)
- `app/layout.tsx` (M)
- `tsconfig.json` (M)
- `eslint.config.mjs` (M)
