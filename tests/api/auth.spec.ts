import { test, expect } from '../../fixtures/api.fixture';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import { createUser } from '../../data/users';
import { expectApiError } from '../../utils/assertions';

test('@smoke @regression should login registered user via API', async ({
  request,
}) => {
  const usersService = new UsersService(request);
  const authService = new AuthService(request);

  const user = createUser();

  await usersService.register(user);

  const response = await authService.login(user.email, user.password);

  expect(response.access_token).toBeTruthy();
  expect(response.token_type).toBe('bearer');
});

test('@negative @regression should reject invalid credentials', async ({
  request,
}) => {
  const authService = new AuthService(request);

  await expectApiError(
    authService.login('invalid-user@example.com', 'invalid-password'),
    401,
  );
});
