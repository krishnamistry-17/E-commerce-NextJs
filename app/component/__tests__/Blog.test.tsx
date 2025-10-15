import Blog from "@/app/pages/blog/page";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { ...imgProps } = props;
    return <img {...imgProps} />;
  },
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("Blog", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });

    (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn());
  });
  it("should render the blog page", () => {
    render(<Blog />);
    const blogTexts = screen.getAllByText("Blog & News");
    expect(blogTexts.length).toBeGreaterThan(0);
    expect(blogTexts[0]).toBeInTheDocument();
  });
});
