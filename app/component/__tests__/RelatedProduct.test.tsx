import RelatedProduct from "@/app/product/relatedproducts";
import { render, screen } from "@testing-library/react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { unoptimized, ...imgProps } = props;
    return <img {...imgProps} />;
  },
}));

jest.mock("@/lib/axios", () => ({
  __esModule: true,
  default: {
    get: jest.fn(() => {
      return Promise.resolve({
        data: {
          data: [
            {
              productName: "Test Product",
              image: "test.jpg",
              price: "100",
              stock: 10,
              id: "1",
            },
            {
              productName: "Another Product",
              image: "test2.jpg",
              price: "New",
              stock: 5,
              id: "2",
            },
          ],
        },
      });
    }),
  },
}));

describe("RelatedProduct", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });
    (useParams as jest.Mock).mockReturnValue({
      id: "1",
    });
    (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn());
    (useSelector as unknown as jest.Mock).mockReturnValue({
      products: [],
    });
  });
  it("should render related product component", () => {
    render(<RelatedProduct />);
    const relatedProduct = screen.getByTestId("related-product");
    expect(relatedProduct).toBeInTheDocument();
  });
});
