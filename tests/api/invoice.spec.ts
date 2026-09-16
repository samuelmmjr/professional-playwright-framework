import { test, expect } from '../../fixtures/api.fixture';

import { InvoiceService } from '../../services/invoice.service';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';

test('should create invoice from cart', async ({ request, apiUser }) => {
  const invoiceService = new InvoiceService(request);

  const cartService = new CartService(request);

  const productsService = new ProductsService(request);

  const cart = await cartService.createCart();

  const products = await productsService.getProducts();

  const product = products.data[0];

  await cartService.addProduct(cart.id, product.id, 1);

  const invoice = await invoiceService.createInvoice(
    {
      billing_street: 'Automation Street, 100',
      billing_city: 'Test City',
      billing_country: 'US',
      billing_state: 'Test State',
      billing_postcode: '10001',

      payment_method: 'bank-transfer',

      cart_id: cart.id,

      payment_details: {
        bank_name: 'Test Bank',
        account_name: 'Automation',
        account_number: '123456',
      },
    },
    apiUser.token,
  );

  expect(invoice.id).toBeDefined();

  expect(invoice.invoice_number).toMatch(/^INV-/);

  expect(invoice.total).toBeGreaterThan(0);
});

test('should return invoice details', async ({ request, apiUser }) => {
  const invoiceService = new InvoiceService(request);

  const cartService = new CartService(request);

  const productsService = new ProductsService(request);

  const cart = await cartService.createCart();

  const products = await productsService.getProducts();

  const product = products.data[0];

  await cartService.addProduct(cart.id, product.id, 1);

  const createdInvoice = await invoiceService.createInvoice(
    {
      billing_street: 'Automation Street, 100',
      billing_city: 'Test City',
      billing_state: 'Test State',
      billing_country: 'US',
      billing_postcode: '10001',

      payment_method: 'bank-transfer',

      cart_id: cart.id,

      payment_details: {
        bank_name: 'Test Bank',
        account_name: 'Automation',
        account_number: '123456',
      },
    },
    apiUser.token,
  );

  const invoice = await invoiceService.getInvoice(
    createdInvoice.id,
    apiUser.token,
  );

  expect(invoice.id).toBe(createdInvoice.id);

  expect(invoice.invoice_number).toMatch(/^INV-/);

  expect(invoice.status).toBe('AWAITING_FULFILLMENT');

  expect(invoice.invoicelines).toHaveLength(1);

  expect(invoice.invoicelines[0].product_id).toBe(product.id);

  expect(invoice.payment.payment_method).toBe('bank-transfer');
});
