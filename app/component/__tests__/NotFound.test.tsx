import NotFound from "@/app/not-found";
import { render, screen } from "@testing-library/react";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe("NotFound", () => {
  it("should render the not found page", () => {
    render(<NotFound />);
    const notFound = screen.getByText(/Page Not Found/i);
    expect(notFound).toBeInTheDocument();
  });
});
