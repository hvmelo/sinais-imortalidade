# SCREEN_FLOWS — Sinais de Imortalidade

## Screen Inventory

| Screen | Route | Status | Stitch ref | Code path |
|--------|-------|--------|------------|-----------|
| Homepage | `/` | `planned` | none | none |
| Sinais (listagem) | `/sinais` | `planned` | `Draft/sinais-var-a.html` | none |
| Sinal Individual | `/sinais/[slug]` | `planned` | none | none |
| Análises (listagem) | `/analises` | `planned` | none | none |
| Análise Individual | `/analises/[slug]` | `planned` | none | none |
| Busca / Resultados | `/busca` | `planned` | none | none |
| Sobre / Manifesto | `/sobre` | `planned` | none | none |
| Metodologia | `/metodologia` | `planned` | none | none |
| Temas / Subtemas | `/temas` | `deferred` | none | none |
| Newsletter Signup | — | `deferred` — componente embutido | none | none |

---

## Flow Map

```
Homepage (/)
  → clique em Sinal → Sinal Individual (/sinais/[slug])
  → clique em Análise destaque → Análise Individual (/analises/[slug])
  → nav "Sinais" → Sinais listagem (/sinais)
  → nav "Análises" → Análises listagem (/analises)
  → nav "Sobre" → Sobre (/sobre)
  → busca (nav) → Busca (/busca)

Sinais listagem (/sinais)
  → clique em card → Sinal Individual (/sinais/[slug])
  → filtro subtema → filtra na própria página (sem mudança de rota)
  → nav links → qualquer outra tela

Sinal Individual (/sinais/[slug])
  → relacionados (sinal) → outro Sinal Individual
  → relacionados (análise) → Análise Individual
  → breadcrumb "← Sinais" → Sinais listagem (/sinais)

Análises listagem (/analises)
  → clique em card → Análise Individual (/analises/[slug])
  → nav links → qualquer outra tela

Análise Individual (/analises/[slug])
  → relacionados → Sinal Individual ou outra Análise Individual
  → breadcrumb "← Análises" → Análises listagem (/analises)

Busca (/busca)
  → resultado → Sinal Individual ou Análise Individual
```

---

## Global Components

### Nav (Global)

**Comportamento:** sticky, backdrop blur, border-bottom sutil.

| Element | Content | Notes |
|---------|---------|-------|
| Logo | `Logo/logo_sinais.png` | Versão completa desktop; versão reduzida mobile |
| Links | Sinais \| Análises \| Sobre | Item ativo com underline cyan |
| CTA | Botão "ASSINAR" | Scroll para seção newsletter |

### Footer (Global)

**Comportamento:** background dark ink (`#0c1222`), padding 3rem.

| Element | Content |
|---------|---------|
| Brand | Logo + tagline curta |
| Links col 1 | Sinais, Análises, Sobre |
| Links col 2 | Metodologia, Newsletter, Contato |

---

## Screen Definitions

### Homepage

**Route:** `/`
**Status:** `planned`

**Purpose:** Porta de entrada do produto. Vitrine editorial com ênfase em atualidade (Sinais) e autoridade (Análises).

**Layout structure:** Nav → hero sinal → grid de sinais recentes + filtros → análises em destaque → manifesto curto → newsletter full-width → footer.

**Content sections:** Nav; Hero Sinal; Filtros subtema; Grid Sinais; Análises em destaque; Manifesto curto; Newsletter full-width; Footer.

### Sinais (listagem)

**Route:** `/sinais`
**Status:** `planned`

**Purpose:** Arquivo completo e navegável de todos os sinais publicados.

**Layout structure:** Nav → page header → layout 2 colunas (main + sidebar) → newsletter full-width → footer.

### Sinal Individual

**Route:** `/sinais/[slug]`
**Status:** `planned`

**Purpose:** Leitura completa de um sinal com contexto editorial e relacionados.

### Análises (listagem)

**Route:** `/analises`
**Status:** `planned`

**Purpose:** Arquivo de análises com foco em profundidade e autoridade editorial.

### Análise Individual

**Route:** `/analises/[slug]`
**Status:** `planned`

**Purpose:** Leitura completa de uma análise com visual editorial consistente.

**Blocos editoriais padronizados (canônicos e ordenados):**
1. **Resumo**
2. **Contexto**
3. **O que mudou**
4. **Por que importa**
5. **O que ainda não sabemos**
6. **Fontes**

### Busca / Resultados

**Route:** `/busca`
**Status:** `planned`

**Purpose:** Encontrar conteúdo específico via busca full-text em títulos, excerpts e corpo de Sinais e Análises.

### Sobre / Manifesto

**Route:** `/sobre`
**Status:** `planned`

**Purpose:** Apresentar o projeto, sua tese editorial e identidade.

### Metodologia

**Route:** `/metodologia`
**Status:** `planned`

**Purpose:** Explicar o processo editorial: escolha de temas, critérios de fontes, fact-check, revisão e papel da IA.

### Temas / Subtemas *(deferred)*

**Route:** `/temas` — `deferred`
**Note:** MVP usa filtros embutidos nas listagens. Página dedicada fica para fase posterior.

---

## Open UX Questions

| Question | Owner | Target resolution |
|----------|-------|-------------------|
| Onde o CTA newsletter aparece na página de Sinal/Análise — ao final do artigo, no meio, ou ambos? | Design Track | Antes de scaffold UI |
| Qual a proposta exata do CTA da newsletter (copy)? | Henrique / PO | Antes de implementar signup |
| Comportamento dos "relacionados" — curado manualmente ou gerado por sistema? | Architecture | Antes de formalize-architecture |
| Qual newsletter provider será usado? | Henrique | Antes de formalize-architecture |
| Estratégia de exposição progressiva do CTA — mesma sessão, todas as telas, ou condicional? | Design Track | Antes de scaffold UI |
| Como mobile vs. desktop variam a experiência do fluxo core? | Design Track | Antes de scaffold UI |
| Comportamento pós-signup: inline "Obrigado! Confirme no seu email." ou redirect? | Henrique / Design | Antes de scaffold UI |
| Logo na nav: versão completa "SINAIS DE IMORTALIDADE" ou versão reduzida em mobile? | Henrique | Antes de scaffold UI |
| O triângulo/indicador do logo aparece como elemento standalone na UI (loading, dot pulsante)? | Design | Antes de scaffold UI |

## Approval

**Approved by (Designer):** AI Designer (sessão 2026-04-10) — Designer review incorporado
**Approved by (PO):** Henrique
**Date:** 2026-04-10
**Notes:** Draft final pós-Designer review. Logo registrado. Global components adicionados. Blocos editoriais canônicos fixados.
