import { expect, test } from '@playwright/test'

const PAGES = [
  {
    path: '/',
    label: 'Главная',
    heading: 'Сервис интернет-бронирования отелей в Седоне',
  },
  {
    path: '/photo/',
    label: 'Фото и видео',
    heading: 'Достопримечательности Седоны',
  },
  { path: '/form/', label: 'Форма отзыва', heading: 'Форма отзыва' },
  { path: '/hotels/', label: 'Гостиницы', heading: 'Гостиницы' },
]

test.describe('навигация', () => {
  for (const item of PAGES) {
    test(`${item.label}: заголовок и активный пункт`, async ({ page }) => {
      await page.goto(item.path)

      await expect(page.getByRole('heading', { level: 1 })).toHaveText(
        item.heading,
      )
      await expect(
        page.locator('.site-list__item--active .site-list__link'),
      ).toHaveText(item.label)
      await expect(
        page.getByRole('link', { name: item.label, exact: true }),
      ).toHaveCount(0)
    })
  }

  test('с главной ведут ссылки на все разделы', async ({ page }) => {
    await page.goto('/')

    for (const item of PAGES.slice(1)) {
      await expect(
        page.getByRole('link', { name: item.label, exact: true }),
      ).toHaveAttribute('href', item.path)
    }
  })

  test('кнопка промо ведёт в гостиницы', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'Найти гостиницу' }).click()

    await expect(page).toHaveURL(/\/hotels\/$/)
  })
})
