import wishListReducer, {
  addToWishList,
  removeFromWishList,
  clearWishList,
  WishItem,
} from "@/app/pages/slice/wishListSlice";

describe("WishListSlice", () => {
  const initialState = {
    items: [],
  };

  const mockWishItem: WishItem = {
    id: "1",
    title: "Test Product",
    newPrice: 29.99,
    quantity: 1,
    image: {} as any,
  };

  it("should return the initial state", () => {
    expect(wishListReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should add a new item to wishlist", () => {
    const state = wishListReducer(initialState, addToWishList(mockWishItem));
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual(mockWishItem);
  });

  it("should increase quantity if item already exists in wishlist", () => {
    const stateWithItem = {
      items: [mockWishItem],
    };
    const state = wishListReducer(
      stateWithItem,
      addToWishList({ ...mockWishItem, quantity: 2 })
    );
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(3);
  });

  it("should remove an item from wishlist", () => {
    const stateWithItem = {
      items: [mockWishItem],
    };
    const state = wishListReducer(stateWithItem, removeFromWishList("1"));
    expect(state.items).toHaveLength(0);
  });

  it("should clear all items from wishlist", () => {
    const stateWithItems = {
      items: [mockWishItem, { ...mockWishItem, id: "2" }],
    };
    const state = wishListReducer(stateWithItems, clearWishList());
    expect(state.items).toHaveLength(0);
  });
});
