import { test, expect } from '@playwright/test';
import { NavigationPage } from './pages/navigation.page.js';

test('Spot trading section renders and displays trading pairs', async ({ page }) => {
  const navigation = new NavigationPage(page);
  await navigation.goto();
  await navigation.navItems.nth(0).click();  // Click on the "Explore" menu item
  await page.waitForLoadState('networkidle');  // Wait for the page to load completely
  await expect(navigation.SpotMarketSection).toBeVisible();  // Validate that the Spot Market section is rendered and visible
  
  for(const CryptoName of navigation.CryptoNames) {
    await expect(CryptoName).toBeVisible();  // Validate that each trading pair entry's name is visible in the Spot Market section
  }
});

test('Trading pair entries contain the expected data fields', async ({ page }) => {
  const navigation = new NavigationPage(page);
  for(const PriceAndChangeData of navigation.CryptoTablePriceAndChangeData) {
    await expect(PriceAndChangeData).toBeVisible(); //validate data fields for price and change are visible for each trading pair entry
  }

});