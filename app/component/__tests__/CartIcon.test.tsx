import CartIcon from "@/app/pages/carticon/page";
import { render, screen, waitFor, act } from "@testing-library/react";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock react-redux
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

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

// Mock SVG import
jest.mock("@/public/svgs/cart.svg", () => ({
  __esModule: true,
  default: "test-cart-icon.svg",
}));

// Mock axios
jest.mock("@/lib/axios", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

// Mock API routes
jest.mock("@/app/api/apiRoutes", () => ({
  apiRoutes: {
    GET_CART: "/api/cart",
  },
}));

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

describe("CartIcon", () => {
  const mockAxios = require("@/lib/axios").default;

  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue("mock-access-token");
  });

  it("should render the cart icon", async () => {
    // Mock successful cart fetch
    mockAxios.get.mockResolvedValue({
      data: {
        cart: {
          cartItems: [],
        },
      },
    });

    await act(async () => {
      render(<CartIcon />);
    });

    await waitFor(() => {
      const cartIcon = screen.getByRole("img", { name: "cart" });
      expect(cartIcon).toBeInTheDocument();
    });
  });

  it("should render the cart count when items are present", async () => {
    // Mock cart with items
    mockAxios.get.mockResolvedValue({
      data: {
        cart: {
          cartItems: [{ quantity: 2 }, { quantity: 3 }],
        },
      },
    });

    await act(async () => {
      render(<CartIcon />);
    });

    await waitFor(() => {
      const cartCount = screen.getByText("5");
      expect(cartCount).toBeInTheDocument();
    });
  });

  it("should not show cart count when no items", async () => {
    // Mock empty cart
    mockAxios.get.mockResolvedValue({
      data: {
        cart: {
          cartItems: [],
        },
      },
    });

    await act(async () => {
      render(<CartIcon />);
    });

    await waitFor(() => {
      const cartCount = screen.queryByText("0");
      expect(cartCount).not.toBeInTheDocument();
    });
  });

  it("should handle no access token", async () => {
    mockLocalStorage.getItem.mockReturnValue(null);

    await act(async () => {
      render(<CartIcon />);
    });

    await waitFor(() => {
      const cartIcon = screen.getByRole("img", { name: "cart" });
      expect(cartIcon).toBeInTheDocument();
    });

    // Should not show cart count when no token
    const cartCount = screen.queryByText("0");
    expect(cartCount).not.toBeInTheDocument();
  });

  it("should handle cart fetch error", async () => {
    // Mock API error
    mockAxios.get.mockRejectedValue(new Error("API Error"));

    await act(async () => {
      render(<CartIcon />);
    });

    await waitFor(() => {
      const cartIcon = screen.getByRole("img", { name: "cart" });
      expect(cartIcon).toBeInTheDocument();
    });

    // Should not show cart count on error
    const cartCount = screen.queryByText("0");
    expect(cartCount).not.toBeInTheDocument();
  });

  it("should listen for cart update events", async () => {
    mockAxios.get.mockResolvedValue({
      data: {
        cart: {
          cartItems: [],
        },
      },
    });

    await act(async () => {
      render(<CartIcon />);
    });

    // Simulate cart update event
    const cartUpdateEvent = new Event("cartUpdated");
    window.dispatchEvent(cartUpdateEvent);

    // Should call the API again
    await waitFor(() => {
      expect(mockAxios.get).toHaveBeenCalledTimes(2);
    });
  });
});
