import { render, screen } from "@testing-library/react";
import SignInWithEmail from "../SignInWithEmail";

describe("SignInWithEmail", () => {
  it("should render the siginin with email form with email input field", () => {
    render(<SignInWithEmail />);
    const emailInput = screen.getByTestId("email-input");
    expect(emailInput).toBeInTheDocument();
  });
});
