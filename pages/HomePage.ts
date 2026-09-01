import { expect, type Page } from '@playwright/test';

export class HomePage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto('/');
    await expect(this.page).toHaveTitle('Demo Web Shop');
  }

  async expectAnonymousState() {
    await expect(this.page.getByRole('heading', { name: 'Welcome to our store' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: /Shopping cart/ })).toContainText('(0)');
    await expect(this.page.getByRole('link', { name: /Wishlist/ })).toContainText('(0)');
  }

  async openBooks() {
    await this.page.locator('.top-menu').getByRole('link', { name: 'Books', exact: true }).click();
  }
}