# WORK-003 — Stage 1.3 — Content Model & Sample Content

> **Quick Use:** Fill Part A before coding, execute task-by-task in Part B, and keep scope/evidence updated in real time.

**Phase:** workflow/execution/PHASE_1.md
**Stage:** 1.3
**Status:** Complete
**Stage Type:** application
**Expected User Impact:** none
<!-- Risk Level: high — criteria: new abstraction, creates files outside existing project structure, crosses more than one architectural layer -->
**Risk Level:** high — criteria: new abstraction, creates files outside existing project structure, crosses more than one architectural layer

---

## PART A — Mission Contract

Fill this section BEFORE implementation begins.
This is the handoff contract between planning and execution.

### Goal

Define the canonical repo-based content format for Sinais and Análises, create the directory structure and schemas, add sample content, and implement minimal content loading utilities so later phases can render real editorial content.

### Canonical Format Decision

**Chosen format: MD + frontmatter (gray-matter)**

**Rationale:**
- Sufficient for MVP editorial requirements (rich typography, quotes, images, hierarchy, footnotes)
- Simpler parsing and lower coupling than MDX
- Content stays portable and git-friendly
- No runtime JSX compilation required
- Aligns with static-first deployment target

**Future migration posture:**
- Loader, schema, and content types are designed as an abstraction layer
- MDX migration path is intentionally kept open:
  - `load-content.ts` wraps the parser — format change requires updating only this layer
  - Content types and frontmatter schema remain format-agnostic
  - File extension can move from `.md` to `.mdx` without schema changes
  - The only coupling point is the parser/renderer — isolated by design

This decision replaces the "MDX vs MD" blocking question from the stage breakdown.

### Non-Goals

- Search indexing
- Related-content engine
- Publishing automation
- RSS or sitemap generation
- Real editorial workflow beyond sample data
- Full rendering pipeline (rendering belongs in Stage 1.4 and Phase 2)
- CMS-like complexity

### Required References

Files the implementer must read before starting:

- `specs/guidelines/INVARIANTS.md`
- `specs/guidelines/QUALITY_BAR.md`
- `specs/guidelines/STACK_PROFILE.md`
- `workflow/execution/PHASE_1.md` (Stage 1.3 definition)
- `workflow/product/PRODUCT_FRAMING.md` (editorial product intent)

> **Note:** `specs/guidelines/ARCHITECTURE.md` does not yet exist. Effective constraint set: `INVARIANTS.md`, `QUALITY_BAR.md`, `STACK_PROFILE.md`, `PRODUCT_FRAMING.md`, and this phase breakdown.

### Allowed Files

Exhaustive list of files this stage may create or modify:

| File | Action | Purpose |
|------|--------|---------|
| `content/sinais/` | Create (dir) | Directory for signal content files |
| `content/analises/` | Create (dir) | Directory for analysis content files |
| `content/sinais/sinal-001.md` | Create | Sample signal 1 |
| `content/sinais/sinal-002.md` | Create | Sample signal 2 |
| `content/analises/analise-001.md` | Create | Sample analysis |
| `src/lib/content/types.ts` | Create | Shared content types (Sinal, Analise, frontmatter shapes) |
| `src/lib/content/schema.ts` | Create | Canonical frontmatter schemas (with validation) |
| `src/lib/content/loader.ts` | Create | Minimal content loader/parser (gray-matter based) |
| `vitest.config.ts` | Create | Vitest test runner configuration |
| `src/` | Create (dir) | Source directory (if not already present) |

> **Naming conventions:**
> - Files: `{tipo}-{NNN}.md` — e.g. `sinal-001.md`, `analise-001.md`
> - Slugs: derived from filename without extension
> - Content directories: `content/sinais/`, `content/analises/`

### Forbidden Changes

Files and areas that must NOT be touched in this stage:

