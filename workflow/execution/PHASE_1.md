# Phase 1 — Foundation & Content Architecture

## Goal

Establish the project skeleton — Next.js app, design tokens in code, content model definition, and deploy pipeline — so that all subsequent phases build on a working, deployable base.

## Why This Phase Exists

The execution plan starts with infrastructure because every later phase depends on a stable application shell, a canonical content model, and a reliable publish-to-deploy flow. Without this phase, UI work would be built on shifting foundations and content implementation would fragment before the team agrees on how Sinais and Análises are represented in the repo. This phase converts the approved upstream artifacts into an executable base while preserving the product's editorial-first principles and static-first constraints.

## Proposed Stages

## Stage 1.1 — App Foundation ✅ WORK-001 — 2026-04-10

### Objective

Create the runnable Next.js application baseline with TypeScript, Tailwind, and core project scripts so the repo has an executable web foundation.

### Scope

- Initialize the Next.js App Router structure inside the existing repo
- Establish package manifest, scripts, TypeScript config, lint baseline, and build baseline
- Add Tailwind/PostCSS integration
- Create minimal app entrypoints required for the project to run
- Ensure the project can run locally and build cleanly

### Out of Scope

- Applying the full Sinais design language
- Defining the editorial content schema
- Building homepage or content pages
- Wiring any newsletter integration

### Planned Files

| File | Action | Purpose |
|------|--------|---------|
| `package.json` | Create | Project manifest and scripts |
| `tsconfig.json` | Create | TypeScript baseline |
| `next.config.ts` or `next.config.mjs` | Create | Next.js config |
| `postcss.config.js` or `postcss.config.mjs` | Create | Tailwind/PostCSS integration |
| `app/layout.tsx` | Create | Root application shell |
| `app/page.tsx` | Create | Minimal root page |
| `app/globals.css` | Create | Global CSS entrypoint |
| `eslint.config.*` | Create | Lint configuration |
| `next-env.d.ts` | Create | Next.js TS typing support |
| `.gitignore` | Modify if needed | Tooling and build ignores |

### Steps

1. Initialize the Next.js App Router project files in-repo.
2. Configure TypeScript, lint, and core scripts (`dev`, `build`, `lint`).
3. Add Tailwind/PostCSS baseline and wire the global stylesheet.
4. Create the minimal root layout and root page.
5. Verify local dev and build readiness.

### Verification

- `npm install` completes successfully
- `npm run build` passes
- `npm run lint` passes
- The app runs locally with a minimal root page
- Global CSS is loaded through the app root layout

### Constraints to Preserve

- Keep App Router as the canonical project structure
- Do not introduce CMS, DB, or auth dependencies
- Keep abstractions minimal at bootstrap time
- Preserve explicit server/client boundaries

### Risk Level

- **Level:** high
- **Criteria triggered:** new abstraction/module, creates files outside existing project structure, crosses more than one architectural layer
- **Confidence:** high

## Stage 1.2 — Design System Integration & Base UI Shell ✅ WORK-002 — 2026-04-10

### Objective

Integrate the approved design system into the application baseline so tokens, typography, and minimal shared UI primitives are available for all later phases.

### Scope

- Apply approved tokens in `tailwind.config.ts`
- Load Sora and DM Sans in the app shell
- Establish global light-first background, foreground, and typography defaults
- Support contextual dark surfaces required by the MVP
- Add minimal reusable layout primitives for container and reading-width usage

### Out of Scope

- Building final Nav/Footer implementations
- Implementing screen-specific layouts from `SCREEN_FLOWS.md`
- Creating page-specific UI components
- Global dark mode

### Planned Files

| File | Action | Purpose |
|------|--------|---------|
| `tailwind.config.ts` | Modify | Approved token integration |
| `app/layout.tsx` | Modify | Font loading and app-level shell styling |
| `app/globals.css` | Modify | Base typography and global theme defaults |
| `components/primitives/container.tsx` | Create | Shared max-width layout primitive |
| `components/primitives/prose.tsx` | Create | Shared reading-width primitive |
| `lib/design/tokens.ts` or `src/lib/design/tokens.ts` | Create if needed | Typed token export |

### Steps

1. Wire approved fonts into the root layout.
2. Confirm Tailwind tokens match `DESIGN_SYSTEM.md`.
3. Apply global typography, background, and foreground defaults.
4. Add minimal layout primitives for container and long-form reading.
5. Verify tokenized styling works in a simple placeholder render.

### Verification

- Fonts load correctly in the app
- Tailwind token classes reflect approved values
- Light-first UI and contextual dark surfaces both render correctly
- `npm run build` passes
- `npm run lint` passes

### Constraints to Preserve

- MVP remains light-first
- Only approved token values may be used
- Primitives must stay minimal and generic
- No screen-level implementation in this stage

### Risk Level

- **Level:** high
- **Criteria triggered:** introduces new abstraction, creates files outside existing project structure
- **Confidence:** high

## Stage 1.3 — Content Model & Sample Content ✅ WORK-003 — 2026-04-12

### Objective

Define the canonical repo-based content format for Sinais and Análises and provide sample editorial content that can be rendered during development.

### Scope

- Decide the canonical file format: MDX vs MD + frontmatter
- Define required metadata fields for Sinal and Análise
- Create the content directory structure and naming conventions
- Add at least 2 sample Sinais and 1 sample Análise
- Implement minimal content loading/parsing utilities for development use
- Document the content model decision clearly

### Out of Scope

- Search indexing
- Related-content engine
- Publishing automation
- Real editorial production workflow beyond sample data

### Planned Files

