import { APIRequestContext } from '@playwright/test';
import { CartService } from '../services/cart.service';
import { InvoiceService } from '../services/invoice.service';
import { ProductsService } from '../services/products.service';
import { CreateInvoiceRequest, InvoiceResponse } from '../utils/api-types';
import { createCartWithProduct } from './cart.fixture';

export function createInvoicePayload(cartId: string): CreateInvoiceRequest {
  return {
    billing_street: 'Automation Street, 100',
    billing_city: 'Test City',
    billing_state: 'Test State',
    billing_country: 'US',
    billing_postcode: '10001',

    payment_method: 'bank-transfer',

    cart_id: cartId,

    payment_details: {
      bank_name: 'Test Bank',
      account_name: 'Automation',
      account_number: '123456',
    },
  };
}

export async function createInvoiceWithProduct(
  request: APIRequestContext,
  token: string,
): Promise<{
  invoice: InvoiceResponse;
  cartId: string;
  productId: string;
}> {
  const cart = await createCartWithProduct(request);

  const invoiceService = new InvoiceService(request);

  const invoice = await invoiceService.createInvoice(
    createInvoicePayload(cart.cartId),
    token,
  );

  return {
    invoice,
    cartId: cart.cartId,
    productId: cart.productId,
  };
}
