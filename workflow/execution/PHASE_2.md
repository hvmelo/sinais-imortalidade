# Phase 2 — Signal Experience

## Goal

Deliver the core product surfaces — homepage and signal pages — so that a reader can arrive, scan signals, read one, and understand the editorial identity.

## Why This Phase Exists

Phase 1 built the foundation: app bootstrap, design tokens, content model, and publishing mechanics. Nothing was visible to a reader yet. Phase 2 turns that foundation into a usable product surface. Without it, the project has no reader experience — the content exists in the repo but cannot be discovered or read on the site.

## High-Level Stages

### Stage 2.1 — Global Layout Shell

Install the global layout: sticky navigation with backdrop blur and logo, dark footer, and the shared page shell that every route wraps into.

### Stage 2.2 — Homepage

Build the homepage (`/`): dark hero with the featured signal, a signal grid with client-side subtheme filters, a highlighted analysis section, and a full-width dark newsletter CTA block.

### Stage 2.3 — Signals Listing

Build the signals listing page (`/signals`): page header with filter tabs, a featured card at the top, a scrollable signal list, and a sidebar with a newsletter widget, category list, and related analyses.

### Stage 2.4 — Signal Individual Page

Build the individual signal page (`/signals/[slug]`): breadcrumb, signal header, structured body blocks (O que aconteceu / Por que importa / Fonte), related content section, and a newsletter CTA.

## Stage Advancement

The High-Level Stages above are scope-intent placeholders only — they are NOT the execution plan.
Run `breakdown-phase PHASE_2` to replace them with detailed, ordered stages before creating WORK packets.

## Expected Testable Outcomes

- A reader can visit `/` and see the homepage with the featured signal, signal grid, and newsletter CTA
- A reader can filter signals by subtheme on the homepage and on `/signals` — filtering is client-side and instant
- A reader can visit `/signals` and browse all signals in a structured listing with a sidebar
- A reader can click any signal and reach `/signals/[slug]` where the full signal is rendered with structured blocks
- All pages are responsive — readable and usable on mobile and desktop
- All pages load without errors — build, typecheck, and lint pass throughout

## Non-Goals

- Analysis listing and individual pages (`/analyses`)
- Institutional pages (`/sobre`, `/metodologia`)
- Newsletter provider integration (Stage 4)
- Search functionality (Stage 4)
- Related content automation (Stage 4)
- Launch-readiness work (Phase 5)
- Visual refinement (Phase 6)

## Dependency on Previous Phase

Phase 2 assumes Phase 1 provides:

- Next.js 15 App Router application that builds and runs
- Design tokens and typography (Sora + DM Sans) via Tailwind
- Content loader (`loadSignals()`, `loadAnalysis()`) working and tested
- Sample content files in `content/signals/` and `content/analyses/`
- `workflow/design/SCREEN_FLOWS.md` (approved) and `specs/guidelines/DESIGN_SYSTEM.md` (approved)

## Reference

This phase realizes the Signal Experience as described in `workflow/execution/EXECUTION_PLAN.md`.
