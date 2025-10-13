import authReducer, {
  logout,
  setAccessToken,
  setError,
  setLoading,
  setUser,
} from "@/app/store/authSlice";

describe("AuthSlice", () => {
  const initialState = {
    accessToken: null,
    user: null,
    error: null,
    isLoading: false,
  };

  it("should return the initial state", () => {
    expect(authReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should set access token", () => {
    const state = authReducer(initialState, setAccessToken("123"));
    expect(state.accessToken).toEqual("123");
  });

  it("should set user", () => {
    const state = authReducer(
      initialState,
      setUser({ _id: "1", email: "test@test.com", role: "admin" })
    );
    expect(state.user).toEqual({
      _id: "1",
      email: "test@test.com",
      role: "admin",
    });
  });

  it("should set error", () => {
    const state = authReducer(initialState, setError("error"));
    expect(state.error).toEqual("error");
  });

  it("should set loading", () => {
    const state = authReducer(initialState, setLoading(true));
    expect(state.isLoading).toEqual(true);
  });

  it("should logout", () => {
    const state = authReducer(initialState, logout());
    expect(state.accessToken).toEqual(null);
    expect(state.user).toEqual(null);
    expect(state.error).toEqual(null);
    expect(state.isLoading).toEqual(false);
  });
});
