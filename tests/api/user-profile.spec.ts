import { test, expect } from '@playwright/test';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';

test('authenticated user should get profile', async ({ request }) => {
  const authService = new AuthService(request);

  const login = await authService.login('samuel@gmail.com', 'SUA_SENHA');

  const usersService = new UsersService(request);

  const user = await usersService.getCurrentUser(login.access_token);

  expect(user.email).toBe('samuel@gmail.com');
});
