import { test } from '../../fixtures/test.fixture';

test('@smoke @authenticated @regression authenticated user should access account', async ({
  accountPage,
  page,
}) => {
  await page.goto('/account');

  await accountPage.validateLoaded();
});
