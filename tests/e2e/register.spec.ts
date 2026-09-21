import { test } from '../../fixtures/test.fixture';
import { createUser } from '../../data/users';

test('@smoke @regression user should register and login successfully', async ({
  registerPage,
  loginPage,
  accountPage,
}) => {
  const user = createUser();

  await registerPage.open();

  await registerPage.register(user);

  await registerPage.validateRegistered();

  await loginPage.login(user.email, user.password);

  await accountPage.validateLoaded();
});
