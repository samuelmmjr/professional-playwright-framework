export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: unknown,
  ) {
    super(
      `API Error ${status}: ${
        typeof body === 'string' ? body : JSON.stringify(body)
      }`,
    );

    this.name = 'ApiError';
  }
}
