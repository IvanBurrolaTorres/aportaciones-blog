import { test, expect } from '@playwright/test';

test('home page has Aportaciones heading', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.getByRole('heading', { name: 'Aportaciones' })).toBeVisible();
});
