import { Page, expect } from '@playwright/test';

export class AccountPage {
  constructor(private readonly page: Page) {}

  async validateLoaded() {
    await expect(
      this.page.getByRole('heading', {
        name: 'My account',
      }),
    ).toBeVisible();
  }
}
