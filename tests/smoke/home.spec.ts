import { test, expect } from '@playwright/test';

test('@smoke @regression application should be available', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Practice Software Testing/);
});
