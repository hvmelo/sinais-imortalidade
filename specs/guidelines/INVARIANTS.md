# Sinais de Imortalidade — Invariants

This document defines **non-negotiable guarantees**.
If an invariant is violated, the implementation is incorrect.

---

## Language

- **Code and comments must be in English.** Variable names, function names,
  type names, schema field names, file names, and code comments must be in English.
- **UI text must be in Portuguese (pt-BR).** All user-facing strings — headings,
  labels, body copy, error messages, empty states — must be in Portuguese.
- Content files (`content/sinais/`, `content/analises/`) are editorial artifacts,
  not code. Their prose is in Portuguese by design.
- Product type names (`Sinal`, `Analise`) used as TypeScript identifiers must be
  translated: `Signal`, `Analysis`.

---

## Content Externalization

- All editorial content must live under `content/`. Content must never be
  hardcoded inside components, pages, or utility files.
- Schema definitions and loading utilities live in `src/lib/content/`.
- Components must not construct or mutate content objects — they only render
  what the loader provides.

---

## Content Validation

- Content must always be validated against its schema before it reaches any
  render path.
- Invalid or incomplete frontmatter must never silently reach the user.
- Schema validation errors must surface explicitly during development
  (thrown error with field and content type) and must not produce silent
  empty states in production.

---

## UI Safety

- The UI must never block on I/O. Content loading is server-side only.
- Client Components must not load content files, access the filesystem,
  or call server-only utilities directly.
- All content loading happens in Server Components or server utilities.
- No artificial delays or polling loops are allowed.

---

## Client / Server Boundary

- Server Components (default in Next.js App Router) may call content loaders,
  read files, and access environment variables.
- Client Components (`"use client"`) must not access the filesystem, secrets,
  or server-only utilities.
- Newsletter and any future external integrations must be called from
  API routes or server actions — never from client components.

---

## State Clarity

- UI state must always be explicit: loading, success, empty, error.
- Pages must handle the empty state (no content) and not assume content always exists.
- `loadAnalysis(slug)` returning `null` must produce a `notFound()` response,
  not a broken render.

---

## Component Boundary

- React components must be UI-only.
- Components must not contain editorial logic, schema validation,
  or content loading.
- Components render what they receive as props — they do not fetch or transform.

---

## WORK Document Requirement

- Significant changes (new features, architectural changes, schema changes)
  must produce a WORK document under `workflow/work/`.
- Before significant modifications, the AI must consult existing WORK documents
  that relate to the affected area.

---

## WORK Packet Integrity

- The WORK file must remain accurate throughout execution.
- No task is complete unless the WORK file reflects completed work and
  current test status.
- Decisions must be recorded when a non-obvious or irreversible choice was made.

---

## Context and Decisions Persistence

- Plans, decisions, and key context must be recorded in persistent artifacts:
  WORK files, `specs/guidelines/`, or the Obsidian vault (product decisions).
- Do not leave decisions only in chat.

---

## Documentation Integrity

- When code changes affect documents under `docs/` or `specs/`, those documents
  must be updated in the same change.
- `content/README.md` is the editorial authority for content format conventions
  and must remain accurate.

---

## Test Location

- Unit tests must be colocated with their source file.
- `src/lib/content/loader.ts` is tested by `src/lib/content/loader.test.ts`.
- Do not create a separate `src/test/` directory.
