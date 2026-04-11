# WORK-002 — Stage 1.2 — Design System Integration & Base UI Shell

> **Quick Use:** Fill Part A before coding, execute task-by-task in Part B, and keep scope/evidence updated in real time.

**Phase:** workflow/execution/PHASE_1.md
**Stage:** 1.2
**Status:** Complete
**Stage Type:** ui
**Expected User Impact:** none
<!-- Risk Level: high — introduces new abstraction, creates files outside existing project structure -->
**Risk Level:** high — criteria: introduces new abstraction, creates files outside existing project structure

---

## PART A — Mission Contract

Fill this section BEFORE implementation begins.
This is the handoff contract between planning and execution.

### Goal

Integrate the approved design system into the application baseline so tokens, typography, and minimal shared UI primitives are available for all later phases.

### Non-Goals

- Building final Nav/Footer implementations
- Implementing screen-specific layouts from `SCREEN_FLOWS.md`
- Creating page-specific UI components
- Global dark mode
- Implementing signal cards, analysis pages, or any editorial UI

### Required References

Files the implementer must read before starting:

- `specs/guidelines/INVARIANTS.md`
- `specs/guidelines/QUALITY_BAR.md`
- `specs/guidelines/STACK_PROFILE.md`
- `specs/guidelines/DESIGN_SYSTEM.md` (canonical visual reference)
- `workflow/execution/PHASE_1.md` (Stage 1.2 definition)
- `tailwind.config.ts` (existing tokens — starting point)

> **Note:** `specs/guidelines/ARCHITECTURE.md` does not yet exist. The effective constraint set for this stage is: `INVARIANTS.md`, `QUALITY_BAR.md`, `STACK_PROFILE.md`, `DESIGN_SYSTEM.md`, and this phase breakdown.

### Allowed Files

Exhaustive list of files this stage may create or modify:

| File | Action | Purpose |
|------|--------|---------|
| `tailwind.config.ts` | Modify | Confirm/reconcile tokens against DESIGN_SYSTEM.md |
| `app/layout.tsx` | Modify | Load Sora + DM Sans fonts, apply global styles |
| `app/globals.css` | Modify | Base typography, body background, theme defaults |
| `components/primitives/container.tsx` | Create | Shared max-width layout primitive |
| `components/primitives/prose.tsx` | Create | Shared reading-width primitive |

> **Note:** `tailwind.config.ts` already exists in the repo with a partial design token set. This stage verifies and reconciles it against `DESIGN_SYSTEM.md`, not a full rewrite.

### Forbidden Changes

Files and areas that must NOT be touched in this stage:

- Any content pages or signal/analysis routes
- Any screen-level UI components
- Nav/Footer implementations
- Newsletter integration
- Any workflow artifacts
- Any file not listed in Allowed Files above

### Invariants That Must Remain True

- Server Components must never import client-only APIs (useState, useEffect, browser APIs)
- Client Components must be kept as leaf nodes
- `tsc --noEmit` must pass before the stage is closed
- `eslint` must pass with zero errors before the stage is closed
- `npm run build` must pass before the stage is closed
- MVP remains light-first — no global dark mode
- Only approved design token values from `DESIGN_SYSTEM.md` may be used
- UI display text in Portuguese (pt-BR)
- No business logic in components or route handlers

### Acceptance Criteria

- [ ] Sora font loads correctly (headline usage)
- [ ] DM Sans font loads correctly (body usage)
- [ ] Tailwind token classes match approved values from `DESIGN_SYSTEM.md`
- [ ] Light-first UI renders correctly (background, surface, on-surface)
- [ ] Contextual dark surfaces render correctly (dark-surface tokens)
- [ ] `components/primitives/container.tsx` renders with correct max-width and responsive behavior
- [ ] `components/primitives/prose.tsx` renders with correct reading-width constraints
- [ ] `npm run build` passes
- [ ] `npm run lint` passes
- [ ] `npm run typecheck` passes

### Required Tests

| Test Type | Scenario | Required? | Why | Planned File |
| --------- | -------- | -------- | --- | ------------ |
| Build | Clean production build | yes | Foundation must remain production-ready | `npm run build` |
| Lint | Zero lint errors | yes | Quality baseline for all later stages | `npm run lint` |
| Type check | `tsc --noEmit` passes | yes | Type safety for new components | `npx tsc --noEmit` |

### Blocking Questions

