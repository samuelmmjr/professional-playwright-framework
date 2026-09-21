import { test } from '../../fixtures/test.fixture';

test('user should login successfully', async ({
  loginPage,
  accountPage,
  testUser,
}) => {
  await loginPage.open();

  await loginPage.login(testUser.email, testUser.password);

  await accountPage.validateLoaded();
});

test('user should not login with invalid credentials', async ({
  loginPage,
}) => {
  await loginPage.open();

  await loginPage.login('invalid-user@example.com', 'invalid-password');

  await loginPage.validateLoginError();
});
