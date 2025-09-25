//app/ components/RehydrateAuth.tsx
"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAccessToken, setUser } from "@/app/store/authSlice";

const RehydrateAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const user = localStorage.getItem("user");

    if (token) {
      dispatch(setAccessToken(token));
    }

    if (user) {
      try {
        dispatch(setUser(JSON.parse(user)));
      } catch (err) {
        console.error("Invalid user in localStorage:", err);
      }
    }
  }, []);

  return null;
};

export default RehydrateAuth;
