# REVIEW-003 — Plan — Content Model & Sample Content

**Artifact reviewed:** `workflow/work/WORK-003-stage-1-3-content-model.md`
**Review type:** plan
**Reviewed by:** Architect
**Date:** 2026-04-10
**Verdict:** ⚠️ Approve with changes

---

## Summary

Stage 1.3 plan is structurally sound. The MD + frontmatter decision is correctly documented with the MDX migration posture explicit. The scope is tight and necessary. However, two issues require resolution before implementation begins: (1) the test tooling (Vitest) is not yet configured — the plan mentions this but leaves it ambiguous, which will cause a stop mid-stage. (2) the test file location convention needs to be resolved upfront, not during implementation. Both are fixable by expanding the Allowed Files list and Task 1 slightly.

---

## What Already Exists

- `package.json` and `package-lock.json` — exist, will be modified to add gray-matter + Vitest
- `src/` directory — does NOT exist yet (STACK_PROFILE.md references it as the target code directory)
- `content/` directory — does NOT exist yet

**Nothing relevant to reuse** — stage introduces genuinely new structure.

---

## Scope Challenge

1. **Existing code:** None. Everything is new.
2. **Minimum scope:** 8 new source files + 2 modified (`package.json`, `package-lock.json`). All necessary for Stage 1.4 and Phase 2 to build on.
3. **Complexity check:** 10 files total. Marginally above the 8-file threshold, but content files (`sinal-001.md`, `sinal-002.md`, `analise-001.md`) are not code — they're editorial data. The actual code surface is: types.ts, schema.ts, loader.ts, loader.test.ts = 4 files. Justified.
4. **Built-in check:** No gray-matter alternative in Node.js/Next.js. gray-matter is the canonical choice.
5. **Completeness check:** Plan covers install → schema → loader → content → tests → docs. No shortcuts.
6. **TODOS cross-reference:** No TODOS.md found.

---

## Critical Issues

None.

---

## Medium Issues

- **[MEDIUM — must resolve before Task 7]** Test tooling (Vitest) is not configured. Task 7 creates `loader.test.ts` but no test runner is installed or configured. The WORK mentions "Vitest or Jest — resolve tooling first" but does not add it to Allowed Files or Task 1. This will block mid-stage.

  **Fix:** Add to Task 1: `npm install --save-dev vitest @vitest/ui`. Add to Allowed Files: `vitest.config.ts` (or `vitest.config.mjs`) and a test script in `package.json`. Add `"test": "vitest"` to `package.json` scripts.

  Allowed Files additions required:
  | File | Action | Purpose |
  |------|--------|---------|
  | `vitest.config.ts` | Create | Vitest configuration |
  | `package.json` | Modify | Add vitest devDep + test script |

- **[MEDIUM — must resolve before Task 7]** Test file location convention is unresolved. The WORK asks to resolve it during implementation but this creates ambiguity at review time.

  **Fix:** Establish the convention explicitly in the WORK now:
  - **Convention: tests colocate with source in `src/lib/content/`** for library-level utilities.
  - Rationale: this is the natural location for unit tests of a content parsing library. A global `src/test/` is more appropriate when E2E or integration tests span multiple modules.
  - Document this decision in the Decisions section.

---

## Nice to Have

- **[NTH]** The `Canonical Format Decision` section in Part A is excellent — detailed, rationale clear, MDX migration path explicit. Good pattern for future stages with format decisions.
- **[NTH]** Consider naming the loader file `loader.ts` rather than `load-content.ts` (PHASE_1.md uses `load-content.ts`). Either works — pick one and be consistent.

---

## Failure Modes

| Codepath | Failure Mode | Test Coverage |
|----------|-------------|---------------|
| gray-matter parse on valid frontmatter | Unexpected field types silently cast | Covered by unit test (typed schema validation) |
| gray-matter parse on missing required field | Silent `undefined` — not caught | Covered by "missing required field" unit test |
| gray-matter parse on malformed YAML | Throws — must be caught | Covered by "malformed frontmatter" unit test |
| `loadSinais()` on empty directory | Returns empty array vs throws | Should be covered — add to test plan |
| File path resolution in Node.js | Works in dev, fails in production (Vercel) | Covered by `npm run build` acceptance criterion |

**Additional test scenario to add:** loader called on empty `content/sinais/` returns `[]` (not an error).

---

## Architecture Checklist

