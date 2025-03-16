import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { logout, setUser } from "../redux/slice/auth/authSlice";
import { useGetUserByIdQuery } from "../redux/apis/auth/userApi";
import { useNavigate } from "react-router-dom";

interface DecodedToken {
  id: string; // Ensure this matches your JWT payload
  exp: number;
}

const useAuthUser = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("token");
    console.log(token);
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);

        // Check if the token is expired
        if (decoded.exp * 1000 < Date.now()) {
          console.log("Token expired");
          Cookies.remove("token");
          return;
        }

        setUserId(decoded.id);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  // Fetch user details using the extracted userId
  const { data, error, isLoading } = useGetUserByIdQuery(userId!, {
    skip: !userId, // Skip query if userId is null
  });

  useEffect(() => {
    if (data?.success) {
      dispatch(setUser(data.data)); // Store user in Redux
    }
  }, [data, dispatch]);

  const handleLogout = () => {
    Cookies.remove("token");
    dispatch(logout()); // Reset Redux store
    navigate("/signIn"); // Redirect to sign-in page
  };
  return { user: data?.data || null, isLoading, error, handleLogout };
};

export default useAuthUser;
