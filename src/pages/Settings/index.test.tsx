// REF: https://github.com/vitest-dev/vitest/blob/main/examples/react-testing-lib
import { describe, expect, it, vi, Mock, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "../../commons/utils/tests";
import { Settings } from "./";
import { useSettingsHook } from "./hooks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
  useSettingsHook: vi.fn(),
}));

// Mock React Query
vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query");
  return {
    ...actual,
    useQuery: vi.fn(),
  };
});

describe("Settings Page", () => {
  const mockSettingsHook = {
    settingsQuery: {
      data: [{ name: "Test User" }],
      refetch: vi.fn(),
      isLoading: false,
      isError: false,
      isSuccess: true,
    },
    theme: {
      styles: {
        gradient: "from-purple-500 to-blue-500",
      },
    },
    selectedTheme: "auto",
    selectedLanguage: "en",
    notificationsEnabled: false,
    saveTheme: vi.fn(),
    saveLanguage: vi.fn(),
    saveNotifications: vi.fn(),
  };

  beforeEach(() => {
    (useSettingsHook as Mock).mockReturnValue(mockSettingsHook);
    (toast as unknown as Mock).mockClear();
    (useNavigate as Mock).mockReturnValue(vi.fn());
    localStorage.clear();
  });

  it("Cenário 1: Render inicial do componente", async () => {
    render(<Settings />);

    // Verify header is present
    const header = screen.getByTestId("settings-header");
    expect(header).toBeInTheDocument();
  });

  it("Cenário 2: Snapshot do componente", async () => {
    const { asFragment } = render(<Settings />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("Cenário 3: Exibição do título Settings", async () => {
    render(<Settings />);

    const title = await waitFor(() => screen.getByTestId("settings-title"));
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Settings");
  });

  it("Cenário 4: Exibição da seção de tema", async () => {
    render(<Settings />);

    const themeSection = await waitFor(() => screen.getByTestId("theme-section"));
    expect(themeSection).toBeInTheDocument();
  });

  it("Cenário 5: Exibição da seção de idioma", async () => {
    render(<Settings />);

    const languageSection = await waitFor(() => screen.getByTestId("language-section"));
    expect(languageSection).toBeInTheDocument();
  });

  it("Cenário 6: Exibição da seção de notificações", async () => {
    render(<Settings />);

    const notificationsSection = await waitFor(() => screen.getByTestId("notifications-section"));
    expect(notificationsSection).toBeInTheDocument();
  });

  it("Cenário 7: Seleção de tema chama saveTheme", async () => {
    const mockSaveTheme = vi.fn();
    (useSettingsHook as Mock).mockReturnValue({
      ...mockSettingsHook,
      saveTheme: mockSaveTheme,
    });

    render(<Settings />);

    const darkThemeOption = await waitFor(() => screen.getByTestId("theme-option-dark"));
    fireEvent.click(darkThemeOption);

    await waitFor(() => {
      expect(mockSaveTheme).toHaveBeenCalledWith("dark");
    });
  });

  it("Cenário 8: Alteração de idioma chama saveLanguage", async () => {
    const mockSaveLanguage = vi.fn();
    (useSettingsHook as Mock).mockReturnValue({
      ...mockSettingsHook,
      saveLanguage: mockSaveLanguage,
    });

    render(<Settings />);

    const languageSelect = await waitFor(() => screen.getByTestId("language-select"));
    fireEvent.change(languageSelect, { target: { value: "pt" } });

    await waitFor(() => {
      expect(mockSaveLanguage).toHaveBeenCalledWith("pt");
    });
  });

  it("Cenário 9: Toggle de notificações chama saveNotifications", async () => {
    const mockSaveNotifications = vi.fn();
    (useSettingsHook as Mock).mockReturnValue({
      ...mockSettingsHook,
      saveNotifications: mockSaveNotifications,
    });

    render(<Settings />);

    const notificationsToggle = await waitFor(() => screen.getByTestId("notifications-toggle"));
    fireEvent.click(notificationsToggle);

    await waitFor(() => {
      expect(mockSaveNotifications).toHaveBeenCalled();
    });
  });

  it("Cenário 10: Exibição da seção de API Status", async () => {
    render(<Settings />);

    const apiStatusSection = await waitFor(() => screen.getByTestId("api-status-section"));
    expect(apiStatusSection).toBeInTheDocument();
  });

  it("Cenário 11: Exibição da mensagem de boas-vindas", async () => {
    render(<Settings />);

    const welcomeMessage = await waitFor(() => screen.getByTestId("welcome-message"));
    expect(welcomeMessage).toBeInTheDocument();
    expect(welcomeMessage).toHaveTextContent("Configure your preferences!");
  });

  it("Cenário 12: Exibição do Footer", async () => {
    render(<Settings />);

    const footer = await waitFor(() => screen.getByTestId("footer"));
    expect(footer).toBeInTheDocument();
  });

  it("Cenário 13: Estado de loading", async () => {
    (useSettingsHook as Mock).mockReturnValue({
      ...mockSettingsHook,
      settingsQuery: {
        ...mockSettingsHook.settingsQuery,
        isLoading: true,
        isSuccess: false,
      },
    });

    render(<Settings />);

    const loadingComponent = screen.getByTestId("loading-component");
    expect(loadingComponent).toBeInTheDocument();
  });

  it("Cenário 14: Estado de erro", async () => {
    const mockRefetch = vi.fn();
    (useSettingsHook as Mock).mockReturnValue({
      ...mockSettingsHook,
      settingsQuery: {
        data: undefined,
        refetch: mockRefetch,
        isLoading: false,
        isRefetching: false,
        isError: true,
        isSuccess: false,
      },
    });

    render(<Settings />);

    const errorComponent = await waitFor(() => screen.getByTestId("error-api-component"));
    expect(errorComponent).toBeInTheDocument();
  });

  it("Cenário 15: Opções de tema estão renderizadas", async () => {
    render(<Settings />);

    const lightOption = await waitFor(() => screen.getByTestId("theme-option-light"));
    const darkOption = await waitFor(() => screen.getByTestId("theme-option-dark"));
    const autoOption = await waitFor(() => screen.getByTestId("theme-option-auto"));

    expect(lightOption).toBeInTheDocument();
    expect(darkOption).toBeInTheDocument();
    expect(autoOption).toBeInTheDocument();
  });

  it("Cenário 16: Opções de idioma estão renderizadas", async () => {
    render(<Settings />);

    const languageSelect = await waitFor(() => screen.getByTestId("language-select"));
    const options = languageSelect.querySelectorAll("option");

    expect(options.length).toBeGreaterThan(0);
    expect(options[0]).toHaveValue("en");
  });
});
