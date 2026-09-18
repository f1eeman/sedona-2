import { expect, test } from '@playwright/test'

test.describe('фото и видео на трёх языках', () => {
  test('галерея и плеер переведены', async ({ page }) => {
    await page.goto('/en/photo/')

    await expect(
      page.getByRole('heading', { name: 'Local vegetation' }),
    ).toBeVisible()
    await expect(page.getByText('Photo by:').first()).toBeVisible()

    await page.locator('[data-player]').scrollIntoViewIfNeeded()

    await expect(page.locator('[data-player-toggle]')).toHaveAccessibleName(
      'Pause video',
    )

    await page.locator('[data-player-toggle]').click()

    await expect(page.locator('[data-player-toggle]')).toHaveAccessibleName(
      'Play video',
    )
  })
})
