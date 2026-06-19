import { test, expect } from '@playwright/test';
import { saveFailure } from '../ai-engine/collector';

test('login flow', async ({ page }) => {
  await page.goto('http://localhost:3000/login.html');

  await page.fill('#username', 'admin');
  await page.fill('#password', 'admin123');

  // Capture DOM BEFORE failure happens
  const domBeforeClick = await page.content();

  try {
    await page.click('#submit-btn');

    await expect(page.locator('h1')).toContainText('Dashboard');
  } catch (error) {
    console.log('Saving failure...');
    saveFailure(domBeforeClick, error);
    throw error;
  }
});
