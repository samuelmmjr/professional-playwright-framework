import { test, expect } from '../../fixtures/api.fixture';
import { UsersService } from '../../services/users.service';
import { createUser } from '../../data/users';
import { expectApiError } from '../../utils/assertions';

test.describe('Users API', () => {
  test('@smoke @regression should register a new user using API', async ({
    request,
  }) => {
    const usersService = new UsersService(request);

    const user = createUser();

    const response = await usersService.register(user);

    expect(response.email).toBe(user.email);
  });

  test('@negative @regression should reject registration with invalid data', async ({
    request,
  }) => {
    const usersService = new UsersService(request);

    const invalidUser = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    };

    await expectApiError(usersService.register(invalidUser), 422);
  });

  test('@negative @regression should reject duplicate user registration', async ({
    request,
  }) => {
    const usersService = new UsersService(request);

    const user = createUser();

    await usersService.register(user);

    await expectApiError(usersService.register(user), 409);
  });
});
