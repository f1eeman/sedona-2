import { test, type Page } from '@playwright/test'

const OUT = process.env['SEDONA_SHOTS'] ?? '.shots'

const PAGES = [
  { path: '/', name: 'index' },
  { path: '/photo/', name: 'photo' },
  { path: '/form/', name: 'form' },
  { path: '/hotels/', name: 'hotels' },
]

const SIZES = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 320, height: 640 },
]

const settle = async (page: Page) => {
  await page.waitForTimeout(600)

  const height = await page.evaluate(() => document.body.scrollHeight)
  const step = 400

  for (let y = 0; y < height; y += step) {
    await page.evaluate((top) => {
      window.scrollTo({ top, behavior: 'instant' })
    }, y)
    await page.waitForTimeout(90)
  }

  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  })
  await page.waitForTimeout(700)
}

test('снимки страниц', async ({ page }) => {
  for (const size of SIZES) {
    await page.setViewportSize({ width: size.width, height: size.height })

    for (const item of PAGES) {
      await page.goto(item.path)
      await settle(page)
      await page.screenshot({
        path: `${OUT}/v2-${item.name}-${size.name}.png`,
        fullPage: true,
      })
    }
  }
})
