# Quality Bar — Sinais de Imortalidade

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
- Code must be structured for human review first, not AI generation convenience.
- Implementation must respect all guarantees in `INVARIANTS.md`.

---

## React/Next.js-Specific

- Component unit tests required for non-trivial components.
- Server action and API route handler tests required.
- `tsc --noEmit` must pass before any stage is closed.
- `eslint` must pass with zero errors before any stage is closed.

---

> TODO — add project-specific quality rules above.
> Remove this notice when complete.
