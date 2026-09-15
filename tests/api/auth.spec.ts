import { test, expect } from '@playwright/test';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import { createUser } from '../../data/users';

test('should login registered user via API', async ({ request }) => {
  const usersService = new UsersService(request);

  const authService = new AuthService(request);

  const user = createUser();

  await usersService.register(user);

  const response = await authService.login(user.email, user.password);

  expect(response.access_token).toBeTruthy();

  expect(response.token_type).toBe('bearer');
});
