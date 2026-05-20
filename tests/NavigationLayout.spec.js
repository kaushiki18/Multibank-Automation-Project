import { test, expect } from '@playwright/test';
import { NavigationPage } from './pages/navigation.page.js';

test.describe.serial('Navigation layout', () => {
  let page;
  let context;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
  });

  test.afterAll(async () => {
    await context.close();
  });

  test('Navigate to Home Page', async () => {
    await page.goto('https://mb.io/en/');
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle("Trade Crypto Fast & Secure | Low Fees Exchange | mb.io");
  });

  test('Top navigation renders with all expected items visible', async () => {
    const navigation = new NavigationPage(page);

    await expect(navigation.navLocator).toBeVisible();  //validates the top navigation bar is visible
    await expect(navigation.navItems.nth(0)).toHaveText('Explore');  //validates the Explore menu item is visible
    await expect(navigation.navItems.nth(1)).toHaveText('Features');  //validates the Features menu item is visible
    await expect(navigation.navItems.nth(2)).toHaveText('OTC Desk');  //validates the OTC Desk menu item is visible
    await expect(navigation.navItems.nth(3)).toHaveText('Company');  //validates the Company menu item is visible
    await expect(navigation.navItems.nth(4)).toHaveText('Support');  //validates the Support menu item is visible
    await expect(navigation.navItems.nth(5)).toHaveText('$MBG');  //validates the $MBG menu item is visible
  });

  test('Each navigation item links to the correct destination', async () => {
    const navigation = new NavigationPage(page);

    const navItems = [
      { name: 'Explore', expectedTitle: 'Explore' },
      { name: 'Features', expectedTitle: 'Features' },
      { name: 'OTC Desk', expectedTitle: 'OTC Desk' },
      { name: 'Company', expectedTitle: 'Company' },
      { name: 'Support', expectedTitle: 'Support' },
      { name: '$MBG', expectedTitle: 'MBG' },
    ];

    for (const item of navItems) {
      const navItem = navigation.navLocator.locator(`a:has-text("${item.name}")`);
      await navItem.click();
      await page.waitForLoadState('networkidle');
      
      const pageTitle = await page.title();
      expect(pageTitle).toContain(item.expectedTitle);
      
      await page.goBack();
    }
  });

  test('Navigation behaves correctly at standard desktop viewport sizes', async () => {
    const viewports = [
      { width: 1280, height: 720 },
      { width: 1366, height: 768 },
      { width: 1920, height: 1080 },
    ];

    const navigation = new NavigationPage(page);
    const navLocator = navigation.navLocator;
    const navItems = navigation.navItems;

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await navigation.goto();

      await expect(navLocator).toBeVisible();

      const count = await navItems.count();
      expect(count).toBeGreaterThanOrEqual(6);

      // Ensure each nav item is visible
      for (let i = 0; i < count; ++i) {
        await expect(navItems.nth(i)).toBeVisible();
      }

      // Basic horizontal layout check: y positions should be approximately equal
      const yPositions = [];
      for (let i = 0; i < count; ++i) {
        const box = await navItems.nth(i).boundingBox();
        if (box)
          yPositions.push(Math.round(box.y));
      }
      if (yPositions.length > 1) {
        const minY = Math.min(...yPositions);
        const maxY = Math.max(...yPositions);
        expect(maxY - minY).toBeLessThanOrEqual(8);
      }
    }
  });
});