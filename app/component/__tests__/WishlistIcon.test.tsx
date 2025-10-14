import WishListIcon from "@/app/pages/wishlisticon/page";
import { render, screen, waitFor, act } from "@testing-library/react";
import { useSelector } from "react-redux";

// Mock next/link
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

// Mock react-redux
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

// Mock store types
jest.mock("@/app/store/store", () => ({
  RootState: {},
}));

describe("WishlistIcon", () => {
  const mockUseSelector = useSelector as jest.MockedFunction<
    typeof useSelector
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the wishlist icon with no items", async () => {
    // Mock empty wishlist
    mockUseSelector.mockReturnValue([]);

    await act(async () => {
      render(<WishListIcon />);
    });

    // Should render the link but no count badge
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/pages/wishlist");

    // Should not show count when no items
    const countBadge = screen.queryByText("0");
    expect(countBadge).not.toBeInTheDocument();
  });

  it("should render the wishlist icon with items", async () => {
    // Mock wishlist with items
    const mockWishItems = [
      { id: "1", quantity: 2 },
      { id: "2", quantity: 3 },
    ];
    mockUseSelector.mockReturnValue(mockWishItems);

    await act(async () => {
      render(<WishListIcon />);
    });

    // Should render the link
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/pages/wishlist");

    // Should show count badge with total quantity (2 + 3 = 5)
    await waitFor(() => {
      const countBadge = screen.getByText("5");
      expect(countBadge).toBeInTheDocument();
    });
  });

  it("should render the wishlist icon with single item", async () => {
    // Mock wishlist with single item
    const mockWishItems = [{ id: "1", quantity: 1 }];
    mockUseSelector.mockReturnValue(mockWishItems);

    await act(async () => {
      render(<WishListIcon />);
    });

    // Should show count badge with quantity 1
    await waitFor(() => {
      const countBadge = screen.getByText("1");
      expect(countBadge).toBeInTheDocument();
    });
  });

  it("should handle undefined wishlist state", async () => {
    // Mock undefined state (edge case)
    mockUseSelector.mockReturnValue(undefined as any);

    await act(async () => {
      render(<WishListIcon />);
    });

    // Should render the link but no count badge
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/pages/wishlist");

    // Should not show count when state is undefined
    const countBadge = screen.queryByText("0");
    expect(countBadge).not.toBeInTheDocument();
  });
});
