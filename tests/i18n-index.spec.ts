import { expect, test } from '@playwright/test'

test.describe('главная на трёх языках', () => {
  test('казахская главная переведена', async ({ page }) => {
    await page.goto('/kk/')

    await expect(
      page.getByRole('heading', { name: 'Нағыз қалашық' }),
    ).toBeVisible()
    await expect(
      page.getByRole('link', { name: 'Қонақүй табу' }),
    ).toHaveAttribute('href', '/kk/hotels/')
  })

  test('английская главная переведена', async ({ page }) => {
    await page.goto('/en/')

    await expect(
      page.getByRole('heading', { name: 'A real town' }),
    ).toBeVisible()
    await expect(
      page.getByRole('link', { name: 'Find a hotel' }),
    ).toHaveAttribute('href', '/en/hotels/')
  })
})
