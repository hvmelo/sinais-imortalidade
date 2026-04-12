# REVIEW-003 — Code — Content Model & Sample Content

**Artifact reviewed:** Stage 1.3 implementation (commit `1b81834`)
**Review type:** code
**Reviewed by:** Reviewer + QA
**Date:** 2026-04-12
**Verdict:** ✅ Approve

---

## Summary

Stage 1.3 implementation is clean, well-structured, and correct. The schema validation layer is robust — explicit errors, no silent failures, all optional fields type-checked. The loader abstraction is genuinely format-agnostic and the MDX migration path is documented in the right place. Sample content is real editorial content, not lorem ipsum. Tests cover the meaningful scenarios.

One medium issue and two NTHs. None block acceptance.

---

## File-by-File Review

### `src/lib/content/types.ts`

**Verdict:** ✅ Clean

- Well-structured interfaces with inline comments
- `date: string` is correct — date parsing is a concern of the validator, not the type
- `urgency?: 'low' | 'medium' | 'high'` — correct narrowing on an optional field
- `body: string` as raw markdown — correct for this stage (rendering is Stage 1.4+)
- No issues

---

### `src/lib/content/schema.ts`

**Verdict:** ✅ Clean — one NTH

- `SchemaValidationError` extends `Error` correctly, sets `this.name` — proper subclassing
- `isString()` checks for non-empty (`.trim().length > 0`) — correct, prevents whitespace-only values from passing
- `isISODate()` validates format (regex) AND parsability (`Date.parse`) — correct, double-check needed because `Date.parse` accepts some invalid dates that regex would reject
- `SINAL_REQUIRED` and `ANALISE_REQUIRED` as `as const` tuples — correct, typed array iteration
- Two-pass validation (required check first, then type check) — correct pattern, gives clean error messages

**NTH:** `isStringArray` checks `typeof v === 'string'` per element but doesn't check non-empty. A tag `""` (empty string) would pass `isStringArray` but fail `isString`. This is a latent inconsistency: an author could add an empty string to the tags array (`tags: ["biotech", ""]`) without a validation error. Low risk for now, but worth tightening if content quality enforcement becomes important.

```typescript
// Current: passes for ["biotech", ""]
function isStringArray(val: unknown): val is string[] {
  return Array.isArray(val) && val.every((v) => typeof v === 'string');
}

// More consistent:
function isStringArray(val: unknown): val is string[] {
  return Array.isArray(val) && val.every((v) => typeof v === 'string' && v.trim().length > 0);
}
```

---

### `src/lib/content/loader.ts`

**Verdict:** ✅ Clean — one medium issue

**MDX migration comment:** Correct placement, clear, actionable. 4-step migration path explicitly documented. This is the right pattern.

**`readDir()` swallows all errors:** The `catch {}` block returns `[]` for any error — not just ENOENT (directory not found). If the directory exists but `readdirSync` fails for permission reasons or corruption, the loader silently returns `[]` instead of surfacing the issue.

> **[MEDIUM]** `readDir()` should distinguish between "directory doesn't exist" (ENOENT → return `[]`) and other filesystem errors (permission denied, etc. → rethrow). Currently, a misconfigured deployment or corrupted filesystem would cause the loader to silently serve zero content rather than failing visibly.

```typescript
// Current: all errors swallowed
function readDir(dir: string): string[] {
  try {
    return readdirSync(dir);
  } catch {
    return [];
  }
}

// Better:
function readDir(dir: string): string[] {
  try {
    return readdirSync(dir);
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === 'ENOENT') return [];
    throw err; // surface permission errors and unexpected failures
  }
}
```

**Aggregate error pattern in `loadSinais()`:** The collect-then-throw pattern is the right approach. It surfaces all broken files at once rather than stopping at the first error — better developer experience during content editing.

**`loadAnalise()` catch block:** Correctly returns `null` on ENOENT. Same issue as `readDir()` — any filesystem error returns `null`. For now acceptable (single-file load, lower risk), but should be revisited before production.

**`process.cwd()` for path resolution:** Correct for Next.js. `process.cwd()` is the project root in both `next dev` and `next build`, including Vercel deployment.

---

### `src/lib/content/loader.test.ts`

**Verdict:** ✅ Clean — one NTH

**Schema tests (13 tests):** Comprehensive. Cover valid, missing required fields, empty arrays, invalid types, invalid date format, invalid urgency. This is the right level of specificity.

**Loader integration tests (4 tests):** Use real filesystem (the `content/` directory in the repo). This is a pragmatic choice for this stage — mocking `fs` would add complexity without value. The tests are readable and the intent is clear.

**NTH — Integration test coupling to real content:** The test `'loadAnalise returns parsed object for valid slug'` uses the hardcoded slug `'analise-001'`. If that file is renamed or restructured in the future, the test fails silently (it just becomes a "returns null" test if the slug changes). Consider a fixture or a comment documenting the dependency:

```typescript
// Depends on content/analises/analise-001.md existing in the repo
it('loadAnalise returns parsed object for valid slug', () => {
  const result = loadAnalise('analise-001');
  ...
```

Already has the comment in current form — this is partially addressed. Good enough for MVP.

**`loadSinais returns [] on empty directory`:** The test description says "empty directory" but the directory is not empty (it has 2 sinais). The test passes because `loadSinais()` returns an array regardless, but the test name is misleading. It's really testing "returns an array" not "returns empty array on empty dir". The empty-dir case is only implicitly tested via the implementation (the `readDir` function returning `[]`).

