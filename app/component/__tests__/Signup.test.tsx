import SignUpPage from "@/app/signup/page";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

//Mock next.js router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

//Mock redux dispatch
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("SignUpPage", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });

    (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn());
  });

  it("should render the signup form with full name, email and password", () => {
    render(<SignUpPage />); //arrange the test
    const fullName = screen.getByLabelText(/full name/i); //act the test
    const email = screen.getByLabelText(/email/i); //act the test
    const password = screen.getByLabelText(/password/i); //act the test
    expect(fullName).toBeInTheDocument(); //assert the test
    expect(email).toBeInTheDocument(); //assert the test
    expect(password).toBeInTheDocument(); //assert the test
  });
});
