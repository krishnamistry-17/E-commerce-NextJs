import Footer from "@/app/footer/page";
import { render, screen, waitFor, act } from "@testing-library/react";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { ...imgProps } = props;
    return <img {...imgProps} alt="image" />;
  },
}));

// Mock next/link
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

describe("Footer", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });
  });

  it("should render the footer component", async () => {
    await act(async () => {
      render(<Footer />);
    });

    await waitFor(() => {
      // Check for footer content by looking for specific text
      const footerText = screen.getByText(
        "Awesome grocery store website template"
      );
      expect(footerText).toBeInTheDocument();
    });
  });

  it("should render footer links", async () => {
    await act(async () => {
      render(<Footer />);
    });

    await waitFor(() => {
      // Check for common footer links
      const links = screen.getAllByRole("link");
      expect(links.length).toBeGreaterThan(0);
    });
  });

  it("should render footer content", async () => {
    await act(async () => {
      render(<Footer />);
    });

    await waitFor(() => {
      // Check for footer content by looking for specific elements
      // Use a partial text match to handle the split text
      const copyrightText = screen.getByText(
        /© 2022, Nest - HTML Ecommerce Template/
      );
      expect(copyrightText).toBeInTheDocument();
    });
  });
});
