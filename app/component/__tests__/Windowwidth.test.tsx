import useWindowWidth from "@/app/hooks/useWindowWidth";
import { act, renderHook } from "@testing-library/react";

describe("Windowwidth", () => {
  it("should return the window width", () => {
    const { result } = renderHook(() => useWindowWidth());

    // The hook should initialize with the current window width (not 0)
    expect(result.current).toBe(window.innerWidth);

    act(() => {
      window.innerWidth = 1000;
      window.dispatchEvent(new Event("resize"));
    });
    expect(result.current).toBe(1000);
  });
});
