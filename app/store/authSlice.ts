import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Async thunk for login
export const login = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ email, password }, thunkAPI) => {
  try {
    const res = await fetch(
      `http://localhost:4000/users?email=${encodeURIComponent(email)}`
    );
    if (!res.ok) return thunkAPI.rejectWithValue("Network error");
    const users = await res.json();

    if (users.length === 0) return thunkAPI.rejectWithValue("User not found");

    const user = users[0];
    if (user.password !== password)
      return thunkAPI.rejectWithValue("Invalid password");

    // Remove password before returning user data
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to login");
  }
});

const storedUser =
  typeof window !== "undefined" ? localStorage.getItem("auth_user") : null;
const parsedUser = storedUser ? (JSON.parse(storedUser) as User) : null;

const initialState: AuthState = {
  user: parsedUser,
  isAuthenticated: parsedUser !== null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("auth_user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem("auth_user", JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to login";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
