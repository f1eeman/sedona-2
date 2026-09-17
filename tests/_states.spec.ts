import { test, expect } from '@playwright/test'

const OUT = process.env['SEDONA_SHOTS'] ?? '.shots'

test('бургер в крест', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 })
  await page.goto('/')
  await page.waitForTimeout(800)
  await page.locator('[data-menu-toggle]').click()
  await page.waitForTimeout(400)
  await page.screenshot({ path: `${OUT}/st-burger-open.png` })
})

test('лайк и наведение на фото', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/photo/')
  await page.waitForTimeout(600)
  await page.locator('[data-like]').first().click()
  await page
    .locator('.photo-card--small .photo-card__container')
    .first()
    .hover()
  await page.waitForTimeout(600)
  await page
    .locator('.photo__list')
    .screenshot({ path: `${OUT}/st-photo-hover.png` })
})

test('модалка успеха', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/form/')
  await page.getByLabel('Имя*:').fill('Пётр')
  await page.getByLabel('Фамилия*:').fill('Иванов')
  await page.getByLabel('Контактный телефон*:').fill('+7 999 000 00 00')
  await page.getByLabel('Электронная почта*:').fill('petr@example.com')
  await page.getByRole('button', { name: 'Отправить отзыв' }).click()
  await page.waitForTimeout(600)
  await page.screenshot({ path: `${OUT}/st-modal-success.png` })
})

test('модалка ошибки', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/form/')
  await page.getByRole('button', { name: 'Отправить отзыв' }).click()
  await page.waitForTimeout(700)
  await page.screenshot({ path: `${OUT}/st-modal-error.png` })
})

test('каталог после сортировки', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/hotels/')
  await page.waitForTimeout(600)
  await page.getByRole('button', { name: 'По убыванию' }).click()
  await page.waitForTimeout(500)
  await expect(page.locator('[data-hotels-count]')).toHaveText('3')
  await page.locator('.catalog').screenshot({ path: `${OUT}/st-catalog.png` })
})

test('фильтр с галочками', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/hotels/')
  await page
    .locator('[data-hotels-filter]')
    .getByText('Бассейн', { exact: true })
    .click()
  await page.locator('[data-price-to]').fill('4500')
  await page.locator('[data-price-to]').blur()
  await page.waitForTimeout(600)
  await page
    .locator('.hotels-filter')
    .screenshot({ path: `${OUT}/st-filter.png` })
})

test('reduced-motion показывает весь контент', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  await page.waitForTimeout(800)
  await page.screenshot({ path: `${OUT}/st-reduce.png`, fullPage: true })
})

test('слайдер цены', async ({ page }) => {
  for (const size of [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'mobile', width: 320, height: 640 },
  ]) {
    await page.setViewportSize({ width: size.width, height: size.height })
    await page.goto('/hotels/')
    await page.waitForTimeout(500)
    await page.locator('[data-price-to]').fill('3200')
    await page.locator('[data-price-to]').dispatchEvent('input')
    await page.locator('[data-price-from]').fill('900')
    await page.locator('[data-price-from]').dispatchEvent('input')
    await page.waitForTimeout(400)
    await page
      .locator('.hotels-filter')
      .screenshot({ path: `${OUT}/st-slider-${size.name}.png` })
  }
})

test('плеер', async ({ page }) => {
  for (const size of [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 320, height: 640 },
  ]) {
    await page.setViewportSize({ width: size.width, height: size.height })
    await page.goto('/photo/')
    await page.locator('[data-player]').scrollIntoViewIfNeeded()
    await page.locator('[data-player-toggle]').click()
    await page.waitForTimeout(900)
    await page
      .locator('[data-player]')
      .screenshot({ path: `${OUT}/st-player-${size.name}.png` })
  }
})
