import { expect } from '@playwright/test';
import { test, create, remove, sf } from '../../fixtures/records';
import { LeadPage } from '../../pages/LeadPage';

let leadId: string;

test.afterEach(async () => {
  if (leadId) {
    remove('Lead', leadId);
    leadId = '';
  }
});

test('sales rep can create a new Lead via the UI', async ({ page, tag }) => {
  const lastName = `AutoLead-${tag}`;
  const lead = new LeadPage(page);

  await lead.openNew();
  await lead.fillNew({
    lastName,
    company: `TestCo-${tag}`,
    status: 'Open - Not Contacted',
  });
  await lead.save();
  await lead.expectToast('was created');

  // Confirm the record exists in the API
  const url = page.url();
  leadId = url.match(/Lead\/([\w]+)\/view/)?.[1] ?? '';
  expect(leadId).toBeTruthy();

  const record = sf(`data get record --sobject Lead --record-id ${leadId}`);
  expect(record.LastName).toBe(lastName);
});

test('Lead record page displays correct field values', async ({ page, tag }) => {
  leadId = create('Lead', {
    LastName: `ViewLead-${tag}`,
    Company: `ViewCo-${tag}`,
    Status: 'Open - Not Contacted',
    LeadSource: 'Web',
  });

  const lead = new LeadPage(page);
  await lead.openRecord(leadId);

  await lead.expectFieldValue('LastName', `ViewLead-${tag}`);
  await lead.expectFieldValue('Company', `ViewCo-${tag}`);
  await lead.expectFieldValue('Status', 'Open - Not Contacted');
});

test('sales rep can edit a Lead status inline', async ({ page, tag }) => {
  leadId = create('Lead', {
    LastName: `EditLead-${tag}`,
    Company: `EditCo-${tag}`,
    Status: 'Open - Not Contacted',
  });

  const lead = new LeadPage(page);
  await lead.openRecord(leadId);
  await lead.inlineEditStatus('Working - Contacted');

  // Assert both screen and API
  await lead.expectFieldValue('Status', 'Working - Contacted');
  const record = sf(`data get record --sobject Lead --record-id ${leadId}`);
  expect(record.Status).toBe('Working - Contacted');
});

test('Lead list view shows the created Lead', async ({ page, tag }) => {
  const lastName = `ListLead-${tag}`;
  leadId = create('Lead', {
    LastName: lastName,
    Company: `ListCo-${tag}`,
    Status: 'Open - Not Contacted',
  });

  const lead = new LeadPage(page);
  await lead.openList();
  await lead.filterListByName(lastName);

  await expect(
    page.getByRole('row', { name: lastName })
  ).toBeVisible();
});
