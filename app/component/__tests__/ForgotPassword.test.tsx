import ForgotPassword from "@/app/forgot-password/page";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("ForgotPassword", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });

    (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn());
  });

  it("should render the forgot password form with email field", () => {
    render(<ForgotPassword />);
    const email = screen.getByLabelText(/email/i);
    expect(email).toBeInTheDocument();
  });
});
