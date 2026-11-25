# Evidência de uso do Playwright MCP

Data da execução: 2026-11-25T01:20:24.457Z

## Servidor MCP

- Pacote: `@playwright/mcp` (versão do projeto: 0.0.86)
- Transporte: stdio
- Navegador: Chrome headless
- Viewport: 1280x800
- Aplicação: http://localhost:5173 (HairDay em execução)

## Ferramentas expostas pelo servidor (25)

- `browser_close`
- `browser_resize`
- `browser_console_messages`
- `browser_handle_dialog`
- `browser_emulate_media`
- `browser_evaluate`
- `browser_file_upload`
- `browser_drop`
- `browser_find`
- `browser_fill_form`
- `browser_press_key`
- `browser_type`
- `browser_navigate`
- `browser_navigate_back`
- `browser_network_requests`
- `browser_network_request`
- `browser_run_code_unsafe`
- `browser_take_screenshot`
- `browser_snapshot`
- `browser_click`
- `browser_drag`
- `browser_hover`
- `browser_select_option`
- `browser_tabs`
- `browser_wait_for`

## Chamadas realizadas

### 1. browser_navigate

```json
{ "url": "http://localhost:5173" }
```

Resposta:

```
### Ran Playwright code
```js
await page.goto('http://localhost:5173');
```
### Page
- Page URL: http://localhost:5173/
- Page Title: HairDay
### Snapshot
- [Snapshot](docs/evidence/mcp-artifacts\page-2026-11-25T01-20-24-326Z.yml)
### Events
- New console entries: docs/evidence/mcp-artifacts\console-2026-11-25T01-20-23-169Z.log#L1
```

### 2. browser_snapshot

Árvore de acessibilidade recebida (2964 caracteres), trecho:

```
### Page
- Page URL: http://localhost:5173/
- Page Title: HairDay
### Snapshot
```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - img "HairDay" [ref=e5]
  - main [ref=e6]:
    - complementary [ref=e7]:
      - heading "Agende um atendimento" [level=2] [ref=e8]
      - paragraph [ref=e9]: Selecione data, horário e informe o nome do cliente para criar o agendamento
      - generic [ref=e10]:
        - generic [ref=e11]:
          - generic [ref=e12]: Data
          - textbox "Data" [ref=e16] [cursor=pointer]: 2026-11-24
        - generic [ref=e19]:
          - generic [ref=e20]: Horários
          - generic [ref=e21]:
            - generic [ref=e22]: Manhã
            - generic [ref=e23]:
              - button "09:00" [ref=e24] [cursor=pointer]
              - button "10:00" [ref=e25] [cursor=pointer]
              - button "11:00" [ref=e26] [cursor=pointer]
              - button "12:00" [ref=e27] [cursor=pointer]
          - generic [ref=e28]:
            - generic [ref=e29]: Tarde
            - generic [ref=e30]:
              - button "13:00" [ref=e31] [cursor=pointer]
              - button "14:00" [ref=e32] [cursor=pointer]
              - button "15:00" [ref=e33] [cursor=pointer]
              - button "16:00" [ref=e34] [cursor=pointer]
              - button "17:00" [ref=e35] [cursor=pointer]
              - button "18:00" [ref=e36] [cursor=pointer]
          - generic [ref=e37]:
            - generic [ref=e38]: Noite
            - generic [ref=e39]:
              - button "19:00" [ref=e40] [cursor=pointer]
              - button "20:00" [ref=e41] [cursor=pointer
```

### 3. browser_take_screenshot

```json
{ "filename": "playwright-mcp-desktop.png", "fullPage": true }
```

Resposta:

```
### Result
- [Screenshot of full page](./playwright-mcp-desktop.png)
### Ran Playwright code
```js
// Screenshot full page and save it as ./playwright-mcp-desktop.png
await page.screenshot({
  fullPage: true,
  path: './playwright-mcp-desktop.png',
  scale: 'css',
  type: 'png'
});
```
```

## Resultado

O servidor Playwright MCP abriu o HairDay, leu a árvore de acessibilidade
(que contém o formulário "Agende um atendimento" e a seção "Sua agenda")
e gravou a captura em `docs/screenshots/playwright-mcp-desktop.png`.
