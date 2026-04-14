# REVIEW-005 — Code — Global Layout Shell

**Artifact reviewed:** Stage 2.1 implementation (commit `99d25ba`)
**Review type:** code
**Reviewed by:** Reviewer + QA
**Date:** 2026-04-14
**Verdict:** ✅ Approve

---

## Summary

Two presentational Server Components — Nav and Footer — installed correctly. CSS hover via `<style>` tag keeps both as Server Components with zero client-side JavaScript. TypeScript alias fix and ESLint ignore fix are correct housekeeping.

---

## File-by-File Review

### `components/nav/nav.tsx`

**Verdict:** ✅ Clean

- Server Component (no `'use client'`) ✅
- CSS hover via `<style>` tag — correct pattern for Server Components ✅
- Links: Sinais · Análises · Sobre (Portuguese UI text) ✅
- Logo links to `/` ✅
- `aria-label` not needed (links have text context) — acceptable
- No arbitrary Tailwind values ✅

**Note:** The CSS uses raw hex values (`#0c1222`, `rgba(244, 247, 251, 0.9)`) inline in the `<style>` block. These match the design tokens from `tailwind.config.ts`. This is acceptable for Server Component CSS — Tailwind is not required for CSS-in-JS patterns in Server Components.

---

### `components/nav/footer.tsx`

**Verdict:** ✅ Clean

- Server Component ✅
- Dark surface using explicit hex value `#0c1222` (matches `dark-surface-base` from `globals.css`) ✅
- Responsive 2-column grid with `max-width: 640px` breakpoint ✅
- Footer links: Sobre · Metodologia · Newsletter ✅
- Copyright with dynamic year (`new Date().getFullYear()`) ✅

**NTH:** `new Date().getFullYear()` in a Server Component recalculates on every request. For a static copyright year, this is acceptable. Could be static (`2026`) — not worth changing.

---

### `app/layout.tsx`

**Verdict:** ✅ Clean

- Imports Nav and Footer from `@components/nav/` ✅
- Nav above `{children}`, Footer below ✅
- `import type { Metadata }` still present ✅

---

### Supporting fixes

**`tsconfig.json`:** Added `@components/*` alias + `components/**/*.ts` to `include`. Correct — enables `@components/` imports while keeping `@/` for `src/`. Note: existing `@/lib/content/loader` imports in `app/page.tsx` remain unaffected since `@/` still maps to `./src/*`.

**`eslint.config.mjs`:** Added `ai_workflow/**` to ignores. Correct — the submodule was being scanned by ESLint because it wasn't in the ignore list.

---

## Architecture Checklist

- [x] Nav and Footer are Server Components
- [x] No `'use client'` in any new file
- [x] All UI text in Portuguese
- [x] All component names in English
- [x] No arbitrary Tailwind values in components
- [x] Hover effects via CSS `:hover`, not JS event handlers

---

## Invariant Check

| Invariant | Status |
|---|---|
| Server Components only | ✅ |
| UI text in Portuguese | ✅ |
| Code in English | ✅ |
| `tsc --noEmit` passes | ✅ |
| `eslint` passes | ✅ |
| `npm run build` passes | ✅ |

---

## Issues Summary

### Critical / Medium: None

### NTH
- **[NTH]** `new Date().getFullYear()` in Footer — acceptable as-is, static year would also work

---

## Recommendation

**Accept.**
