import AboutUs from "@/app/pages/aboutus/page";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock Next.js Image component to avoid URL parsing issues
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    const { unoptimized, ...imgProps } = props;
    return <img {...imgProps} />;
  },
}));

describe("AboutUs", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });
  });
  it("should render the about us componnet", () => {
    render(<AboutUs />);
    const aboutUsText = screen.getByText("About Us");
    expect(aboutUsText).toBeInTheDocument();
  });
});
