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
    return <Loading />; // or just: return <div>Loading...</div>;
  }

  if (!isAuthorized) {
    return <Navigate to="/signin" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
