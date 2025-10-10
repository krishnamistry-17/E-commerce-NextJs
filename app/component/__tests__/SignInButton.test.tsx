import { render } from "@testing-library/react";
import SignInButton from "../SignInButton";
import { screen } from "@testing-library/react";

describe("SignInButton", () => {
  it("should render the button and be enabled when isSubmitting is false", () => {
    render(<SignInButton isSubmitting={false} />); //arrange the test
    const button = screen.getByRole("button", { name: "Sign In" }); //act the test
    expect(button).toBeInTheDocument(); //assert the test
    expect(button).not.toBeDisabled(); //assert the test
  });

  it("should render the button and be disabled when isSubmitting is true", () => {
    render(<SignInButton isSubmitting={true} />); //arrange the test
    const button = screen.getByRole("button", { name: "Signing In..." }); //act the test
    expect(button).toBeInTheDocument(); //assert the test
    expect(button).toBeDisabled();
  });
});
