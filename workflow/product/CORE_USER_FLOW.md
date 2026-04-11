# CORE_USER_FLOW.md

## User Goal

Um entusiasta de longevidade/biotech descobre conteúdo editorial de alta qualidade sobre imortalidade via tecnologia, consome Sinais e Análises recorrentemente, e converte-se em assinante da newsletter.

## Pre-conditions

- O site está no ar e com conteúdo publicado
- Há pelo menos alguns Sinais recentes e uma Análise disponível
- Newsletter está configurada com signup funcional

## Flow Steps

| Step | User action | System response | Notes / friction risk |
|------|-------------|-----------------|----------------------|
| 1 | Chega ao site via busca, link externo, recomendação **ou deep link direto para Sinal/Análise** | Homepage **ou página de conteúdo** carrega — ambas devem comunicar o que é o projeto | **Friction:** chegada via deep link bypassa a homepage; página de conteúdo precisa ter contexto suficiente do projeto |
| 2 | Escaneia a homepage — lê títulos e resumos dos Sinais | Sinais visíveis em grid escaneável com categoria, título e resumo curto | **Friction:** sem categoria visível ou resumo fraco, o leitor não sabe se vale clicar |
| 3 | Clica num Sinal de interesse | Abre página do Sinal: o que aconteceu / por que importa / fonte + relacionados | **Friction:** fonte fraca ou "por que importa" genérico → leitor não confia |
| 4 | Lê o Sinal e descobre relacionados | Relacionados exibidos: outros Sinais + eventual Análise sobre tema | **Friction:** relacionados irrelevantes interrompem a exploração |
| 5 | Navega para Análise em destaque (via homepage ou relacionado) | Abre Análise: leitura longa, estruturada, tese explícita, fontes visíveis | **Friction:** leitura longa no mobile precisa de layout responsivo bem ajustado |
| 6 | Lê a Análise com profundidade | Conteúdo sustenta com argumentação, contexto e referências | **Friction:** análise rasa ou mal fundamentada → destrói credibilidade |
| 7a | Filtra conteúdo por subtema (navegação por interesse) | Sistema filtra feed por subtema selecionado via pills | **Friction:** pills pouco visíveis ou sem contagem de conteúdo frustram |
| 7b | Usa busca para encontrar conteúdo específico (intenção ativa) | Sistema retorna resultados full-text relevantes com trecho e categoria | **Friction:** busca fraca ou resultados irrelevantes frustram descoberta ativa |
| 8 | Encontra CTA de newsletter em múltiplos pontos da jornada | CTA aparece na homepage, no rodapé de Sinais/Análises, e no footer | **Friction:** CTA cedo demais (antes de experiência) ou proposta vaga reduzem conversão |
| 9 | Inscreve-se na newsletter | Sistema registra email e integra com provider | **Friction:** processo confuso ou sem confirmação clara |
| 10 | Recebe newsletter 2x/semana | Digest curado chega com ênfase em Sinais + link para Análise da semana | **Friction:** digest genérico ou que duplica o site reduz valor percebido |
| 11 | Retorna ao site via link na newsletter | Homepage com novos Sinais — ciclo reinicia | No MVP, **newsletter é o principal mecanismo de retorno**. RSS e notificações ficam fora do MVP. |

## Decision Points

| Decision point | Options | What determines the path |
|----------------|---------|--------------------------|
| Leitor chega por deep link (não pela homepage) | Entende o contexto do projeto e explora mais / Não entende e sai | Qualidade das informações contextuais na página de conteúdo |
| Sinal em destaque captura atenção | Avança para leitura / Sai | Qualidade editorial e relevância do Sinal hero |
| Leitor no Sinal individual | Confia na fonte → explora mais / Não confia → sai | Qualidade do fact-check e da curadoria |
| Leitor na Análise | Sustenta interesse → mais engajado / Abandona → sai | Profundidade e estrutura editorial |
| Leitor encontra o CTA de newsletter | Percebe valor → converte / Não percebe → continua sem assinar | Clareza do CTA e qualidade acumulada da experiência |
| Leitor recebe newsletter | Relevante o suficiente → retorna / Irrelevante → cancela | Qualidade do digest e frequência |

## Error / Edge Cases

| Scenario | Expected behavior | Open question (if any) |
|----------|-------------------|------------------------|
| Busca retorna resultados vazios | Mensagem clara + sugestão de subtemas ou Sinais recentes | — |
| Sinal com alerta factual chegou ao ar | Não deve acontecer — sistema segura itens com alerta | Qual fallback se um item problemático passar? |
| Newsletter não entrega | Problema de provider — fora do escopo do produto | Qual provider usar? |
| Leitor no mobile com Análise longa | Layout responsivo com tipografia e espaçamento adaptados | Experiência mobile será validada no Design Track |
| Leitor não encontra conteúdo de subtema | Filtros + busca devem resolver | — |

## Post-conditions

- O leitor consumiu pelo menos um Sinal e/ou uma Análise
- O leitor tem entendimento do que é o projeto e seu recorte editorial
- Se converteu: está inscrito na newsletter, recebe 2 envios por semana
- Se não converteu: saiu com impressão positiva suficiente para potencial retorno
- Em qualquer caso: o produto demonstrou a tese editorial e a qualidade da curadoria

## Open UX Questions

| Question | Owner | Target resolution |
|----------|-------|-------------------|
| Onde exatamente o CTA de newsletter aparece na página de Sinal/Análise? | Design Track | Antes do scaffold da fase de UI |
| Qual é a proposta exata do CTA da newsletter? | Henrique / PO | Antes de implementar o signup |
| Qual é o comportamento dos "relacionados" — curado manualmente ou por sistema? | Architecture | Antes de formalize-architecture |
| Qual newsletter provider será usado? | Henrique | Antes de formalize-architecture |
| Qual é a estratégia de exposição progressiva do CTA? | Design Track | Antes do scaffold da fase de UI |
| Como mobile vs. desktop variam a experiência do fluxo core? | Design Track | Antes do scaffold da fase de UI |

## Amendment Log

— sem entradas no momento —

## Approval

**Designer reviewed by:** AI Designer (sessão 2026-04-10)
**Approved by (Repo PO):** Henrique
**Date:** 2026-04-10
**Notes:** Draft v2 pós-Designer review incorporado.
