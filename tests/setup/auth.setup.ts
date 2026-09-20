import { test as setup } from '@playwright/test';
import { authenticateUser } from '../../auth/auth.helper';

const authFile = 'auth/user.json';

setup('authenticate user', async ({ page, request }) => {
  await authenticateUser({
    request,
    page,
    storageStatePath: authFile,
  });
});
