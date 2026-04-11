# REVIEW-002 — Plan — Design System Integration & Base UI Shell

**Artifact reviewed:** `workflow/work/WORK-002-stage-1-2-design-system-integration.md`
**Review type:** plan
**Reviewed by:** Architect
**Date:** 2026-04-10
**Verdict:** ✅ Approve

---

## Summary

Stage 1.2 integrates the approved design system into the existing app baseline. The plan is structurally sound — all token, typography, and primitive work is well-scoped, the blocking question on Tailwind token naming is correctly documented and resolved, and no structural violations are present. One scope drift observation worth noting: Task 7 temporarily modifies `app/page.tsx` (a file outside the Allowed Files list) for verification, which Task 8 then reverts. This is a justified deviation, not a violation.

## What Already Exists

- `tailwind.config.ts` — partial design token set already in repo (Stage 1.1 used it as starting point). Stage 1.2 reconciles it against `DESIGN_SYSTEM.md`, not a full creation.
- `app/layout.tsx` — exists but has no font loading or global class application. Stage 1.2 adds `next/font/google` integration.
- `app/globals.css` — exists but only has `@tailwind` directives. Stage 1.2 adds base typography and theme defaults.
- `tailwind.config.ts` content paths — already include `./components/**/*` in the existing file, so no new content path entry is needed.

**Nothing relevant to reuse** for the `components/primitives/` — this is genuinely new structure.

---

## Scope Challenge

1. **Existing code:** `tailwind.config.ts` and `app/` files exist. Components directory is new.
2. **Minimum scope:** 5 files (tailwind config, layout, globals.css, 2 primitives) + 1 temporary page.tsx test = 6 files. No deferrable work identified.
3. **Complexity check:** 6 files touched — within acceptable range. No optional improvements bundled.
4. **Built-in check:** Uses `next/font/google` — Next.js built-in. ✅
5. **Completeness check:** Plan covers font loading, token reconciliation, base CSS, and two primitives. No shortcuts.
6. **TODOS cross-reference:** No `TODOS.md` found.

---

## Critical Issues

None.

---

## Medium Issues

None.

---

## Nice to Have

- **[NTH — informational]** Task 7 temporarily modifies `app/page.tsx` (outside Allowed Files) for visual verification, then Task 8 reverts it. This is acceptable as a justified deviation — the WORK packet documents it explicitly. However, the implementer should be careful to restore the page content precisely and verify no unintended state persists.
- **[NTH — informational]** `components/primitives/` directory is created in this stage but no `index.ts` barrel export is planned. For MVP this is fine (direct imports). A barrel export can be added when Phase 2 introduces more components.

---

## Failure Modes

| Codepath | Failure Mode | Test Coverage |
|----------|-------------|---------------|
| Font loading via `next/font/google` | Network failure or font unavailability | Covered by build acceptance criterion |
| Tailwind token mismatch with `DESIGN_SYSTEM.md` | Visual inconsistency in later phases | Covered by token reconciliation in Task 2 |
| `container.tsx` max-width too narrow/wide | Layout breaks on specific breakpoints | Manual browser verification (Task 7) |
| `prose.tsx` reading width too wide | Poor long-form readability | Manual browser verification (Task 7) |

**Conclusion:** All failure modes are caught by the acceptance criteria or manual verification steps.

---

## Architecture Checklist

- [x] Dependency direction respected — primitives are pure UI, no business logic
- [x] No SDK/DTO/platform types in domain or React — none introduced
- [x] No business logic in route handlers or components — `container.tsx` and `prose.tsx` are pure layout primitives
- [x] No persistence or business logic in React components — components accept props only
- [x] Public facade as only entry point — N/A (utilities, not domain logic)
- [x] No new ports introduced

**Stack profile loaded:** `REACT_WEB.md` principles applied (Server Components for layout primitives, `next/font/google` for typography)

---

## Invariant Risks

- **Server Components never import client-only APIs** — Not violated: `container.tsx` and `prose.tsx` will be Server Components with no hooks or browser APIs.
- **Portuguese UI text** — Not at risk: no visible text in layout primitives.
- **MVP light-first** — Addressed in Non-Goals and Acceptance Criteria. ✅
- **`tsc --noEmit` / `eslint` pass** — In acceptance criteria. ✅

**Conclusion:** No invariant risks in this stage.

---

## Test Gaps

None blocking.

