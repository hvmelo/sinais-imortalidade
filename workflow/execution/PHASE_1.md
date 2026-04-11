# Phase 1 — Foundation & Content Architecture

## Goal

Establish the project skeleton — Next.js app, design tokens in code, content model definition, and deploy pipeline — so that all subsequent phases build on a working, deployable base.

## Why This Phase Exists

The execution plan starts with infrastructure because every later phase depends on a stable application shell, a canonical content model, and a reliable publish-to-deploy flow. Without this phase, UI work would be built on shifting foundations and content implementation would fragment before the team agrees on how Sinais and Análises are represented in the repo. This phase converts the approved upstream artifacts into an executable base while preserving the product's editorial-first principles and static-first constraints.

## High-Level Stages

### Stage 1.1 — App Foundation

Initialize the Next.js App Router project, TypeScript baseline, Tailwind integration, and deployment-ready project structure.

### Stage 1.2 — Design Token Integration

Bring the approved design system into code so typography, colors, spacing, and elevation are available as implementation constraints from the start.

### Stage 1.3 — Content Model Definition

Define the canonical repo-based format for Sinais and Análises, including frontmatter/schema decisions and sample development content.

### Stage 1.4 — Publishing Mechanics Baseline

Set up the manual content publishing path so content files committed to the repo can trigger predictable deploys to Vercel.

### Stage 1.5 — Base UI & Typography Shell

Establish the minimal global styling, font loading, and base layout primitives that later UI phases will reuse.

## Stage Advancement

The High-Level Stages above are scope-intent placeholders only — they are NOT the execution plan.
Run `breakdown-phase PHASE_1` to replace them with detailed, ordered stages before creating WORK packets.

## Expected Testable Outcomes

- A Next.js App Router application exists in the repo and runs locally.
- Tailwind is configured with the approved Sinais de Imortalidade design tokens.
- Sora and DM Sans load correctly and apply to base typography roles.
- The team has a documented canonical content format for Sinais and Análises in the repo.
- Sample content files render successfully in development using the chosen content format.
- A commit to the default branch can trigger a predictable Vercel deployment path.
- Global styling primitives are in place for subsequent UI-heavy phases.

## Non-Goals

- Building the homepage, listing pages, or article pages in full.
- Implementing search, newsletter provider integration, or related-content logic.
- Creating automated editorial pipelines or autonomous publishing workflows.
- Finalizing visual polish or micro-interactions beyond token integration.
- Resolving all launch-readiness concerns such as SEO, analytics, RSS, or sitemap generation.

## Dependency on Previous Phase

Phase 1 assumes the upstream definition layer provides:

- Approved `PRODUCT_FRAMING.md`
- Approved `MVP_THESIS.md`
- Approved `CORE_USER_FLOW.md`
- Approved `SCREEN_FLOWS.md`
- Approved `DESIGN_SYSTEM.md`
- Approved `EXECUTION_PLAN.md`

## Reference

This phase realizes the product foundation and content architecture goal area as described in `workflow/execution/EXECUTION_PLAN.md`.
