import { expect, test } from '@playwright/test'

test.describe('форма отзыва на трёх языках', () => {
  test('форма переведена и модалка отвечает на языке страницы', async ({
    page,
  }) => {
    await page.goto('/en/form/')

    await expect(page.getByLabel('First name*:')).toBeVisible()
    await expect(page.getByLabel('Contact phone*:')).toBeVisible()
    await expect(page.getByText('Bell Rock')).toBeVisible()

    await page.getByRole('button', { name: 'Send review' }).click()

    await expect(page.locator('[data-modal="error"]')).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Something went wrong!' }),
    ).toBeVisible()
  })
})
