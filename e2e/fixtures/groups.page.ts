import { Locator, Page } from '@playwright/test';

export class GroupsPage {
  readonly page: Page;
  readonly header: Locator;
  readonly welcomeSection: Locator;
  readonly layoutContainer: Locator;
  readonly successSection: Locator;
  readonly contentPanel: Locator;
  readonly footer: Locator;
  readonly loadingComponent: Locator;
  readonly errorComponent: Locator;
  readonly noContentComponent: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByTestId('groups-header');
    this.welcomeSection = page.getByTestId('groups-welcome');
    this.layoutContainer = page.getByTestId('groups-layout');
    this.successSection = page.getByTestId('groups-success');
    this.contentPanel = page.getByTestId('groups-content');
    this.footer = page.getByTestId('footer');
    this.loadingComponent = page.getByTestId('loading-component');
    this.errorComponent = page.getByTestId('error-api-component');
    this.noContentComponent = page.getByTestId('no-content-component');
  }

  async goto() {
    await this.page.goto('/groups');
  }

  async waitForLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async resizeToMobile() {
    await this.page.setViewportSize({ width: 375, height: 667 });
  }

  async resizeToDesktop() {
    await this.page.setViewportSize({ width: 1920, height: 1080 });
  }
}
