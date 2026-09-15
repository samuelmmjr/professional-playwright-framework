import { test as setup, expect } from '@playwright/test';

const authFile = 'auth/user.json';

setup('authenticate user', async ({ page }) => {
  await page.goto('/auth/login');

  await page.locator('#email').fill('customer@practicesoftwaretesting.com');

  await page.locator('#password').fill('welcome01');

  await page
    .getByRole('button', {
      name: 'Login',
    })
    .click();

  await expect(page.locator('[data-test="page-title"]')).toHaveText(
    'My account',
  );

  await page.context().storageState({
    path: authFile,
  });
});
