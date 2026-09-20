import { test } from '../../fixtures/test.fixture';

test('authenticated user should access account', async ({
  page,
  accountPage,
}) => {
  await page.goto('/account');

  await accountPage.validateLoaded();
});
