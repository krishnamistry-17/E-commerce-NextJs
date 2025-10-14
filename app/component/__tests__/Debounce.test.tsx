import { useDebounce } from "@/app/hooks/useDebounce";
import { act, renderHook } from "@testing-library/react";

describe("Debounce", () => {
  it("should return the debounced value", () => {
    const { result } = renderHook(() => useDebounce("test", 1000));
    expect(result.current).toBe("test");

    act(() => {
      result.current = "test2";

      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(result.current).toBe("test2");
    });
  });
});