**Not a blocker** — the real empty-directory behavior is protected by the implementation path in `loadSinais()`.

---

### `vitest.config.ts`

**Verdict:** ✅ Clean

- Minimal and correct configuration
- `include: ['**/*.test.ts']` — correct glob
- `environment: 'node'` — correct for a content parsing utility (not browser APIs)
- No issues

---

### Sample content files

**Verdict:** ✅ Editorial quality is high

- `sinal-001.md` (RESTORE Fase II): Well-structured lead, block quote with attribution, "what we don't know yet" section. Real editorial structure.
- `sinal-002.md` (FDA Breakthrough): Good use of bold for key terms, contextual framing, caveats section. Correct editorial hierarchy.
- `analise-001.md` (Paradoxo da Longevidade): ~7500 chars. Thesis is clear, argument structure is sound, sources are documented. This is production-grade editorial content.

All files use all required frontmatter fields. Types validate correctly. Bodies are real longevidade/biotech content, not placeholders.

---

### `content/README.md`

**Verdict:** ✅ Complete and editorial-friendly

- Format decision and rationale explained for non-technical editors
- Frontmatter schemas documented with type tables
- Naming conventions explicit
- MDX future path mentioned
- Recommended editors section — useful for editorial workflow

---

## Architecture Checklist

- [x] `src/lib/content/` is a pure utility layer — no Next.js, React, or browser imports
- [x] Business logic (validation) isolated from loader (parsing) and types (shape)
- [x] Loader is the only format coupling point — explicitly documented
- [x] No rendering logic in the loader — body returned as raw string
- [x] `process.cwd()` path resolution is correct for Next.js dev + production
- [x] Error handling is explicit — SchemaValidationError, aggregate throw, null return documented in JSDoc

---

## Invariant Check

| Invariant | Status |
|---|---|
| Server/Client Boundary: no browser APIs in `src/lib/content/` | ✅ |
| State Clarity: empty = `[]`, not found = `null`, error = throws | ✅ |
| Architecture Boundaries: business logic not in pages | ✅ |
| Error Handling: no silent failures in schema validation | ✅ |
| Error Handling: `readDir` swallows all errors (not just ENOENT) | ⚠️ documented as medium issue |
| No CMS dependencies | ✅ |
| No JSX in content files | ✅ |
| Content git-based and human-readable | ✅ |
| `tsc --noEmit` passes | ✅ |
| `eslint` passes (zero warnings) | ✅ |
| `npm run build` passes | ✅ |

---

## QA Test Coverage Audit

| Test Scenario | Covered? | Test Name |
|---|---|---|
| Valid Sinal frontmatter accepted | ✅ | `accepts valid Sinal frontmatter` |
| Valid Análise frontmatter accepted | ✅ | `accepts valid Análise frontmatter` |
| Optional fields accepted when present | ✅ | `accepts optional fields when present` (both types) |
| Missing required field — title | ✅ | `rejects missing required field — title` |
| Missing required field — date | ✅ | `rejects missing required field — date` |
| Missing required field — thesis | ✅ | `rejects missing thesis field` |
| Empty tags array | ✅ | `rejects empty tags array` |
| Empty sources array | ✅ | `rejects empty sources array` |
| Invalid date format | ✅ | `rejects invalid date format` |
| Invalid urgency value | ✅ | `rejects invalid urgency value` |
| Non-array tags | ✅ | `rejects non-array tags` |
| Invalid readTime type | ✅ | `rejects invalid readTime type` |
| `loadSinais()` returns array | ✅ | `loadSinais returns [] on empty directory` |
| `loadAnalise()` unknown slug → null | ✅ | `loadAnalise returns null for unknown slug` |
| `loadAnalise()` valid slug → parsed | ✅ | `loadAnalise returns parsed object for valid slug` |
| `loadSinais()` parses real content | ✅ | `loadSinais returns parsed objects` |
| `readDir()` ENOENT → `[]` | ⚠️ implicit (not directly tested) |
| `loadSinais()` aggregate errors | ⚠️ not directly tested |

**QA verdict:** coverage is adequate for MVP. The two untested paths (ENOENT direct test, aggregate error path) are acceptable gaps — the aggregate error path is difficult to test without filesystem mocking, and ENOENT is implicitly covered by the unknown-slug test.

---

## Issues Summary

### Critical
_None_

### Medium
**[M1] `readDir()` swallows non-ENOENT filesystem errors**
File: `src/lib/content/loader.ts`
Fix: distinguish ENOENT from other errors in the `catch` block.
Recommendation: fix before Stage 1.4 (the loader will be called from page routes in 1.4 — silent empty return in production would be hard to diagnose).

### NTH
**[NTH-1] `isStringArray` does not enforce non-empty strings**
File: `src/lib/content/schema.ts`
Fix: add `.trim().length > 0` check per element. Low risk — editorial process is unlikely to produce empty-string tags, but the inconsistency with `isString` is a latent bug.

**[NTH-2] Integration test name misleading**
File: `src/lib/content/loader.test.ts`
Test: `'loadSinais returns [] on empty directory'`
Fix: rename to `'loadSinais returns an array'` or add a real empty-directory fixture test.

---

## Recommendation

**Accept.** The medium issue (`readDir` error swallowing) should be fixed before Stage 1.4 — at that point the loader will be called from Next.js route handlers and a silent empty return would produce a blank page in production with no observable error. It is a one-line fix and does not require a review cycle — add it as **Task 1** of Stage 1.4 or as a hotfix before implementation begins.
