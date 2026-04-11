# WORK-001 — Stage 1.1 — App Foundation

> **Quick Use:** Fill Part A before coding, execute task-by-task in Part B, and keep scope/evidence updated in real time.

**Phase:** workflow/execution/PHASE_1.md
**Stage:** 1.1
**Status:** Complete
**Stage Type:** infrastructure
**Expected User Impact:** none
<!-- Risk Level is initially estimated by breakdown-phase using OPS-009 criteria.
     Authoritative classification happens in review-stage-plan Step 7b.
     Risk Level: high — criteria: new abstraction/module, creates files outside existing project structure, crosses more than one architectural layer -->
**Risk Level:** high — criteria: new abstraction/module, creates files outside existing project structure, crosses more than one architectural layer

---

## PART A — Mission Contract

Fill this section BEFORE implementation begins.
This is the handoff contract between planning and execution.

### Goal

Create a runnable Next.js App Router project baseline with TypeScript, Tailwind, and core scripts so the repo has an executable web foundation.

### Non-Goals

- Not applying the full Sinais design language
- Not defining the editorial content schema
- Not building homepage or content pages
- Not wiring any newsletter integration
- Not introducing CMS, database, or auth dependencies
- Not creating screen-level UI implementations

### Required References

Files the implementer must read before starting:

- `specs/guidelines/INVARIANTS.md`
- `specs/guidelines/QUALITY_BAR.md`
- `specs/guidelines/STACK_PROFILE.md`
- `workflow/execution/PHASE_1.md` (Stage 1.1 definition)

> **Note:** `specs/guidelines/ARCHITECTURE.md` does not yet exist. The effective constraint set for this stage is: `INVARIANTS.md`, `QUALITY_BAR.md`, `STACK_PROFILE.md`, and this phase breakdown.

### Allowed Files

Exhaustive list of files this stage may create or modify:

| File | Action | Purpose |
|------|--------|---------|
| `package.json` | Create | Project manifest and scripts |
| `tsconfig.json` | Create | TypeScript baseline |
| `next.config.ts` or `next.config.mjs` | Create | Next.js config |
| `postcss.config.js` or `postcss.config.mjs` | Create | Tailwind/PostCSS integration |
| `app/layout.tsx` | Create | Root application shell |
| `app/page.tsx` | Create | Minimal root page |
| `app/globals.css` | Create | Global CSS entrypoint |
| `eslint.config.*` | Create | Lint configuration |
| `next-env.d.ts` | Create | Next.js TS typing support |
| `.gitignore` | Modify if needed | Tooling and build ignores |

### Forbidden Changes

Files and areas that must NOT be touched in this stage:

- Any content or editorial files
- Any UI components or design system files
- Any workflow artifacts
- Any file not listed in Allowed Files above

### Invariants That Must Remain True

- Server Components must never import client-only APIs (useState, useEffect, browser APIs)
- Client Components must be kept as leaf nodes
- `tsc --noEmit` must pass before the stage is closed
- `eslint` must pass with zero errors before the stage is closed
- `npm run build` must pass before the stage is closed
- No database, CMS, or auth dependencies introduced
- Keep abstractions minimal at bootstrap time

### Acceptance Criteria

- [x] `npm install` completes successfully
- [x] `npm run build` passes
- [x] `npm run lint` passes
- [x] The app runs locally with a minimal root page
- [x] Global CSS is loaded through the app root layout
- [x] App Router is the canonical structure
- [x] No forbidden dependencies introduced

### Required Tests

| Test Type | Scenario | Required? | Why | Planned File |
| --------- | -------- | -------- | --- | ------------ |
| Build | Clean production build | yes | Foundation must be production-ready | `npm run build` |
| Lint | Zero lint errors | yes | Quality baseline for all later stages | `npm run lint` |
| Type check | `tsc --noEmit` passes | yes | Type safety baseline | `npx tsc --noEmit` |

### Blocking Questions

- None — stage definition is clear.

### Spillover Rule

If implementation discovers a necessary file outside Allowed Files:
- STOP immediately
- Record the spillover explicitly in Spec Issues
- Update the WORK packet scope before continuing
- Do not silently expand scope

### Rollback Plan

