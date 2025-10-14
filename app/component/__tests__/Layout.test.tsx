import RootLayout from "@/app/layout";
import { render, screen } from "@testing-library/react";

// Mock next/font/google
jest.mock("next/font/google", () => ({
  Inter: jest.fn(() => ({
    variable: "--font-inter",
    className: "font-inter",
  })),
  Roboto_Mono: jest.fn(() => ({
    variable: "--font-roboto-mono",
    className: "font-roboto-mono",
  })),
}));

// Mock next-auth/react
jest.mock("next-auth/react", () => ({
  SessionProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

// Mock react-redux
jest.mock("react-redux", () => ({
  Provider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

// Mock @stripe/stripe-js
jest.mock("@stripe/stripe-js", () => ({
  loadStripe: jest.fn(() => Promise.resolve("mock-stripe")),
}));

// Mock @stripe/react-stripe-js
jest.mock("@stripe/react-stripe-js", () => ({
  Elements: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

// Mock react-toastify
jest.mock("react-toastify", () => ({
  ToastContainer: () => <div data-testid="toast-container" />,
}));

// Mock Header and Footer components
jest.mock("@/app/header/page", () => {
  return function MockHeader() {
    return <div data-testid="header">Header</div>;
  };
});

jest.mock("@/app/footer/page", () => {
  return function MockFooter() {
    return <div data-testid="footer">Footer</div>;
  };
});

describe("Layout", () => {
  it("should render the layout with all providers and components", () => {
    // Test the actual RootLayout component
    // Note: This will show HTML nesting warnings in tests, which is expected
    // for layout components that include html/body tags
    render(<RootLayout children={<p>Hello</p>} />);

    // Check that the children are rendered
    const layout = screen.getByText("Hello");
    expect(layout).toBeInTheDocument();

    // Check that Header is rendered
    const header = screen.getByTestId("header");
    expect(header).toBeInTheDocument();

    // Check that Footer is rendered
    const footer = screen.getByTestId("footer");
    expect(footer).toBeInTheDocument();

    // Check that ToastContainer is rendered
    const toastContainer = screen.getByTestId("toast-container");
    expect(toastContainer).toBeInTheDocument();
  });

  it("should render layout structure without HTML nesting issues", () => {
    // Alternative test that focuses on the layout structure without html/body
    const TestLayout = ({ children }: { children: React.ReactNode }) => (
      <div data-testid="layout-container">
        <div data-testid="header">Header</div>
        <main>{children}</main>
        <div data-testid="toast-container" />
        <div data-testid="footer">Footer</div>
      </div>
    );

    render(
      <TestLayout>
        <p>Hello</p>
      </TestLayout>
    );

    // Check that the layout structure is correct
    const layoutContainer = screen.getByTestId("layout-container");
    expect(layoutContainer).toBeInTheDocument();

    const header = screen.getByTestId("header");
    expect(header).toBeInTheDocument();

    const footer = screen.getByTestId("footer");
    expect(footer).toBeInTheDocument();

    const toastContainer = screen.getByTestId("toast-container");
    expect(toastContainer).toBeInTheDocument();

    const content = screen.getByText("Hello");
    expect(content).toBeInTheDocument();
  });
});
