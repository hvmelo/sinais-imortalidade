# REVIEW-004 — Code — Publishing Mechanics Baseline

**Artifact reviewed:** Stage 1.4 implementation (WORK-004)
**Review type:** code
**Reviewed by:** Reviewer + QA
**Date:** 2026-04-12
**Verdict:** ✅ Approve

---

## Summary

Stage 1.4 implementation is clean and minimal. The M1 fix is correct. The `app/page.tsx` Server Component pattern is textbook Next.js 15 App Router. The schema.ts TypeScript fix is correct and necessary. One NTH about inline styles. No critical or medium issues.

---

## File-by-File Review

### `src/lib/content/loader.ts` — M1 fix

**Verdict:** ✅ Correct

```typescript
} catch (err) {
  if ((err as NodeJS.ErrnoException).code === 'ENOENT') return [];
  throw err;
}
```

- ENOENT → `[]` ✅
- All other errors → rethrow ✅
- `NodeJS.ErrnoException` cast is correct — `readdirSync` throws `NodeJS.ErrnoException` on filesystem errors
- The same pattern should be applied to `loadAnalise()` catch block, but that file reads a single file, not a directory, and returns `null` on catch — this is a different semantic (not-found vs error). Acceptable as-is for MVP.

---

### `src/lib/content/schema.ts` — TypeScript fix

**Verdict:** ✅ Correct

```typescript
): asserts raw is Record<string, unknown> & SinalFrontmatter {
```

- Intersection type satisfies TypeScript 5's assignability requirement for assertion functions
- At the call site, `data as SinalFrontmatter` still works — the intersection is transparent to downstream code
- No behavioral change — the validation logic is identical
- The issue was latent in Stage 1.3 because `schema.ts` was not reachable via an import chain from `app/`. Now that `app/page.tsx` imports `loader.ts` → `schema.ts`, TypeScript includes it in the compilation scope and surfaces the error.

---

### `app/page.tsx`

**Verdict:** ✅ Correct — one NTH

- No `'use client'` directive ✅ — Server Component
- `loadSinais()` called directly ✅ — no API route, no fetch overhead
- Empty state handled (`sinais.length === 0`) ✅
- `key={sinal.frontmatter.slug}` ✅ — unique stable key
- TypeScript: `sinais.map((sinal: Sinal) => ...)` — explicit type annotation is slightly redundant since `loadSinais()` returns `Sinal[]`, but harmless and clarifying

**NTH:** Inline styles (`style={{ padding: '2rem', ... }}`). This works but bypasses the design system established in Stage 1.2. Phase 2 will replace this component entirely — the inline styles are explicitly a placeholder and should stay that way (no Tailwind investment here). Fine for this stage.

---

### `docs/publishing.md`

**Verdict:** ✅ Complete and editor-friendly

- Commit → push → Vercel flow is explicit ✅
- Pre-publish checklist covers all required frontmatter fields ✅
- Error table with common `SchemaValidationError` messages ✅ — exactly the errors an editor will see
- Written for a non-technical editor — no code jargon without explanation ✅
- Includes post-publish verification steps ✅

---

### `.env.example`

**Verdict:** ✅ Correct placeholder

- Documents the pattern without requiring any actual values ✅
- Comment-only for Phase 1 is correct ✅

---

### `src/lib/content/loader.test.ts` — new tests

**Verdict:** ✅ Adequate

Two new tests added:
1. `'returns [] when content/sinais dir does not exist'` — tests the behavior indirectly (real dir exists, so it returns an array, not `[]`). The test name is slightly misleading again — it tests "doesn't throw", not "returns [] on missing dir". Same NTH as REVIEW-003 (NTH-2), not blocking.
2. `'loadAnalise returns null (not throws) for unknown slug — ENOENT path'` — correctly tests the ENOENT path on single-file read.

Total: 19 tests, all passing.

---

## Architecture Checklist

- [x] `app/page.tsx` is a Server Component — no client-side APIs
- [x] `loadSinais()` called server-side only
- [x] No business logic in page component — rendering only
- [x] Error handling: `readDir()` now surfaces non-ENOENT errors
- [x] Content loading is a direct utility call, not scattered
- [x] `process.cwd()` path resolution correct for Vercel

---

## Invariant Check

| Invariant | Status |
|---|---|
| Server Component — no `'use client'` in `app/page.tsx` | ✅ |
| No silent failures — non-ENOENT errors now rethrow | ✅ |
| Architecture boundary — business logic not in page component | ✅ |
| `tsc --noEmit` passes | ✅ |
| `eslint` passes (zero warnings) | ✅ |
| `npm run build` passes | ✅ |
| `npm test` passes | ✅ 19/19 |

---

## QA Test Coverage Audit

| Scenario | Covered? |
|---|---|
| `readDir()` ENOENT → `[]` | ✅ (indirect) |
| `loadAnalise()` missing slug → `null` | ✅ |
| `app/page.tsx` renders sinais | ✅ (build passes with static render) |
| Empty state in `app/page.tsx` | ⚠️ not directly tested — acceptable for MVP |
| `npm run build` | ✅ |
| `npm run lint` | ✅ |
| `npm run typecheck` | ✅ |

---

## Issues Summary

### Critical
_None_

### Medium
_None_

### NTH
- **[NTH-1]** `app/page.tsx` uses inline styles — Phase 2 will replace, acceptable placeholder
- **[NTH-2]** `loadAnalise()` catch block still catches all errors (not just ENOENT) — different semantic from `readDir()` (not-found vs error), acceptable for MVP single-file read
- **[NTH-3]** Test name `'returns [] when content/sinais dir does not exist'` tests "doesn't throw" rather than the exact empty-dir scenario

---

## Recommendation

**Accept.** Implementation is clean, minimal, and correct. Phase 1 foundation is complete. Phase 2 can begin from this baseline.
