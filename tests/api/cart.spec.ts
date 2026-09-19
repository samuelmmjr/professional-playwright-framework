import { test, expect } from '../../fixtures/api.fixture';

import { CartService } from '../../services/cart.service';

test('@smoke @regression should add product to cart', async ({ request, cartWithProduct }) => {
  expect(cartWithProduct.cartId).toBeDefined();
  expect(cartWithProduct.productId).toBeDefined();
});

test('@regression should return cart with added product', async ({
  request,
  cartWithProduct,
}) => {
  const cartService = new CartService(request);

  const cart = await cartService.getCart(cartWithProduct.cartId);

  expect(cart.id).toBe(cartWithProduct.cartId);
  expect(cart.cart_items).toHaveLength(1);
  expect(cart.cart_items[0].product_id).toBe(cartWithProduct.productId);
  expect(cart.cart_items[0].quantity).toBe(1);
});

test('@regression should update product quantity in cart', async ({
  request,
  cartWithProduct,
}) => {
  const cartService = new CartService(request);

  const response = await cartService.updateProductQuantity(
    cartWithProduct.cartId,
    cartWithProduct.productId,
    3,
  );

  expect(response?.result).toBe('item added or updated');

  const updatedCart = await cartService.getCart(cartWithProduct.cartId);

  expect(updatedCart.cart_items[0].quantity).toBe(3);
});

test('@regression should remove product from cart', async ({
  request,
  cartWithProduct,
}) => {
  const cartService = new CartService(request);

  const response = await cartService.removeProduct(
    cartWithProduct.cartId,
    cartWithProduct.productId,
  );

  expect(response).toBeNull();

  const updatedCart = await cartService.getCart(cartWithProduct.cartId);

  expect(updatedCart.cart_items).toHaveLength(0);
});
