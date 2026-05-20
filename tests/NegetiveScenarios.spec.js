import { test, expect } from '@playwright/test';
import { NavigationPage } from './pages/navigation.page.js';

//clicks the homepage nav
//reads each link href
//requests each URL
//asserts response status is < 400
test('Broken link detection across navigation links', async ({ page }) => {
    const navigation = new NavigationPage(page);
    await navigation.goto();

    const count = await navigation.navItems.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; ++i) {
      const item = navigation.navItems.nth(i);
      const href = await item.getAttribute('href');
      expect(href).toBeTruthy();

      const url = new URL(href, page.url()).toString();
      const response = await page.request.get(url, { timeout: 10000 });
      expect(response.status(), `Nav link ${url} should not be broken`).toBeLessThan(400);
    }
  });

//  intentionally navigates with a tiny timeout
//expects a timeout error to be thrown
test('Content loading timeout handling', async ({ page }) => {
    await expect(page.goto('https://mb.io/en/', { timeout: 1 })).rejects.toThrow(/Timeout/);
  });
