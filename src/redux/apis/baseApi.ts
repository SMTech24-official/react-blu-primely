import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// Base API definition that uses FetchedQuery's baseQuery
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://oggt-cxcv-backend.vercel.app", // Your backend base URL
    baseUrl: "http://10.0.10.41:5000/api/v1", // Your backend base URL
    credentials: "include",
    prepareHeaders: (headers) => {
      // Get the token or any required data from the state
      const token = Cookies.get("token");
      headers.set("accept", "application/json");
      if (token) {
        headers.set("authorization", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: () => ({}),
});
