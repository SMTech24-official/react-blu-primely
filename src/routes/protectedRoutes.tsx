import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Loading from "../components/others/Loading";

type ProtectedRouteProps = {
  children: ReactNode;
  allowedRoles: "SUPER_ADMIN" | "USER";
};

type DecodedToken = {
  role: "SUPER_ADMIN" | "USER";
  exp: number;
};

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<"SUPER_ADMIN" | "USER" | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      setIsAuthorized(false);
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);

      if (decoded.exp * 1000 < Date.now()) {
        Cookies.remove("token");
        setIsAuthorized(false);
        return;
      }

      setUserRole(decoded.role);

      if (allowedRoles.includes(decoded.role)) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      console.error("Invalid token");
      setIsAuthorized(false);
    }
  }, [allowedRoles]);

  if (isAuthorized === null) {
    return <Loading />;
  }

  if (!isAuthorized) {
    // If not authorized but user is SUPER_ADMIN, redirect to dashboard
    if (userRole === "SUPER_ADMIN") {
      return <Navigate to="/dashboard" />;
    }
    return <Navigate to="/signin" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
