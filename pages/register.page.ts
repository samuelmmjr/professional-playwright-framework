import { expect, Page } from '@playwright/test';

export class RegisterPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto('/auth/register');
  }

  async register(user: {
    first_name: string;
    last_name: string;
    dob: string;
    address: string[];
    postcode: string;
    city: string;
    state: string;
    country: string;
    phone: string;
    email: string;
    password: string;
  }) {
    await this.page.getByLabel('First name').fill(user.first_name);

    await this.page.getByLabel('Last name').fill(user.last_name);

    await this.page.getByLabel('Date of Birth').fill(user.dob);

    await this.page.getByLabel('Country').selectOption(user.country);

    await this.page.getByLabel('Postal code').fill(user.postcode);

    await this.page.getByLabel('House number').fill(user.address[1]);

    await this.page.getByLabel('Street').fill(user.address[0]);

    await this.page.getByLabel('City').fill(user.city);

    await this.page.getByLabel('State').fill(user.state);

    await this.page.getByLabel('Phone').fill(user.phone);

    await this.page.getByLabel('Email address').fill(user.email);

    await this.page.getByLabel('Password').fill(user.password);

    await this.page.getByRole('button', { name: 'Register' }).click();
  }

  async validateRegistered() {
    await expect(this.page).toHaveURL(/\/auth\/login/);
  }
}
