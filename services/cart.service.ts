import { APIRequestContext } from '@playwright/test';
import { ApiClient } from './api.client';
import { CartResponse, CartActionResponse } from '../utils/api-types';

export class CartService {
  private readonly api: ApiClient;

  constructor(request: APIRequestContext) {
    this.api = new ApiClient(request);
  }

  async createCart(): Promise<CartResponse> {
    return this.api.post<CartResponse>('/carts');
  }

  async addProduct(
    cartId: string,
    productId: string,
    quantity: number,
  ): Promise<CartActionResponse> {
    return this.api.post<CartActionResponse>(`/carts/${cartId}`, {
      product_id: productId,
      quantity,
    });
  }

  async updateProductQuantity(
    cartId: string,
    productId: string,
    quantity: number,
  ): Promise<CartActionResponse | null> {
    return this.api.put<CartActionResponse>(
      `/carts/${cartId}/product/quantity`,
      {
        product_id: productId,
        quantity,
      },
    );
  }

  async getCart(cartId: string): Promise<CartResponse> {
    return this.api.get<CartResponse>(`/carts/${cartId}`);
  }

  async removeProduct(cartId: string, productId: string): Promise<null> {
    await this.api.delete<CartActionResponse>(
      `/carts/${cartId}/product/${productId}`,
    );

    return null;
  }
}
