import { APIRequestContext } from '@playwright/test';
import { ApiClient } from './api.client';
import { LoginResponse } from '../utils/api-types';

export class UsersService {
  private readonly api: ApiClient;

  constructor(request: APIRequestContext) {
    this.api = new ApiClient(request);
  }

  async getCurrentUser(token: string) {
    return this.api.get<LoginResponse>('/users/me', token);
  }
}
