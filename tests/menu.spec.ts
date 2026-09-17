import { expect, test, type Page } from '@playwright/test'

const MOBILE = { width: 320, height: 640 }
const TABLET = { width: 768, height: 1024 }

const menuOf = (page: Page) => page.locator('[data-menu]')
const toggleOf = (page: Page) => page.locator('[data-menu-toggle]')
const panelOf = (page: Page) => page.locator('[data-menu] ul')
const linkOf = (page: Page) =>
  menuOf(page).getByRole('link', { name: 'Фото и видео' })

test.describe('мобильное меню', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(MOBILE)
    await page.goto('/')
  })

  test('закрыто при загрузке', async ({ page }) => {
    await expect(menuOf(page)).not.toHaveAttribute('open')
    await expect(linkOf(page)).toBeHidden()
    await expect(toggleOf(page)).toHaveAccessibleName('Открыть меню')
  })

  test('бургер раскрывает список и меняет доступное имя', async ({ page }) => {
    await toggleOf(page).click()

    await expect(menuOf(page)).toHaveAttribute('open', '')
    await expect(linkOf(page)).toBeVisible()
    await expect(toggleOf(page)).toHaveAccessibleName('Закрыть меню')
  })

  test('повторный клик по бургеру закрывает список', async ({ page }) => {
    await toggleOf(page).click()
    await expect(linkOf(page)).toBeVisible()

    await toggleOf(page).click()

    await expect(menuOf(page)).not.toHaveAttribute('open')
    await expect(linkOf(page)).toBeHidden()
    await expect(toggleOf(page)).toHaveAccessibleName('Открыть меню')
  })

  test('Esc закрывает меню и возвращает фокус на бургер', async ({ page }) => {
    await toggleOf(page).click()
    await page.keyboard.press('Escape')

    await expect(menuOf(page)).not.toHaveAttribute('open')
    await expect(toggleOf(page)).toBeFocused()
  })

  test('клик мимо списка закрывает меню', async ({ page }) => {
    await toggleOf(page).click()

    const panel = await panelOf(page).boundingBox()

    if (panel === null) throw new Error('нет бокса у списка меню')

    await page.mouse.click(MOBILE.width / 2, panel.y + panel.height + 120)

    await expect(menuOf(page)).not.toHaveAttribute('open')
  })

  test('выше порога список виден, бургера нет', async ({ page }) => {
    await page.setViewportSize(TABLET)

    await expect(toggleOf(page)).toBeHidden()
    await expect(linkOf(page)).toBeVisible()
  })
})
