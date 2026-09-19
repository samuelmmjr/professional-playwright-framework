import { CreateInvoiceRequest } from '../utils/api-types';

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

export function createInvalidInvoicePayload(
  cartId: string,
): CreateInvoiceRequest {
  return {
    billing_street: '',
    billing_city: '',
    billing_state: '',
    billing_country: '',
    billing_postcode: '',
    payment_method: 'bank-transfer',
    cart_id: cartId,
  };
}
