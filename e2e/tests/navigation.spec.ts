import { test, expect } from '@playwright/test';
import { LoginPage } from '../fixtures/login.page';
import { ChatPage } from '../fixtures/chat.page';
import { ProfilePage } from '../fixtures/profile.page';

test.describe('Feature: Navegação e Rotas', () => {
  let loginPage: LoginPage;
  let chatPage: ChatPage;
  let profilePage: ProfilePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    chatPage = new ChatPage(page);
    profilePage = new ProfilePage(page);
  });

  test('Cenário 1: Navegação de Login para Chat @navigation @smoke @critical @P0', async ({ page }) => {
    // Given: Dado que estou na página de login "/"
    await loginPage.goto();

    // When: Quando eu clico no botão "Login"
    await loginPage.clickLogin();

    // Then: Então devo ser redirecionado para "/chat"
    await page.waitForURL('/chat', { timeout: 5000 });
    expect(page.url()).toContain('/chat');

    // And: E a página de chat deve estar totalmente carregada
    await expect(chatPage.header).toBeVisible();
  });

  test('Cenário 2: Navegação direta via URL - Chat @navigation @routing @P0', async ({ page }) => {
    // Given: Login first
    await loginPage.goto();
    await loginPage.clickLogin();
    await page.waitForURL('/chat', { timeout: 5000 });

    // When: Quando eu navego diretamente para "/chat"
    await page.goto('/chat');

    // Then: Então a página de chat deve carregar
    expect(page.url()).toContain('/chat');

    // And: E todos os componentes devem ser renderizados
    await expect(chatPage.header).toBeVisible();
    await expect(chatPage.welcomeText).toBeVisible();
  });

  test('Cenário 3: Navegação direta via URL - Profile @navigation @routing @P0', async ({ page }) => {
    // Given: Login first
    await loginPage.goto();
    await loginPage.clickLogin();
    await page.waitForURL('/chat', { timeout: 5000 });

    // When: Quando eu navego diretamente para "/profile"
    await page.goto('/profile');

    // Then: Então a página de perfil deve carregar
    expect(page.url()).toContain('/profile');

    // And: E todos os componentes devem ser renderizados
    await expect(profilePage.header).toBeVisible();
    await expect(profilePage.welcomeText).toBeVisible();
  });

  test('Cenário 4: Navegação usando botão voltar do navegador @navigation @browser @P1', async ({ page }) => {
    // Given: Dado que estou na página "/chat" e naveguei de "/" para "/chat"
    await loginPage.goto();
    await loginPage.clickLogin();
    await page.waitForURL('/chat', { timeout: 5000 });

    // When: Quando eu clico no botão voltar do navegador
    await page.goBack();

    // Then: Então devo voltar para a página "/"
    expect(page.url()).toMatch(/\/$/);

    // And: E a página de login deve ser exibida
    await expect(loginPage.logo).toBeVisible();
  });

  test('Cenário 5: Navegação usando botão avançar do navegador @navigation @browser @P1', async ({ page }) => {
    // Given: Setup navigation history
    await loginPage.goto();
    await loginPage.clickLogin();
    await page.waitForURL('/chat', { timeout: 5000 });
    await page.goBack();

    // When: Quando eu clico no botão avançar do navegador
    await page.goForward();

    // Then: Então devo voltar para "/chat"
    expect(page.url()).toContain('/chat');

    // And: E a página de chat deve ser exibida
    await expect(chatPage.header).toBeVisible();
  });

  test('Cenário 6: Navegação entre Chat e Profile @navigation @P1', async ({ page }) => {
    // Given: Dado que estou na página "/chat"
    await loginPage.goto();
    await loginPage.clickLogin();
    await page.waitForURL('/chat', { timeout: 5000 });

    // When: Quando eu navego para "/profile"
    await page.goto('/profile');

    // Then: Então a URL deve mudar para "/profile"
    expect(page.url()).toContain('/profile');

    // And: E a página de perfil deve ser carregada
    await expect(profilePage.header).toBeVisible();

    // When: Navigate back to chat
    await page.goto('/chat');

    // Then: Both pages should work correctly
    expect(page.url()).toContain('/chat');
    await expect(chatPage.header).toBeVisible();
  });

  test('Cenário 12: Navegação com recarregamento de página @navigation @reload @P2', async ({ page }) => {
    // Given: Dado que estou na página "/chat"
    await loginPage.goto();
    await loginPage.clickLogin();
    await page.waitForURL('/chat', { timeout: 5000 });

    // When: Quando eu recarrego a página
    await page.reload();

    // Then: Então devo permanecer na página "/chat"
    expect(page.url()).toContain('/chat');

    // And: E a página deve carregar novamente
    await expect(chatPage.header).toBeVisible();
  });

  test('Cenário 18: Performance de navegação @navigation @performance @P2', async ({ page }) => {
    // Given: Dado que estou na página "/"
    await loginPage.goto();
    await loginPage.clickLogin();
    await page.waitForURL('/chat', { timeout: 5000 });

    // When: Quando eu navego para "/profile"
    const startTime = Date.now();
    await page.goto('/profile');
    await profilePage.header.waitFor({ state: 'visible' });
    const endTime = Date.now();
    const navigationTime = endTime - startTime;

    // Then: Então a transição deve ocorrer em menos de 2000ms (reasonable for E2E)
    expect(navigationTime).toBeLessThan(2000);
  });
});
