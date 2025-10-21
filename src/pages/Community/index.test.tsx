// REF: https://github.com/vitest-dev/vitest/blob/main/examples/react-testing-lib
import { describe, expect, it, vi, Mock, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "../../commons/utils/tests";
import { Community } from "./";
import { useCommunityHook } from "./hooks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MOCK_COMMUNITIES } from "./constants";

// Mock react-toastify
vi.mock("react-toastify", () => ({
  toast: vi.fn(),
}));

// Mock react-router-dom
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

// Mock the hooks
vi.mock("./hooks", () => ({
  useCommunityHook: vi.fn(),
}));

// Mock React Query
vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query");
  return {
    ...actual,
    useQuery: vi.fn(),
  };
});

describe("Community Page", () => {
  const mockCommunityHook = {
    communitiesQuery: {
      data: MOCK_COMMUNITIES,
      refetch: vi.fn(),
      isLoading: false,
      isRefetching: false,
      isError: false,
      isSuccess: true,
    },
    communities: MOCK_COMMUNITIES,
    theme: {
      styles: {
        gradient: "from-purple-500 to-blue-500",
      },
    },
    searchTerm: "",
    setSearchTerm: vi.fn(),
    selectedCategory: "all",
    setSelectedCategory: vi.fn(),
    sortBy: "popular",
    setSortBy: vi.fn(),
  };

  beforeEach(() => {
    (useCommunityHook as Mock).mockReturnValue(mockCommunityHook);
    (toast as unknown as Mock).mockClear();
    (useNavigate as Mock).mockReturnValue(vi.fn());
  });

  it("Cenário 1: Render inicial do componente", async () => {
    render(<Community />);

    // Verify header is present
    const header = screen.getByTestId("community-header");
    expect(header).toBeInTheDocument();
  });

  it("Cenário 2: Snapshot do componente", async () => {
    const { asFragment } = render(<Community />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("Cenário 3: Exibição do título Communities", async () => {
    render(<Community />);

    const title = await waitFor(() => screen.getByTestId("communities-title"));
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Discover Communities");
  });

  it("Cenário 4: Exibição da barra de busca", async () => {
    render(<Community />);

    const searchInput = await waitFor(() => screen.getByTestId("search-input"));
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute("placeholder", "Search communities...");
  });

  it("Cenário 5: Exibição dos filtros", async () => {
    render(<Community />);

    const categoryFilter = await waitFor(() => screen.getByTestId("category-filter"));
    const sortFilter = await waitFor(() => screen.getByTestId("sort-filter"));

    expect(categoryFilter).toBeInTheDocument();
    expect(sortFilter).toBeInTheDocument();
  });

  it("Cenário 6: Exibição da grid de comunidades", async () => {
    render(<Community />);

    const grid = await waitFor(() => screen.getByTestId("communities-grid"));
    expect(grid).toBeInTheDocument();
  });

  it("Cenário 7: Exibição dos cards de comunidades", async () => {
    render(<Community />);

    // Verify that all communities are rendered
    for (const community of MOCK_COMMUNITIES) {
      const card = await waitFor(() => screen.getByTestId(`community-card-${community.id}`));
      expect(card).toBeInTheDocument();
    }
  });

  it("Cenário 8: Card contém nome da comunidade", async () => {
    render(<Community />);

    const firstCommunity = MOCK_COMMUNITIES[0];
    const card = await waitFor(() => screen.getByTestId(`community-card-${firstCommunity.id}`));

    expect(card).toHaveTextContent(firstCommunity.name);
  });

  it("Cenário 9: Card contém descrição da comunidade", async () => {
    render(<Community />);

    const firstCommunity = MOCK_COMMUNITIES[0];
    const card = await waitFor(() => screen.getByTestId(`community-card-${firstCommunity.id}`));

    expect(card).toHaveTextContent(firstCommunity.description);
  });

  it("Cenário 10: Card contém contagem de membros", async () => {
    render(<Community />);

    const firstCommunity = MOCK_COMMUNITIES[0];
    const card = await waitFor(() => screen.getByTestId(`community-card-${firstCommunity.id}`));

    expect(card).toHaveTextContent(`${firstCommunity.membersCount.toLocaleString()} members`);
  });

  it("Cenário 11: Card contém categoria", async () => {
    render(<Community />);

    const firstCommunity = MOCK_COMMUNITIES[0];
    const card = await waitFor(() => screen.getByTestId(`community-card-${firstCommunity.id}`));

    expect(card).toHaveTextContent(firstCommunity.category);
  });

  it("Cenário 12: Card contém botão Join Community", async () => {
    render(<Community />);

    const firstCommunity = MOCK_COMMUNITIES[0];
    const card = await waitFor(() => screen.getByTestId(`community-card-${firstCommunity.id}`));

    expect(card).toHaveTextContent("Join Community");
  });

  it("Cenário 13: Badge de verificação exibido para comunidades verificadas", async () => {
    render(<Community />);

    const verifiedCommunity = MOCK_COMMUNITIES.find(c => c.isVerified);
    if (verifiedCommunity) {
      const card = await waitFor(() => screen.getByTestId(`community-card-${verifiedCommunity.id}`));
      const badge = card.querySelector('[data-testid="verified-badge"]');
      expect(badge).toBeInTheDocument();
    }
  });

  it("Cenário 14: Busca chama setSearchTerm", async () => {
    const mockSetSearchTerm = vi.fn();
    (useCommunityHook as Mock).mockReturnValue({
      ...mockCommunityHook,
      setSearchTerm: mockSetSearchTerm,
    });

    render(<Community />);

    const searchInput = await waitFor(() => screen.getByTestId("search-input"));
    fireEvent.change(searchInput, { target: { value: "React" } });

    await waitFor(() => {
      expect(mockSetSearchTerm).toHaveBeenCalledWith("React");
    });
  });

  it("Cenário 15: Alteração de categoria chama setSelectedCategory", async () => {
    const mockSetSelectedCategory = vi.fn();
    (useCommunityHook as Mock).mockReturnValue({
      ...mockCommunityHook,
      setSelectedCategory: mockSetSelectedCategory,
    });

    render(<Community />);

    const categoryFilter = await waitFor(() => screen.getByTestId("category-filter"));
    fireEvent.change(categoryFilter, { target: { value: "technology" } });

    await waitFor(() => {
      expect(mockSetSelectedCategory).toHaveBeenCalledWith("technology");
    });
  });

  it("Cenário 16: Alteração de ordenação chama setSortBy", async () => {
    const mockSetSortBy = vi.fn();
    (useCommunityHook as Mock).mockReturnValue({
      ...mockCommunityHook,
      setSortBy: mockSetSortBy,
    });

    render(<Community />);

    const sortFilter = await waitFor(() => screen.getByTestId("sort-filter"));
    fireEvent.change(sortFilter, { target: { value: "newest" } });

    await waitFor(() => {
      expect(mockSetSortBy).toHaveBeenCalledWith("newest");
    });
  });

  it("Cenário 17: Exibição de estatísticas", async () => {
    render(<Community />);

    const stats = await waitFor(() => screen.getByTestId("communities-stats"));
    expect(stats).toBeInTheDocument();
    expect(stats).toHaveTextContent(`Showing ${MOCK_COMMUNITIES.length} communities`);
  });

  it("Cenário 18: Mensagem quando não há resultados", async () => {
    (useCommunityHook as Mock).mockReturnValue({
      ...mockCommunityHook,
      communities: [],
    });

    render(<Community />);

    const noResults = await waitFor(() => screen.getByTestId("no-results"));
    expect(noResults).toBeInTheDocument();
    expect(noResults).toHaveTextContent("No communities found");
  });

  it("Cenário 19: Estado de loading", async () => {
    (useCommunityHook as Mock).mockReturnValue({
      ...mockCommunityHook,
      communitiesQuery: {
        ...mockCommunityHook.communitiesQuery,
        isLoading: true,
        isSuccess: false,
      },
    });

    render(<Community />);

    const loadingComponent = screen.getByTestId("loading-component");
    expect(loadingComponent).toBeInTheDocument();
  });

  it("Cenário 20: Estado de erro", async () => {
    const mockRefetch = vi.fn();
    (useCommunityHook as Mock).mockReturnValue({
      ...mockCommunityHook,
      communitiesQuery: {
        data: undefined,
        refetch: mockRefetch,
        isLoading: false,
        isRefetching: false,
        isError: true,
        isSuccess: false,
      },
    });

    render(<Community />);

    const errorComponent = await waitFor(() => screen.getByTestId("error-api-component"));
    expect(errorComponent).toBeInTheDocument();
  });

  it("Cenário 21: Exibição do Footer", async () => {
    render(<Community />);

    const footer = await waitFor(() => screen.getByTestId("footer"));
    expect(footer).toBeInTheDocument();
  });
});
