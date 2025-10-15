import PopularProduct from "@/app/pages/popularproduct/page";
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

jest.mock("@/lib/axios", () => {
  return {
    __esModule: true,
    default: {
      get: jest.fn(() => {
        Promise.resolve({
          data: {
            productName: "Test Product",
            image: "Test image",
            price: "100",
            stock: 10,
            id: "1",
          },
        });
      }),
      post: jest.fn(() => {
        Promise.resolve({
          data: {
            success: true,
          },
        });
      }),
    },
  };
});

describe("PopularProduct", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });
    (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn());
    (useSelector as unknown as jest.Mock).mockReturnValue({
      products: [],
    });
  });
  it("should render the popular product component", () => {
    render(<PopularProduct />);
    const popularProduct = screen.getByTestId("popular-product");
    expect(popularProduct).toBeInTheDocument();
  });
});
