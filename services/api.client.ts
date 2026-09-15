import { APIRequestContext, APIResponse } from '@playwright/test';
import { environment } from '../config/environment';

export class ApiClient {
  constructor(private readonly request: APIRequestContext) {}

  private getHeaders(token?: string): Record<string, string> {
    if (!token) {
      return {};
    }

    return {
      Authorization: `Bearer ${token}`,
    };
  }

  private async handleResponse<T>(response: APIResponse): Promise<T> {
    const body = await response.json();

    if (!response.ok()) {
      throw new Error(
        `API Error ${response.status()}: ${JSON.stringify(body)}`,
      );
    }

    return body as T;
  }

  async post<T>(endpoint: string, data?: unknown, token?: string): Promise<T> {
    const response = await this.request.post(
      `${environment.apiUrl}${endpoint}`,
      {
        data,
        headers: this.getHeaders(token),
      },
    );

    return this.handleResponse<T>(response);
  }

  async get<T>(endpoint: string, token?: string): Promise<T> {
    const response = await this.request.get(
      `${environment.apiUrl}${endpoint}`,
      {
        headers: this.getHeaders(token),
      },
    );

    return this.handleResponse<T>(response);
  }
}