Infrastructure + UI stage. Build, lint, and typecheck are the primary verification mechanisms. Manual browser smoke (font loading, token rendering) is addressed in the verification tasks.

---

## QA Test Plan Review

**QA verdict:** adequate

#### Acceptance Criteria → Test Scenario Mapping

| Acceptance Criterion | Test Scenario | Type | File |
|---|---|---|---|
| Sora + DM Sans load correctly | Dev server smoke + build | manual | browser / build output |
| Tailwind tokens match DESIGN_SYSTEM.md | Token value comparison | manual | tailwind.config.ts |
| Light-first UI renders | Browser smoke | manual | browser |
| Contextual dark surfaces render | Browser smoke | manual | browser |
| container.tsx renders correctly | Dev server smoke | manual | browser |
| prose.tsx renders correctly | Dev server smoke | manual | browser |
| `npm run build` passes | Build verification | automated | CI |
| `npm run lint` passes | Lint verification | automated | CI |
| `npm run typecheck` passes | Typecheck verification | automated | CI |

#### Mandatory Coverage Check

- [x] Happy path — build passes
- [x] Invalid input — N/A (no user input in this stage)
- [x] Missing required fields — N/A
- [x] Failure in dependency — `next/font` network failure caught by build acceptance criterion
- [x] Boundary conditions — N/A

**Test plan is adequate — all acceptance criteria mapped. Stage Type is `ui` (primitives), E2E not required at this layer.**

---

## Blocking Question Assessment

**Q1 — Tailwind token naming convention:** `color-primary` (DESIGN_SYSTEM.md) vs `primary` (existing tailwind.config.ts).

**Assessment:** Correctly handled in the WORK packet. The Decision section documents:
- Options considered
- Decision: Keep flat names for Tailwind compatibility; add comment mapping
- Rationale: Breaking existing utility class names would require updating every future component

**Conclusion:** Not a blocker. Resolution is documented in the WORK packet's Decisions section. Implementer follows the documented decision.

---

## Not in Scope

- Final Nav/Footer implementations (Phase 2)
- Screen-specific layouts from `SCREEN_FLOWS.md` (Phase 2)
- Page-specific UI components (Phase 2+)
- Global dark mode (post-MVP)
- Editorial UI (signal cards, analysis pages) (Phase 2+)

---

## Suggested Prompt to Implementer

Not needed — plan approved without changes.

## Reviewer Notes

**Allowed Files verdict:** correct
**File scope analysis:** 3 modifications + 2 creations. All files are distinct and justified. No forbidden files touched.
**Technical observations:**
1. **Font loading:** Use `next/font/google` exclusively — do NOT use `@import` in CSS for fonts. This ensures fonts are self-hosted by Next.js with proper subsetting and no layout shift.
2. **Tailwind token comment block:** Add a comment block at the top of `tailwind.config.ts` explicitly mapping each DESIGN_SYSTEM.md token name to its Tailwind key. Example:
   ```ts
   // Token mapping (DESIGN_SYSTEM.md → Tailwind key):
   // color-primary       → primary
   // color-accent       → accent
   // color-dark-surface-base → dark-surface-base
   // ...
   ```
3. **Container component:** Keep it minimal — single div with `className` prop passthrough. No layout logic.
4. **Prose component:** Single div with `max-w-prose` (65ch) equivalent and body font. No typography utility classes — let parent control font-family.
5. **Temporary page.tsx modification:** When modifying `app/page.tsx` for verification in Task 7, keep the change minimal (add one container + prose block). Restore exactly in Task 8 — no partial state.

---

## Risk Assessment

- **Risk level:** low
- **Criteria triggered:** none

**Rationale:** All OPS-009 risk criteria are false for this stage plan. While it introduces new abstractions (container, prose), these are the smallest possible abstractions for layout — single-file Server Components with no business logic. The Tailwind token naming question is documented and resolved in the packet. No unresolved blocking questions.

---

## Plan Review — Consolidated Summary

- **File created:** `workflow/work/WORK-002-stage-1-2-design-system-integration.md`
- **Stage:** 1.2 — Design System Integration & Base UI Shell
- **Stage Type:** ui | **Expected User Impact:** none
- **Plan review verdict:** ✅ Approve
- **QA test plan verdict:** adequate
- **Issues:** none
- **Risk level:** low — implementation can begin

> Plan approved (low-risk). Beginning implementation now.

