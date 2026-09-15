import { test, expect } from '@playwright/test';
import { environment } from '../../config/environment';
import { AuthService } from '../../services/auth.service';

test('user should authenticate using API', async ({ request }) => {
  const authService = new AuthService(request);

  const response = await authService.login(
    environment.testUser.email,
    environment.testUser.password,
  );

  expect(response.access_token).toBeTruthy();
  expect(response.token_type).toBe('bearer');
});
