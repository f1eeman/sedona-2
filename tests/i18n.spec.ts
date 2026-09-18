import { expect, test } from '@playwright/test'

const LOCALES = [
  { code: 'ru', prefix: '', home: 'Главная', heading: 'Гостиницы' },
  { code: 'kk', prefix: '/kk', home: 'Басты бет', heading: 'Қонақүйлер' },
  { code: 'en', prefix: '/en', home: 'Home', heading: 'Hotels' },
]

test.describe('локали', () => {
  for (const locale of LOCALES) {
    test(`${locale.code}: lang, меню и заголовок`, async ({ page }) => {
      await page.goto(`${locale.prefix}/hotels/`)

      await expect(page.locator('html')).toHaveAttribute('lang', locale.code)
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(
        locale.heading,
      )
      await expect(
        page.getByRole('link', { name: locale.home, exact: true }),
      ).toHaveAttribute('href', `${locale.prefix}/`)
    })
  }

  test('русский остался без префикса', async ({ page }) => {
    const response = await page.goto('/hotels/')

    expect(response?.status()).toBe(200)
    await expect(page.locator('html')).toHaveAttribute('lang', 'ru')
  })

  test('переключатель ведёт на ту же страницу', async ({ page }) => {
    await page.goto('/hotels/')

    await page.getByRole('link', { name: 'Қазақша', exact: true }).click()
    await expect(page).toHaveURL(/\/kk\/hotels\/$/)

    await page.getByRole('link', { name: 'Русский', exact: true }).click()
    await expect(page).toHaveURL(/\/hotels\/$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'ru')
  })

  test('текущий язык не ссылка и помечен aria-current', async ({ page }) => {
    await page.goto('/en/')

    await expect(
      page.getByRole('link', { name: 'English', exact: true }),
    ).toHaveCount(0)
    await expect(page.locator('[aria-current="true"]')).toHaveText('English')
  })

  test('у ссылок переключателя свой lang', async ({ page }) => {
    await page.goto('/')

    await expect(
      page.getByRole('link', { name: 'Қазақша', exact: true }),
    ).toHaveAttribute('lang', 'kk')
    await expect(
      page.getByRole('link', { name: 'English', exact: true }),
    ).toHaveAttribute('lang', 'en')
  })
})
