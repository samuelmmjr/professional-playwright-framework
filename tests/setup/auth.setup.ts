import { test as setup } from '@playwright/test';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import { createUser } from '../../data/users';

const authFile = 'auth/user.json';

setup('authenticate user', async ({ page, request }) => {
  const usersService = new UsersService(request);

  const authService = new AuthService(request);

  const user = createUser();

  await usersService.register(user);

  const login = await authService.login(user.email, user.password);

  await page.goto('/');

  await page.evaluate((token) => {
    localStorage.setItem('auth-token', token);
  }, login.access_token);

  await page.context().storageState({
    path: authFile,
  });
});
