import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,

  use: {
    headless: false,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry'
  }
});
