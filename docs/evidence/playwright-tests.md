# Evidência de testes — Playwright

Data da execução: 2026-11-24

## Comando

```bash
npm run test:e2e
```

Configuração: `playwright.config.ts`

- Navegador: Chrome (canal instalado no sistema)
- Projeto `desktop`: viewport 1440×900
- Projeto `mobile`: emulação Pixel 7 (412×915, mobile)
- Servidor: `npm run dev` em http://localhost:5173 (reutilizado se já estiver ativo)

## Resultado

```
Running 4 tests using 4 workers

ok [desktop] › exibe a identidade HairDay e a agenda vazia
ok [mobile]  › exibe a identidade HairDay e a agenda vazia
ok [desktop] › cria agendamentos, bloqueia horário ocupado e exclui
ok [mobile]  › cria agendamentos, bloqueia horário ocupado e exclui

4 passed (5.7s)
```

Saída completa: [playwright-tests.txt](playwright-tests.txt)

## Cobertura dos cenários

### Identidade e estado inicial

- Logo `HairDay` visível e carregado (`naturalWidth > 0`).
- Título "Sua agenda" e formulário visíveis.
- Texto de estado vazio exato em cada um dos 3 períodos.
- Paleta aplicada:
  - fundo `rgb(25, 24, 27)` = `#19181B`;
  - botão `rgb(184, 149, 46)` = `#B8952E`;
  - ícones de período `rgb(184, 149, 46)`;
  - fonte contém `Catamaran`.
- Sem overflow horizontal.
- No mobile, o formulário aparece acima da agenda.

### Fluxo de agendamento

- Seleção de data `2026-12-01` e criação de 3 agendamentos:
  - João Silva — 09:00 (Manhã);
  - Maria Souza — 14:00 (Tarde);
  - Pedro Lima — 20:00 (Noite).
- Lista com 3 itens e nenhum estado vazio.
- Horário `09:00` fica desabilitado após ser ocupado.
- Exclusão de João Silva remove o item e mantém os outros 2.

## Screenshots gerados pelos testes

- `docs/screenshots/desktop-inicial.png`
- `docs/screenshots/desktop-agenda.png`
- `docs/screenshots/mobile-inicial.png`
- `docs/screenshots/mobile-agenda.png`

## Playwright MCP

Além da suíte E2E, o servidor oficial `@playwright/mcp` foi conectado por stdio
e usado para navegar, capturar a árvore de acessibilidade e tirar screenshot do
HairDay. Evidência: [playwright-mcp.md](playwright-mcp.md).
