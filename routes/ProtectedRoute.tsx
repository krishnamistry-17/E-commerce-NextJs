import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const isAuthenticated = localStorage.getItem("access");

  return isAuthenticated ? <>{children}</> : router.push("/signin");
};

export default ProtectedRoute;
