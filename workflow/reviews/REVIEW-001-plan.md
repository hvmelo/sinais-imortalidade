# REVIEW-001 — Plan — App Foundation

**Artifact reviewed:** `workflow/work/WORK-001-stage-1-1-app-foundation.md`
**Review type:** plan
**Reviewed by:** Architect
**Date:** 2026-04-10
**Verdict:** ✅ Approve

## Summary

Stage 1.1 establishes the greenfield Next.js App Router baseline — the absolute minimum infrastructure needed to run a TypeScript web application. Scope is tight (10 files, all infrastructure), task list maps cleanly to the Allowed Files, and there are no critical violations. One informational note on an existing file that pre-exists the stage.

## What Already Exists

The repo already contains one infrastructure file that overlaps with this stage's scope:

- `tailwind.config.ts` — exists in repo root with Next.js content paths (`./src/**/*`, `./app/**/*`, `./components/**/*`) and a partial design token set (colors, fonts, spacing, shadows). This is a positive finding: it means Stage 1.2 (Design System Integration) already has a starting point and does not need to create `tailwind.config.ts` from scratch.

All other files in the Allowed Files list are genuinely new.

**Nothing relevant to reuse** — stage introduces genuinely new structure. No existing app structure, components, or configuration exists.

## Scope Challenge

1. **Existing code:** Only `tailwind.config.ts` overlaps. No other infrastructure or application code exists.
2. **Minimum scope:** 10 files is the strict minimum for a functional Next.js App Router project. No deferrable work identified.
3. **Complexity check:** 10 files exceeds the 8-file threshold, but all 10 are distinct, mandatory infrastructure pieces. No optional improvements bundled. Stage size is justified.
4. **Built-in check:** Stage uses Next.js built-in App Router, TypeScript, ESLint, Tailwind. No custom alternatives proposed.
5. **Completeness check:** Plan covers the full bootstrap — config, scripts, layout, page, CSS, type definitions. No shortcuts taken.
6. **TODOS cross-reference:** No `TODOS.md` found in repo.

## Critical Issues

None.

## Medium Issues

None.

## Nice to Have

- **Note on `tailwind.config.ts`:** An existing `tailwind.config.ts` with Next.js content paths and design tokens already exists in the repo. The WORK packet lists it as a creation step. Implementer should clarify whether to treat it as an overwrite or use the existing file as a starting point. This is informational — it does not affect the plan structure.

## Failure Modes

| Codepath | Failure Mode | Test Coverage |
|----------|-------------|---------------|
| `npm install` | Network/npm registry failure | Covered by acceptance criterion (install succeeds) |
| `npm run build` | TypeScript/Next.js config error | Covered by acceptance criterion (build passes) |
| `npm run lint` | ESLint misconfiguration | Covered by acceptance criterion (lint passes) |

**Conclusion:** No significant new codepaths introduced. All failure modes are caught by the acceptance criteria themselves.

## Architecture Checklist

- [x] Dependency direction respected — greenfield, no dependencies to violate
- [x] No cross-layer type leakage — greenfield, no types yet
- [x] No business logic in transport/entrypoint — greenfield, no logic yet
- [x] Presentation/transport access inner modules through public interfaces — N/A (no inner modules yet)
- [x] No direct imports into project-defined internal module boundaries — N/A
- [x] Ports justified — N/A
- [x] Upstream ADR/architecture note respected — N/A (no ARCHITECTURE.md yet)

**Stack profile loaded:** `REACT_WEB.md` principles applied (App Router, TypeScript, lint/build baseline)

## Invariant Risks

- **Server Components must never import client-only APIs** — Not violated: no components created yet.
- **`tsc --noEmit` must pass** — Addressed in acceptance criteria and Required Tests.
- **`eslint` must pass with zero errors** — Addressed in acceptance criteria and Required Tests.
- **No CMS, DB, or auth dependencies** — Out of Scope covers this.

**Conclusion:** No invariant risks in this stage.

## Test Gaps

None blocking.

**Note:** `npx tsc --noEmit` is not listed in the Required Tests table but is listed as an acceptance criterion. Implementer should execute it as part of verification. This is not a gap — it is an accepted criterion — but the TEST Coverage table should be updated to reflect it for consistency.

## QA Test Plan Review

**QA verdict:** adequate

#### Acceptance Criteria → Test Scenario Mapping

| Acceptance Criterion | Test Scenario | Type | File |
|---|---|---|---|
| `npm install` completes successfully | Install smoke | manual | acceptance criterion |
| `npm run build` passes | Build verification | manual | `npm run build` |
| `npm run lint` passes | Lint verification | manual | `npm run lint` |
| App runs locally with minimal root page | Dev server smoke | manual | `npm run dev` |
| Global CSS loaded through root layout | Render check | manual | file inspection |
| No forbidden dependencies introduced | Dependency audit | manual | `package.json` review |

#### Mandatory Coverage Check

- [x] Happy path — build passes
- [x] Invalid input — N/A (no user input in this stage)
- [x] Missing required fields — N/A
- [x] Failure in dependency — `npm install` failure caught by acceptance criterion
- [x] Boundary conditions — N/A

**Test plan is adequate — all acceptance criteria mapped. Stage Type is `infrastructure`, E2E not applicable.**

## Not in Scope

- Full Sinais design language application (Stage 1.2)
- Editorial content schema (Stage 1.3)
- Homepage or content pages (later phases)
- Newsletter integration (Phase 4)
- CMS, database, auth (out of scope for entire MVP)

## Suggested Prompt to Implementer

Not needed — plan approved without changes.

## Reviewer Notes

**Allowed Files verdict:** correct
**File scope analysis:** 9 creation + 1 modification. All files are distinct infrastructure pieces required for a functional Next.js App Router project. No forbidden files are listed. No additional files needed.
**Technical observations:**
1. The existing `tailwind.config.ts` pre-exists this stage with Next.js content paths already configured. Implementer should use it as the starting point rather than creating a duplicate.
2. No `app/` directory exists yet — all `app/*` files are new.
3. `.gitignore` needs standard Next.js ignores: `node_modules/`, `.next/`, `.env*`, `*.log`.
4. `next-env.d.ts` is auto-generated by Next.js CLI; if using `npx create-next-app` or equivalent, it will be created automatically.

---

## Risk Assessment

- **Risk level:** low
- **Criteria triggered:** none

**Rationale:** All OPS-009 risk criteria are false for this stage. While 10 files are touched, all are distinct, mandatory infrastructure pieces for a greenfield Next.js bootstrap — no optional improvements bundled, no new abstractions beyond what's strictly required, and no unresolved blocking questions.

---

## Plan Review — Consolidated Summary

- **File created:** `workflow/work/WORK-001-stage-1-1-app-foundation.md`
- **Stage:** 1.1 — App Foundation
- **Stage Type:** infrastructure | **Expected User Impact:** none
- **Plan review verdict:** ✅ Approve
- **QA test plan verdict:** adequate
- **Issues:** none
- **Risk level:** low — implementation can begin

> Plan approved (low-risk). Beginning implementation now.

