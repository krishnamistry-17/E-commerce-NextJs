import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name?: string;
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  error: string | null;
}

const savedUser = localStorage.getItem("user");
const initialState: AuthState = {
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<{ email: string; password: string }>) {
      const { email, password } = action.payload;
      const storedUser = localStorage.getItem("user");
      console.log("storedUser :", storedUser);

      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.email === email && user.password === password) {
          state.user = user;
          state.error = null;
          // localStorage.setItem("user", JSON.stringify(user));
        } else {
          state.error = "Invalid email or password";
          state.user = null;
        }
      } else {
        state.error = "No registered user found. Please sign up first.";
        state.user = null;
      }
    },

    signUp(state, action: PayloadAction<User>) {
      const newUser = action.payload;
      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(newUser));
      state.user = newUser;
      state.error = null;
    },

    logout(state) {
      localStorage.removeItem("user");
      state.user = null;
      state.error = null;
    },

    clearError(state) {
      state.error = null;
    },
  },
});

export const { signIn, signUp, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
