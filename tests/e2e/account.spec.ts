import { test, expect } from '@playwright/test';

test('authenticated user should access account', async ({ page }) => {
  await page.goto('/account');

  await expect(page.locator('[data-test="page-title"]')).toHaveText(
    'My account',
  );
});
