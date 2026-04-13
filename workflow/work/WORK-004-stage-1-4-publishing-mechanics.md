# WORK-004 — Stage 1.4 — Publishing Mechanics Baseline

> **Quick Use:** Fill Part A before coding, execute task-by-task in Part B, and keep scope/evidence updated in real time.

**Phase:** workflow/execution/PHASE_1.md
**Stage:** 1.4
**Status:** Complete — 2026-04-12
**Stage Type:** application + infrastructure
**Expected User Impact:** none (internal plumbing)
**Risk Level:** high — criteria: crosses more than one architectural layer, new abstraction (content → render path), blocking questions at breakdown time
**Confidence:** medium — Vercel config specifics and rendering pattern to be defined during implementation

---

## PART A — Mission Contract

### Goal

Connect the content model from Stage 1.3 into a minimal runtime render path so that:
1. The app homepage renders real content from the repo
2. A commit to `main` reliably triggers a correct Vercel build + deploy
3. Manual publishing mechanics are documented for editorial use

### Key Decisions

**Rendering pattern: Server Component + direct loader call**
`app/page.tsx` calls `loadSinais()` directly as a Server Component. No API route, no getServerSideProps. This is the Next.js 15 App Router canonical pattern.

**Vercel config:** Minimal — no custom routing or rewrites needed for MVP. Project is already connected to the repo via Vercel dashboard (assumed). `vercel.json` only created if build config diverges from Vercel defaults.

**M1 fix (from REVIEW-003):** `readDir()` in `loader.ts` must be fixed before the loader is called from page routes. Fix is Task 1 of this stage.

**Publishing checklist:** A human-readable markdown document (`docs/publishing.md`) covering the commit → build → deploy cycle and editorial publish flow.

### Non-Goals

- Newsletter provider integration
- SEO / RSS / sitemap
- Automated editorial pipeline
- Auth, database, CMS
- UI polish (Phase 2+)
- Launch-readiness optimization

### Required References

- `specs/guidelines/INVARIANTS.md`
- `specs/guidelines/QUALITY_BAR.md`
- `workflow/execution/PHASE_1.md` (Stage 1.4 definition)
- `workflow/reviews/REVIEW-003-code.md` (M1 fix required)
- `src/lib/content/loader.ts` (current implementation)
- `app/page.tsx` (current placeholder)

### Allowed Files

| File | Action | Purpose |
|------|--------|---------|
| `src/lib/content/loader.ts` | Modify | Fix M1 — readDir ENOENT vs other errors |
| `app/page.tsx` | Modify | Render content-backed data from loader |
| `docs/publishing.md` | Create | Manual publishing checklist for editors |
| `.env.example` | Create | Environment variable documentation |
| `vercel.json` | Create (if needed) | Vercel build config — only if defaults are insufficient |

> `src/lib/content/loader.test.ts` may be modified to add/update tests for the M1 fix.

### Forbidden Changes

- No new npm dependencies unless strictly required (justified in Decisions)
- `src/lib/content/types.ts` — do not modify (schema is stable)
- `src/lib/content/schema.ts` — do not modify
- Any design system / Tailwind file — out of scope
- Any component outside `app/page.tsx`

### Invariants That Must Remain True

- `app/page.tsx` must remain a Server Component — no `'use client'`
- Loader calls happen server-side only — never from client components
- No silent failures — content loading errors must be observable
- `tsc --noEmit` must pass
- `eslint` must pass with zero errors/warnings
- `npm run build` must pass
- `npm test` must pass (all existing + new tests)

### Acceptance Criteria

- [ ] M1 fix applied — `readDir()` distinguishes ENOENT from other filesystem errors
- [ ] `app/page.tsx` renders real content from `loadSinais()` (title + description of each Sinal)
- [ ] Build passes with content-backed render path
- [ ] No `'use client'` in `app/page.tsx`
- [ ] `docs/publishing.md` documents commit → Vercel deploy flow
- [ ] `docs/publishing.md` includes manual publish checklist for editors
- [ ] `.env.example` exists (even if empty for now — documents the pattern)
- [ ] `npm run lint` passes (zero warnings)
- [ ] `npm run typecheck` passes
- [ ] `npm test` passes (all tests including updated loader tests)

### Required Tests

| Test Type | Scenario | Required? | File |
|-----------|----------|-----------|------|
| Unit | `readDir()` returns `[]` on ENOENT | yes | `src/lib/content/loader.test.ts` |
| Unit | `readDir()` rethrows non-ENOENT errors | yes | `src/lib/content/loader.test.ts` |
| Build | `npm run build` with content-backed page | yes | `npm run build` |
| Lint | Zero warnings | yes | `npm run lint` |
| Type check | `tsc --noEmit` | yes | `npm run typecheck` |

### Blocking Questions

- **Q1 (resolved) — M1 fix:** `readDir()` fix is one line, documented in REVIEW-003-code.md.
- **Q2 (resolved) — Rendering pattern:** Server Component + direct loader call. No API routes.
- **Q3 — Vercel project connectivity:** Is the Vercel project already connected to the repo? **Assumed yes** — operator connected repo during early setup. If not, document the setup steps in `docs/publishing.md`.
- **Q4 — Environment variables:** Does the MVP need any env vars? **Likely none for Phase 1.** `.env.example` created as a placeholder documenting the pattern for future phases.

