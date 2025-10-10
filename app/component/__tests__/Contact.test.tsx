import ContactForm from "@/app/pages/contact/contactform";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
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

describe("ContactForm", () => {
  beforeEach(() => {
    // Setup mocks before each test
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });

    (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn());
  });

  it("should render the contact form component with all fields", () => {
    render(<ContactForm />); //arrange the test
    const firstName = screen.getByPlaceholderText(/first name/i); //act the test
    const email = screen.getByPlaceholderText(/your email/i); //act the test
    const phone = screen.getByPlaceholderText(/your phone/i); //act the test
    const message = screen.getByPlaceholderText(/enter query/i); //act the test
    expect(firstName).toBeInTheDocument(); //assert the test
    expect(email).toBeInTheDocument(); //assert the test
    expect(phone).toBeInTheDocument(); //assert the test
    expect(message).toBeInTheDocument(); //assert the test
  });
});
