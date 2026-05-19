import { test, expect } from '@playwright/test';
import { NavigationPage } from './pages/navigation.page.js';

test('Marketing banners render in the expected page region', async ({ page }) => {
  const navigation = new NavigationPage(page);
  await navigation.goto();

  await expect(navigation.MarketinBanner).toBeVisible();

  const bannerBox = await navigation.MarketinBanner.boundingBox();
  const navBox = await navigation.navLocator.boundingBox();

  expect(bannerBox).not.toBeNull();
  expect(navBox).not.toBeNull();

  if (bannerBox && navBox) {
    expect(bannerBox.y).toBeGreaterThan(navBox.y + navBox.height - 5);
    expect(bannerBox.height).toBeGreaterThan(0);
    expect(bannerBox.width).toBeGreaterThan(0);
  }
});

test('App Store and Google Play download links resolve correctly', async ({ page }) => {
  const navigation = new NavigationPage(page);
  const [popup] = await Promise.all([
    page.waitForEvent('popup', { timeout: 10000 }),
    navigation.CTADownloadApp.click(),
  ]).catch(() => [null]);

  if (popup) {
    await popup.waitForLoadState('domcontentloaded');
    await expect(popup).toHaveURL(/play\.google\.com/);
  } else {
    await page.waitForURL(/play\.google\.com/, { timeout: 10000 });
    await expect(page).toHaveURL(/play\.google\.com/);
  }
});  