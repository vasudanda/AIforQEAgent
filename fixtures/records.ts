import { execSync } from 'child_process';
import { test as base } from '@playwright/test';
 
export function sf(args) {
  return JSON.parse(execSync(`sf ${args} --json`).toString()).result;
}
 
export function create(sobject, values) {
  const pairs = Object.entries(values)
    .map(([k, v]) => `${k}='${v}'`).join(' ');
  return sf(`data create record --sobject ${sobject} --values "${pairs}"`).id;
}
 
export function remove(sobject, id) {
  sf(`data delete record --sobject ${sobject} --record-id ${id}`);
}
 
// Chain: parent first, children after. Delete in reverse.
export function opportunityChain(tag) {
  const accountId = create('Account', { Name: `Acct-${tag}` });
  const contactId = create('Contact', {
    LastName: `Contact-${tag}`, AccountId: accountId });
  const oppId = create('Opportunity', {
    Name: `Opp-${tag}`, AccountId: accountId,
    StageName: 'Prospecting', CloseDate: '2026-12-31' });
  return { accountId, contactId, oppId };
}
 
// Per-worker tag so parallel runs cannot collide
export const test = base.extend({
  tag: async ({}, use, testInfo) => {
    await use(`${Date.now()}-w${testInfo.workerIndex}`);
  },
});
