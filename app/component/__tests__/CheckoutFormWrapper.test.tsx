import CheckoutFormWrapper from "@/app/payment/CheckoutFormWrapper";
import { render, screen } from "@testing-library/react";
import { useSearchParams } from "next/navigation";

// Mock next/navigation to control search params
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

// Stub the heavy CheckoutForm to a simple component to assert wrapper rendering
jest.mock("@/app/pages/checkout/chekoutForm", () => ({
  __esModule: true,
  default: () => <div>Checkout Form</div>,
}));

describe("CheckoutFormWrapper", () => {
  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => {
        const map: Record<string, string> = {
          fname: "John",
          lname: "Doe",
          email: "john.doe@example.com",
          clientSecret: "cs_test_123",
          paymentIntentId: "pi_123",
        };
        return map[key] ?? "";
      },
    });
  });

  it("should render the checkout form wrapper", () => {
    render(<CheckoutFormWrapper />);
    const checkoutFormWrapper = screen.getByText("Checkout Form");
    expect(checkoutFormWrapper).toBeInTheDocument();
  });
});
