import { APIRequestContext } from '@playwright/test';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';

export async function createCartWithProduct(request: APIRequestContext) {
  const cartService = new CartService(request);
  const productsService = new ProductsService(request);

  const cart = await cartService.createCart();

  const products = await productsService.getProducts();

  const product = products.data[0];

  await cartService.addProduct(cart.id, product.id, 1);

  return {
    cartId: cart.id,
    productId: product.id,
  };
}
