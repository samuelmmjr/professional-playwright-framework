import { expect } from '@playwright/test';
import { ApiError } from './api-error';

export async function expectApiError(
  request: Promise<unknown>,
  expectedStatus: number,
): Promise<void> {
  try {
    await request;

    throw new Error(
      `Expected API request to fail with status ${expectedStatus}, but it succeeded.`,
    );
  } catch (error) {
    expect(error).toBeInstanceOf(ApiError);

    const apiError = error as ApiError;

    expect(apiError.status).toBe(expectedStatus);
  }
}
