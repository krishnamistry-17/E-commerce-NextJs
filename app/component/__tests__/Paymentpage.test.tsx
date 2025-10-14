import PaymentPage from "@/app/payment/page";
import { render, screen } from "@testing-library/react";

// Stub CheckoutFormWrapper to avoid next/navigation dependency in this unit test
jest.mock("@/app/payment/CheckoutFormWrapper", () => ({
  __esModule: true,
  default: () => <div>Payment Page</div>,
}));

describe("PaymentPage", () => {
  it("should render the payment page", () => {
    render(<PaymentPage />);
    const paymentPage = screen.getByText("Payment Page");
    expect(paymentPage).toBeInTheDocument();
  });
});
