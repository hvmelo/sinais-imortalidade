# Guia de Publicação — Sinais de Imortalidade

Documentação operacional do ciclo de publicação para editores e colaboradores.

---

## Como funciona a publicação

O projeto usa um ciclo simples baseado em Git:

```
Criar/editar arquivo em content/ → git commit → git push → Vercel rebuild → site atualizado
```

Não há CMS, painel de admin ou sistema de publicação especial. O repositório **é** o sistema de publicação.

---

## Ciclo completo: do rascunho ao ar

### 1. Criar o conteúdo

Adicione um arquivo `.md` no diretório correto:

- **Sinal:** `content/sinais/sinal-XXX.md`
- **Análise:** `content/analises/analise-XXX.md`

Onde `XXX` é o próximo número sequencial (verifique quais já existem).

Copie um arquivo existente como ponto de partida e edite o frontmatter.

### 2. Preencher o frontmatter

O frontmatter é o bloco YAML no topo do arquivo (entre `---`). Todos os campos obrigatórios devem estar preenchidos. Consulte `content/README.md` para a referência completa de campos.

**Checklist de frontmatter:**

- [ ] `title` — título editorial claro e informativo
- [ ] `slug` — derivado do nome do arquivo (ex: `sinal-003`)
- [ ] `date` — data no formato `YYYY-MM-DD`
- [ ] `description` — 1-2 frases que resumem o conteúdo
- [ ] `tags` — ao menos 1 tag em português

Para análises, adicionalmente:
- [ ] `thesis` — o argumento central em 1-2 frases
- [ ] `sources` — ao menos 1 fonte listada

### 3. Escrever o corpo

O corpo usa Markdown padrão. Consulte `content/README.md` para convenções editoriais (citações, hierarquia, separadores).

### 4. Verificar localmente (opcional, mas recomendado)

```bash
npm run dev
```

Abra `http://localhost:3000` e confirme que o conteúdo aparece corretamente.

### 5. Commitar e publicar

```bash
git add content/
git commit -m "editorial: adiciona [sinal/análise] [título resumido]"
git push origin main
```

### 6. Aguardar o deploy

O Vercel detecta o push e inicia automaticamente um novo build. O processo leva 1-2 minutos.

### 7. Verificar o deploy

Acesse o URL de produção do projeto no Vercel e confirme que o novo conteúdo está visível.

---

## Checklist de publicação (rápido)

Use antes de cada push:

- [ ] Frontmatter preenchido e correto (todos os campos obrigatórios)
- [ ] Data no formato `YYYY-MM-DD`
- [ ] Slug único (não duplica nenhum arquivo existente)
- [ ] Corpo com estrutura editorial adequada (lead, hierarquia, fontes)
- [ ] Verificado localmente com `npm run dev`
- [ ] Commit com mensagem descritiva

---

## Checklist pós-publicação

- [ ] Acessar o URL de produção
- [ ] Confirmar que o conteúdo novo aparece
- [ ] Verificar que o título e a descrição estão corretos
- [ ] Confirmar que não há erro de build no painel do Vercel

---

## Como verificar o status de um deploy

1. Acesse [vercel.com](https://vercel.com) e entre no dashboard do projeto
2. A aba **Deployments** mostra todos os deploys, com status e logs
3. Um deploy com ✅ **Ready** significa que o conteúdo está no ar
4. Um deploy com ❌ **Error** indica falha de build — veja os logs para diagnóstico

### Erros comuns

| Erro | Causa | Solução |
|------|-------|---------|
| `SchemaValidationError: [Sinal] date: must be a valid ISO 8601 date` | Data no frontmatter mal formatada | Use o formato `YYYY-MM-DD` |
| `SchemaValidationError: [Sinal] title: required field is missing` | Campo obrigatório ausente | Preencher o campo no frontmatter |
| `SchemaValidationError: [Análise] sources: must have at least one source` | Array de fontes vazio | Adicionar ao menos uma fonte |
| Build falha com erro de TypeScript | Sintaxe inválida no arquivo `.md` ou `.tsx` | Revisar o arquivo modificado |

---

## Estrutura do projeto (referência rápida)

```
content/
├── sinais/          # Sinais — short-form editorial
│   └── sinal-XXX.md
└── analises/        # Análises — long-form editorial
    └── analise-XXX.md

app/                 # Next.js application
docs/                # Documentação operacional (este arquivo)
src/lib/content/     # Código de parsing e validação de conteúdo
```

---

## Variáveis de ambiente

O projeto não usa variáveis de ambiente na Fase 1. Se necessário no futuro, consulte `.env.example` na raiz do repositório para a lista de variáveis esperadas.

---

## Dúvidas e problemas

Se um build falhar:
1. Veja os logs no painel do Vercel
2. Reproduza o erro localmente com `npm run build`
3. Verifique o frontmatter do arquivo modificado com `content/README.md`
