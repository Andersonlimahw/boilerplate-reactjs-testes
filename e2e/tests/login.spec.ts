import { test, expect } from '@playwright/test';
import { LoginPage } from '../fixtures/login.page';
import { getToastMessage, hasClasses, clearBrowserData } from '../helpers/test-utils';

test.describe('Feature: Autenticação e Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Cenário 1: Login bem-sucedido @smoke @critical @P0', async ({ page }) => {
    // Given: Dado que estou na página de login
    await loginPage.isLoaded();

    // When: Quando eu clico no botão "Login"
    await loginPage.clickLogin();

    // Then: Então devo ver uma notificação de sucesso
    const toastMessage = await getToastMessage(page, 'success');
    expect(toastMessage).toContain('Welcome');

    // And: E devo ser redirecionado para a página "/chat"
    await page.waitForURL('/chat', { timeout: 5000 });
    expect(page.url()).toContain('/chat');
  });

  test('Cenário 2: Elementos visuais da página de login @ui @regression @P1', async ({ page }) => {
    // Given: Dado que estou na página de login
    // When: Quando a página terminar de carregar
    await loginPage.waitForLoad();

    // Then: Então devo ver a imagem do logo
    await expect(loginPage.logo).toBeVisible();
    const logoSrc = await loginPage.logo.getAttribute('src');
    expect(logoSrc).toContain('lemon-icon.png');

    // And: E devo ver o título "Boilerplate"
    await expect(loginPage.title).toBeVisible();

    // And: E devo ver o subtítulo
    await expect(loginPage.subtitle).toBeVisible();

    // And: E devo ver o botão "Login"
    await expect(loginPage.loginButton).toBeVisible();

    // And: E o container deve ter as classes de estilo corretas
    const hasCorrectClasses = await hasClasses(page, '.rounded-xl.bg-gray-800', [
      'rounded-xl',
      'bg-gray-800',
      'bg-opacity-50',
      'backdrop-blur-md'
    ]);
    expect(hasCorrectClasses).toBeTruthy();
  });

  test('Cenário 3: Responsividade - Mobile (320x568) @responsive @ui @P2', async ({ page }) => {
    // Given: Dado que estou na página de login
    // When: Quando eu redimensionar a janela para 320x568
    await page.setViewportSize({ width: 320, height: 568 });
    await page.waitForTimeout(500);

    // Then: Então o layout deve se adaptar corretamente
    await expect(loginPage.logo).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.title).toBeVisible();

    // And: E todos os elementos devem permanecer visíveis
    const isLogoVisible = await loginPage.logo.isVisible();
    expect(isLogoVisible).toBeTruthy();
  });

  test('Cenário 3: Responsividade - Tablet (768x1024) @responsive @ui @P2', async ({ page }) => {
    // When: Quando eu redimensionar a janela para 768x1024
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500);

    // Then: Então o layout deve se adaptar corretamente
    await expect(loginPage.logo).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('Cenário 3: Responsividade - Desktop (1920x1080) @responsive @ui @P2', async ({ page }) => {
    // When: Quando eu redimensionar a janela para 1920x1080
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(500);

    // Then: Então o layout deve se adaptar corretamente
    await expect(loginPage.logo).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('Cenário 4: Interação com o botão de login @ui @P1', async ({ page }) => {
    // Given: Dado que estou na página de login
    // When: Quando eu passo o mouse sobre o botão "Login"
    await loginPage.loginButton.hover();

    // Then: Então o cursor deve mudar para "pointer"
    const cursor = await loginPage.loginButton.evaluate(el => {
      return window.getComputedStyle(el).cursor;
    });
    expect(cursor).toBe('pointer');

    // And: E o botão deve estar visível e clicável
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.loginButton).toBeEnabled();
  });

  test('Cenário 5: Navegação direta para a página de login @smoke @P0', async ({ page }) => {
    // Given: Dado que estou em qualquer página da aplicação
    await page.goto('/chat');

    // When: Quando eu navego diretamente para "/"
    await page.goto('/');

    // Then: Então devo ver a página de login
    await expect(loginPage.logo).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();

    // And: E todos os elementos devem estar visíveis
    await expect(loginPage.title).toBeVisible();
    await expect(loginPage.subtitle).toBeVisible();
  });

  test('Cenário 6: Exibição da notificação de sucesso @ui @notification @P1', async ({ page }) => {
    // Given: Dado que estou na página de login
    await loginPage.isLoaded();

    // When: Quando eu clico no botão "Login"
    await loginPage.clickLogin();

    // Then: Então uma notificação toast deve aparecer
    const toast = await page.waitForSelector('.Toastify__toast--success', { timeout: 5000 });
    expect(toast).not.toBeNull();

    // And: E a notificação deve ter o tipo "success"
    const toastClass = await toast?.getAttribute('class');
    expect(toastClass).toContain('Toastify__toast--success');

    // And: E a mensagem deve ser "Welcome!."
    const message = await getToastMessage(page, 'success');
    expect(message).toContain('Welcome');
  });

  test('Cenário 7: Acessibilidade da página de login @a11y @P2', async ({ page }) => {
    // Given: Dado que estou na página de login
    await loginPage.isLoaded();

    // When: Quando eu verifico os atributos de acessibilidade
    // Then: Então as imagens devem ter atributos alt apropriados
    const logoAlt = await loginPage.logo.getAttribute('alt');
    expect(logoAlt).toBeTruthy();

    // And: E o botão deve ser focável
    await loginPage.loginButton.focus();
    const focusedElement = await page.evaluate(() => {
      return document.activeElement?.getAttribute('data-testid');
    });
    expect(focusedElement).toBe('button_login');
  });
});
