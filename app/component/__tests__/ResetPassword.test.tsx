import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import ResetPasswordForm from "@/app/reset-password/page";


jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
  }));
  
  jest.mock("react-redux", () => ({
    useDispatch: jest.fn(),
  }));

  describe("ResetPassword", () => {
    beforeEach(() => {
      (useRouter as jest.Mock).mockReturnValue({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
      });
    });

    (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn());

    it("should render the reset password form with email and password fields", () => {
      render(<ResetPasswordForm />);
      const email = screen.getByLabelText(/email/i);
      const password = screen.getByLabelText(/password/i);
      expect(email).toBeInTheDocument();
      expect(password).toBeInTheDocument();
    });
  });