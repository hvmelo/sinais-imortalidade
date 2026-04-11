# Invariants — Sinais de Imortalidade

This document defines **non-negotiable guarantees**.
If an invariant is violated, the implementation is incorrect.

---

## Server / Client Boundary

- Server Components must never import client-only APIs (useState, useEffect, browser APIs).
- Client Components must be kept as leaf nodes — push data fetching up to Server Components.
- Server actions must validate all inputs — never trust client-supplied data.

## State Clarity

- Loading, success, empty, and error states must be distinct and explicit.
- Optimistic updates must be reverted on failure.

## Architecture Boundaries

- Business logic must not live in route handlers or page components.
- Data fetching must not be scattered across leaf components.

## Error Handling

- Unhandled promise rejections are not allowed.
- User-facing errors must be explicit and observable.
- Silent failures are not allowed.

---

## WORK Document Requirement

- Significant changes (new features, major refactors, architectural changes) must produce
  a WORK document under `workflow/work/`.
- Before making significant modifications, consult existing WORK documents in that area.

## WORK Packet Integrity

- The WORK file must remain accurate and up-to-date throughout implementation.
- No task is complete until the WORK file reflects completed work and test coverage.

---

> TODO — add project-specific invariants above.
> Remove this notice when complete.
