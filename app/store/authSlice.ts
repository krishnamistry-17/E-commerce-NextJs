// store/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Try to load user from localStorage
const loadUserFromLocalStorage = (): User | null => {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("auth_user");
    return userData ? JSON.parse(userData) : null;
  }
  return null;
};

const initialState: AuthState = {
  user: loadUserFromLocalStorage(),
  isAuthenticated: !!loadUserFromLocalStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      state.user = user;
      state.isAuthenticated = true;
      localStorage.setItem("auth_user", JSON.stringify(user));
    },
    login: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      const storedUser =
        typeof window !== "undefined"
          ? localStorage.getItem("auth_user")
          : null;

      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (
          user.email === action.payload.email &&
          user.password === action.payload.password
        ) {
          state.user = user;
          state.isAuthenticated = true;
        } else {
          console.warn("Invalid credentials");
        }
      } else {
        console.warn("No user found in storage");
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("auth_user");
    },
  },
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;
