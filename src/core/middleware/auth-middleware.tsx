import React, { useEffect, PropsWithChildren } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { isTokenValid } from "../authentificate";

export default function AuthMiddleware({ children }: PropsWithChildren<{}>) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname != "/privacy-policy") {
      const inLoginPage = location.pathname === "/auth";
      const isAuthenticated = isTokenValid();
      if (!isAuthenticated) {
        navigate("/auth");
      }
      if (isAuthenticated && inLoginPage) {
        navigate("/dashboard/admin");
      }
    }
  }, [location.pathname, navigate]);

  return <>{children}</>;
}
