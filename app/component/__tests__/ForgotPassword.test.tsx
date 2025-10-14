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

// Mock axios
jest.mock("@/lib/axios", () => ({ 
  __esModule: true,
  default: {
    post: jest.fn(),
    get: jest.fn(),
    patch: jest.fn(),
  },
}));

describe("ForgotPassword", () => {
  const mockAxios = require("@/lib/axios").default;
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });

    (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn());

    // Mock successful API response
    mockAxios.post.mockResolvedValue({
      data: {
        message: "Password reset link sent to your email.",
      },
    });

    mockAxios.get.mockResolvedValue({
      data: {
        message: "Password reset link sent to your email.",
      },
    });

    mockAxios.patch.mockResolvedValue({
      data: {
        message: "Password reset link sent to your email.",
      },
    });
  });

  it("should render the forgot password form with email field", () => {
    render(<ForgotPassword />);
    const email = screen.getByLabelText(/email/i);
    expect(email).toBeInTheDocument();
  });
});
