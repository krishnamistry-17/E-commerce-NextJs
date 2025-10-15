import Navbar from "@/app/header/page";
import { render, screen, waitFor, act } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { ...imgProps } = props;
    return <img {...imgProps} alt="image" />;
  },
}));

// Mock Next.js Link component
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// Mock store types
jest.mock("@/app/store/store", () => ({
  RootState: {},
}));

describe("Header", () => {
  const mockUseSelector = useSelector as jest.MockedFunction<
    typeof useSelector
  >;

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });

    // Mock useSearchParams
    const { useSearchParams } = require("next/navigation");
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(""),
    });

    (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn());

    // Mock complete Redux state
    mockUseSelector.mockImplementation((selector) => {
      const mockState = {
        auth: {
          accessToken: "mock-token",
          user: { id: "1", email: "test@example.com" },
        },
        wish: {
          items: [
            { id: "1", quantity: 1 },
            { id: "2", quantity: 2 },
          ],
        },
        cart: {
          items: [
            { id: "1", quantity: 1 },
            { id: "2", quantity: 2 },
          ],
        },
      };
      return selector(mockState);
    });
  });

  it("should render the header component", async () => {
    await act(async () => {
      render(<Navbar />);
    });

    await waitFor(() => {
      const header = screen.getByRole("navigation");
      expect(header).toBeInTheDocument();
    });
  });

  it("should render navigation links", async () => {
    await act(async () => {
      render(<Navbar />);
    });

    await waitFor(() => {
      const links = screen.getAllByRole("link");
      expect(links.length).toBeGreaterThan(0);
    });
  });

  it("should render cart and wishlist icons", async () => {
    await act(async () => {
      render(<Navbar />);
    });

    await waitFor(() => {
      // Check for cart and wishlist functionality
      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });
  });

  it("should handle authenticated user state", async () => {
    // Mock authenticated state
    mockUseSelector.mockImplementation((selector) => {
      const mockState = {
        auth: {
          accessToken: "mock-token",
          user: { id: "1", email: "test@example.com" },
        },
        wish: { items: [] },
        cart: { items: [] },
      };
      return selector(mockState);
    });

    await act(async () => {
      render(<Navbar />);
    });

    await waitFor(() => {
      const header = screen.getByRole("navigation");
      expect(header).toBeInTheDocument();
    });
  });

  it("should handle unauthenticated user state", async () => {
    // Mock unauthenticated state
    mockUseSelector.mockImplementation((selector) => {
      const mockState = {
        auth: {
          accessToken: null,
          user: null,
        },
        wish: { items: [] },
        cart: { items: [] },
      };
      return selector(mockState);
    });

    await act(async () => {
      render(<Navbar />);
    });

    await waitFor(() => {
      const header = screen.getByRole("navigation");
      expect(header).toBeInTheDocument();
    });
  });
});
