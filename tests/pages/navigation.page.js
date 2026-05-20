import { expect } from '@playwright/test';

export class NavigationPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.navLocator = page.locator('//nav[contains(@class, "desktop:items-center hidden desktop:flex")]');
    this.navItems = this.navLocator.locator('a');
    this.SpotMarketSection = page.locator("//h2[contains(text(),'Spot market')]/ancestor::section");
    this.CryptoNames = page.locator("//tbody/tr/td//div/span[contains(@class,'font-semibold text-white')]");
    this.CryptoTablePriceAndChangeData = page.locator("//tbody/tr/td[contains(@id,'change-td') or contains(@id,'price-td')]");
    this.MarketinBanner = page.locator("//section/div[contains(@class,'flex flex-col rounded')]");
    this.CTADownloadApp = page.locator("//a[text()='Download the app']");
  }

  async goto() {
    await this.page.goto('https://mb.io/en/');
  }

  async clickNavItemByName(name) {
    await this.navLocator.locator(`a:has-text("${name}")`).click();
  }
}
