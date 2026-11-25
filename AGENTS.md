# AGENTS.md — HairDay

## Visão geral

Aplicação de agendamentos para salão/barbearia (HairDay), construída com React + Vite + TypeScript.
Escopo: dados em memória (estado React) com persistência em `localStorage` e identidade visual inspirada no Figma do projeto.

## Stack

- React 19 + Vite 8 + TypeScript 7
- Estilização com CSS puro (sem Tailwind)
- Ícones: `@phosphor-icons/react`
- Fonte: Catamaran (Google Fonts, carregada em `index.html`)
- Lint: oxlint (`npm run lint`)
- Build: `npm run build` (`tsc -b && vite build`)
- Testes E2E: Playwright (`npm run test:e2e`)

## Identidade visual

Design de referência: Figma `MSPSJagLhcBTAsmZFQVKo1`, nó `3-377`.

| Token | Valor |
| --- | --- |
| `--gray-800` (fundo) | `#19181B` |
| `--gray-700` (card) | `#232225` |
| `--gray-600` (superfície/header) | `#2E2C30` |
| `--gray-500` (bordas) | `#3E3C41` |
| `--gray-200` (texto) | `#B2AFB6` |
| `--gray-100` (títulos) | `#F5F4F5` |
| `--primary` | `#B8952E` |
| `--primary-light` | `#DBC170` |
| `--primary-dark` | `#846F2E` |

- Logo oficial em `src/assets/logo.svg` (fundo `#2E2C30`, tesoura e wordmark dourados).
- Favicon em `public/favicon.svg`.
- Não substituir os ícones por SVGs genéricos: usar os componentes Phosphor já adotados.
- Tema escuro fixo (`color-scheme: dark`); não introduzir tema claro.

## Estrutura

```
src/
  types/appointment.ts      # Appointment, Period, PeriodId
  utils/periods.ts          # PERIODS, ALL_HOURS, getPeriodId
  utils/storage.ts          # load/save localStorage
  utils/date.ts             # todayISO, formatDateBR
  assets/logo.svg           # logo oficial
  components/
    Header.tsx              # header com logo
    DatePicker.tsx          # input de data com calendário e caret
    ScheduleForm.tsx        # formulário + validação + chips de horário
    Agenda.tsx              # cabeçalho da agenda + seletor de data
    PeriodSection.tsx       # grupo por período, ícone e intervalo
    AppointmentItem.tsx     # linha com horário, cliente e lixeira
    EmptyState.tsx          # texto padrão de período vazio
  App.tsx                   # estado global
  main.tsx
  index.css                 # tokens de design
  App.css                   # estilos e responsividade
tests/appointment.spec.ts   # testes Playwright (desktop e mobile)
playwright.config.ts
scripts/playwright-mcp-evidence.mjs
docs/evidence/              # evidências Context7 MCP, Playwright MCP e testes
docs/screenshots/           # capturas desktop e mobile
```

## Regras de negócio

- Agendamento = `{ id, client, date (YYYY-MM-DD), time (HH:mm) }`.
- Períodos: Manhã 09h-12h, Tarde 13h-18h, Noite 19h-21h.
- Horários disponíveis: 09:00..12:00, 13:00..18:00, 19:00..21:00.
- Agrupar por período e ordenar horários do menor para o maior.
- Estado vazio exato: "Você ainda não tem agendamentos cadastrados nesse período."
- Validação: não permitir cadastro sem nome, data ou horário; mostrar orientação simples.
- Bloqueio de horários duplicados (data + hora): chips ocupados ficam desabilitados.
- Ao trocar a data, limpar o horário selecionado se ele estiver ocupado na nova data.
- Persistência em localStorage.

## Convenções

- Componentes funcionais com Props tipadas.
- Estado com `useState`; listas com `map`/`filter`/`reduce`.
- IDs gerados com `crypto.randomUUID()`.
- Sem backend, API ou autenticação.
- Datas em ISO (`YYYY-MM-DD`) e horários em `HH:mm`.
- Textos da interface em português (Brasil).
- Manter os `data-testid` existentes (`schedule-form`, `date-input`, `time-slot`, `time-select`, `client-input`, `schedule-btn`, `form-error`, `agenda`, `agenda-date`, `appointment-item`, `delete-appointment`, `period-*`), pois os testes Playwright dependem deles.
- Não editar `trader/` nem arquivos fora deste projeto.

## Comandos

- `npm run dev` — servidor de desenvolvimento (http://localhost:5173)
- `npm run build` — build de produção
- `npm run lint` — lint
- `npm run preview` — preview do build (http://localhost:4173)
- `npm run test:e2e` — testes Playwright em desktop e mobile
- `npm run evidence:mcp` — gera `docs/evidence/playwright-mcp.md` via servidor Playwright MCP

## Validação

- `npm run build` e `npm run lint` devem passar antes de commitar.
- `npm run test:e2e` deve passar 4 testes (2 cenários × desktop/mobile).
- Os testes verificam: logo carregado, paleta (`#19181B` / `#B8952E` / Catamaran), ausência de overflow horizontal, empilhamento no mobile, criação de 3 agendamentos, bloqueio de horário ocupado e exclusão.
- Screenshots são gerados em `docs/screenshots/{desktop,mobile}-{inicial,agenda}.png`.
- Evidências MCP ficam em `docs/evidence/`.
