import { createSlice } from "@reduxjs/toolkit";

export interface BlogDetails {
  id: number;
  name: string;
  ingredients: string;
  instructions: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  difficulty: string;
  cuisine: string;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string;
}

interface BlogDetailsState {
  item: BlogDetails[] | null;
}

const initialState: BlogDetailsState = {
  item: null,
};

const blogDetailSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductDetails: (state, action) => {
      state.item = action.payload;
    },
  },
});

export const { setProductDetails } = blogDetailSlice.actions;

export default blogDetailSlice.reducer;
