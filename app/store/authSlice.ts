import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
  user: { _id: string; email: string; role: string } | null;
  error: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
  error: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setUser: (
      state,
      action: PayloadAction<{ _id: string; email: string; role: string }>
    ) => {
      state.user = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      state.error = null;
      state.isLoading = false;
    },
  },
});

export const { setAccessToken, setUser, setError, setLoading, logout } =
  authSlice.actions;

export default authSlice.reducer;
