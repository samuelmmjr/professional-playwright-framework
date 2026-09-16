import { expect } from '@playwright/test';
import { ApiError } from './api-error';

export async function expectApiError(
  action: Promise<unknown>,
  status: number,
) {
  await expect(action).rejects.toMatchObject({
    status,
  } as Partial<ApiError>);
}
