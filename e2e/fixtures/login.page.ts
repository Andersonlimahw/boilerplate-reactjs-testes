import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly loginButton: Locator;
  readonly logo: Locator;
  readonly title: Locator;
  readonly subtitle: Locator;
  readonly container: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.getByRole('button', { name: /login/i });
    this.logo = page.locator('img[src*="lemon-icon.png"]');
    this.title = page.getByText('Boilerplate');
    this.subtitle = page.getByText('A amazing boilerplate using react, firebase, zustand and more!');
    this.container = page.locator('.rounded-xl.bg-gray-800');
  }

  async goto() {
    await this.page.goto('/');
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async waitForLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async isLoaded() {
    await this.logo.waitFor({ state: 'visible' });
    await this.loginButton.waitFor({ state: 'visible' });
  }

  async hasCorrectClasses(classes: string[]) {
    const container = this.container;
    for (const className of classes) {
      const hasClass = await container.evaluate((el, cls) => {
        return el.classList.contains(cls);
      }, className);
      if (!hasClass) return false;
    }
    return true;
  }
}
