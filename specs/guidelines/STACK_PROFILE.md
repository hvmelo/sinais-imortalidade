# Stack Profile — Sinais de Imortalidade

> **Owner:** Henrique (Kief) + tech lead. Update when stack decisions change.
> **How to use:** Agents read this before any architectural or implementation recommendation.

---

## Stack Declaration

**Primary language:** TypeScript
**Primary framework:** Next.js (App Router)
**Platform:** Web (static-first)
**Runtime target:** Browser + Node.js
**Deployment:** Vercel
**Content source:** arquivos no repositório (Git-based publishing)

---

## External Source of Truth

**Vault Obsidian:** `/Users/hvmelo/Documents/Obsidian/MyVault/Projects/Sinais de Imortalidade`

O Vault é a fonte de verdade para:
- decisões de produto
- memória editorial
- manual do agente
- contexto e invariantes
- research acumulado

O repo (`github.com/hvmelo/sinais-imortalidade`) é a fonte de execução:
- código do site
- artefatos formais do workflow (PRODUCT_FRAMING, MVP_THESIS, EXECUTION_PLAN, etc.)
- conteúdo editorial publicado

---

## Folder Structure

```
sinais-imortalidade/
├── workflow/
│   ├── product/        — PRODUCT_FRAMING.md, MVP_THESIS.md
│   ├── execution/      — EXECUTION_PLAN.md, PHASE_X.md
│   ├── architecture/   — ADRs
│   ├── design/         — SCREEN_FLOWS.md, UX briefs
│   ├── reviews/        — review artifacts
│   └── work/          — WORK packets
├── specs/
│   └── guidelines/     — STACK_PROFILE.md, ARCHITECTURE.md, INVARIANTS.md
├── src/                — código do site (Next.js)
├── content/            — conteúdo publicado (arquivos fonte)
├── docs/
│   └── superpowers/
│       └── specs/      — specs de design e brainstorming
└── .claude/           — workflow skills
```

---

## State Management

**Pattern:** ainda a definir
**Scope:** provavelmente mínimo para MVP — estado primarily no build/rebuild
**Notes:** MVP usa static-first; estado dinâmico (newsletter, analytics) fica em serviços externos

---

## Key Conventions

- **Publicação:** agente gera arquivos de conteúdo no repo → trigger de build/deploy na Vercel
- **Obsidian:** pesquisa, contexto e decisões vivem no Vault, não no repo
- **Artifacts:** todo artifact formal do workflow vai no `workflow/` do repo
- **Specs:** specs de design e brainstorming ficam em `docs/superpowers/specs/`

---

## Known Constraints

- MVP sem CMS/admin — publicação via arquivos no repo
- Newsletter: signup + provider, envio semi-manual
- Sem autenticação de usuários
- Sem banco de dados próprio no MVP
- Runtime de IA/harnesses pode limitar sofisticação de múltiplos agentes no início

---

## UI Governance Policy

**ui_governance:** `managed_ui`
> Design system definido e estável: paleta Cyan Futurista, tipografia Manrope + Inter, layout Signal-First. Conteúdo canônico no Vault (`Sinal Imortal.md`) — será formalizado em `specs/guidelines/DESIGN_SYSTEM.md` via Design Track. 6+ superfícies UI distintas bem definidas.

---

## Approval

**Filled by:** Henrique
**Date:** 2026-04-10