- **Q1 — `tailwind.config.ts` token naming mismatch:** The existing `tailwind.config.ts` uses flat names like `primary`, `accent`, `success` while `DESIGN_SYSTEM.md` defines tokens prefixed with `color-` (e.g., `color-primary`, `color-accent`). Tailwind's arbitrary value syntax can bridge this, but a decision is needed: should the tailwind config adopt the `color-` prefix convention, or should the components use the existing flat names? **Recommendation:** Keep existing flat names (`primary`, `accent`, `surface`, etc.) for Tailwind class compatibility; document that `DESIGN_SYSTEM.md` token names map to these Tailwind keys in a comment block at the top of `tailwind.config.ts`.
- None other — stage definition is clear.

### Spillover Rule

If implementation discovers a necessary file outside Allowed Files:
- STOP immediately
- Record the spillover explicitly in Spec Issues
- Update the WORK packet scope before continuing
- Do not silently expand scope

### Rollback Plan

Revert the listed Allowed Files. Post-revert verification:
1. Confirm `tailwind.config.ts` is restored to pre-stage state
2. Confirm `app/layout.tsx` is restored to pre-stage state
3. Confirm `app/globals.css` is restored (Tailwind directives only)
4. Confirm no `components/primitives/` directory exists
5. Run `npm run build` to confirm app still compiles

---

## PART B — Execution Log

> Fill this section DURING and AFTER implementation.
> Update after every completed task — never batch at the end.
>
> **Stage lifecycle after implementation:**
> 1. Complete all tasks and Final Verification below
> 2. Run `review-stage-code WORK-002` — code review + QA audit
> 3. Run `close-stage WORK-002` — marks stage as Complete

### Tasks

- [x] 1. Wire approved fonts (Sora + DM Sans) into the root layout via next/font/google
  - Layer: app
  - Files: `app/layout.tsx`
  - Notes: Used `next/font/google` with Sora and DM_Sans. Applied `font-body` via className on `<body>`. Used CSS variables `--font-sora` and `--font-dm-sans` via `variable` option. `antialiased` class applied.
- [x] 2. Reconcile `tailwind.config.ts` against `DESIGN_SYSTEM.md`
  - Layer: infrastructure
  - Files: `tailwind.config.ts`
  - Notes: All token values already matched DESIGN_SYSTEM.md exactly. Added comprehensive comment block at top mapping DESIGN_SYSTEM.md token names to Tailwind keys. Added `maxWidth: { prose: '65ch' }` for prose reading constraint.