| File | Action | Purpose |
|------|--------|---------|
| `content/sinais/*.mdx` or `content/sinais/*.md` | Create | Sample signal content |
| `content/analises/*.mdx` or `content/analises/*.md` | Create | Sample analysis content |
| `src/lib/content/types.ts` | Create | Shared content types |
| `src/lib/content/load-content.ts` | Create | Minimal content loader/parser |
| `content/schema.ts` or `src/content/schema.ts` | Create | Canonical metadata schema |
| `content/README.md` or `README.md` | Modify/Create | Document format and conventions |

### Steps

1. Evaluate MDX vs MD + frontmatter against MVP needs.
2. Define canonical schemas for Sinal and Análise.
3. Create directory structure and naming conventions.
4. Add sample content files.
5. Implement minimal parser/loader.
6. Document the chosen format and conventions.

### Verification

- The chosen format is explicitly documented
- Sample content files parse successfully
- Metadata typing validates required fields
- Sample content can be loaded in development
- `npm run build` passes after content integration

### Constraints to Preserve

- Content must stay git-based and human-readable
- Schema must fit MVP needs without overfitting future roadmap
- No CMS-like complexity
- Format decision must be explicit and documented

### Risk Level

- **Level:** high
- **Criteria triggered:** new abstraction, creates files outside existing project structure, crosses more than one architectural layer, blocking questions known at breakdown time
- **Confidence:** high

## Stage 1.4 — Publishing Mechanics Baseline ✅ WORK-004 — 2026-04-12

### Objective

Establish the manual publishing mechanics and deploy baseline so committed content changes can reliably produce an updated site in Vercel.

### Scope

- Connect sample content into a minimal runtime render path
- Validate the repo commit → build → deploy mechanics for content changes
- Add baseline deployment/config documentation
- Define the human-editor publishing checklist for MVP manual operation
- Prepare the foundation needed by later UI-heavy phases

### Out of Scope

- Newsletter provider integration
- SEO/RSS/sitemap implementation
- Automated editorial pipelines
- Launch-readiness optimization work from Phase 5

### Planned Files

| File | Action | Purpose |
|------|--------|---------|
| `app/page.tsx` | Modify | Render content-backed placeholder |
| `src/lib/content/load-content.ts` | Modify | Production-safe loading path |
| `.env.example` | Create | Environment/config documentation |
| `README.md` or `docs/publishing-manual.md` | Modify/Create | Manual publishing instructions |
| Vercel config files (if needed) | Create | Deploy behavior/config |

### Steps

1. Connect sample content to a minimal runtime render path.
2. Validate that content changes affect build output.
3. Add deploy/config documentation for Vercel usage.
4. Write the manual publishing checklist for editor-driven MVP operation.
5. Verify readiness for Phase 2 to consume real content-backed surfaces.

### Verification

- App root renders content-backed data from repo content
- Build succeeds with content loading enabled
- Deployment instructions are documented
- Manual publishing mechanics are explicit and understandable
- A content change can reasonably trigger a correct rebuild/deploy flow

### Constraints to Preserve

- Manual publishing only
- No automated editorial pipeline
- No provider integrations in this stage
- Keep publishing mechanics simple and auditable

### Risk Level

- **Level:** high
- **Criteria triggered:** introduces new abstraction, crosses more than one architectural layer, has blocking questions known at breakdown time
- **Confidence:** medium

## Stage Advancement Rules

- Each stage must produce a WORK packet before implementation begins.
- Stages that change production code must update tests in the same stage.
- UI-adjacent stages in Phase 1 do **not** require E2E unless a visible user flow is introduced.
- Internal/tooling/content-model stages require `lint` and `build`; add unit tests when parsing or logic becomes non-trivial.
- No stage may silently expand Allowed Files beyond its WORK packet.

## Execution Order

- **Stage 1.1 — App Foundation** [risk: high]  
  First, because the repo must become executable before any other work can build on it.

- **Stage 1.2 — Design System Integration & Base UI Shell** [risk: high]  
  Second, because later UI phases depend on approved tokens, fonts, and minimal shared layout primitives.

- **Stage 1.3 — Content Model & Sample Content** [risk: high]  
  Third, because the project needs a canonical editorial format before meaningful rendering and publishing mechanics stabilize.

- **Stage 1.4 — Publishing Mechanics Baseline** [risk: high]  
  Last, because it depends on the app baseline and content model and turns both into a working manual publishing path.

## Additional Execution Rules

- **A.** All UI-visible text must remain in Portuguese (pt-BR).
- **B.** Do not introduce a database, CMS, or auth layer in Phase 1.
- **C.** Keep abstractions shallow; prefer direct utilities over speculative structure.
- **D.** The content format decision must be documented explicitly because later phases depend on it.
- **E.** Manual publishing mechanics must reflect MVP scope and must not drift into automated editorial workflow.
- **F.** If `ARCHITECTURE.md` remains absent during packet creation, the WORK packet must reference `INVARIANTS.md`, `QUALITY_BAR.md`, `STACK_PROFILE.md`, and this phase breakdown as the effective constraint set.

## Risks & Open Questions

- `specs/guidelines/ARCHITECTURE.md` is still absent. Not blocking the breakdown, but it increases ambiguity for later implementation packets.
- The canonical content format (MDX vs MD + frontmatter) remains the key decision inside Phase 1.
- `STACK_PROFILE.md` still contains outdated references and should be reconciled during implementation planning or before Phase 2.
- No prototype exists. This is not blocking for Phase 1, but some UI interpretation risks may surface later.
- The app is being created from scratch, so bootstrap and deployment assumptions should remain conservative.

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
