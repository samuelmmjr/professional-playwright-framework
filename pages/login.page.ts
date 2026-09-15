import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto('/auth/login');

    await this.page.locator('#email').waitFor();
  }

  async login(email: string, password: string) {
    await this.page.locator('#email').fill(email);

    await this.page.locator('#password').fill(password);

    await this.page
      .getByRole('button', {
        name: 'Login',
      })
      .click();
  }

  async validateLoginSuccess() {
    await expect(this.page.locator('[data-test="page-title"]')).toHaveText(
      'My account',
    );
  }
}
