import { test as setup } from '@playwright/test';
import { execSync } from 'child_process';
 
setup('salesforce session', async ({ browser }) => {
  const org = process.env.SF_ORG || 'qa-sandbox';
  const displayRaw = execSync(`sf org display --target-org ${org} --json`);
  const { result: displayResult } = JSON.parse(displayRaw.toString());

  // access token is now a separate command since sf 2.x redacts it from org display
  const tokenRaw = execSync(`sf org auth show-access-token --target-org ${org} --json`);
  const { result: tokenResult } = JSON.parse(tokenRaw.toString());

  const page = await browser.newPage();
  await page.goto(
    `${displayResult.instanceUrl}/secur/frontdoor.jsp?sid=${tokenResult.accessToken}`
  );
  await page.waitForURL('**/lightning/**');
  await page.context().storageState({ path: 'storage/sf.json' });
});
