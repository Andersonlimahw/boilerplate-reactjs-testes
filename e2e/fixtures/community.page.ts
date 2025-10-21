import { Page, Locator } from '@playwright/test';

export class CommunityPage {
  readonly page: Page;
  readonly header: Locator;
  readonly title: Locator;
  readonly searchInput: Locator;
  readonly categoryFilter: Locator;
  readonly sortFilter: Locator;
  readonly communitiesGrid: Locator;
  readonly stats: Locator;
  readonly footer: Locator;
  readonly loadingComponent: Locator;
  readonly errorComponent: Locator;
  readonly noResults: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByTestId('community-header');
    this.title = page.getByTestId('communities-title');
    this.searchInput = page.getByTestId('search-input');
    this.categoryFilter = page.getByTestId('category-filter');
    this.sortFilter = page.getByTestId('sort-filter');
    this.communitiesGrid = page.getByTestId('communities-grid');
    this.stats = page.getByTestId('communities-stats');
    this.footer = page.getByTestId('footer');
    this.loadingComponent = page.getByTestId('loading-component');
    this.errorComponent = page.getByTestId('error-component');
    this.noResults = page.getByTestId('no-results');
  }

  async goto() {
    await this.page.goto('/community');
  }

  async waitForLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async isLoaded() {
    await this.header.waitFor({ state: 'visible' });
  }

  async searchCommunities(searchTerm: string) {
    await this.searchInput.fill(searchTerm);
  }

  async selectCategory(category: string) {
    await this.categoryFilter.selectOption(category);
  }

  async selectSort(sortOption: string) {
    await this.sortFilter.selectOption(sortOption);
  }

  async getCommunityCard(communityId: string) {
    return this.page.getByTestId(`community-card-${communityId}`);
  }

  async getAllCommunityCards() {
    return this.page.locator('[data-testid^="community-card-"]').all();
  }

  async getCommunityCardsCount(): Promise<number> {
    const cards = await this.getAllCommunityCards();
    return cards.length;
  }

  async joinCommunity(communityId: string) {
    const card = await this.getCommunityCard(communityId);
    const joinButton = card.getByTestId('join-button');
    await joinButton.click();
  }

  async getCommunityName(communityId: string): Promise<string | null> {
    const card = await this.getCommunityCard(communityId);
    const name = card.getByTestId('community-name');
    return await name.textContent();
  }

  async getCommunityDescription(communityId: string): Promise<string | null> {
    const card = await this.getCommunityCard(communityId);
    const description = card.getByTestId('community-description');
    return await description.textContent();
  }

  async hasVerifiedBadge(communityId: string): Promise<boolean> {
    const card = await this.getCommunityCard(communityId);
    const badge = card.locator('[data-testid="verified-badge"]');
    return await badge.isVisible().catch(() => false);
  }

  async getMembersCount(communityId: string): Promise<string | null> {
    const card = await this.getCommunityCard(communityId);
    const membersCount = card.getByTestId('members-count');
    return await membersCount.textContent();
  }

  async getCategory(communityId: string): Promise<string | null> {
    const card = await this.getCommunityCard(communityId);
    const category = card.getByTestId('community-category');
    return await category.textContent();
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

  async getStatsText(): Promise<string | null> {
    return await this.stats.textContent();
  }
}
