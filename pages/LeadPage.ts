import { expect, type Page } from '@playwright/test';
import { sf } from '../fixtures/records';

export class LeadPage {
  constructor(private readonly page: Page) {}

  async openNew() {
    await this.page.goto('/lightning/o/Lead/new');
    await expect(this.page.getByRole('heading', { name: 'New Lead' })).toBeVisible();
  }

  async openRecord(id: string) {
    await this.page.goto(`/lightning/r/Lead/${id}/view`);
    await this.waitForSpinners();
  }

  async openList() {
    await this.page.goto('/lightning/o/Lead/list');
    await this.waitForSpinners();
  }

  async fillNew(opts: { lastName: string; company: string; status: string }) {
    const modal = this.page.getByRole('dialog');
    await modal.getByLabel('Last Name').fill(opts.lastName);
    await modal.getByLabel('Company').fill(opts.company);
    // Status is a picklist — fill then select the option
    await modal.getByLabel('Lead Status').click();
    await this.page.getByRole('option', { name: opts.status }).click();
  }

  async save() {
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.waitForSpinners();
  }

  async expectToast(text: string) {
    await expect(this.page.locator('.toastMessage').filter({ hasText: text })).toBeVisible();
  }

  async expectFieldValue(label: string, value: string) {
    const field = this.page.locator(`[data-field="${label}"]`);
    await expect(field).toContainText(value);
  }

  async inlineEditStatus(newStatus: string) {
    const field = this.page.locator('[data-field="Status"]');
    await field.getByRole('button', { name: 'Edit Status' }).click();
    await this.page.getByLabel('Lead Status').click();
    await this.page.getByRole('option', { name: newStatus }).click();
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.waitForSpinners();
  }

  async filterListByName(lastName: string) {
    await this.page.getByRole('button', { name: 'Search this list...' }).click();
    await this.page.getByRole('searchbox').pressSequentially(lastName, { delay: 80 });
    await this.waitForSpinners();
  }

  private async waitForSpinners() {
    await expect(this.page.locator('lightning-spinner')).toHaveCount(0, { timeout: 15000 });
  }
}
