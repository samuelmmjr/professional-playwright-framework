import { APIRequestContext } from '@playwright/test';
import { ApiClient } from './api.client';
import { ProductResponse, ProductsResponse } from '../utils/api-types';

export class ProductsService {
  private readonly api: ApiClient;

  constructor(request: APIRequestContext) {
    this.api = new ApiClient(request);
  }

  async getProducts(): Promise<ProductsResponse> {
    return this.api.get<ProductsResponse>('/products');
  }

  async getProduct(id: string): Promise<ProductResponse> {
    return this.api.get<ProductResponse>(`/products/${id}`);
  }
}
