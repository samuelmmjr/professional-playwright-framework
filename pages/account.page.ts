import { Page, expect } from '@playwright/test';

export class AccountPage {
  constructor(private readonly page: Page) {}

  async validateLoaded() {
    await expect(this.page.locator('[data-test="page-title"]')).toHaveText(
      'My account',
    );
  }
}
