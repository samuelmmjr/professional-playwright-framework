import { test as base } from '@playwright/test';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { createUser } from '../data/users';
import { createCartWithProduct } from './cart.fixture';

type ApiFixtures = {
  apiUser: {
    email: string;
    password: string;
    token: string;
  };
  cartWithProduct: {
    cartId: string;
    productId: string;
  };
};

export const test = base.extend<ApiFixtures>({
  apiUser: async ({ request }, use) => {
    const usersService = new UsersService(request);
    const authService = new AuthService(request);

    const user = createUser();

    await usersService.register(user);

    const login = await authService.login(user.email, user.password);

    await use({
      email: user.email,
      password: user.password,
      token: login.access_token,
    });
  },

  cartWithProduct: async ({ request }, use) => {
    const cart = await createCartWithProduct(request);
    await use(cart);
  },
});

export { expect } from '@playwright/test';
