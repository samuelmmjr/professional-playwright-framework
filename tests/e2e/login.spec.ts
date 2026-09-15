import { test } from '../../fixtures/test.fixture';
import { LoginPage } from '../../pages/login.page';
import { AccountPage } from '../../pages/account.page';

test('user should login successfully', async ({ page, testUser }) => {
  const loginPage = new LoginPage(page);

  const accountPage = new AccountPage(page);

  await loginPage.open();

  await loginPage.login(testUser.email, testUser.password);

  await accountPage.validateLoaded();
});
