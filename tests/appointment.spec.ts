import { test, expect } from '@playwright/test'

const DATE = '2026-12-01'
const EMPTY_STATE = 'Você ainda não tem agendamentos cadastrados nesse período.'

test('exibe a identidade HairDay e a agenda vazia', async ({ page }, testInfo) => {
  await page.goto('/')

  const logo = page.getByRole('img', { name: 'HairDay' })
  await expect(logo).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Sua agenda' })).toBeVisible()
  await expect(page.getByText(EMPTY_STATE)).toHaveCount(3)
  await expect(page.getByTestId('schedule-form')).toBeVisible()

  const logoLoaded = await logo.evaluate(
    (img) => (img as HTMLImageElement).naturalWidth > 0,
  )
  expect(logoLoaded).toBe(true)

  const palette = await page.evaluate(() => {
    const style = (selector: string) =>
      getComputedStyle(document.querySelector(selector) as Element)
    return {
      body: style('body').backgroundColor,
      button: style('.schedule-btn').backgroundColor,
      accent: style('.period-icon').color,
      font: style('body').fontFamily,
    }
  })
  expect(palette.body).toBe('rgb(25, 24, 27)')
  expect(palette.button).toBe('rgb(184, 149, 46)')
  expect(palette.accent).toBe('rgb(184, 149, 46)')
  expect(palette.font).toContain('Catamaran')

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  )
  expect(hasHorizontalOverflow).toBe(false)

  if (testInfo.project.name === 'mobile') {
    const formBox = await page.getByTestId('schedule-form').boundingBox()
    const agendaBox = await page.getByTestId('agenda').boundingBox()
    expect(formBox?.y ?? 0).toBeLessThan(agendaBox?.y ?? 0)
  }

  await page.screenshot({
    path: `docs/screenshots/${testInfo.project.name}-inicial.png`,
    fullPage: true,
  })
})

test('cria agendamentos, bloqueia horário ocupado e exclui', async ({ page }, testInfo) => {
  await page.goto('/')
  await page.getByTestId('date-input').fill(DATE)

  async function schedule(client: string, time: string) {
    await page.getByTestId('time-slot').filter({ hasText: time }).click()
    await page.getByTestId('client-input').fill(client)
    await page.getByTestId('schedule-btn').click()
  }

  await schedule('João Silva', '09:00')
  await schedule('Maria Souza', '14:00')
  await schedule('Pedro Lima', '20:00')

  const items = page.getByTestId('appointment-item')
  await expect(items).toHaveCount(3)
  await expect(page.getByText(EMPTY_STATE)).toHaveCount(0)

  // O horário já ocupado fica desabilitado para a data selecionada
  await expect(
    page.getByTestId('time-slot').filter({ hasText: '09:00' }),
  ).toBeDisabled()

  await page.screenshot({
    path: `docs/screenshots/${testInfo.project.name}-agenda.png`,
    fullPage: true,
  })

  await page
    .getByTestId('appointment-item')
    .filter({ hasText: 'João Silva' })
    .getByTestId('delete-appointment')
    .click()

  await expect(items).toHaveCount(2)
  await expect(page.getByText('João Silva')).toHaveCount(0)
})
