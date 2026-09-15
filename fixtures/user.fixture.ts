import { test as base } from '@playwright/test';
import { UsersService } from '../services/users.service';
import { createUser } from '../data/users';

type UserFixtures = {
  testUser: {
    email: string;
    password: string;
  };
};

export const test = base.extend<UserFixtures>({
  testUser: async ({ request }, use) => {
    const usersService = new UsersService(request);

    const user = createUser();

    await usersService.register(user);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await use({
      email: user.email,
      password: user.password,
    });
  },
});

export { expect } from '@playwright/test';
