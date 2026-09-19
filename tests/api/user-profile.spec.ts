import { test, expect } from '../../fixtures/api.fixture';
import { UsersService } from '../../services/users.service';

test('@smoke @regression authenticated user should get profile', async ({ request, apiUser }) => {
  const usersService = new UsersService(request);

  const user = await usersService.getCurrentUser(apiUser.token);

  expect(user.email).toBe(apiUser.email);
});