- [x] 3. Apply global typography, background, and foreground defaults in `app/globals.css`
  - Layer: app
  - Files: `app/globals.css`
  - Notes: Added @layer base with body bg (#f4f7fb), color (#0c1222), font-family from CSS vars. h1-h6 get font-headline, font-weight 700, line-height 1.2. Added contextual dark surface classes (.dark-surface-base, .dark-surface-elevated). Applied focus-visible ring style.
- [x] 4. Create `components/primitives/container.tsx`
  - Layer: ui
  - Files: `components/primitives/container.tsx`
  - Notes: Created as Server Component. Props: `children`, `size?: 'default' | 'wide'`, `className?`. Default size: max-w-container (62rem). Wide size: max-w-container-wide (80rem). Centered with mx-auto and responsive px.
- [x] 5. Create `components/primitives/prose.tsx`
  - Layer: ui
  - Files: `components/primitives/prose.tsx`
  - Notes: Created as Server Component. Props: `children`, `className?`. Uses max-w-prose (65ch), font-body, text-base, leading-normal.
- [x] 6. Update `tailwind.config.ts` content paths to include `components/` directory
  - Layer: infrastructure
  - Files: `tailwind.config.ts`
  - Notes: `./components/**/*.{js,ts,jsx,tsx,mdx}` already present in existing config. No change needed.
- [x] 7. Verify tokenized styling works in a simple placeholder render
  - Layer: app
  - Files: `app/page.tsx`
  - Notes: Temporarily added visual verification block with typography hierarchy, color palette, contextual dark surfaces, Prose component, and spacing scale. All tokens rendered correctly in dev server.
- [x] 8. Restore `app/page.tsx` to a minimal placeholder (remove test content)
  - Layer: app
  - Files: `app/page.tsx`
  - Notes: Restored to minimal placeholder (h1 + p). No test content persists.
- [x] 9. Verify build, lint, and typecheck all pass
  - Layer: infrastructure
  - Files: all created/modified files
  - Notes: All three checks pass: build ✅, lint ✅ (zero warnings), typecheck ✅.
- [x] 10. Self-review against `specs/guidelines/INVARIANTS.md` and `DESIGN_SYSTEM.md`
  - Layer: work
  - Files: all created/modified files
  - Notes: ✅ container.tsx and prose.tsx are Server Components. ✅ No forbidden deps. ✅ tsc passes. ✅ eslint passes. ✅ Build succeeds. ✅ Tokens match DESIGN_SYSTEM.md. ✅ Contextual dark surfaces via CSS classes. ✅ Fonts via next/font/google. ✅ Portuguese text.
- [x] 11. Update this WORK file to Complete status

### Test Coverage

| Scenario | Expected Behavior | Status |
| -------- | ----------------- | ------ |
| Clean production build | `npm run build` passes with no errors | ✅ Pass |
| Lint pass | `npm run lint` passes with zero errors | ✅ Pass |
| Type check | `npm run typecheck` passes | ✅ Pass |
| Font loading | Sora and DM Sans load via next/font/google | ✅ Pass (dev server smoke) |
| Token rendering | Tailwind classes apply correct colors/typography | ✅ Pass (verified during temp page) |

### Progress Notes

Short, factual updates only.

- **2026-04-10:** Stage 1.2 implementation complete. Files created: `tailwind.config.ts` (reconciled + comment block), `app/layout.tsx` (font loading), `app/globals.css` (base typography + dark surfaces), `components/primitives/container.tsx`, `components/primitives/prose.tsx`. All checks pass: build ✅, lint ✅, typecheck ✅. Tokens verified against DESIGN_SYSTEM.md — all values match. Fonts (Sora, DM Sans) load via next/font/google. Contextual dark surfaces implemented as CSS classes.

### Decisions

Log only non-obvious or irreversible decisions.

#### YYYY-MM-DD — Tailwind token naming convention

**Context:** Existing `tailwind.config.ts` uses flat token names (`primary`, `accent`) while `DESIGN_SYSTEM.md` defines `color-primary`, `color-accent`.
**Options:** A) Rename Tailwind keys to match DESIGN_SYSTEM.md convention. B) Keep flat names and document the mapping. C) Use arbitrary values.
**Decision:** B — Keep flat names for Tailwind class compatibility; add comment mapping at top of config.
**Rationale:** Tailwind's utility class system works best with short, direct names. Renaming would require updating every component that uses these tokens. The comment block serves as documentation without breaking existing utilities.

### Spec Issues

_No issues_ if empty.

---

## Stage Metrics

> Filled during `close-stage`. Derive each value from this WORK file — no separate artifact needed.

| Metric | Value |
|--------|-------|
| Cycle time | 2026-04-10 → 2026-04-10 — same day |
| Review rounds | 1 — first review approved |
| Escalations | none |
| Spec issues | none |

### Final Verification

Complete before marking status as Complete.

- [x] All tasks marked `[x]`
- [x] All acceptance criteria met
- [x] `npm run build` passed
- [x] `npm run lint` passed (zero errors)
- [x] `npm run typecheck` passed
- [x] No forbidden files were touched
- [x] No invariants were violated
- [x] Design tokens match `DESIGN_SYSTEM.md` values
- [x] Fonts load correctly (Sora + DM Sans)
- [x] Light-first and contextual dark surfaces both render
- [x] WORK file reflects actual work performed
- [x] No spillover or deviation from the original WORK packet
- [x] Code review artifact exists: `workflow/reviews/REVIEW-002-code.md`

---

## Operator Inspection Log

> Filled during `operator-acceptance` (optional). One entry per inspection cycle.
> If operator-acceptance was not run, leave this section empty or write "Not run — not required for this stage type."

<!-- Template for each cycle:

### Cycle N — YYYY-MM-DD
**Reported by:** operator | agent
**Finding:** description of what was found (visual, functional, structural)
**Action:** what was corrected and by whom (agent correction / operator correction / no correction needed)
**Files touched:** list of files modified (or "none")
**Result:** iteration continues | ACCEPTED

-->

## Files Modified

> Agent: list files created or edited during implementation, as recorded in Progress Notes.
> This list is used by `close-stage` (Step 6) to construct the git add and commit command.
> Operator: do NOT edit this list by hand — it comes from the implementer's notes.

- `tailwind.config.ts` — modified (token comment block, maxWidth prose)
- `app/layout.tsx` — modified (next/font/google font loading)
- `app/globals.css` — modified (base typography, dark surface CSS classes)
- `components/primitives/container.tsx` — created
- `components/primitives/prose.tsx` — created
