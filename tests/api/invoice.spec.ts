import { test, expect } from '../../fixtures/api.fixture';
import { InvoiceService } from '../../services/invoice.service';

test.describe('Invoice API', () => {
  test('should create invoice from cart', async ({ invoiceWithProduct }) => {
    expect(invoiceWithProduct.invoiceId).toBeDefined();
  });

  test('should get invoice by id', async ({
    request,
    apiUser,
    invoiceWithProduct,
  }) => {
    const invoiceService = new InvoiceService(request);

    const invoice = await invoiceService.getInvoice(
      invoiceWithProduct.invoiceId,
      apiUser.token,
    );

    expect(invoice.id).toBe(invoiceWithProduct.invoiceId);

    expect(invoice.invoice_number).toBeDefined();
  });
});
