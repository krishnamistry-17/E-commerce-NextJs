import Thankyou from "@/app/pages/thankyou/page";
import { render, screen, waitFor, act } from "@testing-library/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { ...imgProps } = props;
    return <img {...imgProps} alt="image" />;
  },
}));

// Mock Next.js Link component
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// Mock axios
jest.mock("@/lib/axios", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

describe("ThankYou", () => {
  const mockAxios = require("@/lib/axios").default;

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });

    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue("123456"),
    });

    (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn());
    (useSelector as unknown as jest.Mock).mockImplementation((selector) => {
      const mockState = {
        order: { order: { orderNumber: "123456", total: 100.0 } },
      };
      return selector(mockState);
    });

    // Mock successful API response
    mockAxios.get.mockResolvedValue({
      data: {
        order: {
          orderNumber: "123456",
          total: 100.0,
          status: "completed",
          items: [],
        },
      },
    });
  });

  it("should render the thankyou page", async () => {
    await act(async () => {
      render(<Thankyou />);
    });

    await waitFor(() => {
      const thankyouHeading = screen.getByText("Thank You!");
      expect(thankyouHeading).toBeInTheDocument();
    });
  });

  it("should display order confirmation message", async () => {
    await act(async () => {
      render(<Thankyou />);
    });

    await waitFor(() => {
      const confirmationText = screen.getByText(
        "Your order has been successfully placed. We appreciate your business and will send you a confirmation email shortly."
      );
      expect(confirmationText).toBeInTheDocument();
    });
  });

  it("should render continue shopping button", async () => {
    await act(async () => {
      render(<Thankyou />);
    });

    await waitFor(() => {
      const continueButton = screen.getByText("Continue Shopping");
      expect(continueButton).toBeInTheDocument();
    });
  });
});