- [x] Dependency direction respected — `src/lib/content/` is a utility layer, no React or Next.js imports required
- [x] No cross-layer type leakage — content types are defined in `src/lib/content/types.ts`, not in pages or components
- [x] No business logic in route handlers — loader is a utility, not a route handler
- [x] No rendering logic in the loader — loader parses, does not render
- [x] Ports justified — N/A
- [x] MDX migration path is explicit — documented in Canonical Format Decision and must be in `loader.ts`

---

## Invariant Risks

- **Content must stay git-based and human-readable** — MD files satisfy this. ✅
- **No CMS dependencies** — gray-matter is a parser, not a CMS. ✅
- **No JSX in content files** — MD + frontmatter has no JSX. ✅
- **`tsc --noEmit` must pass** — schema.ts and types.ts must be TypeScript-strict. Watch for: `any` types in gray-matter output. Use explicit type casting.

---

## Test Gaps

- **Add:** Empty directory case — `loadSinais()` when `content/sinais/` is empty returns `[]`
- **Add:** `loadAnalise(slug)` with non-existent slug returns `null` or throws with clear message

---

## QA Test Plan Review

**QA verdict:** gaps found (non-blocking — gaps are documented above and must be addressed during implementation)

#### Acceptance Criteria → Test Scenario Mapping

| Criterion | Test Scenario | Status |
|---|---|---|
| Schema parses valid Sinal frontmatter | Unit test — valid Sinal | ✅ covered |
| Schema parses valid Análise frontmatter | Unit test — valid Análise | ✅ covered |
| Missing required field handled | Unit test — missing field | ✅ covered |
| Malformed frontmatter handled | Unit test — malformed YAML | ✅ covered |
| Empty directory returns `[]` | Unit test — empty dir | ⚠️ gap — add to Required Tests |
| `loadAnalise(slug)` not found | Unit test — missing slug | ⚠️ gap — add to Required Tests |
| Build passes | `npm run build` | ✅ covered |
| Lint passes | `npm run lint` | ✅ covered |
| Typecheck passes | `npm run typecheck` | ✅ covered |

**Stage closure: conditional** — add the two missing test scenarios to Required Tests before beginning Task 7.

---

## Suggested Prompt to Implementer

Before starting implementation, update the WORK-003 packet with these changes:

**1. Add to Allowed Files:**
```
| `vitest.config.ts` | Create | Vitest configuration |
```

**2. Update Task 1 to include Vitest:**
```
Task 1: Install gray-matter + Vitest
- npm install gray-matter
- npm install --save-dev vitest
- Add "test": "vitest run" to package.json scripts
```

**3. Resolve test location convention (add to Decisions section):**
```
Convention: tests colocate with source in src/lib/content/ for library utilities.
```

**4. Add to Required Tests:**
```
| Unit | loadSinais() on empty directory returns [] | yes | Must not throw | src/lib/content/loader.test.ts |
| Unit | loadAnalise(slug) with unknown slug returns null or throws clearly | yes | Must not silently fail | src/lib/content/loader.test.ts |
```

After applying these changes: implementation can begin.

---

## Reviewer Notes

**Allowed Files verdict:** incomplete — missing `vitest.config.ts` and Vitest devDep entries in `package.json`

**File scope analysis:** Core content model files are all present and correctly scoped. The gap is purely tooling — test runner not yet installed. Once that's added, scope is complete.

**Technical observations:**
1. gray-matter returns `data` as `{ [key: string]: any }` by default. Use explicit TypeScript type assertion when parsing: `const frontmatter = data as SinalFrontmatter`. Add runtime validation in `schema.ts` to catch mismatches at parse time.
2. File path resolution in Node.js (`path.join`, `process.cwd()`) works differently in development vs production Vercel deployment. Use `path.join(process.cwd(), 'content', ...)` and verify this works in a production build.
3. Sample content should use **real editorial content**, not lorem ipsum. Two Sinais and one Análise with actual longevidade/biotech themes. This makes Phase 2 rendering visually testable from the start.
4. The `content/README.md` is important — it doubles as the editorial team's reference. Write it clearly for a human editor who may not know code.

---

## Risk Assessment

- **Risk level:** high
- **Criteria triggered:** introduces new abstraction, creates files outside existing project structure, crosses more than one architectural layer

**Note:** The ⚠️ verdict is due to incomplete Allowed Files (Vitest missing), not a structural problem. After the WORK packet is updated with the Vitest entries and test convention, implementation can begin.
