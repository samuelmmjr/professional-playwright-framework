import { test, expect } from '@playwright/test';
import { UsersService } from '../../services/users.service';
import { createUser } from '../../data/users';

test('@smoke @regression should register a new user using API', async ({ request }) => {
  const usersService = new UsersService(request);

  const user = createUser();

  const response = await usersService.register(user);

  expect(response.email).toBe(user.email);
});
