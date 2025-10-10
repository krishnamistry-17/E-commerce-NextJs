import ProductDetail from "@/app/product/[productId]/page";
import { render, screen } from "@testing-library/react";
import { useRouter, useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(), //mock useParams hook
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(), //mock usedispatch hook
  useSelector: jest.fn(), //mock useselector hook
}));

// Mock Next.js Image component to avoid URL parsing issues
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    const { unoptimized, ...imgProps } = props;
    return <img {...imgProps} />;
  },
}));

describe("ProductDetail", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });

    // Mock useParams to return a productId
    (useParams as jest.Mock).mockReturnValue({
      productId: "123", //mock productId parameter
    });

    (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn());

    // Mock useSelector to return necessary Redux state //mock useselector hook
    (useSelector as unknown as jest.Mock).mockImplementation((selector) => {
      const mockState = {
        cart: { items: [] }, //mock cart state
      };
      return selector(mockState);
    });
  });

  it("should render the product detail component with loading state", () => {
    render(<ProductDetail />); //arrange the test
    const loadingText = screen.getByText(/loading product details/i); //act the test
    expect(loadingText).toBeInTheDocument(); //assert the test
  });
});
