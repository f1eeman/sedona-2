import { expect, test, type Page } from '@playwright/test'

const errorOf = (page: Page) => page.locator('[data-modal="error"]')
const successOf = (page: Page) => page.locator('[data-modal="success"]')
const submitOf = (page: Page) =>
  page.getByRole('button', { name: 'Отправить отзыв' })

const fill = async (page: Page) => {
  await page.getByLabel('Имя*:').fill('Пётр')
  await page.getByLabel('Фамилия*:').fill('Иванов')
  await page.getByLabel('Контактный телефон*:').fill('+7 999 000 00 00')
  await page.getByLabel('Электронная почта*:').fill('petr@example.com')
}

test.describe('форма отзыва', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/form/')
  })

  test('обе модалки скрыты при загрузке', async ({ page }) => {
    await expect(errorOf(page)).toBeHidden()
    await expect(successOf(page)).toBeHidden()
  })

  test('пустая отправка показывает ошибку и метит поля', async ({ page }) => {
    await submitOf(page).click()

    await expect(errorOf(page)).toBeVisible()
    await expect(successOf(page)).toBeHidden()
    await expect(page.locator('[aria-invalid="true"]')).toHaveCount(4)
  })

  test('фокус в поле снимает пометку об ошибке', async ({ page }) => {
    await submitOf(page).click()
    await page.getByLabel('Имя*:').focus()

    await expect(page.getByLabel('Имя*:')).not.toHaveAttribute('aria-invalid')
    await expect(page.locator('[aria-invalid="true"]')).toHaveCount(3)
  })

  test('Esc закрывает модалку ошибки', async ({ page }) => {
    await submitOf(page).click()
    await expect(errorOf(page)).toBeVisible()

    await page.keyboard.press('Escape')

    await expect(errorOf(page)).toBeHidden()
  })

  test('заполненная форма показывает подтверждение', async ({ page }) => {
    await fill(page)
    await submitOf(page).click()

    await expect(successOf(page)).toBeVisible()
    await expect(errorOf(page)).toBeHidden()
    await expect(page.getByLabel('Имя*:')).toHaveValue('')
  })

  test('кнопка модалки закрывает её', async ({ page }) => {
    await fill(page)
    await submitOf(page).click()
    await page.getByRole('button', { name: 'Закрыть окно' }).click()

    await expect(successOf(page)).toBeHidden()
  })
})
