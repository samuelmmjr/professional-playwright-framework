import { APIRequestContext, Page } from '@playwright/test';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { createUser } from '../data/users';

interface AuthenticateUserOptions {
  request: APIRequestContext;
  page: Page;
  storageStatePath: string;
}

export async function authenticateUser({
  request,
  page,
  storageStatePath,
}: AuthenticateUserOptions): Promise<void> {
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
    path: storageStatePath,
  });
}
