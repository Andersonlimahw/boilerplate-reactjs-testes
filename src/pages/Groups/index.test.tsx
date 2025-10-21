import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { render, screen } from '../../commons/utils/tests';
import { Groups } from './index';
import { useGroupsPage } from './hooks';

vi.mock('./hooks', () => ({
  useGroupsPage: vi.fn(),
}));

const mockedUseGroupsPage = vi.mocked(useGroupsPage);

type MockQueryState = {
  data: any;
  refetch: () => void;
  isLoading: boolean;
  isError: boolean;
  isRefetching: boolean;
};

const createQueryState = (overrides: Partial<MockQueryState> = {}): MockQueryState => ({
  data: undefined,
  refetch: vi.fn(),
  isLoading: false,
  isError: false,
  isRefetching: false,
  ...overrides,
});

const baseTheme = {
  styles: {
    gradient: 'from-blue-900 to-blue-400',
    background: 'bg-blue-900',
    text: 'text-zinc-100',
  },
};

const setViewport = (width: number) => {
  Object.defineProperty(window, 'innerWidth', { value: width, configurable: true });
};

const renderComponent = () =>
  render(<Groups />, {
    wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>,
  });

describe('<Groups />', () => {
  beforeEach(() => {
    setViewport(1024);
    mockedUseGroupsPage.mockReturnValue({
      peopleQuery: createQueryState({ isLoading: true }),
      theme: baseTheme,
      dispatch: vi.fn(),
    });
  });

  it('renders the loading state by default', () => {
    renderComponent();

    expect(screen.getByTestId('loading-component')).toBeInTheDocument();
  });

  it('renders the success state when groups arrive', () => {
    mockedUseGroupsPage.mockReturnValue({
      peopleQuery: createQueryState({ data: [{ name: 'Frontend Team' }] }),
      theme: baseTheme,
      dispatch: vi.fn(),
    });

    renderComponent();

    expect(screen.getByTestId('groups-success')).toBeInTheDocument();
    expect(screen.getByText(/Frontend Team/i)).toBeInTheDocument();
  });

  it('renders the error feedback when query fails', () => {
    mockedUseGroupsPage.mockReturnValue({
      peopleQuery: createQueryState({ isError: true }),
      theme: baseTheme,
      dispatch: vi.fn(),
    });

    renderComponent();

    expect(screen.getByTestId('error-api-component')).toBeInTheDocument();
  });

  it('applies mobile layout when viewport is narrow', () => {
    setViewport(480);

    renderComponent();

    expect(screen.getByTestId('groups-layout')).toHaveClass('flex-col');
  });
});
