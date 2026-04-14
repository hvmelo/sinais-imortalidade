# Sinais de Imortalidade — Quality Bar

This document defines when work is considered acceptable.

---

## General Expectations

- Correct behavior matters more than coverage numbers.
- Happy-path-only implementations are insufficient.
- Failures must be explicit and observable.
- AI-generated code is held to the same standard as human-written code.

---

## Implementation Expectations

- Prefer small, localized changes.
- Avoid broad or stylistic refactors unrelated to the task.
- Prefer clarity and locality over abstraction.
- Prefer extending existing abstractions over introducing new ones.
- Code must be structured for human review first, not AI generation convenience.
- Implementation must respect all guarantees defined in `INVARIANTS.md`.

---

## State Management Expectations

- UI state must be explicit: loading, success, empty, error.
- React components must remain free of business rules.
- Components render what they receive as props — they do not fetch or transform.
- Client-side state is limited to UI concerns only (filters, toggles, modals).

---

## Testing Expectations

- Tests must validate behavior, not implementation details.
- Unit tests are colocated with their source file.
- Content loader and schema validation must have unit test coverage.
- Failure and error paths must be tested where relevant.
- Tests that only assert the happy path are insufficient.
- **Browser E2E is not required in Phases 1–3.** It enters in Phase 5 (launch readiness).
- UI-changing stages must pass: `npm run build`, `npm run lint`, `npm run typecheck`, `npm test`.

---

## Review Enforcement (Non-Negotiable)

Work must be rejected if it:

- Violates any invariant defined in `INVARIANTS.md`.
- Implements content loading, schema validation, or editorial logic inside React components.
- Introduces code changes without corresponding WORK updates (when a WORK packet applies).
- Hardcodes content inside components instead of using the content loader.

Additionally:

- Failure modes must be represented in the test matrix for non-trivial work.
- Documentation changes must accompany code changes when behavior is affected.

---

## Work Packet Discipline (Non-Negotiable)

For any non-trivial work executed via a WORK packet:

- The WORK file is a **living execution log**, not a static plan.
- The AI **must update the WORK file as execution progresses**.

After **every completed task**, the AI MUST:

1. Mark the task as `[x]`.
2. Add a factual entry to **Progress Notes** (date + what changed + files).
3. Update **Test Coverage**:
   - If tests were added/updated, mark scenarios accordingly.
   - If tests were not added yet, explicitly mark remaining scenarios as `[ ]` and state why.
4. Record any non-obvious or irreversible choice in **Decisions**.
5. If any spec is unclear or contradictory, record it in **Spec Issues** and STOP execution.

Completion requirements:

- Work is **not considered done** unless:
  - tasks are marked `[x]`,
  - Progress Notes reflect the actual work performed,
  - Test Coverage reflects current reality (even if still pending),
  - Decisions / Spec Issues are filled when applicable,
  - `npm run build`, `npm run lint`, `npm run typecheck`, and `npm test` are green.

Violations (rejectable):

- Code changes without corresponding WORK updates are invalid.
- Completing tasks without updating Test Coverage is invalid.
- Skipping Decisions when a tradeoff was made is invalid.

Additional rules:

- WORK updates MUST be incremental (task-by-task). Do not batch updates at the end.
- Test coverage MUST be tracked in the WORK file under the **Test Coverage** table.
- If the work produces non-code artifacts (screenshots, exports, fixtures), they MUST be stored under `workflow/work/WORK-XXX-*/` (folder matching the WORK file name, without `.md`). Do not create this folder unless at least one artifact exists.

---

## Documentation Discipline

- Markdown files must remain small and focused.
- Prefer updating existing documents over creating new ones.
- New markdown files should be introduced only when unavoidable.
- Documentation exists to constrain behavior, not to describe everything.
- When code changes affect documents under `docs/` or `specs/`, those documents must be updated in the same change.

---

## Working With AI

Sinais de Imortalidade uses a spec-first workflow for safe AI collaboration.

### What Humans Own

- Guideline specs under `specs/guidelines/`
- Product decisions and editorial direction
- Decisions that change behavior or architecture

### What AI Owns

- Execution plans and logs under `workflow/work/`
- Task progression, decisions, and spec issues inside WORK files
- Recording plans, decisions, and context in `workflow/work/` or `specs/guidelines/` — never only in chat

### Spec-First Rule

- Behavior changes require updating the spec first.
- During implementation, specs are read-only.
- If a spec is unclear or incorrect, AI must stop and report a Spec Issue.

---

## Task Completeness

For non-trivial work, changes are not considered complete unless:

- the WORK file reflects the actual work performed
- decisions and issues are explicitly logged when applicable
- no significant code exists outside the WORK scope
- plans and decisions are persisted in `workflow/work/` or `specs/guidelines/`, not only in chat
