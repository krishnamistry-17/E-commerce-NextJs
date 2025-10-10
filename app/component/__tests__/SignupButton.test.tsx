import { render, screen } from "@testing-library/react";
import SignupButton from "../SignupButton";

describe("SignupButton", () => {
  it("should render the button and be enabled when isSubmitting is false", () => {
    render(<SignupButton isSubmitting={false} />);
    const button = screen.getByRole("button", { name: "Sign Up" });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it("should render the button and be disabled when isSubmitting is true", () => {
    render(<SignupButton isSubmitting={true} />);
    const button = screen.getByRole("button", { name: "Signing Up..." });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
