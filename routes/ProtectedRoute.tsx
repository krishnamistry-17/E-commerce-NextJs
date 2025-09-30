import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem("access");

  return isAuthenticated ? <>{children}</> : <Navigate to="/?login=true" />;
};

export default ProtectedRoute;
