import { APIRequestContext } from '@playwright/test';

import { ApiClient } from './api.client';

import {
  InvoiceResponse,
  InvoiceDetailsResponse,
  CreateInvoiceRequest,
} from '../utils/api-types';

export class InvoiceService {
  private readonly api: ApiClient;

  constructor(request: APIRequestContext) {
    this.api = new ApiClient(request);
  }

  async createInvoice(
    data: CreateInvoiceRequest,
    token: string,
  ): Promise<InvoiceResponse> {
    return this.api.post<InvoiceResponse>('/invoices', data, token);
  }

  async getInvoice(
    invoiceId: string,
    token: string,
  ): Promise<InvoiceDetailsResponse> {
    return this.api.get<InvoiceDetailsResponse>(
      `/invoices/${invoiceId}`,
      token,
    );
  }
}
