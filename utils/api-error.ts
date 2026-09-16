export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: unknown,
  ) {
    super(`API Error ${status}`);
    this.name = 'ApiError';
  }
}
