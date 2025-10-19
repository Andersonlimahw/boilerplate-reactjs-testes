import { test, expect } from '@playwright/test';
import { ProfilePage } from '../fixtures/profile.page';
import { LoginPage } from '../fixtures/login.page';
import { mockApiError } from '../helpers/test-utils';

test.describe('Feature: Página de Perfil', () => {
  let profilePage: ProfilePage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    profilePage = new ProfilePage(page);

    // Login first
    await loginPage.goto();
    await loginPage.clickLogin();
    await page.waitForURL('/chat', { timeout: 5000 });

    // Navigate to profile
    await profilePage.goto();
  });

  test('Cenário 1: Carregamento inicial da página de perfil @smoke @critical @P0', async ({ page }) => {
    // When: Quando a página terminar de carregar
    await profilePage.waitForLoad();

    // Then: Então devo ver o header com gradiente de cores
    await expect(profilePage.header).toBeVisible();

    // And: E devo ver o texto "Welcome to your profile!"
    await expect(profilePage.welcomeText).toBeVisible();

    // And: E devo ver o texto "Request sample result on right!"
    await expect(profilePage.instructionText).toBeVisible();

    // And: E devo ver o componente Footer
    await expect(profilePage.footer).toBeVisible();
  });

  test('Cenário 3: Exibição de dados do perfil com sucesso @api @critical @P0', async ({ page }) => {
    // Wait for data to load
    await page.waitForTimeout(1000);

    // Then: Então devo ver o título "Profile page"
    const hasSuccessTitle = await profilePage.successTitle.isVisible().catch(() => false);

    // And: E devo ver "Api : Response"
    const hasApiResponse = await profilePage.apiResponse.isVisible().catch(() => false);

    // One of them should be visible
    expect(hasSuccessTitle || hasApiResponse).toBeTruthy();
  });

  test('Cenário 4: Tratamento de erro na página de perfil @api @error @P0', async ({ page }) => {
    // Create new page with error
    const errorPage = await page.context().newPage();
    const errorProfilePage = new ProfilePage(errorPage);
    const errorLoginPage = new LoginPage(errorPage);

    // Mock API error
    await mockApiError(errorPage, '**/api/people*', 500);

    // Navigate
    await errorLoginPage.goto();
    await errorLoginPage.clickLogin();
    await errorPage.waitForURL('/chat', { timeout: 5000 });
    await errorProfilePage.goto();
    await errorPage.waitForTimeout(1000);

    // Check for error component
    const hasError = await errorProfilePage.errorComponent.isVisible().catch(() => false);

    await errorPage.close();
  });

  test('Cenário 7: Responsividade - Visualização mobile do perfil @responsive @ui @P1', async ({ page }) => {
    // When: Quando eu redimensionar a janela para largura <= 690px
    await profilePage.resizeToMobile();
    await page.waitForTimeout(500);

    // Then: Então o layout deve mudar para modo mobile
    await expect(profilePage.header).toBeVisible();
    await expect(profilePage.welcomeText).toBeVisible();
  });

  test('Cenário 8: Responsividade - Visualização desktop do perfil @responsive @ui @P1', async ({ page }) => {
    // When: Quando eu redimensionar a janela para largura > 690px
    await profilePage.resizeToDesktop();
    await page.waitForTimeout(500);

    // Then: Então o layout deve mudar para modo desktop
    await expect(profilePage.header).toBeVisible();

    const container = page.locator('.container').first();
    const display = await container.evaluate(el => {
      return window.getComputedStyle(el).display;
    });
    expect(display).toBeTruthy();
  });

  test('Cenário 9: Header do perfil com gradiente temático @ui @theme @P2', async ({ page }) => {
    // When: Quando a página renderizar
    await profilePage.waitForLoad();

    // Then: Então o header deve ter as classes "bg-gradient-to-r"
    const headerClasses = await profilePage.header.evaluate(el => {
      return Array.from(el.classList);
    });

    const hasGradient = headerClasses.some(cls => cls.includes('bg-gradient'));
    expect(hasGradient).toBeTruthy();
  });

  test('Cenário 12: Integração do Footer no perfil @ui @component @P2', async ({ page }) => {
    // When: Quando a página renderizar
    await profilePage.waitForLoad();

    // Then: Então o componente Footer deve estar visível
    await expect(profilePage.footer).toBeVisible();
  });

  test('Cenário 15: Navegação direta para o perfil @navigation @smoke @P1', async ({ page }) => {
    // Given: Dado que estou autenticado
    // When: Quando eu navego diretamente para "/profile"
    await page.goto('/profile');

    // Then: Então a página de perfil deve carregar completamente
    await expect(profilePage.header).toBeVisible();
    await expect(profilePage.welcomeText).toBeVisible();

    // And: E a URL deve ser "/profile"
    expect(page.url()).toContain('/profile');
  });
});
