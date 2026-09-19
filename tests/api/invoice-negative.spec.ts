import { test, expect } from '../../fixtures/api.fixture';
import { InvoiceService } from '../../services/invoice.service';
import { createInvoicePayload } from '../../data/invoices';
import { createInvalidInvoicePayload } from '../../data/invoices';
import { expectApiError } from '../../utils/assertions';

test.describe('Invoice API - Negative Tests', () => {
  test('should reject invoice creation without authentication', async ({
    request,
  }) => {
    const invoiceService = new InvoiceService(request);

    const invoiceData = createInvoicePayload('invalid-cart-id');

    await expectApiError(invoiceService.createInvoice(invoiceData, ''), 401);
  });

  test('should return error when invoice does not exist', async ({
    request,
    apiUser,
  }) => {
    const invoiceService = new InvoiceService(request);

    await expectApiError(
      invoiceService.getInvoice('invalid-invoice-id', apiUser.token),
      404,
    );
  });

  test('should reject invoice without required billing data', async ({
    request,
    apiUser,
  }) => {
    const invoiceService = new InvoiceService(request);

    const invoiceData = createInvalidInvoicePayload('invalid-cart-id');

    await expectApiError(
      invoiceService.createInvoice(invoiceData, apiUser.token),
      422,
    );
  });
});
