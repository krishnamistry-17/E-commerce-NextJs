import Home from "@/app/page";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// Mock axios
jest.mock("@/lib/axios", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

// Mock the child components
jest.mock("@/app/pages/categories/page", () => {
  return function MockCategories() {
    return <div data-testid="categories">Categories</div>;
  };
});

jest.mock("@/app/pages/popularproduct/page", () => {
  return function MockPopularProduct() {
    return <div data-testid="popular-product">Popular Products</div>;
  };
});

jest.mock("@/app/pages/banner/page", () => {
  return function MockBanner() {
    return <div data-testid="banner">Banner</div>;
  };
});

describe("Home", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });

    (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn());

    (useSelector as unknown as jest.Mock).mockReturnValue({
      products: [],
    });
  });

  it("should render the home page with all components", () => {
    render(<Home />);

    // Check that the main container is rendered
    const container = screen.getByTestId("home-container");
    expect(container).toBeInTheDocument();

    // Check that child components are rendered
    expect(screen.getByTestId("categories")).toBeInTheDocument();
    expect(screen.getByTestId("popular-product")).toBeInTheDocument();
    expect(screen.getByTestId("banner")).toBeInTheDocument();
  });
});
