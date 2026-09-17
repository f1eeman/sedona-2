import { expect, test, type Page } from '@playwright/test'

const cardsOf = (page: Page) => page.locator('[data-hotel]:not([hidden])')
const countOf = (page: Page) => page.locator('[data-hotels-count]')
const titlesOf = async (page: Page) =>
  cardsOf(page).locator('.hotel-card__title').allTextContents()

const toggleFilter = (page: Page, label: string) =>
  page.locator('[data-hotels-filter]').getByText(label, { exact: true }).click()

test.describe('каталог гостиниц', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/hotels/')
  })

  test('показаны все гостиницы, счётчик совпадает', async ({ page }) => {
    await expect(cardsOf(page)).toHaveCount(3)
    await expect(countOf(page)).toHaveText('3')
  })

  test('по умолчанию сортировка по цене по возрастанию', async ({ page }) => {
    expect(await titlesOf(page)).toStrictEqual([
      'Villas at Poco Diablo',
      'Desert Quail Inn',
      'Amara Resort & Spa',
    ])
  })

  test('смена направления переворачивает список', async ({ page }) => {
    await page.getByRole('button', { name: 'По убыванию' }).click()

    expect(await titlesOf(page)).toStrictEqual([
      'Amara Resort & Spa',
      'Desert Quail Inn',
      'Villas at Poco Diablo',
    ])
  })

  test('сортировка по рейтингу меняет порядок', async ({ page }) => {
    await page.getByRole('button', { name: 'По рейтингу' }).click()

    expect(await titlesOf(page)).toStrictEqual([
      'Amara Resort & Spa',
      'Desert Quail Inn',
      'Villas at Poco Diablo',
    ])
  })

  test('фильтр по инфраструктуре сужает выдачу', async ({ page }) => {
    await toggleFilter(page, 'Бассейн')

    await expect(cardsOf(page)).toHaveCount(2)
    await expect(countOf(page)).toHaveText('2')
  })

  test('фильтр по типу жилья сужает выдачу', async ({ page }) => {
    await toggleFilter(page, 'Гостиница')
    await toggleFilter(page, 'Апартаменты')

    await expect(cardsOf(page)).toHaveCount(1)
    expect(await titlesOf(page)).toStrictEqual(['Desert Quail Inn'])
  })

  test('цена отсекает дорогие варианты', async ({ page }) => {
    await page.locator('[data-price-to]').fill('2500')
    await page.locator('[data-price-to]').blur()

    await expect(cardsOf(page)).toHaveCount(1)
    expect(await titlesOf(page)).toStrictEqual(['Villas at Poco Diablo'])
  })

  test('пустая выдача объясняет себя', async ({ page }) => {
    await toggleFilter(page, 'Гостиница')
    await toggleFilter(page, 'Мотель')
    await toggleFilter(page, 'Апартаменты')

    await expect(cardsOf(page)).toHaveCount(0)
    await expect(countOf(page)).toHaveText('0')
    await expect(page.locator('[data-hotels-empty]')).toBeVisible()
  })
  test('слайдер цены двигается мышью и фильтрует', async ({ page }) => {
    const thumb = page.locator('[data-price-range-to]')
    const box = await thumb.boundingBox()

    if (box === null) throw new Error('нет бокса у слайдера')

    await page.mouse.move(box.x + box.width - 10, box.y + box.height / 2)
    await page.mouse.down()
    await page.mouse.move(box.x + box.width * 0.45, box.y + box.height / 2, {
      steps: 12,
    })
    await page.mouse.up()

    const to = Number(await page.locator('[data-price-to]').inputValue())

    expect(to).toBeGreaterThan(1500)
    expect(to).toBeLessThan(3500)
    await expect(cardsOf(page)).toHaveCount(1)
  })

  test('слайдер цены двигается стрелками', async ({ page }) => {
    await page.locator('[data-price-range-from]').focus()
    await page.keyboard.press('ArrowRight')
    await page.keyboard.press('ArrowRight')

    await expect(page.locator('[data-price-from]')).toHaveValue('200')
  })

  test('ручки слайдера не перепрыгивают друг друга', async ({ page }) => {
    await page.locator('[data-price-to]').fill('1000')
    await page.locator('[data-price-to]').dispatchEvent('input')
    await page.locator('[data-price-from]').fill('3000')
    await page.locator('[data-price-from]').dispatchEvent('input')

    const from = Number(await page.locator('[data-price-from]').inputValue())
    const to = Number(await page.locator('[data-price-to]').inputValue())

    expect(from).toBeLessThanOrEqual(to)
  })

  test('поле цены двигает ручку слайдера', async ({ page }) => {
    await page.locator('[data-price-to]').fill('2500')
    await page.locator('[data-price-to]').blur()

    await expect(page.locator('[data-price-range-to]')).toHaveValue('2500')
  })

  test('фильтр не сдвигает страницу под курсором', async ({ page }) => {
    await page.evaluate(() => {
      window.scrollTo({ top: 400, behavior: 'instant' })
    })

    const before = await page.evaluate(() => Math.round(window.scrollY))

    await page.evaluate(() => {
      const label = [
        ...document.querySelectorAll<HTMLLabelElement>(
          '[data-hotels-filter] label',
        ),
      ].find((node) => node.textContent?.trim() === 'Парковка')

      label?.click()
    })

    await expect(cardsOf(page)).toHaveCount(2)
    expect(await page.evaluate(() => Math.round(window.scrollY))).toBe(before)
  })
})
