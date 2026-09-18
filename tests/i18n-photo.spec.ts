import { expect, test } from '@playwright/test'

test.describe('фото и видео на трёх языках', () => {
  test('галерея и плеер переведены', async ({ page }) => {
    await page.goto('/en/photo/')

    await expect(
      page.getByRole('heading', { name: 'Local vegetation' }),
    ).toBeVisible()
    await expect(page.getByText('Photo by:').first()).toBeVisible()
    await expect(page.getByRole('button', { name: 'Play video' })).toBeVisible()

    await page.getByRole('button', { name: 'Play video' }).click()

    await expect(
      page.getByRole('button', { name: 'Pause video' }),
    ).toBeVisible()
  })
})
