import { expect, test } from '@playwright/test'

test.describe('гостиницы на трёх языках', () => {
  test('каталог переведён, рейтинг форматируется по локали', async ({
    page,
  }) => {
    await page.goto('/en/hotels/')

    await expect(page.getByText('Found:')).toBeVisible()
    await expect(page.getByRole('button', { name: 'By rating' })).toBeVisible()
    await expect(page.getByText('from 4000 RUB')).toBeVisible()
    await expect(page.getByText('Rating: 8.5')).toBeVisible()

    await page.goto('/kk/hotels/')

    await expect(page.getByText('Табылды:')).toBeVisible()
    await expect(page.getByText('Рейтинг: 8,5')).toBeVisible()
  })

  test('пустая выдача объясняет себя по-английски', async ({ page }) => {
    await page.goto('/en/hotels/')

    for (const name of ['Hotel', 'Motel', 'Apartments']) {
      await page
        .locator('[data-hotels-filter]')
        .getByText(name, { exact: true })
        .click()
    }

    await expect(
      page.getByText(
        'Nothing matched the given conditions. Remove some of the restrictions.',
      ),
    ).toBeVisible()
  })

  test('сортировка по типу читает язык страницы, а не браузера', async ({
    page,
  }) => {
    await page.goto('/en/hotels/')

    await page.getByRole('button', { name: 'By type' }).click()

    const titles = await page
      .locator('[data-hotel]:not([hidden])')
      .locator('.hotel-card__title')
      .allTextContents()

    expect(titles).toStrictEqual([
      'Villas at Poco Diablo',
      'Amara Resort & Spa',
      'Desert Quail Inn',
    ])
  })
})