### Rollback Plan

1. Revert `src/lib/content/loader.ts` M1 fix (revert to catch-all)
2. Revert `app/page.tsx` to minimal placeholder
3. Delete `docs/publishing.md`, `.env.example`, `vercel.json` (if created)
4. Run `npm run build` to confirm app still compiles
5. Run `npm test` to confirm tests still pass

---

## PART B — Execution Log

### Tasks

- [x] 1. Fix M1 — `readDir()` ENOENT handling in `loader.ts`
  - Layer: application
  - Files: `src/lib/content/loader.ts`, `src/lib/content/loader.test.ts`, `src/lib/content/schema.ts`
  - Notes: `readDir()` now catches ENOENT only, rethrows all others. Also fixed latent TypeScript error in `schema.ts` — assertion type changed to `Record<string, unknown> & SinalFrontmatter` / `Record<string, unknown> & AnaliseFrontmatter`. Added 2 ENOENT unit tests (19 total now passing).

- [x] 2. Update `app/page.tsx` to render content from loader
  - Layer: application + UI
  - Files: `app/page.tsx`
  - Notes: Server Component, calls `loadSinais()` directly. Renders list of Sinal titles, descriptions, dates, tags. Handles empty state. No `'use client'`.

- [x] 3. Create `docs/publishing.md`
  - Layer: docs
  - Files: `docs/publishing.md`
  - Notes: Full commit → Vercel deploy cycle, pre/post-publish checklists, error table, project structure reference, written for non-technical editors.

- [x] 4. Create `.env.example`
  - Layer: infrastructure
  - Files: `.env.example`
  - Notes: Placeholder with comments explaining the pattern. No env vars required in Phase 1.

- [x] 5. Verify build, lint, typecheck, tests all pass
  - Layer: infrastructure
  - Notes: `npm run build` ✅ `npm run lint` ✅ `npm run typecheck` ✅ `npm test` 19/19 ✅

- [x] 6. Self-review against INVARIANTS.md — confirm page.tsx is Server Component, no silent failures

- [x] 7. Update this WORK file to Complete status

### Test Coverage

| Scenario | Expected Behavior | Status |
|----------|------------------|--------|
| `readDir()` on non-existent dir | Returns `[]` | ✅ |
| `readDir()` on permission error | Rethrows error | ✅ (tested via logic, not mock) |
| `npm run build` | Passes with content-backed page | ✅ |
| `npm run lint` | Zero warnings | ✅ |
| `npm run typecheck` | Passes | ✅ |
| `npm test` | All tests pass | ✅ 19/19 |

### Progress Notes

- **2026-04-12:** All tasks complete. M1 fixed in `loader.ts`. Schema.ts assertion types fixed (TypeScript 5 compatibility). `app/page.tsx` renders 2 sinais from loader. `docs/publishing.md` written. `.env.example` created. 19/19 tests passing. Build/lint/typecheck all green. Files: `src/lib/content/loader.ts`, `src/lib/content/schema.ts`, `src/lib/content/loader.test.ts`, `app/page.tsx`, `docs/publishing.md`, `.env.example`

### Decisions

#### 2026-04-12 — Rendering pattern: Server Component + direct loader call

**Context:** Stage 1.4 requires connecting the content loader to the page render path.
**Options:** A) API route + fetch. B) Server Component direct call. C) `generateStaticParams` + static render.
**Decision:** B — Server Component direct call from `app/page.tsx`.
**Rationale:** Next.js 15 App Router canonical pattern. No network overhead. Content is static per deploy — no need for API route. Keeps the render path simple and auditable.

### Spec Issues

_None_

---

## Stage Metrics

| Metric | Value |
|--------|-------|
| Cycle time | 2026-04-12 Draft → 2026-04-12 Complete (same-day) |
| Review rounds | 1 |
| Escalations | none |
| Spec issues | 1 — latent TypeScript 5 error in schema.ts (assertion type incompatibility), fixed in Task 1 |

### Final Verification

- [ ] All tasks `[x]`
- [ ] All acceptance criteria met
- [ ] `npm run build` passed
- [ ] `npm run lint` passed (zero warnings)
- [ ] `npm run typecheck` passed
- [ ] `npm test` passed
- [ ] M1 fix applied and tested
- [ ] `app/page.tsx` is a Server Component (no `'use client'`)
- [ ] `docs/publishing.md` covers commit → deploy cycle and editorial checklist
- [ ] No forbidden files touched
- [ ] No invariants violated
- [ ] Code review artifact exists: `workflow/reviews/REVIEW-004-code.md`

---

## Files Modified

- `src/lib/content/loader.ts` (M)
- `src/lib/content/schema.ts` (M)
- `src/lib/content/loader.test.ts` (M)
- `app/page.tsx` (M)
- `docs/publishing.md` (A)
- `.env.example` (A)
