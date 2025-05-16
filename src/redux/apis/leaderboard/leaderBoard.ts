import { baseApi } from "../baseApi";

// Define types for the API response
interface User {
  id: string;
  fullName: string | null;
  userName: string;
  email: string;
  role: "USER" | "ADMIN" | string;
  profilePicture: string | null;
  coverPicture: string | null;
  userStatus: "ACTIVE" | "INACTIVE" | string;
  isOnline: boolean;
  isDeleted: boolean;
  otp: string | null;
  otpExpiry: string | null;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

interface UsersResponse {
  success: boolean;
  message: string;
  meta: Meta;
  data: User[];
}

interface UsersQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
}

export const leaderBoardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserLeader: builder.query<UsersResponse, UsersQueryParams>({
      query: (params) => ({
        url: "/leaderboard/user",
        method: "GET",
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          ...(params.search && { search: params.search }),
          ...(params.sort && { sort: params.sort }),
        },
      }),
      providesTags: ["LeaderBoard"], // For cache invalidation
    }),
    getClanLeader: builder.query<UsersResponse, UsersQueryParams>({
      query: (params) => ({
        url: "/leaderboard/clan",
        method: "GET",
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          ...(params.search && { search: params.search }),
          ...(params.sort && { sort: params.sort }),
        },
      }),
      providesTags: ["LeaderBoard"], // For cache invalidation
    }),
  }),
});

export const { useGetUserLeaderQuery, useGetClanLeaderQuery } = leaderBoardApi;
