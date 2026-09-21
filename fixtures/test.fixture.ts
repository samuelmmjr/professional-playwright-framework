import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AccountPage } from '../pages/account.page';
import { RegisterPage } from '../pages/register.page';
import { UsersService } from '../services/users.service';
import { createUser } from '../data/users';

type Fixtures = {
  loginPage: LoginPage;
  accountPage: AccountPage;
  registerPage: RegisterPage;
  testUser: {
    email: string;
    password: string;
  };
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },

  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },

  testUser: async ({ request }, use) => {
    const usersService = new UsersService(request);

    const user = createUser();

    await usersService.register(user);

    await use({
      email: user.email,
      password: user.password,
    });
  },
});

export { expect } from '@playwright/test';
