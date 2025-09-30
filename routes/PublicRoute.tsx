import React, { ReactNode } from "react";
// import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  // const isAuthenticated = localStorage.getItem("authToken");

  return <>{children}</>;
};

export default PublicRoute;
