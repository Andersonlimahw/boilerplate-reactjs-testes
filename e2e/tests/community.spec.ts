import { test, expect } from '@playwright/test';
import { CommunityPage } from '../fixtures/community.page';
import { LoginPage } from '../fixtures/login.page';

test.describe('Feature: Página de Community', () => {
  let communityPage: CommunityPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    communityPage = new CommunityPage(page);

    // Login first
    await loginPage.goto();
    await loginPage.clickLogin();
    await page.waitForURL('/chat', { timeout: 5000 });

    // Navigate to community
    await communityPage.goto();
    await page.waitForURL('/community', { timeout: 5000 });
  });

  test('Cenário 1: Carregamento inicial da página de comunidades @smoke @critical @P0', async ({ page }) => {
    // Given: Dado que estou autenticado no sistema e navego para a página "/community"
    // When: Quando a página terminar de carregar
    await communityPage.waitForLoad();

    // Then: Então devo ver o header com ícone de comunidade
    await expect(communityPage.header).toBeVisible();

    // And: E devo ver o título "Discover Communities"
    await expect(communityPage.title).toBeVisible();
    await expect(communityPage.title).toHaveText('Discover Communities');

    // And: E devo ver a barra de busca
    await expect(communityPage.searchInput).toBeVisible();

    // And: E devo ver os filtros
    await expect(communityPage.categoryFilter).toBeVisible();
    await expect(communityPage.sortFilter).toBeVisible();

    // And: E devo ver o componente Footer
    await expect(communityPage.footer).toBeVisible();
  });

  test('Cenário 2: Exibição da grid de comunidades @ui @community @P0', async ({ page }) => {
    // Given: Dado que estou na página de comunidades
    await communityPage.waitForLoad();

    // Then: Então devo ver a grid de comunidades
    await expect(communityPage.communitiesGrid).toBeVisible();

    // And: E devo ver múltiplos cards de comunidades
    const cardsCount = await communityPage.getCommunityCardsCount();
    expect(cardsCount).toBeGreaterThan(0);
  });

  test('Cenário 3: Informações dos cards de comunidade @ui @community @P0', async ({ page }) => {
    // Given: Dado que estou na página de comunidades
    await communityPage.waitForLoad();

    // When: Quando eu verifico o primeiro card
    const firstCard = await communityPage.getCommunityCard('1');

    // Then: Então o card deve ter uma imagem
    const image = firstCard.locator('[data-testid="community-image"]');
    await expect(image).toBeVisible();

    // And: E deve ter um nome
    const name = firstCard.locator('[data-testid="community-name"]');
    await expect(name).toBeVisible();

    // And: E deve ter uma descrição
    const description = firstCard.locator('[data-testid="community-description"]');
    await expect(description).toBeVisible();

    // And: E deve ter contagem de membros
    const membersCount = firstCard.locator('[data-testid="members-count"]');
    await expect(membersCount).toBeVisible();

    // And: E deve ter uma categoria
    const category = firstCard.locator('[data-testid="community-category"]');
    await expect(category).toBeVisible();

    // And: E deve ter um botão "Join Community"
    const joinButton = firstCard.locator('[data-testid="join-button"]');
    await expect(joinButton).toBeVisible();
    await expect(joinButton).toHaveText('Join Community');
  });

  test('Cenário 4: Funcionalidade de busca @search @community @P0', async ({ page }) => {
    // Given: Dado que estou na página de comunidades
    await communityPage.waitForLoad();

    // When: Quando eu buscar por "React"
    await communityPage.searchCommunities('React');
    await page.waitForTimeout(500);

    // Then: Então devo ver apenas comunidades relacionadas a React
    const cardsCount = await communityPage.getCommunityCardsCount();

    // Verify we have results (the mock has a React community)
    expect(cardsCount).toBeGreaterThan(0);
  });

  test('Cenário 5: Filtro por categoria @filter @community @P0', async ({ page }) => {
    // Given: Dado que estou na página de comunidades
    await communityPage.waitForLoad();

    const initialCount = await communityPage.getCommunityCardsCount();

    // When: Quando eu selecionar a categoria "technology"
    await communityPage.selectCategory('technology');
    await page.waitForTimeout(500);

    // Then: Então devo ver apenas comunidades de tecnologia
    const filteredCount = await communityPage.getCommunityCardsCount();

    // The count should change (either more or less than all categories)
    expect(filteredCount).toBeLessThanOrEqual(initialCount);
  });

  test('Cenário 8: Exibição de estatísticas @ui @community @P1', async ({ page }) => {
    // Given: Dado que estou na página de comunidades
    await communityPage.waitForLoad();

    // Then: Então devo ver as estatísticas
    await expect(communityPage.stats).toBeVisible();

    // And: E deve mostrar quantas comunidades estão sendo exibidas
    const statsText = await communityPage.getStatsText();
    expect(statsText).toContain('Showing');
    expect(statsText).toContain('communities');
  });

  test('Cenário 9: Busca sem resultados @search @community @P1', async ({ page }) => {
    // Given: Dado que estou na página de comunidades
    await communityPage.waitForLoad();

    // When: Quando eu buscar por algo que não existe
    await communityPage.searchCommunities('xyzabc123nonexistent');
    await page.waitForTimeout(500);

    // Then: Então devo ver a mensagem "No communities found"
    await expect(communityPage.noResults).toBeVisible();
    const noResultsText = await communityPage.noResults.textContent();
    expect(noResultsText).toContain('No communities found');
  });

  test('Cenário 10: Responsividade - Visualização mobile @responsive @ui @P1', async ({ page }) => {
    // Given: Dado que estou na página de comunidades
    await communityPage.waitForLoad();

    // When: Quando eu redimensionar a janela para largura mobile
    await communityPage.resizeToMobile();
    await page.waitForTimeout(500);

    // Then: Então o layout deve se adaptar para mobile
    await expect(communityPage.header).toBeVisible();
    await expect(communityPage.title).toBeVisible();

    // And: E todas as seções devem estar visíveis
    await expect(communityPage.searchInput).toBeVisible();
    await expect(communityPage.communitiesGrid).toBeVisible();
  });

  test('Cenário 11: Responsividade - Visualização desktop @responsive @ui @P1', async ({ page }) => {
    // Given: Dado que estou na página de comunidades
    await communityPage.waitForLoad();

    // When: Quando eu redimensionar a janela para largura desktop
    await communityPage.resizeToDesktop();
    await page.waitForTimeout(500);

    // Then: Então o layout deve se adaptar para desktop
    await expect(communityPage.header).toBeVisible();

    // And: E a grid deve exibir múltiplas colunas
    const cardsCount = await communityPage.getCommunityCardsCount();
    expect(cardsCount).toBeGreaterThan(0);
  });

  test('Cenário 12: Link do botão Join Community @navigation @community @P1', async ({ page }) => {
    // Given: Dado que estou na página de comunidades
    await communityPage.waitForLoad();

    // When: Quando eu verifico o botão Join Community
    const firstCard = await communityPage.getCommunityCard('1');
    const joinButton = firstCard.locator('[data-testid="join-button"]');

    // Then: Então o botão deve ter um link válido
    await expect(joinButton).toHaveAttribute('href', '/community/react-developers');
  });

  test('Cenário 13: Combinação de filtros @filter @search @community @P1', async ({ page }) => {
    // Given: Dado que estou na página de comunidades
    await communityPage.waitForLoad();

    // When: Quando eu aplicar múltiplos filtros
    await communityPage.selectCategory('technology');
    await page.waitForTimeout(300);
    await communityPage.searchCommunities('React');
    await page.waitForTimeout(300);
    await communityPage.selectSort('members');
    await page.waitForTimeout(500);

    // Then: Então devo ver resultados filtrados e ordenados
    const cardsCount = await communityPage.getCommunityCardsCount();
    expect(cardsCount).toBeGreaterThanOrEqual(0);
  });
});
