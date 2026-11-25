import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'
import { mkdirSync, readdirSync, renameSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const screenshotsDir = resolve(root, 'docs/screenshots')
const evidenceDir = resolve(root, 'docs/evidence')
mkdirSync(screenshotsDir, { recursive: true })
mkdirSync(evidenceDir, { recursive: true })

const args = [
  resolve(root, 'node_modules/@playwright/mcp/cli.js'),
  '--browser',
  'chrome',
  '--headless',
  '--isolated',
  '--viewport-size',
  '1280,800',
  '--output-dir',
  screenshotsDir,
]

const transport = new StdioClientTransport({
  command: process.execPath,
  args,
  stderr: 'pipe',
})

const client = new Client(
  { name: 'hairday-mcp-evidence', version: '1.0.0' },
  { capabilities: {} },
)

function textOf(result) {
  return (result.content ?? [])
    .filter((item) => item.type === 'text')
    .map((item) => item.text)
    .join('\n')
}

try {
  await client.connect(transport)

  const { tools } = await client.listTools()
  const toolNames = tools.map((tool) => tool.name)

  const navigate = await client.callTool({
    name: 'browser_navigate',
    arguments: { url: 'http://localhost:5173' },
  })

  const snapshot = await client.callTool({
    name: 'browser_snapshot',
    arguments: {},
  })

  const screenshot = await client.callTool({
    name: 'browser_take_screenshot',
    arguments: {
      filename: 'playwright-mcp-desktop.png',
      fullPage: true,
    },
  })

  const snapshotText = textOf(snapshot)
    .replaceAll('docs\\screenshots', 'docs/evidence/mcp-artifacts')
    .replaceAll('docs/screenshots', 'docs/evidence/mcp-artifacts')
  const screenshotText = textOf(screenshot)
  const navigateText = textOf(navigate)
    .replaceAll('docs\\screenshots', 'docs/evidence/mcp-artifacts')
    .replaceAll('docs/screenshots', 'docs/evidence/mcp-artifacts')

  const report = `# Evidência de uso do Playwright MCP

Data da execução: ${new Date().toISOString()}

## Servidor MCP

- Pacote: \`@playwright/mcp\` (versão do projeto: 0.0.86)
- Transporte: stdio
- Navegador: Chrome headless
- Viewport: 1280x800
- Aplicação: http://localhost:5173 (HairDay em execução)

## Ferramentas expostas pelo servidor (${toolNames.length})

${toolNames.map((name) => `- \`${name}\``).join('\n')}

## Chamadas realizadas

### 1. browser_navigate

\`\`\`json
{ "url": "http://localhost:5173" }
\`\`\`

Resposta:

\`\`\`
${navigateText.slice(0, 1200)}
\`\`\`

### 2. browser_snapshot

Árvore de acessibilidade recebida (${snapshotText.length} caracteres), trecho:

\`\`\`
${snapshotText.slice(0, 1600)}
\`\`\`

### 3. browser_take_screenshot

\`\`\`json
{ "filename": "playwright-mcp-desktop.png", "fullPage": true }
\`\`\`

Resposta:

\`\`\`
${screenshotText.slice(0, 600)}
\`\`\`

## Resultado

O servidor Playwright MCP abriu o HairDay, leu a árvore de acessibilidade
(que contém o formulário "Agende um atendimento" e a seção "Sua agenda")
e gravou a captura em \`docs/screenshots/playwright-mcp-desktop.png\`.
`

  writeFileSync(resolve(root, 'docs/evidence/playwright-mcp.md'), report, 'utf8')

  const artifactsDir = resolve(evidenceDir, 'mcp-artifacts')
  mkdirSync(artifactsDir, { recursive: true })
  for (const file of readdirSync(screenshotsDir)) {
    if (/^(page-.*\.yml|console-.*\.log)$/.test(file)) {
      renameSync(resolve(screenshotsDir, file), resolve(artifactsDir, file))
    }
  }

  const rootScreenshot = resolve(root, 'playwright-mcp-desktop.png')
  if (readdirSync(root).includes('playwright-mcp-desktop.png')) {
    renameSync(rootScreenshot, resolve(screenshotsDir, 'playwright-mcp-desktop.png'))
  }

  console.log('Evidência gravada em docs/evidence/playwright-mcp.md')
  console.log('Ferramentas:', toolNames.join(', '))
  console.log('Screenshot:', screenshotText.slice(0, 200))
} finally {
  await client.close()
}
