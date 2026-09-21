import { test, expect } from '../../fixtures/api.fixture';
import { ProductsService } from '../../services/products.service';
import { expectApiError } from '../../utils/assertions';

test.describe('Products API', () => {
  test('@smoke @regression should return products list', async ({
    request,
  }) => {
    const productsService = new ProductsService(request);

    const response = await productsService.getProducts();

    expect(response.data.length).toBeGreaterThan(0);
  });

  test('@regression should return product details by id', async ({
    request,
  }) => {
    const productsService = new ProductsService(request);

    const products = await productsService.getProducts();

    const productId = products.data[0].id;

    const product = await productsService.getProduct(productId);

    expect(product.id).toBe(productId);
    expect(product.name).toBeTruthy();
    expect(product.price).toBeGreaterThan(0);
  });

  test('@negative @regression should return error when product does not exist', async ({
    request,
  }) => {
    const productsService = new ProductsService(request);

    await expectApiError(productsService.getProduct('invalid-product-id'), 404);
  });
});
