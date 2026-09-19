import { test, expect } from '@playwright/test';
import { ProductsService } from '../../services/products.service';

test('@smoke @regression should return products list', async ({ request }) => {
  const productsService = new ProductsService(request);

  const response = await productsService.getProducts();

  expect(response.data.length).toBeGreaterThan(0);
});

test('@regression should return product details by id', async ({ request }) => {
  const productsService = new ProductsService(request);

  const products = await productsService.getProducts();

  const productId = products.data[0].id;

  const product = await productsService.getProduct(productId);

  expect(product.id).toBe(productId);

  expect(product.name).toBeTruthy();

  expect(product.price).toBeGreaterThan(0);
});
