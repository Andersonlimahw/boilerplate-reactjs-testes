import { Page } from '@playwright/test';

/**
 * Wait for toast notification to appear
 */
export async function waitForToast(page: Page, type: 'success' | 'error' | 'info' = 'success') {
  const toastSelector = `.Toastify__toast--${type}`;
  await page.waitForSelector(toastSelector, { timeout: 5000 });
  return page.locator(toastSelector);
}

/**
 * Get toast message text
 */
export async function getToastMessage(page: Page, type: 'success' | 'error' | 'info' = 'success') {
  const toast = await waitForToast(page, type);
  return await toast.textContent();
}

/**
 * Check if element has specific classes
 */
export async function hasClasses(page: Page, selector: string, classes: string[]): Promise<boolean> {
  const element = page.locator(selector);
  for (const className of classes) {
    const hasClass = await element.evaluate((el, cls) => {
      return el.classList.contains(cls);
    }, className);
    if (!hasClass) return false;
  }
  return true;
}

/**
 * Wait for API call to complete
 */
export async function waitForApiCall(page: Page, urlPattern: string | RegExp) {
  return await page.waitForResponse(
    response => {
      const url = response.url();
      if (typeof urlPattern === 'string') {
        return url.includes(urlPattern);
      }
      return urlPattern.test(url);
    },
    { timeout: 10000 }
  );
}

/**
 * Mock API response
 */
export async function mockApiResponse(
  page: Page,
  urlPattern: string | RegExp,
  response: any,
  status = 200
) {
  await page.route(urlPattern, route => {
    route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify(response),
    });
  });
}

/**
 * Mock API error
 */
export async function mockApiError(
  page: Page,
  urlPattern: string | RegExp,
  status = 500,
  message = 'Internal Server Error'
) {
  await page.route(urlPattern, route => {
    route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify({ error: message }),
    });
  });
}

/**
 * Clear all routes
 */
export async function clearAllRoutes(page: Page) {
  await page.unrouteAll();
}

/**
 * Get computed style property
 */
export async function getComputedStyle(page: Page, selector: string, property: string) {
  const element = page.locator(selector);
  return await element.evaluate((el, prop) => {
    return window.getComputedStyle(el).getPropertyValue(prop);
  }, property);
}

/**
 * Check if element is in viewport
 */
export async function isInViewport(page: Page, selector: string): Promise<boolean> {
  const element = page.locator(selector);
  return await element.evaluate(el => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  });
}

/**
 * Simulate network offline
 */
export async function goOffline(page: Page) {
  await page.context().setOffline(true);
}

/**
 * Simulate network online
 */
export async function goOnline(page: Page) {
  await page.context().setOffline(false);
}

/**
 * Wait for specific time
 */
export async function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Clear browser cache and cookies
 */
export async function clearBrowserData(page: Page) {
  await page.context().clearCookies();
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
}
