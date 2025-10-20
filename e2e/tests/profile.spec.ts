import { test, expect } from '@playwright/test';
import { ProfilePage } from '../fixtures/profile.page';

test.describe('Profile Page', () => {
  let profilePage: ProfilePage;

  test.beforeEach(async ({ page }) => {
    profilePage = new ProfilePage(page);
    await profilePage.goto();
  });

  test('should display loading state', async () => {
    await expect(profilePage.loadingComponent).toBeVisible();
  });

  test('should display success state', async ({ page }) => {
    await page.waitForResponse('**/api/swapi/people');
    await expect(profilePage.successTitle).toBeVisible();
    await expect(profilePage.apiResponse).toBeVisible();
  });

  test('should display error state', async ({ page }) => {
    await page.route('**/api/swapi/people', route => route.abort());
    await profilePage.goto();
    await expect(profilePage.errorComponent).toBeVisible();
  });

  test('should retry after error', async ({ page }) => {
    await page.route('**/api/swapi/people', route => route.abort());
    await profilePage.goto();
    await expect(profilePage.errorComponent).toBeVisible();

    await page.unroute('**/api/swapi/people');
    await profilePage.clickRetry();

    await expect(profilePage.loadingComponent).toBeVisible();
    await page.waitForResponse('**/api/swapi/people');
    await expect(profilePage.successTitle).toBeVisible();
  });

  test('should display no content state', async ({ page }) => {
    await page.route('**/api/swapi/people', route => route.fulfill({
      status: 200,
      body: JSON.stringify({ results: [] }),
    }));
    await profilePage.goto();
    await expect(profilePage.noContentComponent).toBeVisible();
  });

  test('should be responsive on mobile', async () => {
    await profilePage.resizeToMobile();
    // Add mobile-specific assertions here
  });

  test('should be responsive on desktop', async () => {
    await profilePage.resizeToDesktop();
    // Add desktop-specific assertions here
  });
});