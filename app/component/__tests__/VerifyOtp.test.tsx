import Verifyotp from "@/app/pages/verify-otp/verify-otp";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("VerifyOtp", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });

    (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn());
  });

  it("should render the verify otp form with email and otp fields", () => {
    render(<Verifyotp />);
    const email = screen.getByLabelText(/email/i);
    const otp = screen.getByLabelText(/otp/i);
    expect(email).toBeInTheDocument();
    expect(otp).toBeInTheDocument();
  });
});
