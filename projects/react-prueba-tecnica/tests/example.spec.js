// @ts-check
import { test, expect } from '@playwright/test'

const LOCALHOST_URL = 'http://localhost:5173/'
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

test('App shows random fact and image', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  const text = await page.getByRole('paragraph')
  const image = await page.getByRole('img')

  const textContent = await text.textContent()
  const imageSrc = await image.getAttribute('src')

  await expect(textContent?.length).toBeGreaterThan(0)
  await expect(imageSrc?.startsWith(CAT_PREFIX_IMAGE_URL)).toBeTruthy()
})

test('Image change when user do click in a button', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  const button = await page.getByRole('button')
  const image = await page.getByRole('img')

  const imageSrcActual = await image.getAttribute('src')

  await expect(button).toBeEnabled()
  await button.click()

  await expect(async () => {
    const nuevaSrc = await page.getByRole('img').getAttribute('src')
    expect(nuevaSrc).not.toBe(imageSrcActual)
  }).toPass()
})
