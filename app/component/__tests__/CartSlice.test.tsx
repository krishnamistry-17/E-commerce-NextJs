import cartReducer, {
  addToCart,
  clearCart,
  removeFromCart,
} from "@/app/pages/slice/cartSlice";

describe("CartSlice", () => {
  const initialState = {
    items: [],
    clickedCartIds: [],
    setClickedCartIds: [],
  };

  const mockCartItem = {
    id: "1",
    productName: "Test Product",
    price: "100",
    quantity: 1,
    image: "test.jpg",
    stock: 10,
  };

  it("should return the initial state", () => {
    expect(cartReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should add a new item to cart", () => {
    const state = cartReducer(initialState, addToCart(mockCartItem));
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual(mockCartItem);
  });

  it("should increase quantity if item already exists in cart", () => {
    const stateWithItem = {
      items: [mockCartItem],
      clickedCartIds: [],
      setClickedCartIds: [],
    };
    const state = cartReducer(stateWithItem, addToCart(mockCartItem));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it("should remove an item from cart", () => {
    const stateWithItem = {
      items: [mockCartItem],
      clickedCartIds: [],
      setClickedCartIds: [],
    };
    const state = cartReducer(stateWithItem, removeFromCart(mockCartItem.id));
    expect(state.items).toHaveLength(0);
  });

  it("should clear all items from cart", () => {
    const stateWithItems = {
      items: [mockCartItem, { ...mockCartItem, id: "2" }],
      clickedCartIds: [],
      setClickedCartIds: [],
    };
    const state = cartReducer(stateWithItems, clearCart());
    expect(state.items).toHaveLength(0);
  });
});
