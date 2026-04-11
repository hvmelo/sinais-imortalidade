# Sinais de Imortalidade

AI-native editorial publication about immortality, longevity, biotech, and the human future.

## What this project is

**Sinais de Imortalidade** is a niche digital publication focused on one core editorial promise:

- **high-frequency signals** about relevant developments in longevity, biotech, AI for science, and the future of human life
- **deep analyses** that turn scattered news into coherent editorial understanding
- **factual rigor** strong enough to support a serious editorial brand

This MVP is intentionally narrow:

- **website-first**
- **newsletter-supported**
- **manual publishing mechanics**
- **no CMS, no admin panel, no productized publishing engine**

## MVP scope

In scope for this repository:

- Homepage with a **signal-first** editorial structure
- Dedicated pages for:
  - `Sinais`
  - `Análises`
  - `Sobre`
  - `Metodologia`
  - `Busca`
- Newsletter signup integration
- Repo-based content publishing
- Approved design system and execution workflow artifacts

Out of scope for the MVP:

- SaaS / Blog Engine
- monetization
- authentication
- comments, accounts, favorites
- multichannel distribution (Telegram, X, YouTube, etc.)
- full editorial automation pipeline
- global dark mode
- CMS or backoffice

## Product model

The publication operates with a dual editorial format:

### Sinais
Short, high-frequency editorial signals focused on:

- what happened
- why it matters
- source attribution

### Análises
Longer, more structured editorial pieces focused on:

- context
- thesis
- implications
- what remains uncertain
- source grounding

## Editorial principles

- **Quality over automation**
- **Factual reliability over speed**
- **Signal-first, authority-through-analysis**
- **Manual editorial control in the MVP**
- **Repo for publication, Obsidian for memory and decision-making**

## Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Vercel
- **Content source:** repo-based files
- **Source of truth for product memory:** Obsidian Vault

## Design direction

The approved visual direction for the MVP is:

- **Palette:** Cyan Futurista
- **Typography:** Sora + DM Sans
- **UI posture:** light-first, with contextual dark surfaces only
- **Primary visual reference:** `Draft/sinais-var-a.html`

Canonical design artifacts live in:

- `specs/guidelines/DESIGN_SYSTEM.md`
- `workflow/design/SCREEN_FLOWS.md`

## Repository structure

```text
.
├── content/                 # published/editorial content source files
├── specs/guidelines/        # governing specs (design system, invariants, quality bar, stack)
├── workflow/
│   ├── product/             # upstream product artifacts
│   ├── design/              # screen flows and visual companions
│   ├── execution/           # execution plan and phase docs
│   ├── architecture/        # architecture artifacts when needed
│   ├── reviews/             # review outputs
│   ├── retros/              # retrospective artifacts
│   └── work/                # WORK and HOTFIX packets
├── codecode-ai-workflow/    # workflow core submodule
├── tailwind.config.ts
└── workflow.config.json
```

## Workflow status

This repository uses the CodeCode workflow system with upstream planning artifacts and execution packets.

Current known execution artifacts include:

- `workflow/execution/EXECUTION_PLAN.md`
- `workflow/execution/PHASE_1.md`

This means the project is already beyond initial framing and has entered structured delivery planning.

## How publishing works in the MVP

Publishing is intentionally simple:

1. editorial content is created as files in the repo
2. content is reviewed manually
3. changes are committed
4. Vercel rebuilds and republishes the site

This is **not** a fully automated editorial pipeline.
Manual control is part of the MVP strategy.

## Local setup

> Setup may evolve during Phase 1. Keep this section aligned with the actual app bootstrap.

Expected local flow:

```bash
npm install
npm run dev
```

Expected quality checks:

```bash
npm run lint
npm run build
```

## Key project artifacts

### Product
- `workflow/product/PRODUCT_FRAMING.md`
- `workflow/product/MVP_THESIS.md`
- `workflow/product/CORE_USER_FLOW.md`

### Design
- `workflow/design/SCREEN_FLOWS.md`
- `specs/guidelines/DESIGN_SYSTEM.md`

### Execution
- `workflow/execution/EXECUTION_PLAN.md`
- `workflow/execution/PHASE_1.md`

### Constraints
- `specs/guidelines/STACK_PROFILE.md`
- `specs/guidelines/INVARIANTS.md`
- `specs/guidelines/QUALITY_BAR.md`

## Notes

- UI display text should remain in **Português (pt-BR)**
- Code and formal workflow artifacts are written in **English**
- This repo is the execution and publication surface
- The Obsidian Vault is the long-term memory and decision surface

---

Built as an editorial product first — not as a generic content platform.
