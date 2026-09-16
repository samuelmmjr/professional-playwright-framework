import { APIRequestContext, APIResponse } from '@playwright/test';

import { environment } from '../config/environment';
import { ApiError } from '../utils/api-error';

export class ApiClient {
  constructor(private readonly request: APIRequestContext) {}

  private getHeaders(token?: string): Record<string, string> {
    return token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {};
  }

  private async handleResponse<T>(response: APIResponse): Promise<T | null> {
    if (!response.ok()) {
      const body = await response.text();

      let parsedBody: unknown = body;

      try {
        parsedBody = JSON.parse(body);
      } catch {
        // Keep raw response when body is not JSON
      }

      throw new ApiError(response.status(), parsedBody);
    }

    if (response.status() === 204) {
      return null;
    }

    return response.json() as Promise<T>;
  }

  async post<T>(endpoint: string, data?: unknown, token?: string): Promise<T> {
    const response = await this.request.post(
      `${environment.apiUrl}${endpoint}`,
      {
        data,
        headers: this.getHeaders(token),
      },
    );

    return (await this.handleResponse<T>(response)) as T;
  }

  async get<T>(endpoint: string, token?: string): Promise<T> {
    const response = await this.request.get(
      `${environment.apiUrl}${endpoint}`,
      {
        headers: this.getHeaders(token),
      },
    );

    return (await this.handleResponse<T>(response)) as T;
  }

  async put<T>(
    endpoint: string,
    data?: unknown,
    token?: string,
  ): Promise<T | null> {
    const response = await this.request.put(
      `${environment.apiUrl}${endpoint}`,
      {
        data,
        headers: this.getHeaders(token),
      },
    );

    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string, token?: string): Promise<T | null> {
    const response = await this.request.delete(
      `${environment.apiUrl}${endpoint}`,
      {
        headers: this.getHeaders(token),
      },
    );

    return this.handleResponse<T>(response);
  }

  async patch<T>(
    endpoint: string,
    data?: unknown,
    token?: string,
  ): Promise<T | null> {
    const response = await this.request.patch(
      `${environment.apiUrl}${endpoint}`,
      {
        data,
        headers: this.getHeaders(token),
      },
    );

    return this.handleResponse<T>(response);
  }

  async options(endpoint: string) {
    const response = await this.request.fetch(
      `${environment.apiUrl}${endpoint}`,
      {
        method: 'OPTIONS',
      },
    );

    return response;
  }
}