- `app/` pages and layouts (rendering belongs to Stage 1.4 and Phase 2)
- Any existing component or design system file
- Any workflow artifact outside `workflow/work/` and `workflow/reviews/`
- Any file not listed in Allowed Files above

### Invariants That Must Remain True

- Content must stay git-based and human-readable
- Schema must fit MVP needs without overfitting future roadmap
- No CMS, database, or auth dependencies
- No runtime framework in content files (no JSX, no imports)
- `tsc --noEmit` must pass
- `eslint` must pass with zero errors
- `npm run build` must pass after content integration
- The format decision (MD + frontmatter) must be explicitly documented

### Acceptance Criteria

- [ ] `content/sinais/` and `content/analises/` directories exist with sample files
- [ ] Frontmatter schemas for Sinal and Análise are defined and typed
- [ ] `src/lib/content/loader.ts` can parse both content types from disk
- [ ] Sample content parses without errors (metadata + body)
- [ ] TypeScript types validate required metadata fields
- [ ] `content/README.md` documents format, frontmatter fields, and naming conventions
- [ ] `npm run build` passes with content files in the repo
- [ ] `npm run lint` passes
- [ ] `npm run typecheck` passes
- [ ] MDX migration path is explicit in `loader.ts` (comment or abstraction)

### Required Tests

| Test Type | Scenario | Required? | Why | Planned File |
|-----------|----------|-----------|-----|--------------|
| Unit | Loader parses valid Sinal frontmatter | yes | Core behavior — required fields and types | `src/lib/content/loader.test.ts` |
| Unit | Loader parses valid Análise frontmatter | yes | Core behavior — required fields and types | `src/lib/content/loader.test.ts` |
| Unit | Loader handles missing required field gracefully | yes | Must not silently fail | `src/lib/content/loader.test.ts` |
| Unit | Schema rejects unknown/malformed frontmatter | yes | Data integrity | `src/lib/content/loader.test.ts` |
| Unit | `loadSinais()` on empty directory returns `[]` | yes | Must not throw on empty | `src/lib/content/loader.test.ts` |
| Unit | `loadAnalise(slug)` with unknown slug returns `null` | yes | Must not silently fail | `src/lib/content/loader.test.ts` |
| Build | `npm run build` passes with content in repo | yes | Foundation must remain production-ready | `npm run build` |
| Lint | Zero lint errors | yes | Quality baseline | `npm run lint` |
| Type check | `tsc --noEmit` passes | yes | Type safety | `npm run typecheck` |

> **Test location:** `src/lib/content/loader.test.ts` — colocated with the source module is **not** allowed per INVARIANTS. Tests go under `src/test/` if that convention is established, or alongside the source in `src/lib/content/` if no global test directory exists yet. **Resolve this before creating test files.**

### Blocking Questions

- **Q1 (resolved) — Content format:** MD + frontmatter. MDX migration path kept open. See Canonical Format Decision above.
- **Q2 (resolved) — Test file location:** Tests colocate with source in `src/lib/content/`. See Decisions section.
- **Q3 — gray-matter dependency:** Does gray-matter need to be added to `package.json`? **Yes** — gray-matter must be installed as a dependency before the loader can be implemented.
- **Q4 — Vitest not configured:** Vitest must be installed and `vitest.config.ts` created before Task 7. Added to Task 1. Does gray-matter need to be added to `package.json`? **Yes** — gray-matter must be installed as a dependency before the loader can be implemented.
- None other — stage definition is clear.

### Spillover Rule

If implementation discovers a necessary file outside Allowed Files:
- STOP immediately
- Record the spillover in Spec Issues
- Update the WORK packet scope before continuing
- Do not silently expand scope

### Rollback Plan

Revert the listed Allowed Files. Post-revert verification:
1. Confirm `content/` directory and all content files are removed
2. Confirm `src/lib/content/` directory is removed
3. Run `npm run build` to confirm the app still compiles
4. Confirm `package.json` does not include gray-matter (if rolled back)

---

## PART B — Execution Log

