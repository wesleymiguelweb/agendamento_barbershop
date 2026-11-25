# AGENTS.md — HairDay

## Visão geral
Aplicação de agendamentos para salão/barbearia (HairDay), construída com React + Vite + TypeScript.
Escopo inicial: dados em memória (estado React) com persistência opcional em `localStorage`.

## Stack
- React 19 + Vite 8 + TypeScript 7
- Estilização com CSS puro (sem Tailwind)
- Lint: oxlint (`npm run lint`)
- Build: `npm run build` (tsc -b && vite build)

## Estrutura
```
src/
  types/appointment.ts      # Appointment, Period, PeriodId
  utils/periods.ts          # PERIODS, ALL_HOURS, getPeriodId
  utils/storage.ts          # load/save localStorage
  utils/date.ts             # todayISO, formatDateBR
  components/
    Header.tsx
    ScheduleForm.tsx        # formulário + validação
    Agenda.tsx             # seletor de data + períodos
    PeriodSection.tsx      # grupo por período + vazio
    AppointmentItem.tsx    # linha com lixeira
    EmptyState.tsx
  App.tsx                  # estado global
  main.tsx
```

## Regras de negócio
- Agendamento = { id, client, date (YYYY-MM-DD), time (HH:mm) }.
- Períodos: Manhã 09h-12h, Tarde 13h-18h, Noite 19h-21h.
- Horários disponíveis: 09:00..12:00, 13:00..18:00, 19:00..21:00.
- Agrupar por período e ordenar horários do menor para o maior.
- Estado vazio exato: "Você ainda não tem agendamentos cadastrados nesse período."
- Validação: não permitir cadastro sem nome, data ou horário; mostrar orientação simples.
- Bloqueio opcional de horários duplicados (data + hora) — implementado.
- Persistência opcional em localStorage — implementada.

## Convenções
- Componentes funcionais com Props tipadas.
- Estado com useState; listas com map/filter/reduce.
- IDs gerados com crypto.randomUUID().
- Sem backend/API/autenticação.
- Testes de UI via Playwright MCP (manual) / screenshots em docs/.

## Comandos
- `npm run dev` — servidor de desenvolvimento (http://localhost:5173)
- `npm run build` — build de produção
- `npm run lint` — lint
- `npm run preview` — preview do build

## Validação
- Abrir app no browser, criar agendamento, verificar listagem por dia, agrupamento, exclusão, estado vazio, validação.
- Screenshots salvos em `docs/screenshots/`.