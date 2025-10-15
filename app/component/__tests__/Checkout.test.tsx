import CheckOut from "@/app/pages/checkout/page";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(), //mock useSelector hook
}));

// Mock Next.js Image component to avoid URL parsing issues
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { ...imgProps } = props;
    return <img {...imgProps} alt="image" />;
  },
}));

describe("Checkout", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });

    (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn());

    // Mock useSelector to return necessary Redux state
    (useSelector as unknown as jest.Mock).mockImplementation((selector) => {
      const mockState = {
        cart: { items: [] }, //mock cart state
      };
      return selector(mockState);
    });
  });

  test("should render the checkout page", () => {
    render(<CheckOut />); //arrange the test
    const checkoutHeading = screen.getByText(/checkout/i); //act the test
    expect(checkoutHeading).toBeInTheDocument(); //assert the test
  });

  test("should render billing details section", () => {
    render(<CheckOut />); //arrange the test
    const billingDetails = screen.getByText(/billing details/i); //act the test
    expect(billingDetails).toBeInTheDocument(); //assert the test
  });

  test("should render coupon section", () => {
    render(<CheckOut />); //arrange the test
    const couponSection = screen.getByText(/have a coupon/i); //act the test
    expect(couponSection).toBeInTheDocument(); //assert the test
  });
});