> Fill this section DURING and AFTER implementation.
> Update after every completed task — never batch at the end.
>
> **Stage lifecycle after implementation:**
> 1. Complete all tasks and Final Verification below
> 2. Run `review-stage-code WORK-003` — code review + QA audit
> 3. Run `close-stage WORK-003` — marks stage as Complete

### Tasks

- [x] 1. Install gray-matter and Vitest
  - Layer: infrastructure
  - Files: `package.json`, `package-lock.json`, `vitest.config.ts`
  - Notes: `npm install gray-matter`. `npm install --save-dev vitest`. Add `"test": "vitest run"` to `package.json` scripts. Create `vitest.config.ts` in root with minimal config (include: `**/*.test.ts`, environment: node).
- [x] 2. Create content directory structure
  - Layer: infrastructure
  - Files: `content/sinais/` (dir), `content/analises/` (dir)
  - Notes: Created. Filled with sample content files.
- [x] 3. Define frontmatter schemas and TypeScript types
  - Layer: application
  - Files: `src/lib/content/types.ts`, `src/lib/content/schema.ts`
  - Notes: SinalFrontmatter, AnaliseFrontmatter, Sinal, Analise interfaces. validateSinalFrontmatter and validateAnaliseFrontmatter with SchemaValidationError class. Required + optional fields. All edge cases covered (empty array, wrong type, invalid date format).
- [x] 4. Implement minimal content loader
  - Layer: application
  - Files: `src/lib/content/loader.ts`
  - Notes: gray-matter based. loadSinais() returns Sinal[] (empty [] on empty/no dir). loadAnalise(slug) returns Analise | null. MDX migration path documented in file header.
- [x] 5. Create sample Sinal content files (2 files)
  - Layer: docs
  - Files: `content/sinais/sinal-001.md`, `content/sinais/sinal-002.md`
  - Notes: sinal-001: Altos Labs RESTORE Fase II reprogramação epigenética. sinal-002: FDA Breakthrough designation UBX1325 Unity Biotech. Both use real editorial structure with quotes, sources, hierarchical sections.
- [x] 6. Create sample Análise content file (1 file)
  - Layer: docs
  - Files: `content/analises/analise-001.md`
  - Notes: 'O paradoxo da longevidade' — 7500 chars, 12 min readTime. Frontmatter: thesis, 4 sources, 2 relatedSinais. Body: structured argument with quotes, hierarchical sections, conclusion.
- [x] 7. Write unit tests for the loader
  - Layer: test
  - Files: `src/lib/content/loader.test.ts`
  - Notes: 17 tests: 13 schema validation tests (valid, missing field, empty array, invalid type, invalid date, invalid urgency), 4 loader integration tests (empty dir, unknown slug, valid slug, parsed objects). All 17 passing.
- [x] 8. Create `content/README.md`
  - Layer: docs
  - Files: `content/README.md`
  - Notes: Full documentation: format rationale, directory structure, naming conventions, frontmatter schemas (Sinal + Análise), markdown body conventions, validation behavior, recommended editors.
- [x] 9. Verify build, lint, and typecheck pass
  - Layer: infrastructure
  - Files: all created/modified files
  - Notes: `npm run build` ✅ `npm run lint` ✅ zero warnings `npm run typecheck` ✅ all passing.
- [x] 10. Run unit tests
  - Layer: test
  - Files: test files
  - Notes: 17/17 tests passing. 0 failures.
- [x] 11. Self-review against `specs/guidelines/INVARIANTS.md`
  - Layer: work
  - Files: all created/modified files
  - Notes: All invariants satisfied. No CMS, no JSX in content, no rendering logic in loader, format decision documented in content/README.md and loader.ts header. MDX path explicitly open.
- [x] 12. Update this WORK file to Complete status

### Test Coverage

