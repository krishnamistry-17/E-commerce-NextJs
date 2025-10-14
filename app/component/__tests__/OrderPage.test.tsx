import OrderPage from "@/app/pages/orders/page";
import { render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { act } from "react";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock react-toastify
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { unoptimized, ...imgProps } = props;
    return <img {...imgProps} />;
  },
}));

jest.mock("@/lib/axios", () => {
  return {
    __esModule: true,
    default: {
      get: jest.fn(() =>
        Promise.resolve({
          data: {
            id: "1",
            _id: "1",
            status: "pending",
            date: "2021-01-01",
            address: "123 Main St",
            subtotal: 100,
            Products: [
              {
                quantity: 1,
                price: 726,
              },
            ],
          },
        })
      ),
    },
  };
});

describe("OrderPage", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });
  });

  it("should render the order page", async () => {
    await act(async () => {
      render(<OrderPage />);
    });

    // Use a more specific selector to avoid multiple elements
    const heading = screen.getByRole("heading", { name: "My Orders" });
    expect(heading).toBeInTheDocument();
  });
});
