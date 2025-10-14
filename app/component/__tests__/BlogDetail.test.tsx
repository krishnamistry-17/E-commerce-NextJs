"use client";
import BlogDetailClient from "@/app/pages/blogproduct/[id]/BlogDetailClient";
import { render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { act } from "react";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { unoptimized, ...imgProps } = props;
    return <img {...imgProps} />;
  },
}));

// Mock axios to return test data
jest.mock("@/lib/axios", () => ({
  __esModule: true,
  default: {
    get: jest.fn(() =>
      Promise.resolve({
        data: {
          id: 122,
          name: "Test Recipe",
          cuisine: "Italian",
          image: "test-image.jpg",
          ingredients: ["ingredient 1", "ingredient 2"],
          instructions: ["step 1", "step 2"],
          rating: 4.5,
          prepTimeMinutes: 10,
          cookTimeMinutes: 20,
          recipes: [],
        },
      })
    ),
  },
}));

describe("BlogDetail", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });
  });

  it("should render the blog detail client component", async () => {
    await act(async () => {
      render(<BlogDetailClient id="122" />);
    });
    await waitFor(() => {
      const recipesText = screen.getByText("Recipes");
      expect(recipesText).toBeInTheDocument();
    });
  });

  it("should render category and selected products sections", async () => {
    await act(async () => {
      render(<BlogDetailClient id="122" />);
    });
    await waitFor(() => {
      const categoryText = screen.getByText("Category");
      const selectedProductsText = screen.getByText("Selected products");
      expect(categoryText).toBeInTheDocument();
      expect(selectedProductsText).toBeInTheDocument();
    });
  });
});
