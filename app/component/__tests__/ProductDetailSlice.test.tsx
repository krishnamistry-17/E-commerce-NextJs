import ProductDetailReducer, {
  ProductDetails,
  showDetails,
} from "@/app/pages/slice/productDetailSlice";

const mockProductDetail: ProductDetails = {
  id: "1",
  productName: "Test product",
  price: "100",
  image: "test.jpg",
  stock: 10,
};

const mockProductDetail2: ProductDetails = {
  id: "2",
  productName: "Another product",
  price: "200",
  image: "test2.jpg",
  stock: 20,
};

describe("ProductDetailSlice", () => {
  const initialState = {
    items: [],
  };

  it("should return the initial state", () => {
    expect(ProductDetailReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should add a new product detail to the state", () => {
    const state = ProductDetailReducer(
      initialState,
      showDetails(mockProductDetail)
    );
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual(mockProductDetail);
  });

  it("should not add duplicate product if it already exists", () => {
    const stateWithItem = {
      items: [mockProductDetail],
    };
    const state = ProductDetailReducer(
      stateWithItem,
      showDetails(mockProductDetail)
    );
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual(mockProductDetail);
  });

  it("should add multiple different products to the state", () => {
    const stateWithOneItem = {
      items: [mockProductDetail],
    };
    const state = ProductDetailReducer(
      stateWithOneItem,
      showDetails(mockProductDetail2)
    );
    expect(state.items).toHaveLength(2);
    expect(state.items[0]).toEqual(mockProductDetail);
    expect(state.items[1]).toEqual(mockProductDetail2);
  });
});
