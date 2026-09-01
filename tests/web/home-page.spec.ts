import { expect, test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ context }) => {
  await context.clearCookies();
});

test('anonymous visitor sees welcome heading and empty cart and wishlist', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.open();
  await homePage.expectAnonymousState();
});

test('anonymous visitor can browse from the home page to Books', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.open();
  await homePage.openBooks();

  await expect(page).toHaveURL(/\/books$/);
  await expect(page.getByRole('heading', { name: 'Books' })).toBeVisible();
});

test('header shows Register and Log in links for anonymous visitor', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.open();

  await expect(page.getByRole('link', { name: 'Register' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();
});

test('all top-level category links are present in the navigation', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.open();

  const categories = ['Books', 'Computers', 'Electronics', 'Apparel & Shoes', 'Digital downloads', 'Jewelry', 'Gift Cards'];
  for (const cat of categories) {
    await expect(
      page.locator('.top-menu').getByRole('link', { name: cat, exact: true }).first()
    ).toBeVisible();
  }
});

test('home page displays featured product cards with Add to cart buttons', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.open();

  // at least one product card must be present
  await expect(page.locator('.product-item')).not.toHaveCount(0);
  await expect(page.locator('input[value="Add to cart"]').first()).toBeVisible();
});

test('newsletter subscribe input accepts an email address', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.open();

  await page.locator('#newsletter-email').fill('test@example.com');
  await expect(page.locator('#newsletter-email')).toHaveValue('test@example.com');
});