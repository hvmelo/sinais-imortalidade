# Content — Sinais de Imortalidade

Arquivos editoriais do projeto em formato **MD + frontmatter**.

---

## Formato

Cada arquivo é um documento **Markdown** com um bloco **YAML frontmatter** no topo.

### Por que MD + frontmatter?

O formato foi escolhido para o MVP por ser:

- **Legível por humanos** — qualquer editor de texto abre, qualquer pessoa edita sem ferramentas
- **Portátil** — não depende de frameworks, bibliotecas específicas ou runtime
- **Suficiente para conteúdo editorial** — títulos, citações, imagens, tabelas, ênfases, links, footnotes
- **Simples de versionar** — diffs limpos no git, merges triviais
- **Pronto para migração** — o loader abstrai o formato; a migração para MDX requer mudança apenas em `src/lib/content/loader.ts`, não no conteúdo nem nos tipos

**Postura MDX:** A migração para MDX (permitindo componentes React inline no corpo) é uma possibilidade futura. O schema de frontmatter e os tipos TypeScript não mudam. O único ponto de acoplamento é o parser — isolado por design.

---

## Estrutura de diretórios

```
content/
├── signals/        # Signals — descobertas curtas, estudos, atualizações
│   ├── signal-001.md
│   └── signal-002.md
└── analyses/       # Analyses — peças longas com argumento e fontes
    └── analysis-001.md
```

---

## Convenções de nomenclatura

- **Arquivos:** `{tipo}-{NNN}.md`
  - `signal-001.md`, `signal-002.md`, ...
  - `analysis-001.md`, `analysis-002.md`, ...
- **Slugs:** derivados do nome do arquivo sem extensão
  - `signal-001.md` → slug: `signal-001`
  - `analysis-001.md` → slug: `analysis-001`
- **Datas:** ISO 8601 (`YYYY-MM-DD`)
- **Tags:** sempre em português, minúsculas, separadas por vírgula

---

## Frontmatter — Signal

```yaml
---
title: "Título do Signal"
slug: "slug-unico"
date: "2026-04-01"
description: "Uma frase que resuma o signal em 1-2 frases."
tags: ["tag1", "tag2"]
source: "Nome da fonte (jornal, estudo, empresa)"   # opcional
url: "https://link-da-fonte"                         # opcional
urgency: "low" | "medium" | "high"                  # opcional
---
```

### Campos obrigatórios

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `title` | string | Título editorial do signal |
| `slug` | string | Identificador único (derivado do nome do arquivo) |
| `date` | string | Data ISO 8601 da publicação |
| `description` | string | Descrição em 1-2 frases |
| `tags` | string[] | Lista de tags (mínimo 1) |

### Campos opcionais

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `source` | string | Nome da fonte primária |
| `url` | string | Link para a fonte |
| `urgency` | `low` \| `medium` \| `high` | Urgência editorial |

---

## Frontmatter — Analysis

```yaml
---
title: "Título da Analysis"
slug: "slug-unico"
date: "2026-04-01"
description: "Resumo do argumento central em 1-3 frases."
tags: ["tag1", "tag2"]
thesis: "A frase que resume o argumento central — em 1-2 frases."
sources:
  - "Autor. 'Título do artigo.' Publication, Ano."
  - "https://url-da-fonte"
relatedSignals: ["slug-do-signal-relacionado"]        # opcional
readTime: 10                                          # opcional
---
```

### Campos obrigatórios

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `title` | string | Título editorial |
| `slug` | string | Identificador único |
| `date` | string | Data ISO 8601 |
| `description` | string | Resumo em 1-3 frases |
| `thesis` | string | Frase-argumento central |
| `sources` | string[] | Lista de fontes (mínimo 1) |

### Campos opcionais

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `relatedSignals` | string[] | Slugs de signals relacionados |
| `readTime` | number | Tempo estimado de leitura (minutos) |

---

## Corpo — markdown

O corpo usa Markdown padrão com estas convenções editoriais:

### Hierarquia
- `#` — título principal (título do signal/analysis)
- `##` — seções de primeiro nível
- `###` — subseções

### Citações
```markdown
> "Texto da citação."
> — Nome, Cargo, Instituição
```

### Listas de fontes
No final de cada analysis, as fontes devem estar explícitas com nome, título e publicação quando aplicável.

### Separadores
Usar `---` para separar seções temáticas dentro de um mesmo signal ou analysis.

---

## Validação

O loader valida o frontmatter automaticamente:
- Campos obrigatórios ausentes → erro com nome do campo
- Tipo inválido → erro com descrição do tipo esperado
- Data mal formatada → erro

Erros de validação impedem o build. O conteúdo editorial é validado no mesmo pipeline que o código.

---

## Editores recomendados

- **VS Code** com extensão "YAML" (para frontmatter) + "Markdown All in One"
- **Obsidian** (especialmente para escrita editorial)
- **Typora** ou **Marktext** (leitura/writing limpo)
- Qualquer editor de texto puro funciona (nano, vim, etc.)

Evitar: Google Docs, Word, Notion export (perdem frontmatter ou formatação).
