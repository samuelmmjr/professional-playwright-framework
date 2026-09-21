import { expect } from '@playwright/test';
import { ApiError } from './api-error';

export async function expectApiError(
  request: Promise<unknown>,
  expectedStatus: number,
): Promise<void> {
  let error: unknown;

  try {
    await request;
  } catch (caughtError) {
    error = caughtError;
  }

  expect(error).toBeInstanceOf(ApiError);

  const apiError = error as ApiError;

  expect(apiError.status).toBe(expectedStatus);
}
