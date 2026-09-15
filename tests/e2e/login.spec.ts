import { test, expect } from '../../fixtures/user.fixture';
import { LoginPage } from '../../pages/login.page';

test('user should login successfully', async ({ page, testUser }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();

  await loginPage.login(testUser.email, testUser.password);

  await loginPage.validateLoginSuccess();
});
