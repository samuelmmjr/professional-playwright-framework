import { APIRequestContext } from '@playwright/test';
import { InvoiceService } from '../services/invoice.service';
import { InvoiceResponse } from '../utils/api-types';
import { createInvoicePayload } from '../data/invoices';
import { createCartWithProduct } from './cart.fixture';

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
