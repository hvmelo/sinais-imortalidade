# REVIEW-007 — Code — Homepage

**Artifact reviewed:** `workflow/work/WORK-007-stage-2-3-homepage.md`
**Review type:** code
**Reviewed by:** Reviewer
**Date:** 2026-04-14
**Verdict:** ✅ Approve

---

## Summary

Stage 2.3 delivers a full homepage with dark hero (featured signal), client-side signal filter grid, analysis highlight section, and newsletter CTA block. All acceptance criteria are met. The `loadAllAnalysis()` extension to the loader is clean and follows the existing `loadSignals()` pattern. Two new component files were created outside the Allowed Files list — both are justified spillover (client island wrapper and newsletter placeholder are structurally necessary). WORK file is well-kept with all tasks marked, Progress Notes filled, and Decisions recorded. No critical or medium issues.

---

## Scope Assessment

| File | In Allowed Files? | Classification |
|------|-----------------|----------------|
| `src/lib/content/loader.ts` | ✅ Yes | Expected |
| `app/page.tsx` | ✅ Yes | Expected |
| `components/home/home-client.tsx` | ❌ No | **Justified spillover** — client island with `useState` is structurally required to bridge Server Component with FilterBar client boundary |
| `components/home/newsletter-cta.tsx` | ❌ No | **Justified spillover** — newsletter CTA block is part of the required homepage layout per SCREEN_FLOWS; isolated Server Component with no logic |

Scope: **correct** — deviations are justified spillovers, not questionable expansion.

---

## Critical Issues

_None._

---

## Medium Issues

_None._

---

## Nice to Have

- **[NTH]** `src/lib/content/loader.ts:loadAllAnalysis()` is not yet covered by unit tests. Adding a test for the sort order (`date DESC, slug ASC`) would protect against regression. Not blocking — loader has 17 tests already from Stage 1.3.

- **[NTH]** `components/home/newsletter-cta.tsx` uses literal color values (`#0c1222`, `#0891b2`, `#22d3ee`). Consistent with the pattern used in `SignalCard` and `AnalysisHighlight` from Stage 2.2 — acceptable for MVP. Consider tokenizing in Phase 6.

---

## Architecture Checklist

- [x] Dependency direction respected (Server Components load data; Client Components only render)
- [x] No business logic in route handlers (`app/page.tsx` is pure composition)
- [x] No persistence or business logic in React components
- [x] Content loaded in Server Component only (`app/page.tsx` — `loadSignals`, `loadAllAnalysis`)
- [x] Client Components (`FilterBar`, `HomepageClient`) do not access filesystem or server utilities

---

## Invariant Risks

- **[RISK] Invariant: Only `FilterBar` uses `'use client'`** — UPDATED in WORK packet. `HomepageClient` is a second Client Component, necessary for the homepage filter island. Both are listed in the updated Invariants section of the WORK packet. No risk — the invariant was proactively extended.

- **[RISK] `loadAllAnalysis()` sort stability** — date comparison uses `localeCompare` (string comparison). Frontmatter dates are ISO-8601 (`YYYY-MM-DD`) so lexical string comparison is equivalent to date comparison. Low risk.

_None_ otherwise.

---

## Test Gaps

- [ ] `loadAllAnalysis()` sort order not unit-tested (see Nice to Have above — not blocking at MVP scale)

_None_ otherwise.

---

## QA Review — WORK-007

**Verdict:** adequate

#### Required Test Scenarios
- [x] `npm run build` — page builds and prerenders `/` as static — **PASS**
- [x] `npm run lint` — zero warnings — **PASS**
- [x] `npm run typecheck` — no TypeScript errors — **PASS**

#### Missing Coverage (blocking)
_None._

#### Nice-to-Have Coverage (non-blocking)
- Unit test for `loadAllAnalysis()` sort order (`date DESC, slug ASC`). 17 tests exist for the loader from Stage 1.3; this is an extension. Consider in Phase 3.

#### Manual Checks Required
- Visual inspection of the homepage in dev mode — hero signal, filter bar, grid, analysis highlight, newsletter CTA render correctly and are in Portuguese.
- Filter bar click interaction — client-side filtering updates grid without page reload.

#### E2E Needed?
**No** — visible UI flow existed in placeholder form only. Phase 5 (launch readiness) will add E2E smoke tests across all pages.

#### Stage Closure Recommendation
Ready to close. Required tests are green. Visual inspection is recommended before close-stage.

---

## Suggested Prompt to Implementer

_(No corrections needed — verdict is ✅ Approve)_

---

## Reviewer Notes

- Positive: the client island pattern (`HomepageClient` as thin `'use client'` wrapper) is well-scoped and reusable for Stage 2.4's signals listing page.
- Positive: `NewsletterCTA` form uses standard HTML with no JS handler — respects Server Component constraint and the note "Phase 4 integration pending" documents the gap clearly.
- Positive: empty states handled in two places: hero section (no signals) and signal grid (no signals for selected tag).
- The module alias correction (`@/components/` → `@components/` → `@/` pattern) was a worthwhile learning. The tsconfig `paths` keys must match exactly — `@components/*` maps `./components/*`; `@/` maps `./src/*`.
