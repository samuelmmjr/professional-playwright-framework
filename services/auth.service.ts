import { APIRequestContext } from '@playwright/test';
import { ApiClient } from './api.client';
import { LoginResponse } from '../utils/api-types';

export class AuthService {
  private readonly api: ApiClient;

  constructor(request: APIRequestContext) {
    this.api = new ApiClient(request);
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    return this.api.post<LoginResponse>('/users/login', {
      email,
      password,
    });
  }
}
