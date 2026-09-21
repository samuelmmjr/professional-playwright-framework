import { APIRequestContext } from '@playwright/test';
import { ApiClient } from './api.client';
import { CreateUserRequest, UserResponse } from '../utils/api-types';

export class UsersService {
  private readonly api: ApiClient;

  constructor(request: APIRequestContext) {
    this.api = new ApiClient(request);
  }

  async register(userData: CreateUserRequest): Promise<UserResponse> {
    return this.api.post<UserResponse>('/users/register', userData);
  }

  async getCurrentUser(token: string): Promise<UserResponse> {
    return this.api.get<UserResponse>('/users/me', token);
  }
}
