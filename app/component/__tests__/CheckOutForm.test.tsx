import CheckoutForm from "@/app/pages/checkout/chekoutForm";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@stripe/react-stripe-js", () => ({
  useStripe: jest.fn(),
  useElements: jest.fn(),
  CardNumberElement: jest.fn(),
  CardExpiryElement: jest.fn(),
  CardCvcElement: jest.fn(),
}));

jest.mock("@/lib/axios", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
  },
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("CheckOutForm", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });
  });

  (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn());

  (useSelector as unknown as jest.Mock).mockImplementation((selector) => {
    const mockState = {
      cart: { items: [] },
    };
    return selector(mockState);
  });
  it("should render the checkout form", () => {
    render(
      <CheckoutForm
        customerName="John Doe"
        customerEmail="john.doe@example.com"
        clientSecret="cs_test_123"
      />
    );
    expect(screen.getByText(/Choose a currency:/i)).toBeInTheDocument();
    expect(screen.getByText(/Payment method/i)).toBeInTheDocument();
  });
  it("should render payment UI when clientSecret is provided", () => {
    render(
      <CheckoutForm
        customerName="John Doe"
        customerEmail="john.doe@example.com"
        clientSecret="cs_test_123"
      />
    );
    expect(screen.getByText(/Choose a currency:/i)).toBeInTheDocument();
    expect(screen.getByText(/Payment method/i)).toBeInTheDocument();
  });
});
