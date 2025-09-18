// hooks/useHydrateUser.ts
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "@/app/store/authSlice";

export const useHydrateUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        // Fake sign-in to update redux state
        dispatch(
          signIn({ email: parsedUser.email, password: parsedUser.password })
        );
      }
    }
  }, []);
};
