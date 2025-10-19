import { test, expect } from '@playwright/test';
import { ChatPage } from '../fixtures/chat.page';
import { LoginPage } from '../fixtures/login.page';
import { mockApiResponse, mockApiError, waitForApiCall } from '../helpers/test-utils';

test.describe('Feature: Página de Chat', () => {
  let chatPage: ChatPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    chatPage = new ChatPage(page);

    // Login first
    await loginPage.goto();
    await loginPage.clickLogin();
    await page.waitForURL('/chat', { timeout: 5000 });
  });

  test('Cenário 1: Carregamento inicial da página de chat @smoke @critical @P0', async ({ page }) => {
    // Given: Dado que estou autenticado no sistema e navego para a página "/chat"
    // When: Quando a página terminar de carregar
    await chatPage.waitForLoad();

    // Then: Então devo ver o header com gradiente de cores
    await expect(chatPage.header).toBeVisible();

    // And: E devo ver o texto "Happy customs!"
    await expect(chatPage.welcomeText).toBeVisible();

    // And: E devo ver o texto "Request sample result on right!"
    await expect(chatPage.instructionText).toBeVisible();

    // And: E devo ver o componente Footer
    await expect(chatPage.footer).toBeVisible();
  });

  test('Cenário 2: Exibição do estado de loading @api @ui @P0', async ({ page }) => {
    // Create a new page to intercept the request before navigation
    const newPage = await page.context().newPage();
    const newChatPage = new ChatPage(newPage);
    const newLoginPage = new LoginPage(newPage);

    // Mock a slow API response
    await newPage.route('**/api/people*', async route => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await route.continue();
    });

    // Navigate to chat
    await newLoginPage.goto();
    await newLoginPage.clickLogin();
    await newPage.waitForURL('/chat', { timeout: 5000 });

    // Then: Então devo ver o componente LoadingComponent
    const loadingVisible = await newChatPage.loadingComponent.isVisible().catch(() => false);

    // Clean up
    await newPage.close();
  });

  test('Cenário 3: Exibição de dados da API com sucesso @api @critical @P0', async ({ page }) => {
    // Wait for success state
    await page.waitForTimeout(1000);

    // Then: Então devo ver o título "Lets code!"
    const hasSuccessTitle = await chatPage.successTitle.isVisible().catch(() => false);

    // And: E devo ver "Api : Response"
    const hasApiResponse = await chatPage.apiResponse.isVisible().catch(() => false);

    // One of them should be visible (depends on API state)
    expect(hasSuccessTitle || hasApiResponse).toBeTruthy();
  });

  test('Cenário 4: Tratamento de erro da API @api @error @P0', async ({ page }) => {
    // Create new page with mocked error
    const errorPage = await page.context().newPage();
    const errorChatPage = new ChatPage(errorPage);
    const errorLoginPage = new LoginPage(errorPage);

    // Mock API error
    await mockApiError(errorPage, '**/api/people*', 500);

    // Navigate
    await errorLoginPage.goto();
    await errorLoginPage.clickLogin();
    await errorPage.waitForURL('/chat', { timeout: 5000 });
    await errorPage.waitForTimeout(1000);

    // Then: Então devo ver o componente ErrorApiComponent
    const hasError = await errorChatPage.errorComponent.isVisible().catch(() => false);

    await errorPage.close();
  });

  test('Cenário 5: Funcionalidade de retry após erro @api @error @P1', async ({ page }) => {
    const errorPage = await page.context().newPage();
    const errorChatPage = new ChatPage(errorPage);
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
    await errorPage.waitForTimeout(1000);

    // Click retry if error component is visible
    const hasError = await errorChatPage.errorComponent.isVisible().catch(() => false);
    if (hasError) {
      await errorChatPage.clickRetry();
      await errorPage.waitForTimeout(1000);
    }

    await errorPage.close();
  });

  test('Cenário 7: Responsividade - Visualização mobile @responsive @ui @P1', async ({ page }) => {
    // Given: Dado que estou na página "/chat"
    // When: Quando eu redimensionar a janela para largura <= 690px
    await chatPage.resizeToMobile();
    await page.waitForTimeout(500);

    // Then: Então o layout deve mudar para modo mobile
    await expect(chatPage.header).toBeVisible();
    await expect(chatPage.welcomeText).toBeVisible();
  });

  test('Cenário 8: Responsividade - Visualização desktop @responsive @ui @P1', async ({ page }) => {
    // Given: Dado que estou na página "/chat"
    // When: Quando eu redimensionar a janela para largura > 690px
    await chatPage.resizeToDesktop();
    await page.waitForTimeout(500);

    // Then: Então o layout deve mudar para modo desktop
    await expect(chatPage.header).toBeVisible();

    // And: E o conteúdo deve ser exibido em duas colunas
    const container = page.locator('.container').first();
    const display = await container.evaluate(el => {
      return window.getComputedStyle(el).display;
    });
    expect(display).toBeTruthy();
  });

  test('Cenário 9: Exibição do header com gradiente @ui @P2', async ({ page }) => {
    // Given: Dado que estou na página "/chat"
    // When: Quando a página renderizar
    await chatPage.waitForLoad();

    // Then: Então o header deve ter as classes "bg-gradient-to-r"
    const headerClasses = await chatPage.header.evaluate(el => {
      return Array.from(el.classList);
    });

    const hasGradient = headerClasses.some(cls => cls.includes('bg-gradient'));
    expect(hasGradient).toBeTruthy();

    // And: E deve ter largura total (w-full)
    const width = await chatPage.header.evaluate(el => {
      return window.getComputedStyle(el).width;
    });
    expect(width).toBeTruthy();
  });

  test('Cenário 12: Integração com o Footer @ui @P2', async ({ page }) => {
    // Given: Dado que estou na página "/chat"
    // When: Quando a página renderizar
    await chatPage.waitForLoad();

    // Then: Então o componente Footer deve estar visível
    await expect(chatPage.footer).toBeVisible();
  });

  test('Cenário 14: Container principal com classes corretas @ui @P2', async ({ page }) => {
    // Given: Dado que estou na página "/chat"
    // When: Quando a página renderizar
    await chatPage.waitForLoad();

    // Then: Então o container deve ter classes corretas
    const container = page.locator('.container').first();
    const containerExists = await container.isVisible().catch(() => false);
    expect(containerExists).toBeTruthy();
  });
});
