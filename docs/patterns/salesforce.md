export async function settled(page) {
  await expect(page.locator('lightning-spinner')).toHaveCount(0);
}
 
export async function setLookup(page, label, value) {
  const box = page.getByRole('combobox', { name: label });
  await box.fill(value);
  await page.getByRole('option', { name: value }).first().click();
}
 
// Modal: always scope to the dialog
const modal = page.getByRole('dialog');
await modal.getByRole('button', { name: 'Save' }).click();
 
// Frame that re-renders
await expect(async () => {
  const vf = page.frameLocator('iframe[name^="vfFrameId"]');
  await vf.getByRole('button', { name: 'Submit' }).click();
}).toPass({ timeout: 30000 });
 
// Poll the record, not the screen
export async function waitForField(sobject, id, field, expected) {
  await expect.poll(() => {
    const r = sf(`data get record --sobject ${sobject} --record-id ${id}`);
    return r[field];
  }, { timeout: 60000, intervals: [1000, 2000, 5000] }).toBe(expected);
}
