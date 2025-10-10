import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import CartPage from "@/app/pages/cart/page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(), //mock usedispatch hook
  useSelector: jest.fn(), //mock useselector hook
}));

describe("CartPage", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });

    (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn());

    // Mock useSelector to return necessary Redux state //mock useselector hook
    (useSelector as unknown as jest.Mock).mockImplementation((selector) => {
      const mockState = {
        auth: { accessToken: "mock-token" }, //mock auth state
        cart: { items: [] }, //mock cart state
      };
      return selector(mockState);
    });
  });

  it("should render the cart component", () => {
    render(<CartPage />); //arrange the test
    const cartHeading = screen.getByRole("heading", { name: /cart/i }); //act the test
    expect(cartHeading).toBeInTheDocument(); //assert the test
  });
});
