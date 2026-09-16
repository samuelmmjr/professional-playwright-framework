import { test, expect } from '../../fixtures/api.fixture';
import { InvoiceService } from '../../services/invoice.service';
import { CreateInvoiceRequest } from '../../utils/api-types';

test.describe('Invoice API - Negative Tests', () => {
  test('should reject invoice creation without authentication', async ({
    request,
  }) => {
    const invoiceService = new InvoiceService(request);

    const invoiceData: CreateInvoiceRequest = {
      billing_street: 'Automation Street, 100',
      billing_city: 'Test City',
      billing_state: 'Test State',
      billing_country: 'US',
      billing_postcode: '10001',

      payment_method: 'bank-transfer',

      cart_id: 'invalid-cart-id',

      payment_details: {
        bank_name: 'Test Bank',
        account_name: 'Automation',
        account_number: '123456',
      },
    };

    await expect(invoiceService.createInvoice(invoiceData, '')).rejects.toThrow(
      '401',
    );
  });

  test('should return error when invoice does not exist', async ({
    request,
    apiUser,
  }) => {
    const invoiceService = new InvoiceService(request);

    await expect(
      invoiceService.getInvoice('invalid-invoice-id', apiUser.token),
    ).rejects.toThrow('404');
  });

  test('should reject invoice without required billing data', async ({
    request,
    apiUser,
  }) => {
    const invoiceService = new InvoiceService(request);

    const invoiceData = {
      billing_street: '',
      billing_city: '',
      billing_country: '',
      billing_state: '',
      billing_postcode: '',

      payment_method: 'bank-transfer',

      cart_id: 'invalid-cart-id',
    } as CreateInvoiceRequest;

    await expect(
      invoiceService.createInvoice(invoiceData, apiUser.token),
    ).rejects.toThrow('422');
  });
});
