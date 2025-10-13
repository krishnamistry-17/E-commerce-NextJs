import UserProfile from "@/app/user-profile/[[...user=profile]]/page";
import { render, screen } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("UserProfile", () => {
  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn());
    (useSelector as unknown as jest.Mock).mockReturnValue({
      user: {
        email: "test@example.com",
      },
    });
  });

  it("should render the user profile componennt", () => {
    render(<UserProfile />);
    const userProfileHeading = screen.getByRole("heading", {
      name: "User Profile",
    });
    expect(userProfileHeading).toBeInTheDocument();
  });
});
