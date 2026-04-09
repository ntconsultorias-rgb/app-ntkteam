@AGENTS.md

# App Neto — Treino & Dieta

## O que é

App SaaS para personal trainers prescreverem treinos e dietas para seus alunos. PWA instalável no celular (sem app store). Multi-tenant: cada personal tem login próprio e gerencia apenas seus alunos.

## Quem usa

- **Personal trainer (admin)**: cria treinos, dietas, gerencia alunos via painel web
- **Aluno (client)**: acessa treino/dieta pelo celular, registra cargas e séries feitas

## Tech Stack

- **Next.js 16** (App Router) + **TypeScript** + **React 19**
- **Tailwind CSS 4** (via PostCSS, configurado em `globals.css` com `@theme inline`)
- **Supabase** (PostgreSQL + Auth + Storage) — ainda não configurado
- **Vercel** para deploy — ainda não configurado
- **PWA** via next-pwa — ainda não configurado
- Path alias: `@/*` → `./src/*`

## Identidade Visual

Paleta fixa — NÃO alterar sem instrução explícita do usuário:

| Token            | Hex       | Uso                    |
|------------------|-----------|------------------------|
| `--background`   | `#0A0A0A` | Fundo principal        |
| `--foreground`   | `#F5F5F5` | Texto principal        |
| `--primary`      | `#E11D48` | Vermelho — CTAs, destaques |
| `--primary-hover`| `#BE123C` | Hover de botões        |
| `--surface`      | `#141414` | Cards, containers      |
| `--surface-light`| `#1E1E1E` | Cards hover, variação  |
| `--border`       | `#2A2A2A` | Bordas sutis           |
| `--muted`        | `#A3A3A3` | Texto secundário       |

Fonte: **Rajdhani** (Google Fonts) — geométrica, angular, remetendo a performance esportiva. Pesos disponíveis: 300, 400, 500, 600, 700. Configurada como `--font-rajdhani` no layout.

Os tokens de cor estão em `src/app/globals.css` e são usados via Tailwind (ex: `bg-primary`, `text-muted`, `border-border`).

## Estrutura de Pastas

```
src/
  app/
    globals.css      # Paleta + tokens Tailwind (@theme inline)
    layout.tsx       # RootLayout com fonte Rajdhani
    page.tsx         # Página inicial (preview da paleta — temporária)
```

## Referência Arquitetural

O projeto segue a mesma arquitetura do **FlowLink** (em `F:\Canal Dark\Aplicativo`):
- Painel admin com sidebar para o personal
- Interface mobile-first para o aluno
- Auth em duas camadas: JWT (personal) + session cookie (aluno)
- Middleware de roteamento por subdomínio/slug
- Multi-tenancy com RLS no Supabase

## Banco de Dados (planejado, ainda não criado)

Tabelas previstas no Supabase:
- `trainers` — personal trainers (admins)
- `students` — alunos vinculados ao trainer
- `workout_plans` — planos de treino
- `workout_days` — dias do treino (A, B, C...)
- `exercises` — exercícios dentro de cada dia
- `diet_plans` — planos de dieta
- `meals` — refeições
- `meal_items` — alimentos de cada refeição
- `workout_logs` — registros do aluno (carga, séries)

## Backlog

O backlog completo está em `backlog.txt` na raiz do projeto, organizado em 5 fases com checkboxes.

**Status atual**: Fase 1 em andamento — setup do projeto concluído, identidade visual configurada. Próximos passos são as telas do app (login, treinos, dietas).

## Convenções

- Idioma da UI: **português brasileiro**
- Mobile-first: toda UI deve priorizar telas de celular
- Usar os tokens de cor do Tailwind — nunca cores hardcoded
- Componentes em `src/components/` (quando criados)
- Tipos em `src/types/` (quando criados)
- Libs/utils em `src/lib/` (quando criados)

## Comandos

```bash
npm run dev    # servidor de desenvolvimento (localhost:3000)
npm run build  # build de produção
npm run lint   # linting com ESLint
```
