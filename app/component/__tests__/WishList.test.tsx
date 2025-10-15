import WhishList from "@/app/pages/wishlist/page";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { ...imgProps } = props;
    return <img {...imgProps} alt="image" />;
  },
}));

jest.mock("@/lib/axios", () => ({
  __esModule: true,
  default: {
    get: jest.fn(() => Promise.resolve({ data: { favourites: [] } })),
  },
}));

describe("WishList", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });

    (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn());
    (useSelector as unknown as jest.Mock).mockImplementation((selector) => {
      const mockState = {
        auth: { accessToken: "mock-token" },
        wish: { items: [] },
      };
      return selector(mockState);
    });
  });
  it("should render the wishlist page", () => {
    render(<WhishList />);
    const wishListHeading = screen.getByText("Shopping WishList");
    expect(wishListHeading).toBeInTheDocument();
  });
});
