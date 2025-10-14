//covrage report-->command---> open coverage/lcov-report/index.html

{
  /*
  
  -signin page(email,password)
-signup page(fullName,email,password)
-signin button
-signup button
-apiroutes
-cart page
-contact page
-checkout page
-product detail page
-orderservice
--mock image,mock api, mock data-dispacth,useselctor
--utils/cartHelpers.ts

///test next
-utils
-redux slicee all-authslice,
userprofile,wishlist,blog,blogdetail,aboutus
-api routes

//now next

app/page.tsx - Home page component
app/layout.tsx - Root layout with providers
app/not-found.tsx - 404 error page
app/error/page.tsx - Error boundary page

2. Core Components (Missing Tests)
app/component/RehydrateAuth.tsx - Authentication rehydration
app/component/PaymentClient.tsx - Payment processing component
app/component/SignInWithEmail.tsx - Email sign-in component

3. Utility Functions (Missing Tests)
utils/cartHelpers.ts - Cart management functions (handleCart, clearCartAfterPayment)
hooks/useDebounce.ts - Debounce hook
hooks/useHydrateUser.ts - User hydration hook
hooks/useWindowWidth.ts - Window width hook
  */
}

import Signin from "@/app/signin/page";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock Redux dispatch
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("Signin", () => {
  beforeEach(() => {
    // Setup mocks before each test
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });

    (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn());
  });

  it("should render the signin form with email and password fields", () => {
    render(<Signin />); //arrange the test
    const email = screen.getByLabelText(/email/i); //act the test
    const password = screen.getByLabelText(/password/i); //act the test
    expect(email).toBeInTheDocument(); //assert the test
    expect(password).toBeInTheDocument(); //assert the test
  });
});