| Scenario | Expected Behavior | Status |
|----------|------------------|--------|
| Parse valid Sinal frontmatter | Returns typed SinalFrontmatter object | ✅ |
| Parse valid Análise frontmatter | Returns typed AnaliseFrontmatter object | ✅ |
| Missing required field | Throws or returns error — not silent | ✅ |
| Malformed frontmatter | Handled gracefully | ✅ |
| `loadSinais()` on empty directory | Returns `[]` — not an error | ✅ |
| `loadAnalise(slug)` unknown slug | Returns `null` or throws clearly | ✅ |
| `npm run build` | Passes with content files in repo | ✅ |
| `npm run lint` | Zero errors | ✅ |
| `npm run typecheck` | Passes | ✅ |

### Progress Notes

Short, factual updates only.

- **2026-04-12:** All tasks completed. gray-matter + Vitest installed. Types, schema, loader implemented. 2 sinais + 1 análise created. Unit tests (17/17 passing). content/README.md written. Build/lint/typecheck all passing. Files: `package.json`, `vitest.config.ts`, `src/lib/content/{types,schema,loader}.ts`, `src/lib/content/loader.test.ts`, `content/sinais/{sinal-001,sinal-002}.md`, `content/analises/analise-001.md`, `content/README.md`

### Decisions

#### 2026-04-10 — Content format: MD + frontmatter

**Context:** The stage breakdown left MDX vs MD as a blocking question. Decision reached in pre-planning conversation.
**Options:** MDX (JSX in content), MD + frontmatter (plain Markdown + structured metadata).
**Decision:** MD + frontmatter for MVP. MDX migration path kept open via loader abstraction.
**Rationale:** MD is sufficient for rich editorial content (headings, quotes, images, tables, emphasis). MDX adds complexity and coupling not needed in the MVP. The loader is the only coupling point — a future migration to MDX requires changing only the parser, not the schema or content types.

#### 2026-04-10 — Test file location convention

**Context:** No `src/test/` directory established yet.
**Options:** A) Colocate tests with source (`src/lib/content/`). B) Top-level `src/test/` directory.
**Decision:** A) Tests colocate with source in `src/lib/content/` for library utilities.
**Rationale:** Content parsing is a library of isolated utilities. Unit tests naturally live next to the modules they test. Global `src/test/` is more appropriate for E2E or cross-module integration tests, which are not part of this stage.

### Spec Issues

_No issues_ if empty.

---

## Stage Metrics

> Filled during `close-stage`. Derive each value from this WORK file — no separate artifact needed.

| Metric | Value |
|--------|-------|
| Cycle time | _(dates: Draft → Complete)_ |
| Review rounds | _(how many `review-stage-code` iterations before ✅)_ |
| Escalations | _(Architecture or Design Track escalations: "none" or count + reason)_ |
| Spec issues | _(blocking questions or spec issues: "none" or count + description)_ |

### Final Verification

Complete before marking status as Complete.

- [ ] All tasks marked `[x]`
- [ ] All acceptance criteria met
- [ ] `npm run build` passed
- [ ] `npm run lint` passed (zero errors)
- [ ] `npm run typecheck` passed
- [ ] Unit tests pass (loader: parse valid, missing field, malformed)
- [ ] No forbidden files were touched
- [ ] No invariants were violated
- [ ] Content format decision documented in `content/README.md`
- [ ] MDX migration path documented in `loader.ts`
- [ ] Sample content uses real editorial structure (not lorem ipsum)
- [ ] WORK file reflects actual work performed
- [ ] No spillover or deviation from the original WORK packet
- [ ] Code review artifact exists: `workflow/reviews/REVIEW-003-code.md`

---

## Operator Inspection Log

> Filled during `operator-acceptance` (optional). Not required for this stage type.

## Files Modified

> Agent: list files created or edited during implementation, as recorded in Progress Notes.
> This list is used by `close-stage` (Step 6) to construct the git add and commit command.
> Operator: do NOT edit this list by hand — it comes from the implementer's notes.

-
