import { test, expect } from '@playwright/test';

import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';

test('should add product to cart', async ({ request }) => {
  const cartService = new CartService(request);

  const productsService = new ProductsService(request);

  const cart = await cartService.createCart();

  const products = await productsService.getProducts();

  const product = products.data[0];

  const response = await cartService.addProduct(cart.id, product.id, 1);

  expect(response.result).toBe('item added or updated');
});

test('should return cart with added product', async ({ request }) => {
  const cartService = new CartService(request);

  const productsService = new ProductsService(request);

  const cart = await cartService.createCart();

  const products = await productsService.getProducts();

  const product = products.data[0];

  await cartService.addProduct(cart.id, product.id, 1);

  const updatedCart = await cartService.getCart(cart.id);

  expect(updatedCart.id).toBe(cart.id);

  expect(updatedCart.cart_items).toHaveLength(1);

  expect(updatedCart.cart_items[0].product_id).toBe(product.id);

  expect(updatedCart.cart_items[0].quantity).toBe(1);
});

test('should update product quantity in cart', async ({ request }) => {
  const cartService = new CartService(request);

  const productsService = new ProductsService(request);

  const cart = await cartService.createCart();

  const products = await productsService.getProducts();

  const product = products.data[0];

  await cartService.addProduct(cart.id, product.id, 1);

  const response = await cartService.updateProductQuantity(
    cart.id,
    product.id,
    3,
  );

  expect(response?.result).toBe('item added or updated');

  const updatedCart = await cartService.getCart(cart.id);

  expect(updatedCart.cart_items[0].quantity).toBe(3);
});

test('should remove product from cart', async ({ request }) => {
  const cartService = new CartService(request);

  const productsService = new ProductsService(request);

  const cart = await cartService.createCart();

  const products = await productsService.getProducts();

  const product = products.data[0];

  await cartService.addProduct(cart.id, product.id, 1);

  const response = await cartService.removeProduct(cart.id, product.id);

  expect(response).toBeNull();

  const updatedCart = await cartService.getCart(cart.id);

  expect(updatedCart.cart_items).toHaveLength(0);
});
