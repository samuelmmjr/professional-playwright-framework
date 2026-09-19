import { test, expect } from '../../fixtures/api.fixture';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';
import { expectApiError } from '../../utils/assertions';

test.describe('@negative @regression Cart API - Negative Tests', () => {
  test('should return error when trying to get a cart that does not exist', async ({
    request,
  }) => {
    const cartService = new CartService(request);

    await expectApiError(cartService.getCart('invalid-cart-id'), 404);
  });

  test('should return error when adding invalid product to cart', async ({
    request,
  }) => {
    const cartService = new CartService(request);

    const cart = await cartService.createCart();

    await expectApiError(
      cartService.addProduct(cart.id, 'invalid-product-id', 1),
      404,
    );
  });

  test('should return error when updating product with invalid quantity', async ({
    request,
  }) => {
    const cartService = new CartService(request);
    const productsService = new ProductsService(request);

    const cart = await cartService.createCart();

    const products = await productsService.getProducts();
    const product = products.data[0];

    await cartService.addProduct(cart.id, product.id, 1);

    await expectApiError(
      cartService.updateProductQuantity(cart.id, product.id, -1),
      404,
    );
  });

  test('should ignore removing product that does not exist', async ({
    request,
  }) => {
    const cartService = new CartService(request);

    const cart = await cartService.createCart();

    const response = await cartService.removeProduct(
      cart.id,
      'invalid-product-id',
    );

    expect(response).toBeNull();
  });
});
