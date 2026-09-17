import { expect, test, type Page } from '@playwright/test'

const playerOf = (page: Page) => page.locator('[data-player]')
const mediaOf = (page: Page) => page.locator('[data-player-media]')

test.describe('видеоплеер', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/photo/')
    await playerOf(page).scrollIntoViewIfNeeded()
  })

  test('по умолчанию играет зациклено и без звука', async ({ page }) => {
    await expect(playerOf(page)).toHaveAttribute('data-state', 'playing')
    await expect(playerOf(page)).toHaveAttribute('data-muted', '')

    const media = await mediaOf(page).evaluate((node: HTMLVideoElement) => ({
      loop: node.loop,
      muted: node.muted,
      paused: node.paused,
    }))

    expect(media).toStrictEqual({ loop: true, muted: true, paused: false })
  })

  test('кнопка останавливает и снова включает видео', async ({ page }) => {
    await page.locator('[data-player-toggle]').click()
    await expect(playerOf(page)).toHaveAttribute('data-state', 'paused')

    await page.locator('[data-player-toggle]').click()
    await expect(playerOf(page)).toHaveAttribute('data-state', 'playing')
  })

  test('доступное имя кнопки отражает состояние', async ({ page }) => {
    await expect(page.locator('[data-player-toggle]')).toHaveAccessibleName(
      'Остановить видео',
    )

    await page.locator('[data-player-toggle]').click()

    await expect(page.locator('[data-player-toggle]')).toHaveAccessibleName(
      'Включить видео',
    )
  })

  test('перемотка работает с клавиатуры', async ({ page }) => {
    await page.locator('[data-player-toggle]').click()
    await page.locator('[data-player-progress]').focus()
    await page.keyboard.press('Home')

    await expect
      .poll(async () =>
        mediaOf(page).evaluate((node: HTMLVideoElement) => node.currentTime),
      )
      .toBeLessThan(1)

    await page.keyboard.press('End')

    await expect
      .poll(async () =>
        mediaOf(page).evaluate((node: HTMLVideoElement) => node.currentTime),
      )
      .toBeGreaterThan(5)
  })

  test('звук включается и выключается', async ({ page }) => {
    await page.locator('[data-player-sound]').click()

    await expect(playerOf(page)).not.toHaveAttribute('data-muted', '')
    expect(
      await mediaOf(page).evaluate((node: HTMLVideoElement) => node.muted),
    ).toBe(false)

    await page.locator('[data-player-sound]').click()

    await expect(playerOf(page)).toHaveAttribute('data-muted', '')
  })

  test('«заново» возвращает в начало', async ({ page }) => {
    await page.locator('[data-player-progress]').focus()
    await page.keyboard.press('End')
    await page.locator('[data-player-replay]').click()

    await expect(playerOf(page)).toHaveAttribute('data-state', 'playing')
    await expect
      .poll(async () =>
        mediaOf(page).evaluate((node: HTMLVideoElement) => node.currentTime),
      )
      .toBeLessThan(3)
  })

  test('выход из полного экрана возвращает на прежнее место', async ({
    page,
  }) => {
    const before = await page.evaluate(() => Math.round(window.scrollY))

    await page.locator('[data-player-fullscreen]').click()
    await page.evaluate(async () => {
      await document.exitFullscreen()
    })

    await expect
      .poll(async () => page.evaluate(() => Math.round(window.scrollY)))
      .toBe(before)
  })

  test('на весь экран видео занимает весь экран', async ({ page }) => {
    await page.locator('[data-player-fullscreen]').click()

    const size = await page.evaluate(() => {
      const media = document.querySelector('video')
      const rect = media?.getBoundingClientRect()

      return {
        entered: document.fullscreenElement !== null,
        mediaHeight: rect === undefined ? 0 : Math.round(rect.height),
        windowHeight: window.innerHeight,
      }
    })

    expect(size.entered).toBe(true)
    expect(size.mediaHeight).toBeGreaterThan(size.windowHeight * 0.8)
  })
})