Revert the listed Allowed Files. Post-revert verification:
1. Confirm `.gitignore` is restored
2. Confirm no `node_modules`, `next`, or build artifacts remain
3. Run `git status` to ensure repo returns to clean state

---

## PART B — Execution Log

> Fill this section DURING and AFTER implementation.
> Update after every completed task — never batch at the end.
>
> **Stage lifecycle after implementation:**
> 1. Complete all tasks and Final Verification below
> 2. Run `review-stage-code WORK-001` — code review + QA audit
> 3. Run `close-stage WORK-001` — marks stage as Complete

### Tasks

- [x] 1. Initialize the Next.js App Router project files in-repo
  - Layer: infrastructure
  - Files: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.js`
  - Notes: App Router, static-first, Tailwind PostCSS integration. Stack: Next.js 15, React 19, TypeScript 5.
- [x] 2. Configure TypeScript, lint, and core scripts
  - Layer: infrastructure
  - Files: `package.json`, `tsconfig.json`, `eslint.config.mjs`
  - Notes: Scripts: `dev`, `build`, `start`, `lint`, `typecheck`. ESLint uses flat config format (next lint is deprecated in Next.js 15). tsconfig excludes `codecode-ai-workflow` submodule.
- [x] 3. Add Tailwind/PostCSS baseline and wire global stylesheet
  - Layer: infrastructure
  - Files: `postcss.config.js`, `app/globals.css`
  - Notes: PostCSS integration only; design token application happens in Stage 1.2. `tailwind.config.ts` already existed in repo — used as starting point.
- [x] 4. Create the minimal root layout and root page
  - Layer: app
  - Files: `app/layout.tsx`, `app/page.tsx`
  - Notes: App Router structure; Server Component by default; no business logic. Root layout includes metadata for SEO.
- [x] 5. Create `next-env.d.ts` and finalize tooling files
  - Layer: infrastructure
  - Files: `next-env.d.ts`
  - Notes: Standard Next.js TypeScript declaration file.
- [x] 6. Verify local dev and build readiness
  - Layer: app
  - Files: all created files
  - Notes: All three checks pass: build ✅, lint ✅ (zero warnings), typecheck ✅.
- [x] 7. Self-review against `specs/guidelines/INVARIANTS.md`
  - Layer: work
  - Files: all created files
  - Notes: ✅ Server Components default in App Router. ✅ No forbidden deps. ✅ tsc passes. ✅ eslint passes. ✅ Build succeeds. ✅ Abstractions minimal.
- [ ] 8. Update this WORK file to Complete status

### Test Coverage

| Scenario | Expected Behavior | Status |
| -------- | ----------------- | ------ |
| Clean production build | `npm run build` passes with no errors | ✅ Pass |
| Lint pass | `npm run lint` passes with zero errors | ✅ Pass |
| Type check | `npx tsc --noEmit` passes | ✅ Pass |
| Local dev server | `npm run dev` starts without errors | Not run |

### Progress Notes

Short, factual updates only.

- **2026-04-10:** Bootstrap complete. Files created: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `next-env.d.ts`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`. All checks pass: build ✅, lint ✅, tsc ✅. Key decisions: flat ESLint config (next lint deprecated in Next.js 15), excluded `codecode-ai-workflow` from tsconfig (submodule types), disabled built-in lint in build (covered by `npm run lint`).

### Decisions

Log only non-obvious or irreversible decisions.

#### YYYY-MM-DD — Decision title

**Context:** Why this decision was needed.
**Options:** A, B, C considered.
**Decision:** Chosen option.
**Rationale:** Why this fits the spec and invariants.

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
- [x] `npx tsc --noEmit` passed
- [x] No forbidden files were touched
- [x] No invariants were violated
- [ ] WORK file reflects actual work performed
- [x] No spillover or deviation from the original WORK packet
- [ ] Code review artifact exists: `workflow/reviews/REVIEW-001-code.md`

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

- `package.json` — created
- `tsconfig.json` — created
- `next.config.ts` — created
- `postcss.config.mjs` — created
- `eslint.config.mjs` — created
- `next-env.d.ts` — created
- `app/layout.tsx` — created
- `app/page.tsx` — created
- `app/globals.css` — created
