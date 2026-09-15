import { APIRequestContext } from '@playwright/test';
import { environment } from '../config/environment';

export class ApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async post<T>(endpoint: string, data?: unknown, token?: string): Promise<T> {
    const response = await this.request.post(
      `${environment.apiUrl}${endpoint}`,
      {
        data,
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
      },
    );

    return response.json() as Promise<T>;
  }

  async get<T>(endpoint: string, token?: string): Promise<T> {
    const response = await this.request.get(
      `${environment.apiUrl}${endpoint}`,
      {
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
      },
    );

    return response.json() as Promise<T>;
  }
}
