import { Page, Locator } from '@playwright/test';

export class SettingsPage {
  readonly page: Page;
  readonly header: Locator;
  readonly settingsTitle: Locator;
  readonly footer: Locator;
  readonly loadingComponent: Locator;
  readonly errorComponent: Locator;
  readonly noContentComponent: Locator;

  // Theme section
  readonly themeSection: Locator;
  readonly themeLightOption: Locator;
  readonly themeDarkOption: Locator;
  readonly themeAutoOption: Locator;

  // Language section
  readonly languageSection: Locator;
  readonly languageSelect: Locator;

  // Notifications section
  readonly notificationsSection: Locator;
  readonly notificationsToggle: Locator;

  // API Status section
  readonly apiStatusSection: Locator;

  // Welcome message
  readonly welcomeMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByTestId('settings-header');
    this.settingsTitle = page.getByTestId('settings-title');
    this.footer = page.getByTestId('footer');
    this.loadingComponent = page.getByTestId('loading-component');
    this.errorComponent = page.getByTestId('error-component');
    this.noContentComponent = page.getByTestId('no-content-component');

    // Theme section
    this.themeSection = page.getByTestId('theme-section');
    this.themeLightOption = page.getByTestId('theme-option-light');
    this.themeDarkOption = page.getByTestId('theme-option-dark');
    this.themeAutoOption = page.getByTestId('theme-option-auto');

    // Language section
    this.languageSection = page.getByTestId('language-section');
    this.languageSelect = page.getByTestId('language-select');

    // Notifications section
    this.notificationsSection = page.getByTestId('notifications-section');
    this.notificationsToggle = page.getByTestId('notifications-toggle');

    // API Status section
    this.apiStatusSection = page.getByTestId('api-status-section');

    // Welcome message
    this.welcomeMessage = page.getByTestId('welcome-message');
  }

  async goto() {
    await this.page.goto('/settings');
  }

  async waitForLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async isLoaded() {
    await this.header.waitFor({ state: 'visible' });
  }

  async selectTheme(theme: 'light' | 'dark' | 'auto') {
    const themeOption = this.page.getByTestId(`theme-option-${theme}`);
    await themeOption.click();
  }

  async selectLanguage(language: string) {
    await this.languageSelect.selectOption(language);
  }

  async toggleNotifications() {
    await this.notificationsToggle.click();
  }

  async isThemeSelected(theme: 'light' | 'dark' | 'auto'): Promise<boolean> {
    const themeOption = this.page.getByTestId(`theme-option-${theme}`);
    return await themeOption.isChecked();
  }

  async getSelectedLanguage(): Promise<string | null> {
    return await this.languageSelect.inputValue();
  }

  async isNotificationsEnabled(): Promise<boolean> {
    return await this.notificationsToggle.isChecked();
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

  async getAPIStatusText(): Promise<string | null> {
    return await this.apiStatusSection.textContent();
  }
}
