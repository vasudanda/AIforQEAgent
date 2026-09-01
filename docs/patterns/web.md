// Dialogs — handler BEFORE the click
page.on('dialog', d => d.accept());
 
// Downloads
const [download] = await Promise.all([
  page.waitForEvent('download'),
  page.getByRole('button', { name: 'Export CSV' }).click(),
]);
 
// Force an error you cannot otherwise reproduce
await page.route('**/api/orders', r =>
  r.fulfill({ status: 500, body: '{"error":"server"}' }));
 
// Wait on the request, not the screen
const [res] = await Promise.all([
  page.waitForResponse(r => r.url().includes('/api/search')),
  page.getByRole('searchbox').fill('widgets'),
]);
 
// Row lookup by business key
const row = page.getByRole('row', { name: 'ORD-1042' });
await expect(row.getByRole('cell').nth(3)).toHaveText('Shipped');
 
// Dates always computed
const iso = n => { const d = new Date();
  d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };
