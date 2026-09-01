import { defineConfig } from '@playwright/test';

export default defineConfig({
  retries: 1,
  use: { trace: 'on-first-retry' },
  reporter: [
    ['junit', { outputFile: 'results/junit.xml' }],
    ['html'],
  ],
  projects: [
    {
      name: 'sf-setup',
      testDir: './setup',
      testMatch: /salesforce\.setup\.ts/,
    },
    {
      name: 'salesforce',
      testDir: './tests/salesforce',
      dependencies: ['sf-setup'],
      timeout: 90000,
      expect: { timeout: 15000 },
      use: {
        baseURL: process.env.SF_INSTANCE_URL,
        storageState: 'storage/sf.json',
      },
    },
    {
      name: 'web',
      testDir: './tests/web',
      timeout: 30000,
      expect: { timeout: 5000 },
      use: {
        baseURL: process.env.WEB_URL,
        headless: false,
        storageState: 'storage/web.json',
      },
    },
  ],
});
