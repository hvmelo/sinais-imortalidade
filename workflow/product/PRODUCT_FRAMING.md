# PRODUCT_FRAMING.md

## Problem Statement

Pessoas interessadas em imortalidade, longevidade e futuro humano não têm uma publicação de nicho que combine alta frequência, profundidade editorial e rigor factual com curadoria consistente.

## Who Experiences It

**Primary:**  
Entusiastas de longevidade/biotech que acompanham o tema com frequência e querem uma curadoria recorrente, confiável e focada em imortalidade via tecnologia.

**Secondary (if relevant):**  
Leitores aspiracionais curiosos, fascinados por imortalidade, futuro humano e tecnologia, mas que ainda não têm repertório profundo e precisam de contexto editorial acessível.

## Why Now

Longevidade, biotecnologia, IA aplicada à ciência e futuro humano estão acelerando simultaneamente, mas a cobertura continua fragmentada, genérica ou sem recorte editorial forte. Ao mesmo tempo, a operação AI-native torna viável testar uma publicação especializada com alta frequência e custo operacional mais controlado, antes de expandir para uma visão maior de plataforma.

## Evidence

| Evidence | Type (observed / inferred / assumed) |
|----------|--------------------------------------|
| Há interesse crescente em longevidade, biotech, IA e futuro humano | inferred |
| A cobertura atual do tema é dispersa entre ciência, saúde, biotech, futuro e opinião | inferred |
| O tema é forte o bastante para sustentar identidade editorial própria | assumed |
| A operação AI-native pode permitir testar uma mídia temática com mais velocidade e menor custo relativo | assumed |

## Desired Outcome

Criar uma publicação editorial AI-native que entregue sinais diários e análises profundas sobre imortalidade via tecnologia, de forma confiável o bastante para virar hábito de leitura e base de audiência própria.

## Primary Success Signal

**Signal:**  
O projeto sustenta a cadência editorial definida com qualidade aprovada e converte parte dos leitores em inscritos da newsletter.

**Baseline (if known):**  
Ainda não estabelecida.

**Target:**  
Sustentar 5–6 Sinais por dia e 2 Análises por semana com qualidade editorial aprovada, enquanto começa a formar audiência própria via newsletter.

## Non-Goals

- Provar distribuição multicanal no MVP
- Lançar um SaaS / Blog Engine
- Automatizar toda a newsletter ponta a ponta no primeiro momento
- Construir CMS, admin panel ou backoffice sofisticado
- Incluir monetização direta no MVP
- Depender de imagens externas sem licença clara

## Current Dominant Unresolved Risk

**Risk:**  
Um agente consegue produzir conteúdo editorial de nicho com qualidade e confiabilidade altas o bastante para sustentar uma marca editorial séria.

**Type:** `strategic proof`

**Why this is the dominant risk:**  
Se essa hipótese estiver errada, o produto até pode publicar conteúdo, mas não construirá confiança suficiente para sustentar audiência, reputação editorial ou justificar expansão futura.

## Scope Posture

**In scope:**
- Site como canal principal
- Homepage signal-first
- Páginas próprias para Sinais e Análises
- Busca full-text
- Filtros por subtema
- Newsletter com captura de email e integração com provider
- Operação editorial baseada em arquivos no repo
- Obsidian como memória, research e fonte de verdade para decisões
- Fact-check e review editorial no fluxo de conteúdo

**Deferred:**
- Telegram, X, YouTube, Spotify, Instagram, TikTok
- Monetização direta
- SaaS / Blog Engine
- CMS/headless CMS
- Admin panel
- Autenticação
- Comentários, favoritos e contas de usuário
- Dashboards internos sofisticados
- Páginas dedicadas por subtema
- Relógio da imortalidade e outras features experimentais

## Assumption Table

| Assumption | Risk if wrong | Confidence | Mitigation approach |
|------------|---------------|------------|---------------------|
| Existe demanda real por curadoria de nicho sobre imortalidade via tecnologia | High | Medium | Validar recorrência de consumo e conversão para newsletter no MVP |
| Um agente consegue operar como autor editorial principal sem destruir a confiança do produto | High | Medium | Usar guardrails fortes: manual editorial, fact-check, review e supervisão humana nas análises |
| Rigor factual + revisão humana nas análises é suficiente para manter credibilidade | High | Medium | Exigir grounding visível em fontes, bloquear itens com alerta factual não resolvido |
| O formato dual Sinais + Análises cria mais valor do que um blog tradicional ou feed puro | Medium | Medium | Observar qualidade percebida, retorno e retenção qualitativa |
| O site sozinho é suficiente para validar o núcleo antes da expansão multicanal | Medium | High | Manter escopo reduzido e medir formação de audiência própria antes de expandir |

**Riskiest assumption:**  
Um agente consegue produzir conteúdo editorial de nicho com qualidade e confiabilidade altas o bastante para sustentar uma marca editorial séria.

## North Star & Guiding Principles

**North star:**  
Construir uma publicação editorial AI-native confiável e recorrente sobre imortalidade via tecnologia, capaz de combinar atualidade, profundidade e rigor em um formato que mereça atenção contínua.

**Guiding principles:**

| Principle | Why it matters |
|-----------|---------------|
| Qualidade editorial acima de automação total | Automação só tem valor se preservar padrão editorial alto |
| Confiabilidade factual acima de velocidade | Um erro factual destrói confiança mais rápido do que um atraso destrói cadência |
| Signal-first, but authority through analysis | Sinais sustentam frequência e atualidade; Análises constroem reputação e originalidade |
| MVP enxuto, estrutura expansível | O produto inicial deve ser simples de operar sem bloquear evolução futura |
| Repo para publicação, Obsidian para memória | Separar artefato publicável de research, memória editorial e contexto estratégico reduz ambiguidade operacional |

## Open Questions

| Question | Owner | Target resolution |
|----------|-------|-------------------|
| Qual provider de newsletter será usado no MVP? | Henrique / Architecture | Antes de formalize-architecture |
| Qual formato exato dos arquivos canônicos de conteúdo publicado? | Architecture | Antes do plano de implementação |
| Como formalizar o manual editorial do agente no fluxo do projeto? | Henrique / Product | Antes do início da implementação editorial |

## Amendment Log

- 2026-04-10 — reframed into canonical template after skill/template installation
  - Type: `traceability-only`
  - Action: content revised by owning skill
  - Notes: no product understanding change; structure normalized to template

## Approval

**Approved by:** Henrique
**Date:** 2026-04-10
**Notes:** Approved after normalization to canonical workflow template.
