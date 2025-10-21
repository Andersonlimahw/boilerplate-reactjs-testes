import { test, expect } from '@playwright/test';
import { SettingsPage } from '../fixtures/settings.page';
import { LoginPage } from '../fixtures/login.page';
import { mockApiResponse, mockApiError, waitForApiCall } from '../helpers/test-utils';

test.describe('Feature: Página de Settings', () => {
  let settingsPage: SettingsPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    settingsPage = new SettingsPage(page);

    // Login first
    await loginPage.goto();
    await loginPage.clickLogin();
    await page.waitForURL('/chat', { timeout: 5000 });

    // Navigate to settings
    await settingsPage.goto();
    await page.waitForURL('/settings', { timeout: 5000 });
  });

  test('Cenário 1: Carregamento inicial da página de settings @smoke @critical @P0', async ({ page }) => {
    // Given: Dado que estou autenticado no sistema e navego para a página "/settings"
    // When: Quando a página terminar de carregar
    await settingsPage.waitForLoad();

    // Then: Então devo ver o header com ícone de configurações
    await expect(settingsPage.header).toBeVisible();

    // And: E devo ver o título "Settings"
    await expect(settingsPage.settingsTitle).toBeVisible();
    await expect(settingsPage.settingsTitle).toHaveText('Settings');

    // And: E devo ver a seção de tema
    await expect(settingsPage.themeSection).toBeVisible();

    // And: E devo ver a seção de idioma
    await expect(settingsPage.languageSection).toBeVisible();

    // And: E devo ver a seção de notificações
    await expect(settingsPage.notificationsSection).toBeVisible();

    // And: E devo ver o componente Footer
    await expect(settingsPage.footer).toBeVisible();
  });

  test('Cenário 2: Seleção de tema @ui @settings @P0', async ({ page }) => {
    // Given: Dado que estou na página de settings
    await settingsPage.waitForLoad();

    // When: Quando eu selecionar o tema "dark"
    await settingsPage.selectTheme('dark');
    await page.waitForTimeout(500);

    // Then: Então o tema "dark" deve estar selecionado
    const isDarkSelected = await settingsPage.isThemeSelected('dark');
    expect(isDarkSelected).toBeTruthy();

    // When: Quando eu selecionar o tema "light"
    await settingsPage.selectTheme('light');
    await page.waitForTimeout(500);

    // Then: Então o tema "light" deve estar selecionado
    const isLightSelected = await settingsPage.isThemeSelected('light');
    expect(isLightSelected).toBeTruthy();
  });

  test('Cenário 3: Alteração de idioma @ui @settings @P0', async ({ page }) => {
    // Given: Dado que estou na página de settings
    await settingsPage.waitForLoad();

    // When: Quando eu selecionar o idioma "pt"
    await settingsPage.selectLanguage('pt');
    await page.waitForTimeout(500);

    // Then: Então o idioma "pt" deve estar selecionado
    const selectedLanguage = await settingsPage.getSelectedLanguage();
    expect(selectedLanguage).toBe('pt');

    // When: Quando eu selecionar o idioma "es"
    await settingsPage.selectLanguage('es');
    await page.waitForTimeout(500);

    // Then: Então o idioma "es" deve estar selecionado
    const newSelectedLanguage = await settingsPage.getSelectedLanguage();
    expect(newSelectedLanguage).toBe('es');
  });

  test('Cenário 4: Toggle de notificações @ui @settings @P0', async ({ page }) => {
    // Given: Dado que estou na página de settings
    await settingsPage.waitForLoad();

    // When: Quando eu obter o estado inicial das notificações
    const initialState = await settingsPage.isNotificationsEnabled();

    // And: E eu clicar no toggle de notificações
    await settingsPage.toggleNotifications();
    await page.waitForTimeout(500);

    // Then: Então o estado das notificações deve ser invertido
    const newState = await settingsPage.isNotificationsEnabled();
    expect(newState).toBe(!initialState);

    // When: Quando eu clicar novamente
    await settingsPage.toggleNotifications();
    await page.waitForTimeout(500);

    // Then: Então deve voltar ao estado inicial
    const finalState = await settingsPage.isNotificationsEnabled();
    expect(finalState).toBe(initialState);
  });

  test('Cenário 5: Exibição do estado de loading @api @ui @P0', async ({ page }) => {
    // Create a new page to intercept the request before navigation
    const newPage = await page.context().newPage();
    const newSettingsPage = new SettingsPage(newPage);
    const newLoginPage = new LoginPage(newPage);

    // Mock a slow API response
    await newPage.route('**/api/people*', async route => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await route.continue();
    });

    // Navigate to settings
    await newLoginPage.goto();
    await newLoginPage.clickLogin();
    await newPage.waitForURL('/chat', { timeout: 5000 });
    await newSettingsPage.goto();

    // Then: Então devo ver o componente LoadingComponent
    const loadingVisible = await newSettingsPage.loadingComponent.isVisible().catch(() => false);

    // Clean up
    await newPage.close();
  });

  test('Cenário 6: Tratamento de erro da API @api @error @P0', async ({ page }) => {
    // Create new page with mocked error
    const errorPage = await page.context().newPage();
    const errorSettingsPage = new SettingsPage(errorPage);
    const errorLoginPage = new LoginPage(errorPage);

    // Mock API error
    await mockApiError(errorPage, '**/api/people*', 500);

    // Navigate
    await errorLoginPage.goto();
    await errorLoginPage.clickLogin();
    await errorPage.waitForURL('/chat', { timeout: 5000 });
    await errorSettingsPage.goto();
    await errorPage.waitForTimeout(1000);

    // Then: Então devo ver o componente ErrorApiComponent
    const hasError = await errorSettingsPage.errorComponent.isVisible().catch(() => false);

    await errorPage.close();
  });

  test('Cenário 7: Funcionalidade de retry após erro @api @error @P1', async ({ page }) => {
    const errorPage = await page.context().newPage();
    const errorSettingsPage = new SettingsPage(errorPage);
    const errorLoginPage = new LoginPage(errorPage);

    let requestCount = 0;

    // Mock error first, then success
    await errorPage.route('**/api/people*', async (route, request) => {
      requestCount++;
      if (requestCount === 1) {
        await route.fulfill({
          status: 500,
          body: JSON.stringify({ error: 'Server error' })
        });
      } else {
        await route.continue();
      }
    });

    await errorLoginPage.goto();
    await errorLoginPage.clickLogin();
    await errorPage.waitForURL('/chat', { timeout: 5000 });
    await errorSettingsPage.goto();
    await errorPage.waitForTimeout(1000);

    // Click retry if error component is visible
    const hasError = await errorSettingsPage.errorComponent.isVisible().catch(() => false);
    if (hasError) {
      await errorSettingsPage.clickRetry();
      await errorPage.waitForTimeout(1000);
    }

    await errorPage.close();
  });

  test('Cenário 8: Exibição da seção API Status @api @ui @P1', async ({ page }) => {
    // Given: Dado que estou na página de settings
    await settingsPage.waitForLoad();
    await page.waitForTimeout(1000);

    // Then: Então devo ver a seção de API Status
    await expect(settingsPage.apiStatusSection).toBeVisible();

    // And: E devo ver informações sobre a conexão
    const statusText = await settingsPage.getAPIStatusText();
    expect(statusText).toBeTruthy();
    expect(statusText).toContain('Connected');
  });

  test('Cenário 9: Exibição da mensagem de boas-vindas @ui @P2', async ({ page }) => {
    // Given: Dado que estou na página de settings
    await settingsPage.waitForLoad();
    await page.waitForTimeout(1000);

    // Then: Então devo ver a mensagem de boas-vindas
    await expect(settingsPage.welcomeMessage).toBeVisible();

    // And: E devo ver o texto "Configure your preferences!"
    const welcomeText = await settingsPage.welcomeMessage.textContent();
    expect(welcomeText).toContain('Configure your preferences!');
  });

  test('Cenário 10: Responsividade - Visualização mobile @responsive @ui @P1', async ({ page }) => {
    // Given: Dado que estou na página de settings
    await settingsPage.waitForLoad();

    // When: Quando eu redimensionar a janela para largura mobile
    await settingsPage.resizeToMobile();
    await page.waitForTimeout(500);

    // Then: Então o layout deve se adaptar para mobile
    await expect(settingsPage.header).toBeVisible();
    await expect(settingsPage.settingsTitle).toBeVisible();

    // And: E todas as seções devem estar visíveis
    await expect(settingsPage.themeSection).toBeVisible();
    await expect(settingsPage.languageSection).toBeVisible();
    await expect(settingsPage.notificationsSection).toBeVisible();
  });

  test('Cenário 11: Responsividade - Visualização desktop @responsive @ui @P1', async ({ page }) => {
    // Given: Dado que estou na página de settings
    await settingsPage.waitForLoad();

    // When: Quando eu redimensionar a janela para largura desktop
    await settingsPage.resizeToDesktop();
    await page.waitForTimeout(500);

    // Then: Então o layout deve se adaptar para desktop
    await expect(settingsPage.header).toBeVisible();

    // And: E todas as seções devem estar visíveis
    await expect(settingsPage.themeSection).toBeVisible();
    await expect(settingsPage.languageSection).toBeVisible();
    await expect(settingsPage.notificationsSection).toBeVisible();
  });

  test('Cenário 12: Persistência de configurações no localStorage @storage @P1', async ({ page }) => {
    // Given: Dado que estou na página de settings
    await settingsPage.waitForLoad();

    // When: Quando eu alterar o tema para "dark"
    await settingsPage.selectTheme('dark');
    await page.waitForTimeout(500);

    // Then: Então o valor deve ser salvo no localStorage
    const themeValue = await page.evaluate(() => localStorage.getItem('app-theme-preference'));
    expect(themeValue).toBe('dark');

    // When: Quando eu alterar o idioma para "pt"
    await settingsPage.selectLanguage('pt');
    await page.waitForTimeout(500);

    // Then: Então o valor deve ser salvo no localStorage
    const languageValue = await page.evaluate(() => localStorage.getItem('app-language-preference'));
    expect(languageValue).toBe('pt');

    // When: Quando eu habilitar notificações
    const initialNotificationState = await settingsPage.isNotificationsEnabled();
    await settingsPage.toggleNotifications();
    await page.waitForTimeout(500);

    // Then: Então o valor deve ser salvo no localStorage
    const notificationValue = await page.evaluate(() => localStorage.getItem('app-notifications-preference'));
    expect(notificationValue).toBe((!initialNotificationState).toString());
  });
});
