import { Page, Locator } from '@playwright/test';

export class ProfilePage {
  readonly page: Page;
  readonly header: Locator;
  readonly welcomeText: Locator;
  readonly instructionText: Locator;
  readonly footer: Locator;
  readonly loadingComponent: Locator;
  readonly errorComponent: Locator;
  readonly noContentComponent: Locator;
  readonly successTitle: Locator;
  readonly apiResponse: Locator;
  readonly backButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('.bg-gradient-to-r').first();
    this.welcomeText = page.getByText('Welcome to your profile!');
    this.instructionText = page.getByText('Request sample result on right!');
    this.footer = page.locator('footer');
    this.loadingComponent = page.getByTestId('loading-component');
    this.errorComponent = page.getByTestId('error-component');
    this.noContentComponent = page.getByTestId('no-content-component');
    this.successTitle = page.getByText('Profile page');
    this.apiResponse = page.getByText('Api : Response');
    this.backButton = page.locator('[data-testid="back-button"]');
  }

  async goto() {
    await this.page.goto('/profile');
  }

  async waitForLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async isLoaded() {
    await this.header.waitFor({ state: 'visible' });
  }

  async getCountText() {
    return await this.page.locator('text=/count:/i').textContent();
  }

  async getNameText() {
    return await this.page.locator('text=/Name:/i').textContent();
  }

  async clickRetry() {
    const retryButton = this.page.getByRole('button', { name: /retry|tentar novamente/i });
    await retryButton.click();
  }

  async resizeToMobile() {
    await this.page.setViewportSize({ width: 375, height: 667 });
  }

  async resizeToDesktop() {
    await this.page.setViewportSize({ width: 1920, height: 1080 });
  }
}