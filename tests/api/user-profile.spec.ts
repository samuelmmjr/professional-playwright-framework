import { test, expect } from '../../fixtures/api.fixture';
import { UsersService } from '../../services/users.service';
import { expectApiError } from '../../utils/assertions';

test('@smoke @regression authenticated user should get profile', async ({
  request,
  apiUser,
}) => {
  const usersService = new UsersService(request);

  const user = await usersService.getCurrentUser(apiUser.token);

  expect(user.email).toBe(apiUser.email);
});

test('@negative @regression should reject profile request without authentication', async ({
  request,
}) => {
  const usersService = new UsersService(request);

  await expectApiError(usersService.getCurrentUser(''), 401);
});
