# Sinais de Imortalidade — Agent Instructions

This file is the main entry point for coding agents (Cursor, Codex, and others).
It mirrors `CLAUDE.md` — both files must stay in sync.

---

## Source of Truth

- `workflow/product/PRODUCT_FRAMING.md` — problem, north star, guiding principles
- `specs/guidelines/ARCHITECTURE.md` — authoritative architecture rules
- `specs/guidelines/INVARIANTS.md` — non-negotiable guarantees
- `specs/guidelines/QUALITY_BAR.md` — when work is acceptable
- `specs/guidelines/CONTEXT.md` — project orientation
- `specs/guidelines/STACK_PROFILE.md` — stack declaration

If any spec is unclear or contradictory, STOP and report a Spec Issue. Do not guess.

---

## Workflow Interaction Model

Three first-class tracks:
- **Delivery Track** — phase/stage/WORK lifecycle, implementation, reviews
- **Architecture Track** — structural debate, ADRs, boundary changes
- **Design Track** — UX/UI shaping, flow exploration, visual roundtrips

Only Delivery creates implementation work directly.
Architecture and Design produce approved artifacts that are promoted into Delivery.

---

## Language Rule

- Code, comments, docs, WORK files: **English**
- UI display text, validation messages: **Português (pt-BR)**

---

## Artifact Locations

```
workflow/product/        — PRODUCT_FRAMING.md, MVP_THESIS.md, CORE_USER_FLOW.md
workflow/execution/      — EXECUTION_PLAN.md, PHASE_X.md
workflow/architecture/   — ADRs
workflow/design/         — SCREEN_FLOWS.md, UX briefs, prototype.html
workflow/work/           — WORK packets (WORK-XXX-*.md)
workflow/reviews/        — review artifacts
workflow/retros/         — phase retros
specs/guidelines/        — ARCHITECTURE.md, INVARIANTS.md, STACK_PROFILE.md, QUALITY_BAR.md
```

---

## Execution Role stability vs skill role context

- `Execution Role` is the session-global role after operator confirmation.
- Invoking a skill from another track/role does **not** silently change the session `Execution Role`.
- A skill may use a temporary role context only for that skill execution.
- When temporary role context is used, the agent must explicitly state:
  1) temporary context start,
  2) action/result under that context,
  3) return to the previous session `Execution Role`.
- Global role changes must be explicit operator commands.
